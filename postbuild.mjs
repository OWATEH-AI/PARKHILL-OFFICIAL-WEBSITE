import { cpSync, existsSync } from 'fs';
import { join } from 'path';

const folders = ['assets', 'featured-images', 'gallery', 'audio'];

console.log('🏁 Running postbuild asset copy...');

folders.forEach(folder => {
  if (existsSync(folder)) {
    try {
      cpSync(folder, join('dist', folder), { recursive: true, force: true });
      console.log(`✅ Copied ${folder} to dist/${folder}`);
    } catch (err) {
      console.error(`❌ Failed to copy ${folder}:`, err.message);
    }
  } else {
    console.log(`⚠️  Folder ${folder} does not exist, skipping.`);
  }
});

console.log('🎉 Postbuild asset copy complete!');
