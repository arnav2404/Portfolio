// Public: the saved site settings every visitor's browser loads. Read-only.
import { allowMethods, sendJson } from "./_lib/http.js";
import { readSettings, storeConfigured } from "./_lib/store.js";
import { sanitizeSettings } from "./_lib/settings.js";

export default async function handler(req, res) {
  if (!allowMethods(req, res, ["GET"])) return;
  if (!storeConfigured()) return sendJson(res, 200, {}, "public, max-age=60");
  try {
    // Short edge cache: a save shows up for visitors within a few seconds.
    sendJson(res, 200, sanitizeSettings(await readSettings()), "public, s-maxage=5, stale-while-revalidate=30");
  } catch {
    sendJson(res, 200, {}, "no-store"); // the site falls back to its built-in content
  }
}
