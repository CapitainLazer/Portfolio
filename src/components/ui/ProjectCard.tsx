"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionHidden, useIsMobileExperience } from "@/hooks/useMotionInitial";
import { ArrowUpRight, Code2, Camera, Palette } from "lucide-react";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { PhotoZoomTrigger } from "@/components/ui/PhotoZoomTrigger";
import type { Project } from "@/lib/types";

const categoryConfig = {
  dev: { icon: Code2, label: "Développement", color: "text-[var(--color-primary)]" },
  design: { icon: Palette, label: "Design", color: "text-[var(--color-accent)]" },
  photo: { icon: Camera, label: "Photographie", color: "text-[var(--color-secondary)]" },
};

const MAX_VISIBLE_TAGS = 3;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { icon: Icon, label, color } = categoryConfig[project.category];
  const isGithubOg = project.image.includes("opengraph.githubassets.com");
  const isPhoto = project.category === "photo";
  const motionInitial = useMotionHidden({ opacity: 0, y: 32 });
  const isMobile = useIsMobileExperience();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const extraTags = project.tags.length - visibleTags.length;

  const imageBlock = (
    <>
      <Image
        src={project.image}
        alt={project.title}
        fill
        unoptimized={isGithubOg || isPhoto}
        className={`transition-transform duration-700 group-hover:scale-105 ${
          isGithubOg
            ? "object-cover object-left-top"
            : "object-cover object-center"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />
      {project.featured && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[var(--color-accent)]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          Featured
        </span>
      )}
    </>
  );

  return (
    <motion.div
      initial={motionInitial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
      style={{ perspective: isMobile ? undefined : "1200px" }}
    >
      <Tilt3D intensity={8} className="h-full">
        <article className="group glass flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(77,166,255,0.15)]">
          <div
            className="relative aspect-[16/10] w-full shrink-0 overflow-hidden"
            style={{ transform: "translateZ(20px)" }}
          >
            {isPhoto ? (
              <PhotoZoomTrigger
                onZoom={() => setLightboxOpen(true)}
                className="absolute inset-0 h-full w-full"
              >
                <div className="relative h-full w-full">{imageBlock}</div>
              </PhotoZoomTrigger>
            ) : (
              imageBlock
            )}
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Icon className={`h-4 w-4 shrink-0 ${color}`} />
              <span className={`text-xs font-medium uppercase tracking-wider ${color}`}>
                {label}
              </span>
              <span className="ml-auto text-xs text-[var(--color-text-muted)]">
                {project.year}
              </span>
            </div>

            <h3 className="font-display mb-2 line-clamp-2 min-h-[2.75rem] text-xl font-bold leading-snug text-white transition-colors group-hover:text-[var(--color-primary)]">
              {project.title}
            </h3>

            <p className="mb-4 line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-[var(--color-text-muted)]">
              {project.description}
            </p>

            <div className="mb-5 flex min-h-[2rem] flex-wrap content-start gap-2">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-[var(--color-text-muted)]"
                >
                  {tag}
                </span>
              ))}
              {extraTags > 0 && (
                <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-[var(--color-text-muted)]">
                  +{extraTags}
                </span>
              )}
            </div>

            <div className="mt-auto min-h-[1.5rem]">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-white"
                >
                  Voir le projet
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : null}
            </div>
          </div>
        </article>
      </Tilt3D>

      {isPhoto && (
        <PhotoLightbox
          src={project.image}
          alt={project.title}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </motion.div>
  );
}
