import React from "react";
import { tawasolGallery } from "../../data/tawasolGallery";
import GalleryCard from "../cards/GalleryCard";
import SectionHeading from "../common/SectionHeading";

export default function GallerySection({ onOpenViewer }) {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Gallery"
        title="Project gallery"
        subtitle="Explore a selection of real Tawasol screens covering homepage experiences, search, notifications, forms, policies, and informational modules."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tawasolGallery.map((item, index) => (
          <GalleryCard
            key={item.title}
            title={item.title}
            note={item.note}
            images={item.images}
            onClick={() => onOpenViewer(index)}
            delay={index * 70}
          />
        ))}
      </div>
    </section>
  );
}