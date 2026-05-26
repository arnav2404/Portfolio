import React from "react";
import { ArrowLeft } from "lucide-react";
import FeaturedSection from "../sections/FeaturedSection";
import CorpDmsCaseStudySection from "../sections/CorpDmsCaseStudySection";
import GallerySection from "../sections/GallerySection";
import ProjectsSection from "../sections/ProjectsSection";
import SectionHeading from "../common/SectionHeading";

export default function ProjectsPage({ onOpenViewer, onNavigateHome }) {
  return (
    <div id="projects-page">
      <section className="mx-auto max-w-7xl px-6 pb-4 pt-16 lg:px-8 lg:pt-20">
        <div className="reveal-up">
          <button
            type="button"
            onClick={onNavigateHome}
            className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>

        <SectionHeading
          eyebrow="Projects"
          title="Selected SharePoint & Microsoft 365 work"
          subtitle="A dedicated project page for featured client delivery, detailed case studies, gallery screens, and selected project cards. I placed the CorpDMS story first because it shows both business ownership and technical problem-solving depth."
        />
      </section>

      <CorpDmsCaseStudySection />
      <FeaturedSection />
      <GallerySection onOpenViewer={onOpenViewer} />
      <ProjectsSection />
    </div>
  );
}
