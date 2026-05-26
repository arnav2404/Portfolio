import React from "react";
import {
  ArrowRight,
  Code2,
  Database,
  FileSearch,
  Gauge,
  GitBranch,
  Layers,
  Link2,
  MessageSquareText,
  SearchCheck,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { corpDmsCaseStudy } from "../../data/portfolioData";
import SectionHeading from "../common/SectionHeading";
import { scrollToSection } from "../../utils/scroll";

const iconMap = {
  search: SearchCheck,
  mapping: GitBranch,
  integration: Database,
  people: Users,
  comments: MessageSquareText,
  ui: Layers,
  actions: Link2,
  code: Code2,
  quality: ShieldCheck,
  performance: Gauge,
  tools: Wrench,
};

const smoothHover =
  "transform-gpu will-change-transform transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]";

const mainCard =
  `group h-full rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/10 ${smoothHover}`;

function MetricPill({ item }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 ${smoothHover}`}>
      <p className="text-3xl font-bold text-white">{item.value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{item.label}</p>
    </div>
  );
}

function PillarCard({ item, index }) {
  const Icon = iconMap[item.iconKey] || FileSearch;

  return (
    <div className="reveal-up h-full" style={{ transitionDelay: `${index * 70}ms` }}>
      <div className={`group h-full rounded-[26px] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/10 ${smoothHover}`}>
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/15">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{item.plainText}</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-500 hover:border-cyan-400/20 hover:bg-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Build focus
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-300">{item.technical}</p>
        </div>
      </div>
    </div>
  );
}

function ChangeItem({ item }) {
  const Icon = iconMap[item.iconKey] || Wrench;

  return (
    <div className={`group rounded-3xl border border-white/10 bg-[#07111f]/80 p-5 ${smoothHover}`}>
      <div className="flex items-start gap-4">
        <div className="mt-1 rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-300 transition-all duration-500 group-hover:border-cyan-400/25 group-hover:bg-cyan-400/10">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-white">{item.title}</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
            {item.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CorpDmsCaseStudySection() {
  return (
    <section id="corpdms-case-study" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Project Spotlight"
        title={corpDmsCaseStudy.title}
        subtitle={corpDmsCaseStudy.subtitle}
      />

      <div className="reveal-up mt-10 overflow-hidden rounded-[34px] border border-cyan-300/25 bg-gradient-to-br from-cyan-400/10 via-slate-900/80 to-blue-500/10 p-[1.5px] shadow-[0_0_28px_rgba(34,211,238,0.10)]">
        <div className={`rounded-[32px] bg-[#07111f]/95 p-6 md:p-8 ${smoothHover}`}>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                {corpDmsCaseStudy.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h3 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                {corpDmsCaseStudy.headline}
              </h3>
              <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
                {corpDmsCaseStudy.context}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("gallery")}
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(34,211,238,0.24)]"
                >
                  View CorpDMS screens <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08]"
                >
                  View project card
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {corpDmsCaseStudy.metrics.map((item) => (
                <MetricPill key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {corpDmsCaseStudy.pillars.map((item, index) => (
          <PillarCard key={item.title} item={item} index={index} />
        ))}
      </div>

      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal-up h-full">
          <div className={mainCard}>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Core Technical Decision
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white">
              Centralized normalization helper
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {corpDmsCaseStudy.normalizationHelper.description}
            </p>

            <div className="mt-5 grid gap-3">
              {corpDmsCaseStudy.normalizationHelper.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-300 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06]"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal-up h-full">
          <div className={mainCard}>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Key Work Delivered
            </p>
            <div className="mt-5 grid gap-4">
              {corpDmsCaseStudy.mainChanges.map((item) => (
                <ChangeItem key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
