const fs = require("fs");
const path = require("path");

const assetDir = path.join(__dirname, "../src/assets");
const outputFile = path.join(__dirname, "../src/lib/assets.ts");

const imageExtensions = [".jpg", ".jpeg", ".png", ".svg", ".gif", ".webp"];

const assetFiles = fs.readdirSync(assetDir);

let imports = "";
let exports = "export const assets = {\n";

const imageMap = new Map();

assetFiles.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (imageExtensions.includes(ext)) {
    const baseName = file.replace(/-sm\.(jpg|jpeg|png|svg|gif|webp)$/, ".$1");
    const isSmall = file.includes("-sm.");
    const name = path
      .basename(baseName, ext)
      .replace(/[^a-zA-Z0-9]/g, "_");

    if (!imageMap.has(name)) {
      imageMap.set(name, {});
    }

    const imageInfo = imageMap.get(name);
    const importName = `${name}${isSmall ? "_sm" : ""}`;
    imports += `import ${importName} from "@/assets/${file}";\n`;

    if (isSmall) {
      imageInfo.small = importName;
    } else {
      imageInfo.large = importName;
    }
  }
});

imageMap.forEach((value, key) => {
  exports += `  "${key}": {
    small: ${value.small || "undefined"},
    large: ${value.large || "undefined"},
  },
`;
});

exports += "};\n";

fs.writeFileSync(outputFile, imports + "\n" + exports);

console.log(`Generated asset imports in ${outputFile}`);
