"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-14 flex flex-col gap-3 ${alignClass}`}
    >
      <span className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
        {label}
      </span>
      <h2 className="text-heading text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-lg text-[var(--color-text-muted)]">{description}</p>
      )}
      <div
        className={`mt-2 h-px w-16 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 transition-all duration-300 ${
        hover ? "hover:border-white/15 hover:bg-white/[0.06]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
