"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/30 via-[var(--color-secondary)]/40 to-[var(--color-accent)]/20 p-1.5 shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_45%,transparent)] ring-1 ring-white/20 transition-all duration-300 group-hover:shadow-[0_0_32px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]">
            <Image
              src="/images/planetary-logo.png"
              alt="Logo planétaire"
              width={40}
              height={40}
              className="h-full w-full object-contain brightness-125 contrast-110 drop-shadow-[0_0_6px_var(--color-sky)]"
            />
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
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

        <Link
          href="/#contact"
          className="hidden rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:block"
        >
          Me contacter
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-white md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden border-t border-white/5 md:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-4 py-3 transition-colors hover:bg-white/5 hover:text-white ${
                      isActive(link.href) ? "text-white" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Me contacter
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
