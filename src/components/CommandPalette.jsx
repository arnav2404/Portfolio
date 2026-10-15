import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Briefcase, Copy, CornerDownLeft, FileText, Hash, Linkedin, Mail, Moon, Search } from "lucide-react";
import { UIContext } from "../App";
import { navigate } from "../lib/router";
import { navLinks } from "./Nav";
import { work } from "../data/work";
import { profile } from "../data/profile";

export default function CommandPalette({ open, onClose }) {
  const { toggleTheme, theme } = useContext(UIContext);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const items = useMemo(
    () => [
      ...work.map((w) => ({
        group: "Case studies",
        label: w.name,
        hint: w.kicker,
        icon: Briefcase,
        run: () => navigate(`/work/${w.slug}`),
      })),
      ...navLinks.map((l) => ({ group: "Sections", label: l.label, hint: `/#${l.id}`, icon: Hash, run: () => navigate(`/#${l.id}`) })),
      {
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: Copy,
        keep: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setToast("Email copied");
          } catch {
            window.location.href = `mailto:${profile.email}`;
          }
        },
      },
      { group: "Actions", label: "Send an email", hint: "Opens your mail app", icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { group: "Actions", label: "Open resume (PDF)", hint: "New tab", icon: FileText, run: () => window.open(profile.resume, "_blank", "noopener") },
      { group: "Actions", label: "Open LinkedIn", hint: "New tab", icon: Linkedin, run: () => window.open(profile.linkedin, "_blank", "noopener") },
      { group: "Actions", label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`, hint: "Theme", icon: Moon, keep: true, run: toggleTheme },
    ],
    [theme, toggleTheme]
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(s));
  }, [items, q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setToast("");
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${idx}"]`)?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  if (!open) return null;

  const run = (item) => {
    item.run();
    if (!item.keep) onClose();
  };

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[idx]) {
      e.preventDefault();
      run(filtered[idx]);
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <button type="button" aria-label="Close" className="fade-in absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="rise relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[var(--shadow)]" onKeyDown={onKey}>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 text-ink-3" />
          <input
            ref={inputRef}
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to a project, section or action…"
            className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3 focus-visible:outline-none"
            aria-label="Search commands"
          />
          <span className="kbd">Esc</span>
        </div>
        <ul ref={listRef} className="scroll-thin max-h-[55vh] overflow-y-auto p-2" role="listbox">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-ink-3">Nothing matches “{q}”.</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <React.Fragment key={`${item.group}-${item.label}`}>
                {header && <li className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">{header}</li>}
                <li
                  data-i={i}
                  role="option"
                  aria-selected={i === idx}
                  onMouseMove={() => setIdx(i)}
                  onClick={() => run(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${i === idx ? "bg-surface-2" : ""}`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg border border-line ${i === idx ? "text-accent-text" : "text-ink-3"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">{item.label}</span>
                    <span className="block truncate text-xs text-ink-3">{item.hint}</span>
                  </span>
                  {i === idx ? <CornerDownLeft className="h-4 w-4 text-ink-3" /> : <ArrowRight className="h-4 w-4 text-transparent" />}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-ink-3">
          <span>{toast || "↑ ↓ to move · Enter to open"}</span>
          <span className="font-mono">arnav.cmd</span>
        </div>
      </div>
    </div>
  );
}
