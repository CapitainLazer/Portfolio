"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { withBasePath } from "@/lib/paths";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const headerSurface =
    mobileOpen
      ? "border-b border-[var(--color-primary)]/25 bg-[#0a0718]/98 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      : scrolled
        ? "glass border-b border-white/5 py-3"
        : "bg-transparent py-5";

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            aria-label="Fermer le menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${headerSurface}`}
      >
        <nav className="mx-auto flex max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/30 via-[var(--color-secondary)]/40 to-[var(--color-accent)]/20 p-1.5 shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_45%,transparent)] ring-1 ring-white/20 transition-all duration-300 group-hover:shadow-[0_0_32px_color-mix(in_srgb,var(--color-accent)_40%,transparent)] sm:h-11 sm:w-11">
              <Image
                src={withBasePath("/images/planetary-logo.png")}
                alt="Logo planétaire"
                width={40}
                height={40}
                className="h-full w-full object-contain brightness-125 contrast-110 drop-shadow-[0_0_6px_var(--color-sky)]"
              />
            </div>
            <span className="truncate text-sm font-semibold tracking-tight text-white">
              {siteConfig.name.split(" ")[0]}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/5 hover:text-white ${
                    isActive(link.href)
                      ? "bg-white/5 text-white"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`shrink-0 rounded-xl p-2.5 transition-colors md:hidden ${
              mobileOpen
                ? "bg-[var(--color-primary)]/20 text-white ring-1 ring-[var(--color-primary)]/40"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="border-t border-[var(--color-primary)]/20 bg-[#0a0718] md:hidden"
            >
              <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                          active
                            ? "border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/15 text-white"
                            : "text-white/85 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
