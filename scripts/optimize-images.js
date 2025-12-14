const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const assetsDir = path.join(__dirname, "..", "src", "assets");

const filesToProcess = [
  "profile.jpg",
  "p1.jpg",
  "p2.jpg",
  "p3.jpg",
  "p4.jpg",
  "p5.jpg",
  "p6.jpg",
  "p8.jpg",
  "p9.jpg",
  "p10.jpg",
];

async function processFile(file) {
  const inputPath = path.join(assetsDir, file);
  if (!fs.existsSync(inputPath)) return;
  const base = path.basename(file, path.extname(file));
  const outSmallJpg = path.join(assetsDir, `${base}-sm.jpg`);
  const outWebp = path.join(assetsDir, `${base}-sm.webp`);

  try {
    await sharp(inputPath)
      .resize({ width: 800 })
      .jpeg({ quality: 78 })
      .toFile(outSmallJpg);
    await sharp(inputPath)
      .resize({ width: 800 })
      .webp({ quality: 78 })
      .toFile(outWebp);
    console.log(`Processed ${file}`);
  } catch (err) {
    console.error(`Failed ${file}:`, err.message);
  }
}

async function run() {
  for (const f of filesToProcess) {
    // eslint-disable-next-line no-await-in-loop
    await processFile(f);
  }
}

run().catch((e) => console.error(e));
