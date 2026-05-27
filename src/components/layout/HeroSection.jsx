import React from "react";
import { ArrowRight, Download, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { careerStartDate, featuredProject } from "../../data/portfolioData";
import { getFriendlyExperience } from "../../utils/experience";
import { scrollToSection } from "../../utils/scroll";

export default function HeroSection({ profile, onViewProjects }) {
  const hasPhone = Boolean(profile.phone?.trim());
  const [isPhoneVisible, setIsPhoneVisible] = React.useState(false);
  const today = new Date();

  const quickStats = [
    { label: "Years Experience", value: getFriendlyExperience(careerStartDate, today) },
    { label: "Current Focus", value: "SharePoint Online & SPFx" },
    { label: "Core Stack", value: "M365 + React" },
  ];

  const maskedPhone = "**********";

  const handleRevealPhone = () => {
    setIsPhoneVisible((prev) => !prev);
  };

  const handleViewProjects = () => {
    if (onViewProjects) {
      onViewProjects();
      return;
    }

    scrollToSection("tawasol");
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-24">
      <div className="flex min-w-0 flex-col justify-center reveal-up">
        <div className="relative mb-5 inline-flex w-fit max-w-full overflow-hidden rounded-full p-[1.5px] shadow-[0_0_18px_rgba(34,211,238,0.18)]">
          <div className="absolute inset-0 rounded-full border border-cyan-300/40 bg-cyan-400/20" />
          <div className="badge-ray absolute inset-y-0 left-[-30%] w-24" />
          <div className="relative inline-flex min-w-0 items-center gap-2 rounded-full bg-[#07111f]/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100 sm:px-4 sm:text-xs sm:tracking-[0.24em]">
            <Sparkles className="h-4 w-4 flex-none" />
            <span className="truncate">SharePoint • SPFx • M365</span>
          </div>
        </div>

        <h2 className="max-w-4xl text-balance text-[2.35rem] font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
          Building polished <span className="text-cyan-300">digital workplaces</span> and modern{" "}
          <span className="text-cyan-300">Microsoft 365</span> experiences.
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
          {profile.subtitle}
        </p>

        <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
          <button
            type="button"
            onClick={handleViewProjects}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:scale-[1.02] active:scale-[0.99] sm:w-auto sm:text-base"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href={profile.resumeUrl}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:bg-white/10 active:scale-[0.99] sm:w-auto sm:text-base"
          >
            Download Resume <Download className="h-4 w-4" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:bg-white/10 active:scale-[0.99] sm:w-auto sm:text-base"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:mt-10 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
          <div className="inline-flex min-w-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
            <MapPin className="h-4 w-4 flex-none text-cyan-300" />
            <span className="min-w-0 truncate">{profile.location}</span>
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-w-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:text-white sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
          >
            <Mail className="h-4 w-4 flex-none text-cyan-300" />
            <span className="xs-break-all min-w-0 truncate sm:max-w-none">{profile.email}</span>
          </a>

          {hasPhone && (
            <button
              type="button"
              onClick={handleRevealPhone}
              className="inline-flex min-w-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left transition hover:text-white sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
            >
              <Phone className="h-4 w-4 flex-none text-cyan-300" />
              <span className="min-w-0 truncate">{isPhoneVisible ? profile.phone : maskedPhone}</span>
            </button>
          )}
        </div>
      </div>

      <div className="group relative min-w-0 reveal-up" style={{ transitionDelay: "120ms" }}>
        <div className="absolute -inset-3 rounded-[34px] bg-cyan-400/10 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-cyan-400/5 p-4 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] sm:rounded-[32px] sm:p-6">
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative rounded-[24px] border border-white/10 bg-[#0b1728]/95 p-4 transition duration-500 group-hover:border-cyan-400/20 sm:rounded-[28px] sm:p-6">
            <p className="text-sm font-medium text-slate-400">Quick Snapshot</p>
            <h3 className="mt-1 text-balance text-2xl font-bold text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              Current portfolio focus
            </h3>

            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-base font-semibold leading-snug text-white sm:text-lg">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-400/15 hover:shadow-[0_0_28px_rgba(34,211,238,0.12)] sm:mt-6 sm:p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300 sm:text-sm sm:tracking-[0.2em]">
                Featured Project
              </p>
              <h4 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                {featuredProject.title}
              </h4>
              <p className="mt-2 text-sm leading-7 text-slate-200">{featuredProject.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
