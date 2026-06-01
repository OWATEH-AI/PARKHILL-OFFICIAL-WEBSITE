import sharp from 'sharp';
import { readdirSync, existsSync, statSync, renameSync, unlinkSync, copyFileSync } from 'fs';
import { join, extname } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';

const QUALITY = 72;
const DIRS = ['featured-images', 'assets', 'gallery'];

async function compressImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const originalSize = statSync(inputPath).size;

  // Write to a unique temp file first, then replace
  const tmpPath = join(tmpdir(), `pk_${randomBytes(6).toString('hex')}${ext}`);

  try {
    let pipeline = sharp(inputPath);

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    }

    await pipeline.toFile(tmpPath);

    const newSize = statSync(tmpPath).size;

    if (newSize < originalSize) {
      // Replace original with compressed temp file
      unlinkSync(inputPath);
      renameSync(tmpPath, inputPath);
      const saved = ((originalSize - newSize) / 1024).toFixed(1);
      const pct = (((originalSize - newSize) / originalSize) * 100).toFixed(0);
      console.log(`✅ ${inputPath}: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB  (-${saved}KB, ${pct}%)`);
    } else {
      unlinkSync(tmpPath);
      console.log(`⏭  ${inputPath}: already optimized (${(originalSize / 1024).toFixed(0)}KB)`);
    }
  } catch (err) {
    // Clean up temp if it exists
    if (existsSync(tmpPath)) unlinkSync(tmpPath);
    console.error(`❌ Error on ${inputPath}: ${err.message}`);
  }
}

(async () => {
  console.log('🔧 Compressing images...\n');
  let total = 0;
  for (const dir of DIRS) {
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      if (statSync(fullPath).isFile()) {
        await compressImage(fullPath);
        total++;
      }
    }
  }
  console.log(`\n✅ Done! Processed ${total} files.`);
})();
