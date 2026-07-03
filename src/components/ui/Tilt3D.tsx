"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useIsMobileExperience } from "@/hooks/useMotionInitial";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Tilt3D({ children, className = "", intensity = 10 }: Tilt3DProps) {
  const isMobile = useIsMobileExperience();
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative z-[1]">{children}</div>
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
