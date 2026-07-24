"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CvDocument } from "@/components/cv/CvDocument";
import { CvExportActions } from "@/components/cv/CvExportActions";
import { siteConfig } from "@/lib/data";

export function CvPageView() {
  return (
    <>
      <section
        className="no-print relative overflow-x-clip px-4 pt-24 pb-10 sm:px-6 sm:pt-28 md:pt-32"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Curriculum vitae
            </span>
            <h1 className="hero-name mb-3 text-3xl sm:text-4xl lg:text-5xl">{siteConfig.name}</h1>
            <p className="mb-4 text-lg text-white/90">
              CV d&apos;une page — aux couleurs du portfolio, exportable en PDF.
            </p>
            <CvExportActions className="mb-4" />
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              Me contacter
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-px cv-print-area px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-4xl">
          <CvDocument />
        </div>
      </section>
    </>
  );
}
