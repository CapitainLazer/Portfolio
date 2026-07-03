"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMotionHidden } from "@/hooks/useMotionInitial";
import { Code2, Palette, Camera, ArrowUpRight } from "lucide-react";
import { SectionHeading, GlassCard } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { siteConfig } from "@/lib/data";
import { competencePages } from "@/lib/themes";

const ExpertiseOrb3D = dynamic(() => import("@/components/three/ExpertiseOrb3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20" />
    </div>
  ),
});

const expertise = [
  {
    icon: Code2,
    title: competencePages.dev.label,
    path: competencePages.dev.path,
    description: competencePages.dev.description,
    color: "from-[var(--color-primary)]/20 to-[var(--color-primary)]/5",
    iconColor: "text-[var(--color-sky)]",
    iconRing: "bg-[var(--color-primary)]/20 ring-[var(--color-primary)]/50",
  },
  {
    icon: Palette,
    title: competencePages.design.label,
    path: competencePages.design.path,
    description: competencePages.design.description,
    color: "from-[var(--color-accent)]/20 to-[var(--color-accent)]/5",
    iconColor: "text-[var(--color-accent)]",
    iconRing: "bg-[var(--color-accent)]/15 ring-[var(--color-accent)]/45",
  },
  {
    icon: Camera,
    title: competencePages.photo.label,
    path: competencePages.photo.path,
    description: competencePages.photo.description,
    color: "from-[#38bdf8]/20 to-[#10b981]/5",
    iconColor: "text-[#38bdf8]",
    iconRing: "bg-[#38bdf8]/15 ring-[#10b981]/40",
  },
];

export function About() {
  const motionFromLeft = useMotionHidden({ opacity: 0, x: -30 });
  const motionFromRight = useMotionHidden({ opacity: 0, x: 30 });

  return (
    <section id="apropos" className="section-px px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="À propos"
          title="Trois passions, une vision"
          description="Je mêle code, design et image pour créer des projets qui ont du sens et de l'impact."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={motionFromLeft}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="relative mb-8 hidden min-h-[400px] w-full overflow-visible lg:block">
              <div className="glass absolute inset-0 rounded-2xl" />
              <div className="relative h-[400px] w-full overflow-visible">
                <ExpertiseOrb3D />
              </div>
            </div>

            <p className="mb-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
              Bonjour, je suis{" "}
              <span className="font-semibold text-white">{siteConfig.name}</span>. Étudiant et
              créatif passionné, je combine développement front-end, design d&apos;interface et
              photographie pour donner forme à des projets variés.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-muted)]">
              Mon univers visuel s&apos;inspire d&apos;esthétiques futuristes — dégradés bleu, violet
              et rose, typographie expressive — pour créer des expériences à la fois modernes et
              personnelles.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Next.js", "Figma", "Lightroom", "TypeScript", "UI/UX", "Three.js"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-text-muted)]"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <div className="grid gap-4">
            {expertise.map((item, i) => (
              <motion.div
                key={item.title}
                initial={motionFromRight}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={item.path} className="block">
                  <Tilt3D intensity={6}>
                    <GlassCard className={`bg-gradient-to-br ${item.color} group`}>
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${item.iconRing}`}
                        >
                          <item.icon className={`h-6 w-6 ${item.iconColor}`} strokeWidth={2.25} />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold tracking-tight text-white">
                              {item.title}
                            </h3>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
                          </div>
                          <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </Tilt3D>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
