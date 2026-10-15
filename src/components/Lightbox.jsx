import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ state, onChange }) {
  const touch = useRef(null);
  const group = state?.group;
  const index = state?.index ?? 0;
  const total = group?.images.length ?? 0;

  useEffect(() => {
    if (!group) return undefined;
    const go = (d) => onChange((s) => s && { ...s, index: (s.index + d + total) % total });
    const onKey = (e) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [group, total, onChange]);

  if (!group) return null;
  const img = group.images[index];
  const go = (d) => onChange({ group, index: (index + d + total) % total });

  return (
    <div
      className="fade-in fixed inset-0 z-[80] flex flex-col bg-[#05060a]/95 text-white backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${group.title} screenshots`}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{group.project}</p>
          <p className="truncate font-display text-lg font-semibold">{group.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-white/60">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => onChange(null)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 hover:bg-white/10" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
        <img key={img.src} src={img.src} alt={`${group.title}, screen ${index + 1}`} className="fade-in max-h-full max-w-full rounded-lg object-contain shadow-2xl" />
        {total > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 hover:bg-white/10 sm:left-4" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 hover:bg-white/10 sm:right-4" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="px-4 pb-4 pt-3 sm:px-6">
        <p className="mx-auto mb-3 max-w-3xl text-center text-sm text-white/60">{group.note}</p>
        {total > 1 && (
          <div className="scroll-thin mx-auto flex max-w-4xl gap-2 overflow-x-auto pb-1">
            {group.images.map((im, i) => (
              <button
                type="button"
                key={im.src}
                onClick={() => onChange({ group, index: i })}
                className={`h-12 w-20 flex-none overflow-hidden rounded-md border transition ${i === index ? "border-[#d4ff3f] opacity-100" : "border-white/10 opacity-50 hover:opacity-90"}`}
                aria-label={`Screen ${i + 1}`}
              >
                <img src={im.thumb} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
