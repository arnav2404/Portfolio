import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Linkedin, Phone } from "lucide-react";
import { profile } from "../data/profile";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="bg-grid mask-fade-b absolute inset-0" />
      <div aria-hidden className="absolute -bottom-40 left-1/2 h-[480px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 md:py-40">
        <p className="reveal mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-ink-3">
          <span className="text-accent-text">07</span>
          <span className="h-px w-8 bg-line-strong" /> Contact
        </p>
        <h2 className="reveal max-w-4xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          Got a SharePoint problem that deserves a <span className="text-gradient">real product?</span>
        </h2>
        <p className="reveal mt-6 max-w-xl text-lg text-ink-2">
          {profile.available}. Send a note with the problem and I will happily talk it through.
        </p>

        <div className="reveal mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 break-all font-display text-2xl font-bold tracking-tight underline decoration-line-strong decoration-2 underline-offset-8 transition hover:decoration-accent-text sm:text-4xl"
          >
            {profile.email}
            <ArrowUpRight className="h-6 w-6 flex-none transition group-hover:rotate-45 group-hover:text-accent-text" />
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm font-semibold transition hover:bg-surface"
            aria-live="polite"
          >
            {copied ? <Check className="h-4 w-4 text-accent-text" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="reveal mt-10 flex flex-wrap gap-3">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-bg transition hover:opacity-90">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/60 px-5 py-3 font-semibold backdrop-blur transition hover:bg-surface-2">
            <FileText className="h-4 w-4" /> Resume (PDF)
          </a>
          {showPhone ? (
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/60 px-5 py-3 font-semibold backdrop-blur">
              <Phone className="h-4 w-4" /> {profile.phone}
            </a>
          ) : (
            <button type="button" onClick={() => setShowPhone(true)} className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/60 px-5 py-3 font-semibold backdrop-blur transition hover:bg-surface-2">
              <Phone className="h-4 w-4" /> Show phone
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
