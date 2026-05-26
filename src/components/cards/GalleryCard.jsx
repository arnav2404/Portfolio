import React from "react";
import { ImageIcon } from "lucide-react";

const galleryHover =
  "transform-gpu will-change-transform transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]";

export default function GalleryCard({ title, note, images = [], onClick, delay = 0 }) {
  const previewImage = images[0];
  const hasImages = images.length > 0;

  return (
    <div className="reveal-up h-full" style={{ transitionDelay: `${delay}ms` }}>
      <button
        type="button"
        onClick={() => hasImages && onClick?.()}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/5 text-left ${
          hasImages ? `cursor-pointer ${galleryHover}` : "cursor-default"
        }`}
      >
        {hasImages ? (
          <div className="relative h-56 w-full overflow-hidden bg-slate-950/60">
            <img
              src={previewImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-70" />
            {images.length > 1 && (
              <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {images.length} Images
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-cyan-400/10 via-slate-900 to-blue-500/10">
            <div className="px-6 text-center">
              <div className="mx-auto w-fit rounded-2xl bg-white/10 p-3 text-cyan-300">
                <ImageIcon className="h-8 w-8" />
              </div>
              <p className="mt-4 text-base font-semibold text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{note}</p>
            </div>
          </div>
        )}

        <div className="flex min-h-[176px] flex-1 flex-col border-t border-white/10 p-4">
          <p className="text-base font-semibold text-white">{title}</p>
          <p className="mt-2 overflow-hidden text-sm leading-6 text-slate-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {note}
          </p>
          <p className="mt-auto pt-5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300 transition-all duration-500 group-hover:tracking-[0.18em] group-hover:text-cyan-200">
            {hasImages
              ? images.length > 1
                ? "Click to browse screens"
                : "Click to view full screen"
              : "Add image path to enable preview"}
          </p>
        </div>
      </button>
    </div>
  );
}
