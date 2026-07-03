import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold text-white">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {siteConfig.title}
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-6">
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

        <p className="text-sm text-[var(--color-text-muted)]">
          © {year} {siteConfig.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
