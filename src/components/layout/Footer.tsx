import Link from "next/link";
import { siteConfig, navLinks, legalLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{siteConfig.title}</p>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-center text-sm text-[var(--color-text-muted)] md:text-right">
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center text-xs text-[var(--color-text-muted)]/80 sm:text-sm">
            {legalLinks.map((link, index) => (
              <li key={link.href} className="flex items-center">
                {index > 0 && <span className="mx-3 text-white/25" aria-hidden>·</span>}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[var(--color-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
