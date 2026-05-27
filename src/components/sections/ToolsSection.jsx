import React from "react";
import SectionHeading from "../common/SectionHeading";
import ToolCard from "../cards/ToolCard";
import { tools } from "../../data/toolsData";

export default function ToolsSection() {
  return (
    <section id="tools" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading
        eyebrow="Tools"
        title="Tools & platforms I use"
        subtitle="Technologies and platforms I actively work with to build scalable, modern, and high-quality Microsoft 365 solutions."
      />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
        {tools.map((tool, index) => (
          <ToolCard key={tool.name} tool={tool} delay={index * 50} />
        ))}
      </div>
    </section>
  );
}
