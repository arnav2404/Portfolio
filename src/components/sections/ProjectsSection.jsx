import React from "react";
import { projects } from "../../data/portfolioData";
import ProjectCard from "../cards/ProjectCard";
import SectionHeading from "../common/SectionHeading";

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Project cards"
        subtitle="A quick-scan view of selected work. The CorpDMS card is written as a stronger technical case study, while the other cards keep a clean summary format for fast reading."
      />

      <div className="mt-8 grid items-start gap-5 sm:mt-10 xl:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} delay={index * 90} />
        ))}
      </div>
    </section>
  );
}
