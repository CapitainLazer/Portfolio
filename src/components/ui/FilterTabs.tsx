"use client";

import type { ProjectCategory } from "@/lib/types";

interface FilterTabsProps {
  active: ProjectCategory | "all";
  onChange: (category: ProjectCategory | "all") => void;
}

const tabs: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "dev", label: "Dev" },
  { id: "design", label: "Design" },
  { id: "photo", label: "Photo" },
];

const categoryColors: Record<ProjectCategory | "all", string> = {
  all: "from-[var(--color-primary)] to-[var(--color-secondary)]",
  dev: "from-[var(--color-primary)] to-[#3b82f6]",
  design: "from-[var(--color-accent)] to-[#f472b6]",
  photo: "from-[var(--color-secondary)] to-[#a78bfa]",
};

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
            active === tab.id
              ? "text-white"
              : "text-[var(--color-text-muted)] hover:text-white"
          }`}
        >
          {active === tab.id && (
            <span
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${categoryColors[tab.id]} opacity-90`}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
