"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { getThemeForPath, themeToCssVars } from "@/lib/themes";
import { GradientBackground } from "@/components/ui/GradientBackground";

export function ThemeScope({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = getThemeForPath(pathname);

  return (
    <div
      data-theme={theme.id}
      style={themeToCssVars(theme) as CSSProperties}
      className="relative min-h-full"
    >
      <GradientBackground orb1={theme.orb1} orb2={theme.orb2} orb3={theme.orb3} />
      {children}
    </div>
  );
}
