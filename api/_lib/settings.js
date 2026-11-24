// The only settings the admin center may save. Anything else sent to the API is dropped.
// Text is stored as plain text; React escapes it when the site renders it.

const HERO_FIELDS = {
  badgeLabel: 24,
  badgeText: 140,
  headlineLine1: 60,
  headlineLine2: 60,
  headlineHighlight: 40,
  intro: 600,
  primaryCta: 40,
  resumeLabel: 40,
  available: 140,
  role: 80,
  location: 80,
};
const MAX_STACK_ITEMS = 10;
const MAX_STACK_ITEM_LENGTH = 40;

const cleanText = (value, max) =>
  typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Keeps known fields only. Blank hero fields are left out, so the site uses its built-in text for them. */
export function sanitizeSettings(input) {
  const source = input && typeof input === "object" ? input : {};
  const out = {};

  if (typeof source.showScreenshots === "boolean") out.showScreenshots = source.showScreenshots;

  const heroIn = source.hero && typeof source.hero === "object" ? source.hero : {};
  const hero = {};
  for (const [key, max] of Object.entries(HERO_FIELDS)) {
    const value = cleanText(heroIn[key], max);
    if (value) hero[key] = value;
  }
  if (Array.isArray(heroIn.coreStack)) {
    const stack = heroIn.coreStack.map((item) => cleanText(item, MAX_STACK_ITEM_LENGTH)).filter(Boolean).slice(0, MAX_STACK_ITEMS);
    if (stack.length) hero.coreStack = stack;
  }
  if (Object.keys(hero).length) out.hero = hero;

  return out;
}
