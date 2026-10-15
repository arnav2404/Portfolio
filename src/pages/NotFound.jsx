import React from "react";
import { Link } from "../lib/router";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-start justify-center px-4 pt-24 sm:px-6">
      <p className="font-mono text-sm text-accent-text">404 · item not found in list</p>
      <h1 className="mt-4 font-display text-6xl font-extrabold tracking-tight">This page didn't make it through review.</h1>
      <p className="mt-4 text-lg text-ink-2">The link may be old. The work is still here.</p>
      <Link to="/" className="mt-8 rounded-xl bg-accent px-5 py-3 font-semibold text-accent-ink">
        Back to home
      </Link>
    </section>
  );
}
