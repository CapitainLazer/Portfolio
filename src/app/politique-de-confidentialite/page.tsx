import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/data";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata = createPageMetadata({
  title: "Politique de confidentialité",
  description: `Politique de confidentialité du portfolio de ${siteConfig.name} — données du formulaire de contact et droits RGPD.`,
  path: "/politique-de-confidentialite",
  keywords: ["confidentialité", "RGPD", "données personnelles", "vie privée"],
});

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageLayout title="Politique de confidentialité" updatedAt="24 juillet 2026">
      <LegalSection title="1. Responsable du traitement">
        <p>
          Le responsable du traitement des données est{" "}
          <strong className="text-white">{siteConfig.name}</strong>, éditeur du site{" "}
          {siteConfig.domain}.
        </p>
        <p>
          Pour exercer vos droits ou poser une question relative à vos données, utilisez le{" "}
          <Link href="/#contact" className="text-[var(--color-accent)] hover:underline">
            formulaire de contact
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Données collectées">
        <p>
          Via le formulaire de contact, les données suivantes peuvent être collectées :
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>nom ;</li>
          <li>adresse e-mail (celle que vous renseignez) ;</li>
          <li>sujet et contenu du message.</li>
        </ul>
        <p>
          Aucune adresse e-mail de l&apos;éditeur n&apos;est affichée publiquement sur le site. Les
          messages sont transmis par un service de formulaire sécurisé.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalités et base légale">
        <p>Les données sont utilisées uniquement pour :</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>répondre à votre demande de contact ou de collaboration ;</li>
          <li>assurer le suivi de la conversation engagée.</li>
        </ul>
        <p>
          La base légale est l&apos;intérêt légitime de l&apos;éditeur à répondre aux sollicitations
          (art. 6.1.f du RGPD), et/ou l&apos;exécution de mesures précontractuelles à votre demande
          (art. 6.1.b).
        </p>
      </LegalSection>

      <LegalSection title="4. Destinataires et sous-traitants">
        <p>
          Les messages sont acheminés via <strong className="text-white">Web3Forms</strong>, service
          tiers permettant l&apos;envoi de formulaires depuis un site statique. Web3Forms agit en
          qualité de sous-traitant technique pour l&apos;acheminement des messages.
        </p>
        <p>
          Les données ne sont pas vendues ni cédées à des fins commerciales.
        </p>
      </LegalSection>

      <LegalSection title="5. Durée de conservation">
        <p>
          Les messages et données associées sont conservés le temps nécessaire au traitement de la
          demande, puis au plus tard 12 mois après le dernier échange, sauf obligation légale
          contraire ou besoin de conservation pour la défense d&apos;un droit.
        </p>
      </LegalSection>

      <LegalSection title="6. Sécurité et lutte anti-abus">
        <p>
          Le formulaire intègre des mesures anti-bot (champ honeypot, délai minimum avant envoi) afin
          de limiter les envois automatisés et le spam.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies">
        <p>
          Ce site portfolio ne dépose pas de cookies publicitaires ou de suivi analytique tiers. Des
          cookies ou stockages techniques strictement nécessaires au fonctionnement (par ex. préférences
          du navigateur) peuvent toutefois être utilisés par l&apos;hébergeur ou le navigateur.
        </p>
      </LegalSection>

      <LegalSection title="8. Vos droits">
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit
          d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de
          portabilité, dans les conditions prévues par la loi.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            CNIL
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Mentions légales">
        <p>
          Pour les informations sur l&apos;éditeur et l&apos;hébergement, consultez les{" "}
          <Link href="/mentions-legales" className="text-[var(--color-accent)] hover:underline">
            mentions légales
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
