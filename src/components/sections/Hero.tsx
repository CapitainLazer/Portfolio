"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Sparkles } from "lucide-react";
import { CvDownloadButton } from "@/components/ui/CvDownloadButton";
import { siteConfig, stats } from "@/lib/data";

const PlanetaryLogo3D = dynamic(() => import("@/components/three/PlanetaryLogo3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20" />
    </div>
  ),
});

export function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  // false par défaut : évite un flash 3D + marge négative sur mobile
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync3d = () => setShow3d(mq.matches);
    sync3d();
    mq.addEventListener("change", sync3d);

    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mq.removeEventListener("change", sync3d);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="accueil"
      className="relative flex flex-col items-center justify-start overflow-x-clip px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:min-h-[100dvh] md:pb-20 md:pt-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center md:mt-4">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-2 rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-secondary)]/30 px-4 py-2 text-sm text-[var(--color-text-muted)] backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
          Portfolio · {siteConfig.location}
        </motion.div>

        {show3d && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mt-2 -mb-24 hidden h-[min(85vw,640px)] w-[min(98vw,920px)] max-w-none overflow-visible sm:block md:-mb-28"
          >
            <PlanetaryLogo3D
              mouse={mouse}
              scale={1.35}
              variant="hero"
              className="h-full w-full"
            />
          </motion.div>
        )}

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-name relative z-10 mb-3 max-w-[min(100%,22ch)] px-1 text-4xl sm:max-w-none sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display mb-4 text-base tracking-wide text-white/90 sm:text-lg md:text-xl"
        >
          {siteConfig.title}
        </motion.p>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-6 max-w-2xl px-1 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base md:text-lg"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <a
            href="#projets"
            className="w-full rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] px-8 py-4 text-center text-sm font-semibold text-white animate-gradient shadow-[0_0_30px_rgba(62,63,240,0.35)] transition-shadow hover:shadow-[0_0_50px_rgba(255,0,229,0.35)] sm:w-auto"
          >
            Voir mes projets
          </a>
          <CvDownloadButton variant="outline" />
          <a
            href="#contact"
            className="w-full rounded-full border border-white/15 px-8 py-4 text-center text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-[var(--color-primary)]/40 hover:bg-white/5 sm:w-auto"
          >
            Me contacter
          </a>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid w-full max-w-lg grid-cols-3 gap-3 sm:gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-gradient sm:text-3xl md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] leading-snug text-[var(--color-text-muted)] sm:text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#apropos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-10 text-[var(--color-text-muted)] transition-colors hover:text-white md:absolute md:bottom-6 md:left-1/2 md:mt-0 md:-translate-x-1/2"
        aria-label="Défiler vers le bas"
      >
        <ArrowDown className="mx-auto h-6 w-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
