import type { Project } from "./types";

const PHOTO_DIR = "/images/photo/web";

function toWebpFilename(filename: string): string {
  return (
    filename
      .replace(/\.[^.]+$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") + ".webp"
  );
}

function photoPath(filename: string): string {
  return `${PHOTO_DIR}/${encodeURIComponent(toWebpFilename(filename))}`;
}

function photoEntry(
  filename: string,
  index: number,
  options?: { featured?: boolean; tags?: string[]; year?: number }
): Project {
  const id = filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: `photo-${id}`,
    title: `Photographie ${String(index).padStart(2, "0")}`,
    description: "Sélection personnelle — lumière, composition et atmosphère.",
    category: "photo",
    tags: options?.tags ?? ["Photographie", "Lightroom"],
    year: options?.year ?? 2025,
    image: photoPath(filename),
    featured: options?.featured,
  };
}

const filenames = [
  "DSC00475 (1).jpg",
  "DSC00562.jpg",
  "DSC00567.jpg",
  "DSC00591.jpg",
  "DSC00607.jpg",
  "DSC00626 (1).jpg",
  "DSC00649.jpg",
  "DSC00653.jpg",
  "DSC00678 (1).jpg",
  "DSC00692.jpg",
  "DSC00703 (2).jpg",
  "DSC00714.jpg",
  "IMG-20250531-WA0004.jpg",
  "IMG-20250531-WA0010.jpg",
  "IMG-20250531-WA0012.jpg",
  "IMG-20250531-WA0045.jpg",
  "IMG-20250531-WA0047 (1).jpg",
  "IMG_20250530_125709.jpg",
  "IMG_20250903_180350.jpg",
  "IMG_20260703_162933_397.jpg",
  "IMG_5716.jpg",
  "IMG_5821.jpg",
  "IMG_6529.jpg",
  "_DSC1121.jpg",
  "_DSC1133 (1).jpg",
  "_MG_6327.jpg",
  "_MG_6338.jpg",
] as const;

export const photoProjects: Project[] = filenames.map((filename, index) =>
  photoEntry(filename, index + 1, {
    featured: index < 3,
    year: filename.includes("2026") ? 2026 : 2025,
    tags: filename.startsWith("_MG")
      ? ["Paysage", "Sony Alpha"]
      : filename.startsWith("_DSC") || filename.startsWith("DSC")
        ? ["Street", "Urbain"]
        : ["Portrait", "Nature"],
  })
);
