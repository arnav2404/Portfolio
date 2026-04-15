import React from "react";
import SectionHeading from "../common/SectionHeading";
import ToolCard from "../cards/ToolCard";
import { tools } from "../../data/toolsData";

export default function ToolsSection() {
  return (
    <section id="tools" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Tools"
        title="Tools & Platforms I Use"
        subtitle="Technologies and platforms I actively work with to build scalable, modern, and high-quality solutions."
      />

      <div className="mt-10 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {tools.map((tool, index) => (
          <ToolCard key={tool.name} tool={tool} delay={index * 50} />
        ))}
      </div>
    </section>
  );
}