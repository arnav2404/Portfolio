import React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function GalleryViewer({
  viewer,
  activeSection,
  activeImages,
  activeImageSrc,
  onClose,
  onPrev,
  onNext,
}) {
  if (!viewer || !activeImageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#081220] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/40 p-2 text-white transition hover:bg-black/60"
          aria-label="Close image viewer"
        >
          <X className="h-5 w-5" />
        </button>

        {activeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-3 text-white transition hover:bg-black/60"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onNext}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-3 text-white transition hover:bg-black/60"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex items-center justify-center bg-black">
            <img
              src={activeImageSrc}
              alt={activeSection.title}
              className="max-h-[80vh] w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center p-6 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Gallery Viewer
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white">{activeSection.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{activeSection.note}</p>

            {activeImages.length > 1 && (
              <p className="mt-4 text-sm text-slate-400">
                Image {viewer.imageIndex + 1} of {activeImages.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}