import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  OUTPUT_DIR,
  SOURCE_DIR,
  listSourcePhotos,
  removeOrphanWebpFiles,
  toWebpName,
  writePhotosManifest,
} from "./photos-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const FONT_PATH = path.join(ROOT, "src", "fonts", "DxSitrus-ExpandedItalic.otf");

const WATERMARK_TEXT = "Romaric Cathalifaud";
const MAX_EDGE = 1920;
const WEBP_QUALITY = 82;

function buildWatermarkSvg(width, height) {
  const fontB64 = fs.readFileSync(FONT_PATH).toString("base64");
  const fontSize = Math.round(
    Math.min(48, Math.max(30, Math.min(width, height) * 0.038))
  );
  const angle = -32;

  // 9 signatures espacées — couverture renforcée sans motif répété
  const positions = [
    { x: width * 0.18, y: height * 0.2 },
    { x: width * 0.5, y: height * 0.14 },
    { x: width * 0.82, y: height * 0.22 },
    { x: width * 0.28, y: height * 0.38 },
    { x: width * 0.72, y: height * 0.4 },
    { x: width * 0.42, y: height * 0.56 },
    { x: width * 0.58, y: height * 0.68 },
    { x: width * 0.24, y: height * 0.78 },
    { x: width * 0.76, y: height * 0.84 },
  ];

  const texts = positions.map(
    ({ x, y }) =>
      `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${angle} ${x.toFixed(1)} ${y.toFixed(1)})">${WATERMARK_TEXT}</text>`
  );

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <style>
      @font-face {
        font-family: "DxSitrus";
        src: url("data:font/otf;base64,${fontB64}") format("opentype");
        font-style: italic;
      }
      text {
        font-family: "DxSitrus", Georgia, serif;
        font-size: ${fontSize}px;
        font-style: italic;
        fill: #ffffff;
        opacity: 0.07;
      }
    </style>
  </defs>
  ${texts.join("")}
</svg>`);
}

async function optimizePhoto(filename) {
  const inputPath = path.join(SOURCE_DIR, filename);
  const outputName = toWebpName(filename);
  const outputPath = path.join(OUTPUT_DIR, outputName);

  const { data, info } = await sharp(inputPath)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .toBuffer({ resolveWithObject: true });

  const watermark = buildWatermarkSvg(info.width, info.height);

  await sharp(data)
    .composite([{ input: watermark, top: 0, left: 0 }])
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outputPath);

  const inputSize = fs.statSync(inputPath).size;
  const outputSize = fs.statSync(outputPath).size;

  return {
    filename,
    outputName,
    inputSize,
    outputSize,
    width: info.width,
    height: info.height,
  };
}

async function main() {
  if (!fs.existsSync(FONT_PATH)) {
    throw new Error(`Police introuvable : ${FONT_PATH}`);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const sources = listSourcePhotos();

  if (sources.length === 0) {
    console.log("Aucune image source dans public/images/photo/");
    writePhotosManifest();
    return;
  }

  console.log(`Optimisation de ${sources.length} image(s) → WebP ${MAX_EDGE}px max…\n`);

  let totalIn = 0;
  let totalOut = 0;
  const results = [];

  for (const filename of sources) {
    const result = await optimizePhoto(filename);
    results.push(result);
    totalIn += result.inputSize;
    totalOut += result.outputSize;
    const ratio = ((1 - result.outputSize / result.inputSize) * 100).toFixed(0);
    console.log(
      `✓ ${filename} → ${result.outputName} (${result.width}×${result.height}, -${ratio}%)`
    );
  }

  const removed = removeOrphanWebpFiles();
  const manifest = writePhotosManifest(results);

  console.log(
    `\nTotal : ${(totalIn / 1024 / 1024).toFixed(1)} Mo → ${(totalOut / 1024 / 1024).toFixed(1)} Mo`
  );
  console.log(`Galerie mise à jour : ${manifest.count} photo(s) dans photos.manifest.json`);

  if (removed.length > 0) {
    console.log(`WebP orphelins supprimés : ${removed.join(", ")}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
