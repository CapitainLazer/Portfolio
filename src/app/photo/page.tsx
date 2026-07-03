import type { Metadata } from "next";
import { CompetencePageView } from "@/components/competence/CompetencePageView";
import { competencePages } from "@/lib/themes";
import { getProjectsByCategory, getSkillsByCategory } from "@/lib/data";

const page = competencePages.photo;

export const metadata: Metadata = {
  title: `${page.label} — Romaric Cathalifaud`,
  description: page.description,
};

export default function PhotoPage() {
  return (
    <CompetencePageView
      page={page}
      projects={getProjectsByCategory("photo")}
      skills={getSkillsByCategory("photo")}
    />
  );
}
