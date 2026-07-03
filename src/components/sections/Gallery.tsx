"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMotionHidden } from "@/hooks/useMotionInitial";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { PhotoZoomTrigger } from "@/components/ui/PhotoZoomTrigger";
import { galleryImages } from "@/lib/data";

export function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedImage = galleryImages.find((img) => img.id === selected);
  const motionInitial = useMotionHidden({ opacity: 0, y: 20 });

  return (
    <section id="galerie" className="section-px px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Galerie"
          title="Moments capturés"
          description="Une sélection de 6 photographies favorites — lumière, composition et émotion."
          align="center"
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={motionInitial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4 break-inside-avoid"
              style={{ perspective: "1000px" }}
            >
              <Tilt3D intensity={5}>
                <PhotoZoomTrigger
                  onZoom={() => setSelected(image.id)}
                  className="rounded-2xl"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </PhotoZoomTrigger>
              </Tilt3D>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/photo"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[#38bdf8]"
          >
            Voir toutes les photos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {selectedImage && (
        <PhotoLightbox
          src={selectedImage.src}
          alt={selectedImage.alt}
          open={!!selectedImage}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
