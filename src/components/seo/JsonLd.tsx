import { siteConfig, socialLinks } from "@/lib/data";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd() {
  const sameAs = socialLinks.map((link) => link.href);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: siteConfig.name,
    url: SITE_URL,
    image: absoluteUrl("/images/planetary-logo.png"),
    jobTitle: siteConfig.title,
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressRegion: siteConfig.location,
    },
    sameAs,
    knowsAbout: [
      "Développement web",
      "Design graphique",
      "Photographie",
      "React",
      "Next.js",
      "Three.js",
      "UI/UX",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `${siteConfig.name} — Portfolio`,
    url: SITE_URL,
    description: siteConfig.tagline,
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: `${siteConfig.name} — Portfolio créatif`,
    description: siteConfig.tagline,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <>
      <JsonLdScript data={person} />
      <JsonLdScript data={website} />
      <JsonLdScript data={profilePage} />
    </>
  );
}
