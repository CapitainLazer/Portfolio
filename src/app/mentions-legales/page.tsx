import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/data";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata = createPageMetadata({
  title: "Mentions légales",
  description: `Mentions légales du portfolio de ${siteConfig.name} — éditeur, hébergement et propriété intellectuelle.`,
  path: "/mentions-legales",
  keywords: ["mentions légales", "droits d'auteur", "propriété intellectuelle"],
});

export default function MentionsLegalesPage() {
  return (
    <LegalPageLayout title="Mentions légales" updatedAt="24 juillet 2026">
      <LegalSection title="1. Éditeur du site">
        <p>
          Le site <strong className="text-white">{siteConfig.domain}</strong> est édité par{" "}
          <strong className="text-white">{siteConfig.name}</strong>, personne physique,{" "}
          {siteConfig.title.toLowerCase()}, situé en {siteConfig.location}.
        </p>
        <p>
          Pour toute question, utilisez uniquement le{" "}
          <Link href="/#contact" className="text-[var(--color-accent)] hover:underline">
            formulaire de contact
          </Link>{" "}
          du site. Aucune adresse e-mail n&apos;est publiée.
        </p>
      </LegalSection>

      <LegalSection title="2. Directeur de la publication">
        <p>
          Le directeur de la publication est <strong className="text-white">{siteConfig.name}</strong>.
        </p>
      </LegalSection>

      <LegalSection title="3. Hébergement">
        <p>
          Le site est hébergé via <strong className="text-white">GitHub Pages</strong> (GitHub, Inc.),
          88 Colin P. Kelly Jr Street, San Francisco, CA 94107, États-Unis.
        </p>
        <p>
          Site de l&apos;hébergeur :{" "}
          <a
            href="https://pages.github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            pages.github.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="4. Propriété intellectuelle">
        <p>
          L&apos;ensemble du contenu de ce site (textes, photographies, graphismes, logos, icônes,
          mise en page, code source et éléments multimédias) est protégé par le droit d&apos;auteur
          et, le cas échéant, par d&apos;autres droits de propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, transmission ou
          exploitation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce
          soit, est interdite sans autorisation écrite préalable de {siteConfig.name}, sauf
          exceptions légales.
        </p>
        <p>
          Les photographies présentées peuvent comporter un filigrane. Leur usage commercial ou
          public hors du cadre de ce portfolio est interdit sans accord.
        </p>
      </LegalSection>

      <LegalSection title="5. Projets tiers et marques">
        <p>
          Les noms de projets, marques, logos et captures éventuellement cités ou illustrés
          appartiennent à leurs détenteurs respectifs. Leur mention n&apos;implique aucune affiliation
          non autorisée.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitation de responsabilité">
        <p>
          Les informations publiées le sont à titre indicatif. {siteConfig.name} s&apos;efforce
          d&apos;assurer l&apos;exactitude des contenus, sans garantie d&apos;exhaustivité. L&apos;éditeur
          ne saurait être tenu responsable des dommages liés à l&apos;utilisation du site ou à
          l&apos;impossibilité d&apos;y accéder.
        </p>
        <p>
          Les liens vers GitHub, GitLab, LinkedIn, Instagram ou d&apos;autres plateformes pointent vers
          les profils officiels de {siteConfig.name}. Ces services restent régis par leurs propres
          conditions d&apos;utilisation ; l&apos;éditeur n&apos;est pas responsable du fonctionnement,
          de la disponibilité ou des contenus publiés par des tiers sur ces plateformes.
        </p>
      </LegalSection>

      <LegalSection title="7. Données personnelles">
        <p>
          Le traitement des données collectées via le formulaire de contact est décrit dans la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="text-[var(--color-accent)] hover:underline"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
