import { Download } from "lucide-react";
import { siteConfig } from "@/lib/data";

type CvDownloadButtonProps = {
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-white animate-gradient shadow-[0_0_30px_rgba(62,63,240,0.35)] hover:shadow-[0_0_50px_rgba(255,0,229,0.35)]",
  outline:
    "border border-white/15 text-white backdrop-blur-sm hover:border-[var(--color-primary)]/40 hover:bg-white/5",
  ghost:
    "border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-white hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-primary)]/20",
};

export function CvDownloadButton({
  variant = "outline",
  className = "",
}: CvDownloadButtonProps) {
  return (
    <a
      href={siteConfig.cv.href}
      download={siteConfig.cv.filename}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all sm:w-auto ${variants[variant]} ${className}`}
    >
      <Download className="h-4 w-4" />
      Télécharger mon CV
    </a>
  );
}
