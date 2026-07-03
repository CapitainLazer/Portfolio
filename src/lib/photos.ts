import type { Project } from "./types";

/**
 * Photographies — tes images locales
 *
 * 1. Dépose tes fichiers dans : public/images/photo/
 * 2. Mets à jour le champ `file` ci-dessous (nom exact du fichier)
 * 3. Ajuste titre, description, tags et année si besoin
 *
 * Formats acceptés : .jpg, .jpeg, .png, .webp
 */
const PHOTO_DIR = "/images/photo";

function photoPath(filename: string): string {
  return `${PHOTO_DIR}/${filename}`;
}

export const photoProjects: Project[] = [
  {
    id: "photo-01",
    title: "Titre de la photo 1",
    description: "Description courte — ambiance, lieu, technique…",
    category: "photo",
    tags: ["Portrait", "Lightroom"],
    year: 2025,
    image: photoPath("01.jpg"),
    featured: true,
  },
  {
    id: "photo-02",
    title: "Titre de la photo 2",
    description: "Description courte.",
    category: "photo",
    tags: ["Street", "Urbain"],
    year: 2025,
    image: photoPath("02.jpg"),
  },
  {
    id: "photo-03",
    title: "Titre de la photo 3",
    description: "Description courte.",
    category: "photo",
    tags: ["Paysage", "Nature"],
    year: 2024,
    image: photoPath("03.jpg"),
  },
  {
    id: "photo-04",
    title: "Titre de la photo 4",
    description: "Description courte.",
    category: "photo",
    tags: ["Documentaire"],
    year: 2024,
    image: photoPath("04.jpg"),
  },
  {
    id: "photo-05",
    title: "Titre de la photo 5",
    description: "Description courte.",
    category: "photo",
    tags: ["Sony Alpha"],
    year: 2024,
    image: photoPath("05.jpg"),
  },
  {
    id: "photo-06",
    title: "Titre de la photo 6",
    description: "Description courte.",
    category: "photo",
    tags: ["Retouche"],
    year: 2024,
    image: photoPath("06.jpg"),
  },
];
