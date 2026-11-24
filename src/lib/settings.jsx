import React, { createContext, useContext } from "react";
import { coreStack, profile } from "../data/profile";

// Built-in content. The admin center (/admin) saves overrides; any field left blank there uses these.
export const DEFAULT_HERO = {
  badgeLabel: "Now",
  badgeText: `Building Innov8 Idea Management at ${profile.company}`,
  headlineLine1: "I build products",
  headlineLine2: "that live inside",
  headlineHighlight: "SharePoint.",
  intro: `I'm ${profile.first}. My work moved from single web parts to full applications: staged review workflows, a CMS for non-technical admins and a configurable awards platform.`,
  primaryCta: "Explore the work",
  resumeLabel: "Resume",
  available: profile.available,
  role: profile.role,
  location: `${profile.location}, India`,
  coreStack,
};

export const DEFAULT_SETTINGS = {
  showScreenshots: false,
  hero: DEFAULT_HERO,
};

/** Saved settings on top of the defaults; blank or missing fields keep the default. */
export function mergeSettings(saved) {
  const s = saved && typeof saved === "object" ? saved : {};
  const hero = { ...DEFAULT_HERO };
  for (const [key, value] of Object.entries(s.hero || {})) {
    if (!(key in DEFAULT_HERO)) continue;
    if (key === "coreStack") {
      if (Array.isArray(value) && value.length) hero.coreStack = value.map(String);
    } else if (typeof value === "string" && value.trim()) {
      hero[key] = value;
    }
  }
  return {
    showScreenshots: typeof s.showScreenshots === "boolean" ? s.showScreenshots : DEFAULT_SETTINGS.showScreenshots,
    hero,
  };
}

const CACHE_KEY = "pf:settings";

const readCache = () => {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
};

export const cacheSettings = (saved) => {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(saved || {}));
  } catch {
    /* storage can be unavailable (private mode); the site still works */
  }
};

/** Fetches the saved settings. Resolves with undefined if the API is unreachable (e.g. `npm run dev`). */
export async function fetchSavedSettings(timeoutMs = 4000) {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : undefined;
  const timer = setTimeout(() => controller?.abort(), timeoutMs);
  try {
    const response = await fetch("/api/settings", { signal: controller?.signal, headers: { Accept: "application/json" } });
    if (!response.ok || !String(response.headers.get("content-type")).includes("application/json")) return undefined;
    const data = await response.json();
    cacheSettings(data);
    return data;
  } catch {
    return undefined;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Settings to start the page with, so visitors don't see the built-in text flash and then change.
 * Repeat visitors start instantly from the last copy; first-time visitors wait briefly for the API.
 * `refresh` resolves with fresher settings when the cached copy was used.
 */
export async function initialSettings(firstVisitWaitMs = 1200) {
  const cached = readCache();
  const request = fetchSavedSettings();
  if (cached) return { settings: mergeSettings(cached), refresh: request.then((s) => (s ? mergeSettings(s) : undefined)) };

  const first = await Promise.race([request, new Promise((resolve) => setTimeout(() => resolve("timeout"), firstVisitWaitMs))]);
  if (first === "timeout") return { settings: DEFAULT_SETTINGS, refresh: request.then((s) => (s ? mergeSettings(s) : undefined)) };
  return { settings: mergeSettings(first), refresh: Promise.resolve(undefined) };
}

export const SettingsContext = createContext({ settings: DEFAULT_SETTINGS, setSettings: () => {} });
export const useSettings = () => useContext(SettingsContext);
export const useShowScreenshots = () => useSettings().settings.showScreenshots;
