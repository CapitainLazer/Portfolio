"use client";

import { useEffect, useState } from "react";

type Star = {
  id: number;
  left: string;
  top: string;
  size: string;
  opacity: string;
  delay: string;
  duration: string;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function buildStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(seededRandom(i * 3 + 1) * 100).toFixed(4)}%`,
    top: `${(seededRandom(i * 3 + 2) * 100).toFixed(4)}%`,
    size: `${(seededRandom(i * 3 + 3) * 2.2 + 1).toFixed(2)}px`,
    opacity: (seededRandom(i * 7) * 0.45 + 0.35).toFixed(4),
    delay: `${(seededRandom(i * 11) * 5).toFixed(4)}s`,
    duration: `${(seededRandom(i * 13) * 3 + 2.5).toFixed(4)}s`,
  }));
}

export function NotFoundStarfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(buildStars(110));
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="notfound-starfield pointer-events-none fixed inset-0 z-[1]" aria-hidden>
      {stars.map((star) => (
        <span
          key={star.id}
          className="notfound-star absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}
