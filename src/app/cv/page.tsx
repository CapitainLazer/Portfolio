import { CvPageView } from "@/components/cv/CvPageView";
import { siteConfig } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";
import "./cv-document.css";

export const metadata = createPageMetadata({
  title: "CV",
  description: `CV de ${siteConfig.name} — développement front-end, design, photographie, TOEIC B2-C1, expériences ISAC Ingénierie et CNRS.`,
  path: "/cv",
  keywords: ["CV", "curriculum vitae", "développeur junior", "stage", "TOEIC"],
});

export default function CvPage() {
  return <CvPageView />;
}
