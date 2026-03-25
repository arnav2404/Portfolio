import React from "react";
import { ImageIcon } from "lucide-react";

export default function GalleryCard({ title, note, images = [], onClick, delay = 0 }) {
  const previewImage = images[0];
  const hasImages = images.length > 0;

  return (
    <div className="reveal-up" style={{ transitionDelay: `${delay}ms` }}>
      <button
        type="button"
        onClick={() => hasImages && onClick?.()}
        className={`w-full overflow-hidden rounded-[24px] rounded-t-[15px] border border-white/10 bg-white/5 text-left transition-all duration-500 ease-out ${
          hasImages
            ? "cursor-pointer hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]"
            : "cursor-default"
        }`}
      >
        {hasImages ? (
          <div className="relative">
            <img src={previewImage} alt={title} className="h-56 w-full object-cover" />
            {images.length > 1 && (
              <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold text-white">
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

        <div className="border-t border-white/10 p-4">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-xs text-slate-400">
            {hasImages
              ? images.length > 1
                ? "Click to browse images"
                : "Click to view full image"
              : "Add image path to enable preview"}
          </p>
        </div>
      </button>
    </div>
  );
}