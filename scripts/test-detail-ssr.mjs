import server from '../.vercel/output/functions/__server.func/index.mjs';

const routesToTest = [
  '/',
  '/services/web-development',
  '/services/mobile-development',
  '/services/saas-development',
  '/services/ai-solutions',
  '/services/cloud-solutions',
  '/services/startup-mvp',
  '/industries/startups',
  '/industries/ecommerce',
  '/industries/healthcare',
  '/industries/education',
  '/industries/real-estate',
  '/industries/fintech',
  '/industries/logistics',
  '/industries/hospitality',
  '/industries/nonprofits',
  '/industries/saas',
  '/industries/professional-services',
  '/industries/retail',
  '/notes/abandoned-microservices',
];

async function runTests() {
  const handler = server.default || server;
  let allPassed = true;

  console.log(`\n=== TESTING SSR & METADATA ON ${routesToTest.length} ROUTES ===\n`);

  for (const route of routesToTest) {
    const req = new Request(`https://www.zeploy.tech${route}`, {
      method: 'GET',
      headers: {
        'host': 'www.zeploy.tech',
        'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    });

    try {
      const res = await handler.fetch(req, {}, {});
      const status = res.status;
      const html = await res.text();

      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : 'NO TITLE FOUND';
      
      const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
      const canonical = canonicalMatch ? canonicalMatch[1] : 'NO CANONICAL FOUND';

      const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
      const desc = descMatch ? descMatch[1].substring(0, 60) + '...' : 'NO DESC FOUND';

      const cacheControl = res.headers.get('cache-control') || 'none';

      if (status === 200 && titleMatch && canonicalMatch) {
        console.log(`✓ [200] ${route}`);
        console.log(`   Title:     ${title}`);
        console.log(`   Canonical: ${canonical}`);
        console.log(`   Cache:     ${cacheControl}\n`);
      } else {
        console.error(`✗ FAIL [${status}] ${route}`);
        allPassed = false;
      }
    } catch (err) {
      console.error(`✗ ERROR on ${route}:`, err.message);
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log(`\n✅ ALL ${routesToTest.length} ROUTES PASSED SSR & SEO METADATA VERIFICATION!\n`);
  } else {
    console.error(`\n❌ SOME ROUTES FAILED VERIFICATION!\n`);
    process.exit(1);
  }
}

runTests();
