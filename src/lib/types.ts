export type ProjectCategory = "dev" | "design" | "photo";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  year: number;
  image: string;
  link?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: ProjectCategory | "tools";
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "gitlab" | "linkedin" | "dribbble" | "instagram" | "behance" | "mail";
}
