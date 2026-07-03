"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface PhotoLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export function PhotoLightbox({ src, alt, open, onClose }: PhotoLightboxProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fichier WebP direct — évite le cache Next/Image qui gardait l'ancien filigrane */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-auto max-h-[85vh] w-full object-contain"
            />
            {alt && (
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center font-display text-xl text-white">
                {alt}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
