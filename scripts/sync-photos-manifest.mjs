import {
  buildManifestEntries,
  removeOrphanWebpFiles,
  writePhotosManifest,
} from "./photos-manifest.mjs";

const removed = removeOrphanWebpFiles();
const manifest = writePhotosManifest();

console.log(`Manifeste galerie : ${manifest.count} photo(s) → src/lib/photos.manifest.json`);

if (removed.length > 0) {
  console.log(`WebP orphelins supprimés : ${removed.join(", ")}`);
}

if (manifest.count === 0) {
  console.log(
    "Aucune photo WebP trouvée. Dépose des JPG dans public/images/photo/ puis lance npm run optimize-photos"
  );
}
