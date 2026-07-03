"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getHomeProjectsPreview, projects } from "@/lib/data";
import type { ProjectCategory } from "@/lib/types";

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return getHomeProjectsPreview();
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="projets" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Projets"
          title="Sélection de réalisations"
          description={
            filter === "all"
              ? "Un aperçu de mon travail — 2 projets par domaine. Filtrez ou explorez chaque page pour voir l'ensemble."
              : "Un aperçu de mon travail en développement, design et photographie."
          }
        />

        <div className="mb-10">
          <FilterTabs active={filter} onChange={setFilter} />
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filter === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/dev"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
            >
              Tous les projets dev
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <span className="hidden text-white/20 sm:inline">·</span>
            <Link
              href="/design"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              Tous les projets design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <span className="hidden text-white/20 sm:inline">·</span>
            <Link
              href="/photo"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[#38bdf8]"
            >
              Toutes les photos
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
