import React from "react";
import { ArrowRight } from "lucide-react";
import { featuredProject, tawasolHighlights } from "../../data/portfolioData";
import HighlightCard from "../cards/HighlightCard";
import SectionHeading from "../common/SectionHeading";
import { scrollToSection } from "../../utils/scroll";

export default function FeaturedSection() {
  return (
    <section id="tawasol" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading eyebrow="Featured Work" />

      <div className="relative mt-8 overflow-hidden rounded-[26px] p-[1.5px] shadow-[0_0_24px_rgba(34,211,238,0.10)] reveal-up sm:mt-10 sm:rounded-[32px]">
        <div className="absolute inset-0 rounded-[26px] border border-cyan-300/35 bg-gradient-to-br from-cyan-400/10 via-slate-950/70 to-blue-500/10 sm:rounded-[32px]" />
        <div className="featured-border-ray absolute inset-y-0 left-[-18%] w-40" />

        <div className="relative rounded-[25px] bg-[#07111f]/90 p-5 sm:rounded-[31px] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300 sm:text-sm sm:tracking-[0.24em]">
                {featuredProject.duration}
              </p>
              <h3 className="mt-2 text-balance text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {featuredProject.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-200 md:text-base">
                {featuredProject.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("gallery")}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:bg-white/10 sm:w-fit sm:text-base"
            >
              Jump to Gallery <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {featuredProject.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium leading-5 text-slate-100"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 xl:grid-cols-4">
        {tawasolHighlights.map((item, index) => (
          <HighlightCard
            key={item.title}
            iconKey={item.iconKey}
            title={item.title}
            text={item.text}
            delay={index * 90}
          />
        ))}
      </div>
    </section>
  );
}
