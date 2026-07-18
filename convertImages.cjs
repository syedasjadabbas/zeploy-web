const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
  'src/assets/images',
  'public/projects'
];

const singleFiles = [
  'public/logo.png'
];

async function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) return;

  const newFilePath = filePath.replace(ext, '.webp');
  
  try {
    await sharp(filePath)
      .webp({ quality: 80, effort: 6 })
      .toFile(newFilePath);
    
    console.log(`Converted ${filePath} to ${newFilePath}`);
    
    // Delete the original
    fs.unlinkSync(filePath);
    console.log(`Deleted original: ${filePath}`);
  } catch (error) {
    console.error(`Failed to process ${filePath}:`, error);
  }
}

async function run() {
  for (const dir of directories) {
    const fullDir = path.resolve(__dirname, dir);
    if (!fs.existsSync(fullDir)) continue;
    
    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      await processFile(path.join(fullDir, file));
    }
  }

  for (const file of singleFiles) {
    const fullPath = path.resolve(__dirname, file);
    if (fs.existsSync(fullPath)) {
      await processFile(fullPath);
    }
  }
}

run();
