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
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-0 backdrop-blur-sm sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeSection.title} gallery viewer`}
    >
      <div
        className="relative flex h-[100dvh] w-full max-w-6xl flex-col overflow-hidden bg-[#081220] shadow-2xl sm:h-auto sm:max-h-[92vh] sm:rounded-[28px] sm:border sm:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-3 p-3 sm:p-4">
          <div className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {activeImages.length > 1
              ? `${viewer.imageIndex + 1} / ${activeImages.length}`
              : "Preview"}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-black/45 p-2 text-white backdrop-blur transition hover:bg-black/65"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {activeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-3 text-white backdrop-blur transition hover:bg-black/65 sm:left-4"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-3 text-white backdrop-blur transition hover:bg-black/65 sm:right-4"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="flex min-h-0 items-center justify-center bg-black pt-14 lg:pt-0">
            <img
              src={activeImageSrc}
              alt={activeSection.title}
              className="max-h-[64dvh] w-full object-contain sm:max-h-[72vh] lg:max-h-[88vh]"
            />
          </div>

          <div className="scrollbar-thin min-h-0 overflow-y-auto border-t border-white/10 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300 sm:text-sm sm:tracking-[0.24em]">
              Gallery Viewer
            </p>
            <h3 className="mt-3 text-balance text-xl font-bold text-white sm:text-2xl">
              {activeSection.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{activeSection.note}</p>

            {activeImages.length > 1 && (
              <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                Swipe-style controls are available with the left and right buttons. Current image: {viewer.imageIndex + 1} of {activeImages.length}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
