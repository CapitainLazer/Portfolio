import { CompetencePageView } from "@/components/competence/CompetencePageView";
import { competencePages } from "@/lib/themes";
import { getProjectsByCategory, getSkillsByCategory } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const page = competencePages.dev;

export const metadata = createPageMetadata({
  title: page.label,
  description: page.description,
  path: page.path,
  keywords: ["développeur web", "React", "Next.js", "Three.js", "projets GitHub"],
});

export default function DevPage() {
  return (
    <CompetencePageView
      page={page}
      projects={getProjectsByCategory("dev")}
      skills={getSkillsByCategory("dev")}
    />
  );
}
