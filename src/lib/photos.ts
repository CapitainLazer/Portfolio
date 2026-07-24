import type { Project } from "./types";
import manifest from "./photos.manifest.json";
import { withBasePath } from "./paths";

const PHOTO_DIR = "/images/photo/web";

export interface PhotoManifestItem {
  id: string;
  source: string;
  webp: string;
  width: number | null;
  height: number | null;
  bytes: number;
}

function inferTags(source: string): string[] {
  if (source.startsWith("_MG")) return ["Paysage", "Sony Alpha"];
  if (source.startsWith("_DSC") || source.startsWith("DSC")) return ["Street", "Urbain"];
  return ["Portrait", "Nature"];
}

function photoAltText(item: PhotoManifestItem): string {
  const tags = inferTags(item.source);
  if (tags.includes("Paysage")) {
    return "Photographie de paysage — lumière naturelle et composition";
  }
  if (tags.includes("Street")) {
    return "Photographie de rue — architecture et atmosphère urbaine";
  }
  return "Portrait photographique — lumière, composition et émotion";
}

function inferYear(source: string): number {
  return /2026/.test(source) ? 2026 : 2025;
}

function photoEntry(item: PhotoManifestItem, index: number): Project {
  return {
    id: `photo-${item.id}`,
    title: photoAltText(item),
    description: "Sélection personnelle — lumière, composition et atmosphère.",
    category: "photo",
    tags: inferTags(item.source),
    year: inferYear(item.source),
    image: withBasePath(`${PHOTO_DIR}/${encodeURIComponent(item.webp)}`),
    featured: index <= 3,
  };
}

/** Liste générée par npm run optimize-photos (photos.manifest.json) */
export const photoProjects: Project[] = (manifest.items as PhotoManifestItem[]).map(
  (item, index) => photoEntry(item, index + 1)
);

export const photoManifestMeta = {
  updatedAt: manifest.updatedAt,
  count: manifest.count,
};
