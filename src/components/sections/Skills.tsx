"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/lib/data";

const categoryLabels = {
  dev: { label: "Développement", color: "bg-[var(--color-primary)]" },
  design: { label: "Design", color: "bg-[var(--color-accent)]" },
  photo: { label: "Photographie", color: "bg-[var(--color-secondary)]" },
  tools: { label: "Outils", color: "bg-[var(--color-sky)]" },
};

export function Skills() {
  const grouped = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Compétences"
          title="Stack & outils"
          description="Les technologies et outils que j'utilise au quotidien."
          align="center"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {Object.entries(grouped).map(([category, items], groupIndex) => {
            const config = categoryLabels[category as keyof typeof categoryLabels];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="font-display mb-6 text-lg font-bold text-white">
                  {config.label}
                </h3>
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">{skill.name}</span>
                        <span className="font-medium text-white">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className={`h-full rounded-full ${config.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
