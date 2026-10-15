import { useEffect, useState } from "react";

// Tiny History-API router: clean URLs like /work/innov8, served by the Vercel SPA rewrite.
const listeners = new Set();

export function navigate(to, { replace = false } = {}) {
  const url = new URL(to, window.location.origin);
  const samePage = url.pathname === window.location.pathname;
  if (replace) window.history.replaceState({}, "", url);
  else window.history.pushState({}, "", url);
  listeners.forEach((fn) => fn());

  if (url.hash) {
    const scroll = () => document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    samePage ? scroll() : setTimeout(scroll, 60);
  } else {
    // Same page (e.g. clicking the logo on home) glides to the top; a new page starts at the top.
    window.scrollTo({ top: 0, behavior: samePage ? "smooth" : "instant" });
  }
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);
  return path;
}

export function Link({ to, onClick, children, ...rest }) {
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
