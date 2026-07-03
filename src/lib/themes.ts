import type { ProjectCategory } from "./types";

export type ThemeId = "default" | "dev" | "design" | "photo";

export interface SiteTheme {
  id: ThemeId;
  label: string;
  primary: string;
  secondary: string;
  accent: string;
  sky: string;
  orb1: string;
  orb2: string;
  orb3: string;
  gradientMain: string;
  gradientHero: string;
}

export interface CompetencePage {
  category: ProjectCategory;
  themeId: ThemeId;
  path: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
}

export const themes: Record<ThemeId, SiteTheme> = {
  default: {
    id: "default",
    label: "Portfolio",
    primary: "#3e3ff0",
    secondary: "#201881",
    accent: "#ff00e5",
    sky: "#00d4ff",
    orb1: "#3e3ff0",
    orb2: "#ff00e5",
    orb3: "#201881",
    gradientMain: "linear-gradient(135deg, #3e3ff0 0%, #ff00e5 50%, #201881 100%)",
    gradientHero: "linear-gradient(180deg, rgba(32, 24, 129, 0.66) 0%, rgba(32, 24, 129, 0) 100%)",
  },
  dev: {
    id: "dev",
    label: "Développement",
    primary: "#3e3ff0",
    secondary: "#1e1b4b",
    accent: "#00d4ff",
    sky: "#60a5fa",
    orb1: "#3e3ff0",
    orb2: "#00d4ff",
    orb3: "#6366f1",
    gradientMain: "linear-gradient(135deg, #3e3ff0 0%, #00d4ff 50%, #6366f1 100%)",
    gradientHero: "linear-gradient(180deg, rgba(30, 27, 75, 0.7) 0%, rgba(8, 5, 26, 0) 100%)",
  },
  design: {
    id: "design",
    label: "Design",
    primary: "#ff00e5",
    secondary: "#7c3aed",
    accent: "#fb923c",
    sky: "#f472b6",
    orb1: "#ff00e5",
    orb2: "#fb923c",
    orb3: "#7c3aed",
    gradientMain: "linear-gradient(135deg, #ff00e5 0%, #fb923c 45%, #7c3aed 100%)",
    gradientHero: "linear-gradient(180deg, rgba(124, 58, 237, 0.45) 0%, rgba(8, 5, 26, 0) 100%)",
  },
  photo: {
    id: "photo",
    label: "Photographie",
    primary: "#38bdf8",
    secondary: "#10b981",
    accent: "#4ade80",
    sky: "#7dd3fc",
    orb1: "#38bdf8",
    orb2: "#10b981",
    orb3: "#059669",
    gradientMain: "linear-gradient(135deg, #38bdf8 0%, #4ade80 50%, #10b981 100%)",
    gradientHero: "linear-gradient(180deg, rgba(16, 185, 129, 0.35) 0%, rgba(8, 5, 26, 0) 100%)",
  },
};

export const competencePages: Record<ProjectCategory, CompetencePage> = {
  dev: {
    category: "dev",
    themeId: "dev",
    path: "/dev",
    label: "Développement",
    title: "Code & expériences",
    subtitle: "Développeur web & créatif numérique",
    description:
      "Applications web, jeux, visualisations de données et outils interactifs. Mes projets GitHub reflètent une approche mêlant front-end moderne, 3D et expérimentation.",
    tools: ["Next.js", "TypeScript", "Three.js", "BabylonJS", "Python", "PHP"],
  },
  design: {
    category: "design",
    themeId: "design",
    path: "/design",
    label: "Design",
    title: "Identité & interfaces",
    subtitle: "Designer graphique & UI/UX",
    description:
      "Identités visuelles, interfaces utilisateur, affiches et systèmes de design. Un travail orienté typographie expressive, dégradés et cohérence visuelle.",
    tools: ["Figma", "Photoshop", "Illustrator", "UI/UX", "Branding", "Print"],
  },
  photo: {
    category: "photo",
    themeId: "photo",
    path: "/photo",
    label: "Photographie",
    title: "Lumière & narration",
    subtitle: "Photographe artistique",
    description:
      "Portraits, street photography et paysages. Je cherche à capturer l'atmosphère, les couleurs naturelles et les instants qui racontent une histoire.",
    tools: ["Lightroom", "Sony Alpha", "Portrait", "Street", "Paysage", "Retouche"],
  },
};

export function getThemeForPath(pathname: string): SiteTheme {
  if (pathname.startsWith("/dev")) return themes.dev;
  if (pathname.startsWith("/design")) return themes.design;
  if (pathname.startsWith("/photo")) return themes.photo;
  return themes.default;
}

export function themeToCssVars(theme: SiteTheme): Record<string, string> {
  return {
    "--color-primary": theme.primary,
    "--color-secondary": theme.secondary,
    "--color-accent": theme.accent,
    "--color-sky": theme.sky,
    "--gradient-main": theme.gradientMain,
    "--gradient-hero": theme.gradientHero,
  };
}
