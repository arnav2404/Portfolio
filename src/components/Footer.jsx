import React, { useContext } from "react";
import { ArrowUp } from "lucide-react";
import { UIContext } from "../App";
import { profile } from "../data/profile";
import { Logo, modKey } from "./Nav";

export default function Footer() {
  const { openPalette } = useContext(UIContext);
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <p className="text-sm text-ink-3">
            Built with React, Vite & Tailwind. Designed and written by {profile.first}.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button type="button" onClick={openPalette} className="rounded-lg px-3 py-2 text-ink-3 hover:text-ink">
            Press <span className="kbd">{modKey}</span> anywhere
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-ink-2 hover:text-ink"
          >
            Top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
