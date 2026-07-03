"use client";

import dynamic from "next/dynamic";

const PlanetaryLogo3D = dynamic(() => import("@/components/three/PlanetaryLogo3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20" />
    </div>
  ),
});

function ExpertiseOrb3D() {
  return (
    <div className="h-full w-full overflow-visible">
      <PlanetaryLogo3D
        mouse={{ x: 0, y: 0 }}
        scale={1.05}
        variant="compact"
        className="h-full w-full"
      />
    </div>
  );
}

export default ExpertiseOrb3D;
