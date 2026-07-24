"use client";

import { Download, Printer } from "lucide-react";

export function CvExportActions({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(62,63,240,0.35)] transition-all hover:shadow-[0_0_50px_rgba(255,0,229,0.35)] sm:w-auto"
      >
        <Printer className="h-4 w-4" />
        Exporter en PDF
      </button>
      <p className="flex items-center justify-center gap-2 text-xs text-[var(--color-text-muted)] sm:justify-start">
        <Download className="h-3.5 w-3.5" />
        Choisis « Enregistrer en PDF » dans la fenêtre d&apos;impression
      </p>
    </div>
  );
}
