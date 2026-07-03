"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { CompetencePage } from "@/lib/themes";
import type { Project, Skill } from "@/lib/types";

interface CompetencePageViewProps {
  page: CompetencePage;
  projects: Project[];
  skills: Skill[];
}

export function CompetencePageView({ page, projects, skills }: CompetencePageViewProps) {
  return (
    <>
      <section
        className="relative overflow-x-clip px-6 pt-28 pb-16 md:pt-32"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
              {page.label}
            </span>
            <h1 className="hero-name mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {page.title}
            </h1>
            <p className="font-display mb-4 text-xl text-white/90 md:text-2xl">
              {page.subtitle}
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]">
              {page.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {page.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-secondary)]/30 px-4 py-2 text-sm text-[var(--color-text-muted)]"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="Projets"
            title={`Réalisations ${page.label.toLowerCase()}`}
            description={`${projects.length} projet${projects.length > 1 ? "s" : ""} sélectionné${projects.length > 1 ? "s" : ""}.`}
          />
          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-[var(--color-text-muted)]">Projets à venir.</p>
          )}
        </div>
      </section>

      {page.category === "photo" && projects.length > 0 && (
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              label="Galerie"
              title="Sélection visuelle"
              align="center"
            />
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            label="Compétences"
            title="Outils & maîtrise"
            align="center"
          />
          <div className="glass rounded-2xl p-8">
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">{skill.name}</span>
                    <span className="font-medium text-white">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-[var(--color-primary)]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-4 text-sm font-semibold text-white"
            >
              Me contacter
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#projets"
              className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-[var(--color-primary)]/40"
            >
              Tous les projets
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
