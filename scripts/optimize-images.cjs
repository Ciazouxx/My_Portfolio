const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const assetsDir = path.join(__dirname, "..", "src", "assets");

async function processFile(file) {
  const inputPath = path.join(assetsDir, file);
  if (!fs.existsSync(inputPath)) return;
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;
  const base = path.basename(file, ext);
  const outSmallJpg = path.join(assetsDir, `${base}-sm.jpg`);
  const outWebp = path.join(assetsDir, `${base}-sm.webp`);

  try {
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    const width = Math.min(1200, metadata.width || 1200);
    await img
      .resize({ width: Math.min(800, width) })
      .jpeg({ quality: 78 })
      .toFile(outSmallJpg);
    await img
      .resize({ width: Math.min(800, width) })
      .webp({ quality: 78 })
      .toFile(outWebp);
    console.log(`Processed ${file}`);
  } catch (err) {
    console.error(`Failed ${file}:`, err.message);
  }
}

async function run() {
  const allFiles = fs.readdirSync(assetsDir);
  const toProcess = allFiles.filter(
    (f) => !f.includes("-sm") && /\.(jpg|jpeg|png)$/i.test(f)
  );
  for (const f of toProcess) {
    // eslint-disable-next-line no-await-in-loop
    await processFile(f);
  }
}

run().catch((e) => console.error(e));
