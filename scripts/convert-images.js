
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');
const outputDir = path.join(__dirname, '..', 'src', 'assets');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(assetsDir, (err, files) => {
  if (err) {
    console.error('Error reading assets directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(assetsDir, file);
    const fileExt = path.extname(file).toLowerCase();

    if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
      const outputFileName = `${path.basename(file, fileExt)}.webp`;
      const outputPath = path.join(outputDir, outputFileName);

      sharp(filePath)
        .webp({ quality: 80 })
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error(`Error converting ${file}:`, err);
          } else {
            console.log(`Converted ${file} to ${outputFileName}`, info);
          }
        });
    }
  });
});
