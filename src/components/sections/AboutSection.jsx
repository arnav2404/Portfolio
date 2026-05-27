import React from "react";
import { Layers, ShieldCheck, Workflow } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

const focusCards = [
  {
    icon: Layers,
    title: "Modern UI Systems",
    text: "Reusable layouts, responsive cards, clean navigation, and polished SharePoint-facing interfaces.",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    text: "Power Automate flows, approval handling, provisioning support, and process-focused Microsoft 365 solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Governance Mindset",
    text: "Permissions, metadata, content structure, rollout quality, and maintainable implementation patterns.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <SectionHeading
          eyebrow="About Me"
          title="Developer focused on real SharePoint business solutions"
          subtitle="I work on intranets, custom SPFx components, Power Automate-driven workflows, reusable services, and well-structured UI systems. My recent work centers on Tawasol, a modern intranet revamp, along with multilingual news experiences and internal business solutions built on Microsoft 365."
        />

        <div className="reveal-up grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" style={{ transitionDelay: "120ms" }}>
          {focusCards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]"
            >
              <div className="w-fit rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
