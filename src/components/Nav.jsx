import React, { useContext, useEffect, useState } from "react";
import { Command, Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { UIContext } from "../App";
import { Link, usePath } from "../lib/router";
import { profile } from "../data/profile";

export const modKey =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘K" : "Ctrl K";

export const navLinks = [
  { id: "work", label: "Work" },
  { id: "thinking", label: "Thinking" },
  { id: "screens", label: "Screens" },
  { id: "stack", label: "Stack" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-ink font-display text-[14px] font-extrabold tracking-tight text-bg">
        AD
        <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:inline">{profile.name}</span>
    </span>
  );
}

export default function Nav() {
  const { theme, toggleTheme, openPalette } = useContext(UIContext);
  const path = usePath();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const isHome = path === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return setActive("");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 transition-all duration-500 sm:px-4 ${
          scrolled || open
            ? "border-line bg-bg/75 shadow-[var(--shadow)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link to="/" aria-label="Home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <Link
                to={`/#${l.id}`}
                className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === l.id ? "text-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                {l.label}
                {active === l.id && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent-text" />}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-xl border border-line px-2.5 py-1.5 text-xs text-ink-3 transition hover:border-line-strong hover:text-ink md:inline-flex"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Quick jump</span>
            <span className="kbd">{modKey}</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="grid h-9 w-9 place-items-center rounded-xl border border-line text-ink-2 transition hover:border-line-strong hover:text-ink"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 rounded-xl bg-ink px-3.5 py-2 text-sm font-semibold text-bg transition hover:opacity-90 sm:inline-flex"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl border border-line lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fade-in mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-bg/95 p-3 shadow-[var(--shadow)] backdrop-blur-xl lg:hidden">
          <ul className="grid gap-1">
            {navLinks.map((l, i) => (
              <li key={l.id} className="rise" style={{ "--d": `${i * 35}ms` }}>
                <Link
                  to={`/#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg font-semibold hover:bg-surface-2"
                >
                  {l.label}
                  <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-semibold text-accent-ink"
          >
            Download resume <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
