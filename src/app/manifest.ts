import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Portfolio`,
    short_name: siteConfig.name,
    description: siteConfig.tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#08051a",
    theme_color: "#3e3ff0",
    lang: "fr",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/images/planetary-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    id: absoluteUrl("/"),
  };
}
