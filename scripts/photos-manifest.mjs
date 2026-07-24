import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.join(__dirname, "..");
export const SOURCE_DIR = path.join(ROOT, "public", "images", "photo");
export const OUTPUT_DIR = path.join(SOURCE_DIR, "web");
export const MANIFEST_PATH = path.join(ROOT, "src", "lib", "photos.manifest.json");

export function toWebpName(filename) {
  return (
    filename
      .replace(/\.[^.]+$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") + ".webp"
  );
}

export function toPhotoId(filename) {
  return filename
    .replace(/\.[^.]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function listSourcePhotos() {
  if (!fs.existsSync(SOURCE_DIR)) return [];

  return fs
    .readdirSync(SOURCE_DIR)
    .filter((file) => /\.(jpe?g|png)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "fr"));
}

export function buildManifestEntries(results = []) {
  const resultBySource = new Map(results.map((entry) => [entry.filename, entry]));
  const sources = listSourcePhotos();

  return sources
    .map((source) => {
      const webp = toWebpName(source);
      const webpPath = path.join(OUTPUT_DIR, webp);
      if (!fs.existsSync(webpPath)) return null;

      const optimized = resultBySource.get(source);
      const stats = optimized ?? fs.statSync(webpPath);

      return {
        id: toPhotoId(source),
        source,
        webp,
        width: optimized?.width ?? null,
        height: optimized?.height ?? null,
        bytes: optimized?.outputSize ?? stats.size,
      };
    })
    .filter(Boolean);
}

export function removeOrphanWebpFiles() {
  if (!fs.existsSync(OUTPUT_DIR)) return [];

  const validWebp = new Set(listSourcePhotos().map(toWebpName));
  const removed = [];

  for (const file of fs.readdirSync(OUTPUT_DIR)) {
    if (!file.endsWith(".webp") || validWebp.has(file)) continue;
    fs.unlinkSync(path.join(OUTPUT_DIR, file));
    removed.push(file);
  }

  return removed;
}

export function writePhotosManifest(results = []) {
  const items = buildManifestEntries(results);
  const manifest = {
    updatedAt: new Date().toISOString(),
    count: items.length,
    items,
  };

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  return manifest;
}
