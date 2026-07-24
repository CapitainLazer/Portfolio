import { CompetencePageView } from "@/components/competence/CompetencePageView";
import { competencePages } from "@/lib/themes";
import { getProjectsByCategory, getSkillsByCategory } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const page = competencePages.design;

export const metadata = createPageMetadata({
  title: page.label,
  description: page.description,
  path: page.path,
  keywords: ["design graphique", "UI/UX", "Figma", "identité visuelle", "branding"],
});

export default function DesignPage() {
  return (
    <CompetencePageView
      page={page}
      projects={getProjectsByCategory("design")}
      skills={getSkillsByCategory("design")}
    />
  );
}
