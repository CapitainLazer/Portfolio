"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, CheckCircle, MessageSquare, Loader2, AlertCircle } from "lucide-react";
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
  mail: MessageSquare,
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

const MIN_SUBMIT_MS = 2800;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const mountedAt = useRef(0);
  const motionFromLeft = useMotionHidden({ opacity: 0, x: -24 });
  const motionFromRight = useMotionHidden({ opacity: 0, x: 24 });

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot : les bots remplissent souvent ce champ caché
    if (String(data.get("company_website") ?? "").trim() !== "") {
      setStatus("success");
      form.reset();
      return;
    }

    // Délai minimum : soumission trop rapide = bot probable
    if (Date.now() - mountedAt.current < MIN_SUBMIT_MS) {
      setStatus("error");
      setErrorMessage("Merci de patienter une seconde avant d'envoyer.");
      return;
    }

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Formulaire non configuré. Ajoute NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (voir README)."
      );
      return;
    }

    setStatus("loading");

    try {
      const payload = {
        access_key: accessKey,
        name: String(data.get("name") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        subject: String(data.get("subject") ?? "").trim(),
        message: String(data.get("message") ?? "").trim(),
        from_name: siteConfig.name,
        replyto: String(data.get("email") ?? "").trim(),
        botcheck: "",
      };

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Envoi impossible");
      }

      setStatus("success");
      form.reset();
      mountedAt.current = Date.now();
    } catch {
      setStatus("error");
      setErrorMessage("L'envoi a échoué. Réessaie dans un instant.");
    }
  };

  return (
    <section id="contact" className="section-px px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Travaillons ensemble"
          description="Un projet en tête ? Une collaboration ? Écris-moi via le formulaire."
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
                <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <MessageSquare className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <p className="text-sm leading-relaxed">
                    Envoie-moi un message via le formulaire — je te répondrai rapidement.
                  </p>
                </div>
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
                      target="_blank"
                      rel="noopener noreferrer"
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
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="mb-4 h-12 w-12 text-[var(--color-accent)]" />
                  <p className="font-display text-xl font-bold text-white">Message envoyé !</p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Je te répondrai dans les plus brefs délais.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-[var(--color-accent)] underline-offset-2 hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-5">
                  {/* Honeypot : hors écran, hors tabulation, hors autofill */}
                  <input
                    type="text"
                    name="company_website"
                    defaultValue=""
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-0 top-0 -z-10 h-px w-px opacity-0"
                    style={{
                      position: "absolute",
                      left: "-10000px",
                      top: "auto",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-sm text-[var(--color-text-muted)]">
                        Nom
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Votre nom"
                        className="form-field w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-[var(--color-primary)]/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-2 block text-sm text-[var(--color-text-muted)]">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        autoComplete="email"
                        placeholder="votre@email.com"
                        className="form-field w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-[var(--color-primary)]/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="mb-2 block text-sm text-[var(--color-text-muted)]">
                      Sujet
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      maxLength={200}
                      autoComplete="off"
                      placeholder="De quoi souhaitez-vous parler ?"
                      className="form-field w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-[var(--color-primary)]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-2 block text-sm text-[var(--color-text-muted)]">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      maxLength={5000}
                      autoComplete="off"
                      placeholder="Décrivez votre projet..."
                      className="form-field w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-[var(--color-primary)]/50"
                    />
                  </div>

                  {status === "error" && errorMessage && (
                    <p className="flex items-start gap-2 text-sm text-rose-300" role="alert">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mx-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        Envoi…
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Envoyer
                        <Send className="h-4 w-4" />
                      </>
                    )}
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
