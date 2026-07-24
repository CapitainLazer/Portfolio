import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type LegalPageLayoutProps = {
  title: string;
  updatedAt: string;
  children: ReactNode;
};

export function LegalPageLayout({ title, updatedAt, children }: LegalPageLayoutProps) {
  return (
    <section
      className="section-px px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        <header className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Informations légales
          </p>
          <h1 className="text-heading mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Dernière mise à jour : {updatedAt}
          </p>
        </header>

        <div className="legal-prose space-y-8 text-[var(--color-text-muted)]">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed sm:text-base">{children}</div>
    </section>
  );
}
