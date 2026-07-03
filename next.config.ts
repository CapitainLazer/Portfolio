import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise l'accès au serveur de dev depuis le téléphone / réseau local
  allowedDevOrigins: [
    "192.168.1.5",
    "192.168.1.*",
    "192.168.0.*",
    "10.0.0.*",
  ],
  images: {
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
