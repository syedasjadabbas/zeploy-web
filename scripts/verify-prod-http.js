import https from 'https';
import http from 'http';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verifyDeployment(domain) {
  console.log(`\n==================================================`);
  console.log(`VERIFYING DEPLOYMENT FOR: ${domain}`);
  console.log(`==================================================`);

  const htmlRes = await fetchUrl(domain);
  console.log(`HTML HTTP Status: ${htmlRes.statusCode}`);
  
  if (htmlRes.statusCode !== 200) {
    console.error(`ERROR: HTML returned status ${htmlRes.statusCode}`);
    return false;
  }

  // Extract all asset references from HTML
  const assetRegex = /\/assets\/[a-zA-Z0-9_\.\-]+\.(js|css|webp|png|svg)/g;
  const assetMatches = htmlRes.body.match(assetRegex) || [];
  const uniqueAssets = [...new Set(assetMatches)];

  console.log(`Found ${uniqueAssets.length} unique asset references in production HTML:`);
  
  let failed = 0;
  const checkedAssets = new Set();

  async function checkAsset(assetPath) {
    if (checkedAssets.has(assetPath)) return true;
    checkedAssets.add(assetPath);

    const fullAssetUrl = `${domain.replace(/\/$/, '')}${assetPath}`;
    try {
      const assetRes = await fetchUrl(fullAssetUrl);
      if (assetRes.statusCode === 200) {
        console.log(`  ✓ HTTP 200: ${assetPath} (${assetRes.body.length} bytes)`);
        
        // If it's a JS asset, scan it for dynamic and static imports!
        if (assetPath.endsWith('.js')) {
          const importMatches = assetRes.body.match(/["'](\.\/|\/assets\/)?([a-zA-Z0-9_\.\-]+\.js)["']/g) || [];
          for (const match of importMatches) {
            const clean = match.replace(/["']/g, '').replace(/^\.\//, '/assets/');
            if (clean.startsWith('/assets/')) {
              await checkAsset(clean);
            }
          }
        }
        return true;
      } else {
        console.error(`  ❌ HTTP ${assetRes.statusCode}: ${assetPath}`);
        failed++;
        return false;
      }
    } catch (e) {
      console.error(`  ❌ ERROR fetching ${assetPath}: ${e.message}`);
      failed++;
      return false;
    }
  }

  for (const assetPath of uniqueAssets) {
    await checkAsset(assetPath);
  }

  console.log(`\nVerifying critical 3D and section chunks exist and returned 200 on production...`);
  const criticalPrefixes = ['HeroScene', 'BackgroundScenes', 'vendor-three', 'Sections'];
  const allFetched = Array.from(checkedAssets);

  criticalPrefixes.forEach(prefix => {
    const found = allFetched.find(a => a.includes(prefix));
    if (found) {
      console.log(`  ✓ Critical chunk '${prefix}' verified: ${found}`);
    } else {
      console.error(`  ❌ Critical chunk prefix '${prefix}' missing!`);
      failed++;
    }
  });

  return failed === 0;
}

async function run() {
  const vercelAppSuccess = await verifyDeployment('https://zeploy-web.vercel.app/');
  const customDomainSuccess = await verifyDeployment('https://www.zeploy.tech/');

  if (vercelAppSuccess && customDomainSuccess) {
    console.log('\n🎉 ALL PRODUCTION ASSET HTTP VERIFICATIONS PASSED 100%!');
    process.exit(0);
  } else {
    console.error('\n❌ SOME PRODUCTION ASSET CHECKS FAILED!');
    process.exit(1);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
