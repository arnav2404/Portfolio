import React from "react";
import { projects } from "../../data/portfolioData";
import ProjectCard from "../cards/ProjectCard";
import SectionHeading from "../common/SectionHeading";

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Additional selected work"
        subtitle="These projects reflect my practical experience in building SharePoint intranets, custom SPFx components, workflow automation, integrations, and scalable Microsoft 365 business solutions."
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} delay={index * 90} />
        ))}
      </div>
    </section>
  );
}