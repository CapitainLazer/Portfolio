"use client";

import { MotionConfig } from "framer-motion";
import { useIsMobileExperience } from "@/hooks/useMotionInitial";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobileExperience();

  return (
    <MotionConfig
      reducedMotion={isMobile ? "always" : "user"}
      transition={{ duration: isMobile ? 0 : 0.5 }}
    >
      {children}
    </MotionConfig>
  );
}
