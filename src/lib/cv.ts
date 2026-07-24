export interface CvExperience {
  period: string;
  company: string;
  location?: string;
  role: string;
  project?: string;
  items: string[];
}

export interface CvEducation {
  period: string;
  title: string;
  school: string;
  detail?: string;
  items?: string[];
}

export interface CvCertification {
  name: string;
  level: string;
  detail: string;
  year?: string;
  scores?: { label: string; level: string }[];
}

export interface CvLanguage {
  name: string;
  level: string;
  note?: string;
}

export const cvProfile = {
  name: "Romaric Cathalifaud",
  title: "Développeur Junior · Front-end",
  subtitle: "Développement web · Design · Photographie",
  phone: "+33 7 83 46 30 24",
  email: "romaric.cathalifaud@gmail.com",
  linkedin: "linkedin.com/in/romaric-cathalifaud",
  linkedinUrl: "https://www.linkedin.com/in/romaric-cathalifaud/",
  location: "Nouvelle-Aquitaine, France",
};

export const cvSummary =
  "Étudiant en BUT MMI (3ᵉ année), orienté développement front-end, design d'interface et photographie. Stage chez ISAC Ingénierie sur le projet isac-ingenierie ; expérience CNRS sur WordPress, Three.js, Symfony et Next.js.";

export const cvSkillGroups = [
  {
    label: "Développement",
    skills: [
      "React / Next.js",
      "TypeScript / JavaScript",
      "Three.js / BabylonJS",
      "Python",
      "HTML / CSS",
      "Symfony",
      "API REST",
    ],
  },
  {
    label: "Design & médias",
    skills: ["UI/UX", "Figma", "Wireframes", "WordPress", "Photographie", "Lightroom"],
  },
  {
    label: "Outils",
    skills: ["Git / GitHub", "Hébergement web", "CMS", "Snap.svg"],
  },
];

export const cvExperiences: CvExperience[] = [
  {
    period: "2026 · 13 semaines",
    company: "ISAC Ingénierie",
    role: "Stage — Développeur web",
    project: "isac-ingenierie",
    items: [
      "Conception et développement du projet web isac-ingenierie",
      "Intégration front-end, interfaces responsive et évolutions fonctionnelles",
      "Maintenance technique et travail sur le dépôt Git",
    ],
  },
  {
    period: "2025 · 10 semaines",
    company: "CNRS — Laboratoire de Biogenèse Membranaire",
    location: "Villenave-d'Ornon",
    role: "Stage — Développeur web",
    items: [
      "Maintenance, conception et réalisation de sites WordPress",
      "Jeu interactif en Three.js et animations SVG (Snap.svg)",
      "Application consommant une API gouvernementale (Symfony & Next.js)",
      "Maquettage et wireframes de sites web",
    ],
  },
];

export const cvEducation: CvEducation[] = [
  {
    period: "2023 — Aujourd'hui",
    title: "BUT Métiers du Multimédia et de l'Internet — 3ᵉ année",
    school: "Université Clermont Auvergne",
    detail: "Niveau DUT (Bac +2)",
    items: ["Site web avec base de données", "Projets front-end, CMS et design web"],
  },
  {
    period: "Juin 2023",
    title: "Baccalauréat général",
    school: "Lycée Alfred-Kastler, Talence",
    detail: "Spécialités NSI & Mathématiques",
  },
  {
    period: "Juin 2020",
    title: "Brevet des collèges — Mention Bien",
    school: "Collège Montesquieu, La Brède",
  },
];

export const cvCertifications: CvCertification[] = [
  {
    name: "TOEIC Listening & Reading",
    level: "B2",
    detail: "Certification officielle reconnue par les entreprises",
    year: "2025",
    scores: [
      { label: "Compréhension écrite", level: "C1" },
      { label: "Compréhension orale", level: "B2" },
    ],
  },
];

export const cvLanguages: CvLanguage[] = [
  { name: "Français", level: "Langue maternelle" },
  {
    name: "Anglais",
    level: "B2",
    note: "TOEIC — écrite C1 · orale B2",
  },
  { name: "Italien", level: "B1 — Intermédiaire" },
];

export const cvInterests = ["Photographie", "Jeux vidéo", "Lecture", "Streaming"];
