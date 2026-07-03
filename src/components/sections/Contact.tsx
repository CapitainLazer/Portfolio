"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import { useMotionHidden } from "@/hooks/useMotionInitial";
import { SectionHeading, GlassCard } from "@/components/ui/SectionHeading";
import {
  GitHubIcon,
  GitLabIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/components/ui/BrandIcons";
import { siteConfig, socialLinks } from "@/lib/data";
import type { SocialLink } from "@/lib/types";

const iconMap = {
  github: GitHubIcon,
  gitlab: GitLabIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  dribbble: GitLabIcon,
  behance: GitLabIcon,
  mail: Mail,
};

const hoverStyles: Record<SocialLink["icon"], string> = {
  github: "hover:border-white/25 hover:text-white",
  gitlab: "hover:border-[#fc6d26]/50 hover:text-[#fc6d26]",
  linkedin: "hover:border-[#0a66c2]/50 hover:text-[#0a66c2]",
  instagram: "hover:border-[#e1306c]/50 hover:text-[#e1306c]",
  dribbble: "hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]",
  behance: "hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]",
  mail: "hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]",
};

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const motionFromLeft = useMotionHidden({ opacity: 0, x: -24 });
  const motionFromRight = useMotionHidden({ opacity: 0, x: 24 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section-px px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Travaillons ensemble"
          description="Un projet en tête ? Une collaboration ? N'hésitez pas à me contacter."
          align="center"
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <motion.div
            initial={motionFromLeft}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <GlassCard hover={false} className="h-full">
              <h3 className="font-display mb-6 text-2xl font-bold text-white">
                Restons en contact
              </h3>

              <div className="mb-8 space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex min-w-0 items-center gap-3 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <Mail className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <span className="break-all text-sm sm:break-normal">{siteConfig.email}</span>
                </a>
                <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10">
                    <MapPin className="h-5 w-5 text-[var(--color-secondary)]" />
                  </div>
                  {siteConfig.location}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.icon === "mail" ? undefined : "_blank"}
                      rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                      aria-label={link.label}
                      title={link.label}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--color-text-muted)] transition-all ${hoverStyles[link.icon]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={motionFromRight}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <GlassCard hover={false}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="mb-4 h-12 w-12 text-[var(--color-accent)]" />
                  <p className="font-display text-xl font-bold text-white">Message envoyé !</p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm text-[var(--color-text-muted)]">
                        Nom
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Votre nom"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-[var(--color-primary)]/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm text-[var(--color-text-muted)]">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="votre@email.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-[var(--color-primary)]/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm text-[var(--color-text-muted)]">
                      Sujet
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      placeholder="De quoi souhaitez-vous parler ?"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-[var(--color-primary)]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm text-[var(--color-text-muted)]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Décrivez votre projet..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-[var(--color-primary)]/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Envoyer
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
