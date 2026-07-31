"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Compass, Home } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useThemeOverride } from "@/components/layout/ThemeScope";
import { NotFoundStarfield } from "@/components/not-found/NotFoundStarfield";

const PlanetaryLogo3D = dynamic(() => import("@/components/three/PlanetaryLogo3D"), {
  ssr: false,
  loading: () => null,
});

const exploreLinks = navLinks.filter((link) => link.href !== "/#contact");

export function NotFoundView() {
  useThemeOverride("notfound");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
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
    <>
      <NotFoundStarfield />

      <section className="relative flex min-h-[75dvh] items-center justify-center overflow-x-clip px-4 py-28 sm:px-6 sm:py-32">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          {/* Planète décalée à droite — la carte reste centrée */}
          {show3d && (
            <div
              className="pointer-events-none absolute -right-4 top-1/2 z-0 hidden h-[420px] w-[420px] -translate-y-[55%] sm:block md:-right-8 md:h-[480px] md:w-[480px] lg:-right-2 lg:h-[520px] lg:w-[520px] xl:right-0"
              aria-hidden
            >
              <PlanetaryLogo3D
                mouse={mouse}
                scale={1.15}
                variant="compact"
                palette="ember"
                showSparkles={false}
                className="h-full w-full"
              />
            </div>
          )}

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <div className="relative isolate overflow-hidden rounded-3xl border border-red-400/30 bg-[rgba(42,16,22,0.7)] p-8 shadow-[inset_0_0_80px_rgba(239,68,68,0.16),inset_0_-24px_48px_rgba(249,115,22,0.1)] backdrop-blur-md sm:bg-[rgba(48,18,26,0.58)] sm:p-10 md:p-12">
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-36 w-36 rounded-full bg-orange-500/30 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-rose-500/28 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/55 to-transparent"
                aria-hidden
              />

              <div className="relative text-center">
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-red-500/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-orange-200">
                  <Compass className="h-3.5 w-3.5" />
                  Erreur 404
                </p>

                <h1 className="font-display mb-3 bg-gradient-to-br from-orange-100 via-rose-300 to-red-500 bg-clip-text text-[clamp(4.5rem,18vw,7rem)] leading-none tracking-tight text-transparent">
                  404
                </h1>

                <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Page introuvable
                </h2>
                <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                  Cette adresse n&apos;existe pas — ou plus. Le reste du portfolio,
                  lui, est toujours là.
                </p>

                <div className="mb-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-rose-500 px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <Home className="h-4 w-4" />
                    Retour à l&apos;accueil
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-orange-300/50 hover:bg-white/10"
                  >
                    Me contacter
                  </Link>
                </div>

                <nav aria-label="Raccourcis">
                  <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm text-white/60">
                    {exploreLinks.map((link, index) => (
                      <li key={link.href} className="flex items-center">
                        {index > 0 && (
                          <span className="mx-2.5 text-white/25" aria-hidden>
                            ·
                          </span>
                        )}
                        <Link
                          href={link.href}
                          className="transition-colors hover:text-orange-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Reprendre la navigation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
