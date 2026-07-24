import type { Project, ProjectCategory, Skill, SocialLink } from "./types";
import { photoProjects } from "./photos";

const GITHUB_USER = "CapitainLazer";

export function githubOgImage(repo: string): string {
  return `https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo}`;
}

export const siteConfig = {
  name: "Romaric Cathalifaud",
  title: "Développeur · Designer · Photographe",
  tagline:
    "Portfolio créatif — développement web, design graphique et photographie. Je transforme des idées en expériences visuelles et interactives.",
  location: "France",
  domain: "romaric-cathalifaud-portfolio.fr",
  github: `https://github.com/${GITHUB_USER}`,
  gitlab: "https://gitlab.com/CapitainLazer",
  cv: {
    href: "/cv",
    filename: "Romaric-Cathalifaud-CV.pdf",
  },
};

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/dev", label: "Dev" },
  { href: "/design", label: "Design" },
  { href: "/photo", label: "Photo" },
  { href: "/cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
];

const devAndDesignProjects: Project[] = [
  {
    id: "jeux-mmi",
    title: "Digiters — Jeux MMi",
    description:
      "Jeu Pokémon-like en développement avec BabylonJS et JavaScript vanilla. Exploration 3D, combats et progression de créatures.",
    category: "dev",
    tags: ["BabylonJS", "JavaScript", "Jeu 3D", "GitHub Pages"],
    year: 2025,
    image: githubOgImage("Jeux-MMi"),
    link: "https://github.com/CapitainLazer/Jeux-MMi",
    featured: true,
  },
  {
    id: "onyx-reports",
    title: "Onyx Reports",
    description:
      "Éditeur de texte Markdown dédié à la création et mise en forme de rapports professionnels.",
    category: "dev",
    tags: ["Markdown", "CSS", "Éditeur", "Rapports"],
    year: 2026,
    image: githubOgImage("Onyx-reports"),
    link: "https://github.com/CapitainLazer/Onyx-reports",
    featured: true,
  },
  {
    id: "meteonet",
    title: "MeteoNet DataVisualisation",
    description:
      "Visualisation de données météorologiques à partir du jeu de données MeteoNet, avec analyses et graphiques interactifs.",
    category: "dev",
    tags: ["Python", "Data Viz", "MeteoNet", "Analyse"],
    year: 2026,
    image: githubOgImage("MeteoNet-DataVisualisation"),
    link: "https://github.com/CapitainLazer/MeteoNet-DataVisualisation",
  },
  {
    id: "double-vision",
    title: "Double Vision",
    description:
      "Expérience web interactive mêlant visuels, typographie et narration. Projet créatif front-end.",
    category: "dev",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    year: 2025,
    image: githubOgImage("Double-Vision"),
    link: "https://github.com/CapitainLazer/Double-Vision",
  },
  {
    id: "threejs",
    title: "Three.js Experiments",
    description:
      "Explorations 3D avec Three.js : scènes, lumières et interactions pour apprendre le rendu WebGL.",
    category: "dev",
    tags: ["Three.js", "WebGL", "3D", "JavaScript"],
    year: 2025,
    image: githubOgImage("Threejs"),
    link: "https://github.com/CapitainLazer/Threejs",
  },
  {
    id: "garbage-fighter",
    title: "Garbage Fighter",
    description:
      "Mini-jeu mobile développé en hackathon — action rapide et mécaniques de score.",
    category: "dev",
    tags: ["HTML", "Jeu mobile", "Hackathon", "Expo"],
    year: 2026,
    image: githubOgImage("GarbageFighter"),
    link: "https://github.com/CapitainLazer/GarbageFighter",
  },
  {
    id: "app-next-mini",
    title: "App Next Mini Site",
    description:
      "Mini-site développé avec Next.js et TypeScript, base pour des interfaces modernes et performantes.",
    category: "dev",
    tags: ["Next.js", "TypeScript", "React"],
    year: 2026,
    image: githubOgImage("App-next-mini_site"),
    link: "https://github.com/CapitainLazer/App-next-mini_site",
  },
  {
    id: "sae-301-mumo",
    title: "SAE 301 — Musée MUMO",
    description:
      "Site web du projet SAE 301 sur le musée mobile MUMO : architecture PHP et intégration front-end.",
    category: "dev",
    tags: ["PHP", "Web", "SAE", "Musée"],
    year: 2024,
    image: githubOgImage("SAE-301-Web-2-Week-Repository"),
    link: "https://github.com/CapitainLazer/SAE-301-Web-2-Week-Repository",
  },
  {
    id: "e-learn",
    title: "E-Learn",
    description:
      "Plateforme d'apprentissage en ligne — structure back-end Python pour modules et contenus pédagogiques.",
    category: "dev",
    tags: ["Python", "E-learning", "Web"],
    year: 2026,
    image: githubOgImage("E-Learn"),
    link: "https://github.com/CapitainLazer/E-Learn",
  },
  {
    id: "double-vision-design",
    title: "Double Vision — Direction artistique",
    description:
      "Identité visuelle et mise en page pour une expérience narrative web. Typographie expressive et dégradés néon.",
    category: "design",
    tags: ["UI/UX", "Direction artistique", "Web"],
    year: 2025,
    image: githubOgImage("Double-Vision"),
    link: "https://github.com/CapitainLazer/Double-Vision",
    featured: true,
  },
  {
    id: "onyx-design",
    title: "Onyx Reports — Interface",
    description:
      "Design d'interface pour un éditeur de rapports : hiérarchie visuelle, lisibilité et workflow de rédaction.",
    category: "design",
    tags: ["UI", "Éditeur", "Product Design"],
    year: 2026,
    image: githubOgImage("Onyx-reports"),
    link: "https://github.com/CapitainLazer/Onyx-reports",
    featured: true,
  },
  {
    id: "independent",
    title: "Independent",
    description:
      "Mini-projet d'expérimentation pour manipuler des SVG et intégrer des cartes interactives avec Leaflet, entièrement en code.",
    category: "dev",
    tags: ["SVG", "Leaflet", "JavaScript", "Cartographie"],
    year: 2024,
    image: githubOgImage("independent"),
    link: "https://github.com/CapitainLazer/independent",
  },
  {
    id: "portfolio-v2",
    title: "Portfolio v2 — Design system",
    description:
      "Refonte du portfolio : palette futuriste rose/bleu/violet, typographie DX Sitrus et composants glassmorphism.",
    category: "design",
    tags: ["Figma", "Design Tokens", "Next.js", "Branding"],
    year: 2026,
    image: "/images/planetary-logo.png",
    link: "https://github.com/CapitainLazer",
    featured: true,
  },
];

