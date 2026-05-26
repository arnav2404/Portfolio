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
        subtitle="Browse real project screens. CorpDMS is placed first so visitors can immediately see the Quick Search, Advanced Search, results grid, archive, document details, history, linked documents, lists, and report areas connected to the case study above."
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