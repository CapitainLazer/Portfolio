"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { usePathname } from "next/navigation";
import {
  getThemeForPath,
  themeToCssVars,
  themes,
  type ThemeId,
} from "@/lib/themes";
import { GradientBackground } from "@/components/ui/GradientBackground";

type ThemeOverrideApi = {
  setOverride: (id: ThemeId | null) => void;
};

const ThemeOverrideContext = createContext<ThemeOverrideApi>({
  setOverride: () => {},
});

/** Applique un thème (orbes + CSS vars) le temps d'une page, sans changer l'URL. */
export function useThemeOverride(themeId: ThemeId | null) {
  const { setOverride } = useContext(ThemeOverrideContext);

  useEffect(() => {
    setOverride(themeId);
    return () => setOverride(null);
  }, [setOverride, themeId]);
}

export function ThemeScope({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [override, setOverrideState] = useState<ThemeId | null>(null);

  const setOverride = useCallback((id: ThemeId | null) => {
    setOverrideState(id);
  }, []);

  const theme = override ? themes[override] : getThemeForPath(pathname);
  const api = useMemo(() => ({ setOverride }), [setOverride]);

  return (
    <ThemeOverrideContext.Provider value={api}>
      <div
        data-theme={theme.id}
        style={themeToCssVars(theme) as CSSProperties}
        className="relative min-h-full"
      >
        <GradientBackground orb1={theme.orb1} orb2={theme.orb2} orb3={theme.orb3} />
        {children}
      </div>
    </ThemeOverrideContext.Provider>
  );
}