export const projects: Project[] = [...devAndDesignProjects, ...photoProjects];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export const HOME_PHOTO_LIMIT = 6;

function sortProjectsForHome(a: Project, b: Project): number {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  return b.year - a.year;
}

/** Aperçu accueil — 2 projets max par domaine pour l'onglet « Tous » */
export function getHomeProjectsPreview(perCategory = 2): Project[] {
  const categories: ProjectCategory[] = ["dev", "design", "photo"];

  return categories.flatMap((category) =>
    projects
      .filter((p) => p.category === category)
      .sort(sortProjectsForHome)
      .slice(0, perCategory)
  );
}

/** Photos sur l'accueil — galerie et filtre Photo */
export function getHomePhotoProjects(limit = HOME_PHOTO_LIMIT): Project[] {
  return projects
    .filter((p) => p.category === "photo")
    .sort(sortProjectsForHome)
    .slice(0, limit);
}

export function getSkillsByCategory(category: ProjectCategory): Skill[] {
  return skills.filter((s) => s.category === category);
}

export const galleryImages = getHomePhotoProjects().map((p) => ({
  id: p.id,
  src: p.image,
  alt: p.title,
}));

export const skills: Skill[] = [
  { name: "React / Next.js", level: 90, category: "dev" },
  { name: "TypeScript", level: 85, category: "dev" },
  { name: "Three.js / BabylonJS", level: 82, category: "dev" },
  { name: "Python", level: 78, category: "dev" },
  { name: "UI/UX Design", level: 88, category: "design" },
  { name: "Figma", level: 92, category: "design" },
  { name: "Branding", level: 85, category: "design" },
  { name: "Photographie", level: 90, category: "photo" },
  { name: "Retouche (Lightroom)", level: 88, category: "photo" },
  { name: "Git / CI-CD", level: 82, category: "tools" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.github, icon: "github" },
  { label: "GitLab", href: siteConfig.gitlab, icon: "gitlab" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/romaric-cathalifaud/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/romaric_cathalifaud/",
    icon: "instagram",
  },
];

export const stats = [
  { value: "30+", label: "Projets réalisés" },
  { value: "3", label: "Domaines d'expertise" },
  { value: "5+", label: "Années d'expérience" },
];
