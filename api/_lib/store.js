// Tiny Upstash Redis client over its REST API (no extra packages).
// Vercel's Upstash integration adds these environment variables to the project automatically;
// both naming styles are accepted.
const url = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const token = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

export const storeConfigured = () => Boolean(url() && token());

/** Runs one Redis command, e.g. redis("SET", "key", "value"). Returns the command's result. */
export async function redis(...command) {
  if (!storeConfigured()) throw new Error("STORE_NOT_CONFIGURED");
  const response = await fetch(url(), {
    method: "POST",
    headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) throw new Error(data.error || `Redis request failed (${response.status})`);
  return data.result;
}

const SETTINGS_KEY = "portfolio:settings";

export async function readSettings() {
  const raw = await redis("GET", SETTINGS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export const writeSettings = (settings) => redis("SET", SETTINGS_KEY, JSON.stringify(settings));
