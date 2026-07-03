"use client";

import { ZoomIn } from "lucide-react";

interface PhotoZoomTriggerProps {
  onZoom: () => void;
  className?: string;
  children: React.ReactNode;
}

export function PhotoZoomTrigger({ onZoom, className = "", children }: PhotoZoomTriggerProps) {
  return (
    <button
      type="button"
      onClick={onZoom}
      className={`group relative isolate block w-full overflow-hidden ${className}`}
      aria-label="Agrandir la photo"
    >
      {children}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 opacity-90 shadow-lg backdrop-blur-sm ring-1 ring-white/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/55">
          <ZoomIn className="h-5 w-5 text-white" />
        </div>
      </div>
    </button>
  );
}
