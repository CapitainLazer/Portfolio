import type { Metadata } from "next";
import { siteConfig } from "./data";

/** URL publique du site (override via NEXT_PUBLIC_SITE_URL en prod). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteConfig.domain}`;

export const DEFAULT_OG_IMAGE = "/images/planetary-logo.png";

export const DEFAULT_KEYWORDS = [
  "Romaric Cathalifaud",
  "portfolio",
  "développeur web",
  "développeur front-end",
  "designer graphique",
  "UI/UX",
  "photographe",
  "Next.js",
  "React",
  "Three.js",
  "Bordeaux",
  "Nouvelle-Aquitaine",
  "créatif",
] as const;

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

type PageMetadataOptions = {
  title: Metadata["title"];
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  noIndex?: boolean;
};

function sharedMetadata({
  description,
  path,
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  ogTitle,
  noIndex = false,
}: Omit<PageMetadataOptions, "title"> & { ogTitle: string }): Omit<
  Metadata,
  "title"
> {
  const canonical = absoluteUrl(path);
  const imageUrl = ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);

  return {
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    authors: [{ name: siteConfig.name, url: SITE_URL }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: canonical,
      siteName: `${siteConfig.name} — Portfolio`,
      title: ogTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/** Métadonnées complètes pour une page (OG, Twitter, canonical, robots). */
export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const ogTitle =
    options.ogTitle ??
    (typeof options.title === "string" ? options.title : siteConfig.name);

  return {
    title: options.title,
    ...sharedMetadata({ ...options, ogTitle }),
  };
}

const homeTitle = `${siteConfig.name} — Dev · Design · Photo`;

export const rootMetadata: Metadata = {
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  ...sharedMetadata({
    description: siteConfig.tagline,
    path: "/",
    ogTitle: homeTitle,
  }),
  category: "portfolio",
};
