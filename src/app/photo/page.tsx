import { CompetencePageView } from "@/components/competence/CompetencePageView";
import { competencePages } from "@/lib/themes";
import { getProjectsByCategory, getSkillsByCategory } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const page = competencePages.photo;

export const metadata = createPageMetadata({
  title: page.label,
  description: page.description,
  path: page.path,
  keywords: ["photographie", "portrait", "street photography", "paysage", "galerie photo"],
});

export default function PhotoPage() {
  return (
    <CompetencePageView
      page={page}
      projects={getProjectsByCategory("photo")}
      skills={getSkillsByCategory("photo")}
    />
  );
}
