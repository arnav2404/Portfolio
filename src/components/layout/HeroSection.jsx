import React from "react";
import { ArrowRight, Download, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { careerStartDate, featuredProject } from "../../data/portfolioData";
import { getFriendlyExperience } from "../../utils/experience";
import { scrollToSection } from "../../utils/scroll";

export default function HeroSection({ profile }) {
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

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
      <div className="flex flex-col justify-center reveal-up">
        <div className="relative mb-5 inline-flex w-fit overflow-hidden rounded-full p-[1.5px] shadow-[0_0_18px_rgba(34,211,238,0.18)]">
          <div className="absolute inset-0 rounded-full border border-cyan-300/40 bg-cyan-400/20" />
          <div className="badge-ray absolute inset-y-0 left-[-30%] w-24" />
          <div className="relative inline-flex items-center gap-2 rounded-full bg-[#07111f]/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
            <Sparkles className="h-4 w-4" />
            SharePoint • SPFx • M365
          </div>
        </div>

        <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
          Building polished <span className="text-cyan-300">digital workplaces</span> and modern{" "}
          <span className="text-cyan-300">Microsoft 365</span> experiences.
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          {profile.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => scrollToSection("tawasol")}
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            View Featured Work <ArrowRight className="h-4 w-4" />
          </button>

          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Download Resume <Download className="h-4 w-4" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
          <div className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-300" /> {profile.location}
          </div>

          <div className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-cyan-300" /> {profile.email}
          </div>

          {hasPhone && (
            <button
              type="button"
              onClick={handleRevealPhone}
              className="inline-flex items-center gap-2 text-left transition hover:text-white"
            >
              <Phone className="h-4 w-4 text-cyan-300" />
              {isPhoneVisible ? profile.phone : maskedPhone}
            </button>
          )}
        </div>
      </div>

      <div className="group relative reveal-up" style={{ transitionDelay: "120ms" }}>
        <div className="absolute -inset-3 rounded-[38px] bg-cyan-400/10 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-cyan-400/5 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">
          <div className="rounded-[28px] border border-white/10 bg-[#0b1728] p-6 transition duration-500 group-hover:border-cyan-400/20">
            <p className="text-sm text-slate-400">Quick Snapshot</p>
            <h3 className="mt-1 text-2xl font-bold text-white">Current portfolio focus</h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-400/15 hover:shadow-[0_0_28px_rgba(34,211,238,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Featured Project
              </p>
              <h4 className="mt-2 text-2xl font-semibold text-white">{featuredProject.title}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-200">{featuredProject.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}