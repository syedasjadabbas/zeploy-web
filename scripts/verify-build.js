import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const staticAssetsDir = path.join(rootDir, '.vercel', 'output', 'static', 'assets');

console.log('--- RUNNING BUILD VERIFICATION ---');

if (!fs.existsSync(staticAssetsDir)) {
  console.error('ERROR: .vercel/output/static/assets does not exist!');
  process.exit(1);
}

const staticAssets = fs.readdirSync(staticAssetsDir);
console.log(`Found ${staticAssets.length} static assets in .vercel/output/static/assets.`);

// Required chunk patterns to verify
const requiredChunks = [
  'HeroScene',
  'BackgroundScenes',
  'vendor-three',
  'Sections',
  'index',
  'styles'
];

let hasErrors = false;

requiredChunks.forEach(chunkName => {
  const matches = staticAssets.filter(file => file.startsWith(chunkName));
  if (matches.length === 0) {
    console.error(`ERROR: Missing required chunk starting with '${chunkName}'`);
    hasErrors = true;
  } else {
    console.log(`✓ Required chunk '${chunkName}' present:`, matches.join(', '));
  }
});

// Check manifest / SSR references in .vercel/output/functions/__server.func
const serverFuncDir = path.join(rootDir, '.vercel', 'output', 'functions', '__server.func');

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

const serverFiles = getFilesRecursively(serverFuncDir);
console.log(`Scanning ${serverFiles.length} server files for client asset references...`);

const referencedAssets = new Set();

serverFiles.forEach(file => {
  if (file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith('.json')) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/\/assets\/[a-zA-Z0-9_\.\-]+\.(js|css|webp|png|svg)/g);
    if (matches) {
      matches.forEach(m => referencedAssets.add(m));
    }
  }
});

console.log(`Found ${referencedAssets.size} unique asset references in server bundle:`);
referencedAssets.forEach(asset => {
  const fileName = asset.replace('/assets/', '');
  const exists = fs.existsSync(path.join(staticAssetsDir, fileName));
  if (!exists) {
    console.error(`❌ MISSING ASSET: ${asset} referenced in server code but does not exist in .vercel/output/static/assets!`);
    hasErrors = true;
  } else {
    console.log(`  ✓ ${asset} exists`);
  }
});

if (hasErrors) {
  console.error('\n❌ BUILD VERIFICATION FAILED!');
  process.exit(1);
} else {
  console.log('\n✅ BUILD VERIFICATION SUCCESSFUL! All referenced assets exist.');
}
