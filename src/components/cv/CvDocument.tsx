import {
  Briefcase,
  GraduationCap,
  Languages,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  cvCertifications,
  cvEducation,
  cvExperiences,
  cvInterests,
  cvLanguages,
  cvProfile,
  cvSkillGroups,
  cvSummary,
} from "@/lib/cv";

function CvBlockTitle({
  icon: Icon,
  children,
}: {
  icon: typeof Briefcase;
  children: React.ReactNode;
}) {
  return (
    <h2 className="cv-block-title mb-2.5 flex items-center gap-1.5 border-b border-[var(--color-primary)]/25 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-sky)]">
      <Icon className="cv-block-icon h-3.5 w-3.5 shrink-0" />
      {children}
    </h2>
  );
}

export function CvDocument() {
  return (
    <article id="cv-document" className="cv-document">
      <header className="cv-header">
        <div className="cv-header-bg" aria-hidden />
        <div className="cv-header-inner">
          <p className="cv-kicker">Curriculum vitae · 1 page</p>
          <div className="cv-header-top">
            <div>
              <h1 className="cv-name font-display italic">{cvProfile.name}</h1>
              <p className="cv-title">{cvProfile.title}</p>
              <p className="cv-subtitle">{cvProfile.subtitle}</p>
            </div>
          </div>
          <p className="cv-summary">{cvSummary}</p>
          <ul className="cv-contact">
            <li>
              <a href={`tel:${cvProfile.phone.replace(/\s/g, "")}`}>{cvProfile.phone}</a>
            </li>
            <li aria-hidden>·</li>
            <li>
              <a href={`mailto:${cvProfile.email}`}>{cvProfile.email}</a>
            </li>
            <li aria-hidden>·</li>
            <li>
              <a href={cvProfile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                {cvProfile.linkedin}
              </a>
            </li>
            <li aria-hidden>·</li>
            <li>{cvProfile.location}</li>
          </ul>
        </div>
      </header>

      <div className="cv-body">
        <aside className="cv-sidebar">
          <section className="cv-section">
            <CvBlockTitle icon={Wrench}>Compétences</CvBlockTitle>
            <div className="cv-skills space-y-2.5">
              {cvSkillGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="cv-skill-label">{group.label}</h3>
                  <p className="cv-skill-list">{group.skills.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <CvBlockTitle icon={Sparkles}>Certification</CvBlockTitle>
            {cvCertifications.map((cert) => (
              <div key={cert.name} className="cv-cert">
                <p className="cv-cert-name">
                  {cert.name} — <span className="cv-accent">{cert.level}</span>
                </p>
                {cert.scores && (
                  <ul className="cv-toeic-scores">
                    {cert.scores.map((score) => (
                      <li key={score.label}>
                        <span className="cv-strong">{score.label}</span>
                        <span className="cv-muted"> — {score.level}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="cv-muted">{cert.detail}</p>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <CvBlockTitle icon={Languages}>Langues</CvBlockTitle>
            <ul className="cv-lang-list">
              {cvLanguages.map((lang) => (
                <li key={lang.name}>
                  <span className="cv-strong">{lang.name}</span>
                  <span className="cv-muted"> — {lang.level}</span>
                  {lang.note && <span className="cv-note"> ({lang.note})</span>}
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-section">
            <CvBlockTitle icon={Sparkles}>Centres d&apos;intérêt</CvBlockTitle>
            <p className="cv-muted">{cvInterests.join(" · ")}</p>
          </section>
        </aside>

        <div className="cv-main">
          <section className="cv-section">
            <CvBlockTitle icon={Briefcase}>Expériences professionnelles</CvBlockTitle>
            <ul className="cv-exp-list">
              {cvExperiences.map((exp) => (
                <li key={`${exp.company}-${exp.period}`} className="cv-entry">
                  <div className="cv-entry-head">
                    <h3 className="cv-entry-company">{exp.company}</h3>
                    <span className="cv-date">{exp.period}</span>
                  </div>
                  <p className="cv-entry-role">
                    {exp.role}
                    {exp.project && <span className="cv-project"> · {exp.project}</span>}
                    {exp.location && <span className="cv-muted"> — {exp.location}</span>}
                  </p>
                  <ul className="cv-bullets">
                    {exp.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-section">
            <CvBlockTitle icon={GraduationCap}>Formations</CvBlockTitle>
            <ul className="cv-edu-list">
              {cvEducation.map((edu) => (
                <li key={`${edu.school}-${edu.period}`} className="cv-edu-item">
                  <div className="cv-entry-head">
                    <h3 className="cv-entry-company">{edu.title}</h3>
                    <span className="cv-date">{edu.period}</span>
                  </div>
                  <p className="cv-muted">{edu.school}</p>
                  {edu.detail && <p className="cv-note">{edu.detail}</p>}
                  {edu.items && (
                    <ul className="cv-bullets cv-bullets-compact">
                      {edu.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
