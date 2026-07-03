"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import { CvDownloadButton } from "@/components/ui/CvDownloadButton";
import { siteConfig } from "@/lib/data";

const highlights = ["Développement web", "Design UI/UX", "Photographie", "Projets 3D"];

function CvDocumentPreview() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-primary) 0%, var(--color-accent) 45%, transparent 70%)",
        }}
      />
      <div className="glass relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-[0_24px_80px_rgba(8,5,26,0.55)]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-accent)]/20 ring-1 ring-white/15">
            <FileText className="h-6 w-6 text-[var(--color-accent)]" strokeWidth={2} />
          </div>
          <span className="rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            1 page
          </span>
        </div>

        <div className="mb-4 space-y-2">
          <div className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] opacity-80" />
          <div className="h-2 w-1/2 rounded-full bg-white/20" />
        </div>

        <div className="space-y-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-4">
          {["Expériences & projets", "Compétences techniques", "Formation & outils"].map(
            (line) => (
              <div key={line} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-sky)]" />
                <span className="text-sm text-[var(--color-text-muted)]">{line}</span>
              </div>
            )
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-white/10" />
          <div className="h-1.5 w-12 rounded-full bg-[var(--color-primary)]/50" />
          <div className="h-1.5 w-8 rounded-full bg-[var(--color-accent)]/40" />
        </div>
      </div>
    </div>
  );
}

export function CvPageView() {
  return (
    <>
      <section
        className="relative overflow-x-clip px-4 pt-24 pb-16 sm:px-6 sm:pt-28 md:pt-32"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>

          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 mx-auto w-full max-w-[280px] sm:max-w-sm md:order-1 md:mx-0 md:max-w-none"
            >
              <CvDocumentPreview />
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="order-1 flex flex-col items-center text-center md:order-2 md:items-start md:text-left"
            >
              <span className="mb-4 inline-block rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Curriculum vitae
              </span>

              <h1 className="hero-name mb-3 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
                {siteConfig.name}
              </h1>

              <p className="font-display mb-4 text-lg text-white/90 sm:text-xl lg:text-2xl">
                {siteConfig.title}
              </p>

              <p className="mb-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] md:max-w-none lg:text-lg">
                Un CV synthétique d&apos;une page pour découvrir mon parcours en
                développement, design et photographie.
              </p>

              <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-secondary)]/30 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm text-[var(--color-text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-md md:max-w-none lg:flex-row lg:items-center">
                <CvDownloadButton variant="primary" />
                <Link
                  href="/#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-[var(--color-primary)]/40 hover:bg-white/5 md:w-auto"
                >
                  Me contacter
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-px px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="glass rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/15 ring-1 ring-[var(--color-primary)]/30">
                <Download className="h-5 w-5 text-[var(--color-sky)]" />
              </div>
              <div>
                <h2 className="mb-1 text-lg font-semibold text-white">Fichier PDF</h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Téléchargement direct · {siteConfig.cv.filename}
                </p>
              </div>
            </div>

            <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-sm text-[var(--color-text-muted)] transition-colors hover:text-white sm:break-normal"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <span className="text-sm text-[var(--color-text-muted)]">
                  {siteConfig.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
