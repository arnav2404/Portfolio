import React from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({ show, onClick }) {
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 rounded-full border border-cyan-400/20 bg-cyan-400 p-3 text-slate-950 shadow-lg transition hover:scale-105"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}