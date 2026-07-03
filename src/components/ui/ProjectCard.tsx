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

  const imageBlock = (
    <>
      <Image
        src={project.image}
        alt={project.title}
        fill
        unoptimized={isGithubOg || isPhoto}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />
      {project.featured && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-[var(--color-accent)]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
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
      style={{ perspective: isMobile ? undefined : "1200px" }}
    >
      <Tilt3D intensity={8}>
        <article className="group glass overflow-hidden rounded-2xl transition-all duration-500 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(77,166,255,0.15)]">
          <div className="relative aspect-[16/10] overflow-hidden" style={{ transform: "translateZ(20px)" }}>
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

          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className={`text-xs font-medium uppercase tracking-wider ${color}`}>
                {label}
              </span>
              <span className="ml-auto text-xs text-[var(--color-text-muted)]">
                {project.year}
              </span>
            </div>

            <h3 className="font-display mb-2 text-xl font-bold text-white transition-colors group-hover:text-[var(--color-primary)]">
              {project.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {project.description}
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-[var(--color-text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-white"
              >
                Voir le projet
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
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
