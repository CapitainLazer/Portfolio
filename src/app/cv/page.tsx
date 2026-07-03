import type { Metadata } from "next";
import { CvPageView } from "@/components/cv/CvPageView";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `CV — ${siteConfig.name}`,
  description: `Télécharger le CV de ${siteConfig.name} — développement, design et photographie.`,
};

export default function CvPage() {
  return <CvPageView />;
}
