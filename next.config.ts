import type { NextConfig } from "next";

/**
 * GitHub Pages :
 * - Domaine perso (recommandé) → laisser NEXT_PUBLIC_BASE_PATH vide
 * - URL projet github.io/repo → NEXT_PUBLIC_BASE_PATH=/nom-du-repo
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  // Autorise l'accès au serveur de dev depuis le téléphone / réseau local
  allowedDevOrigins: [
    "192.168.1.5",
    "192.168.1.*",
    "192.168.0.*",
    "10.0.0.*",
  ],
  images: {
    // Requis pour l'export statique (pas d'optimiseur Image côté serveur)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },
};

export default nextConfig;
