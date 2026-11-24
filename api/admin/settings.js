// Signed-in only: read and save the site settings.
import { allowMethods, fromAdminPage, readBody, sendJson } from "../_lib/http.js";
import { isAuthenticated } from "../_lib/auth.js";
import { readSettings, storeConfigured, writeSettings } from "../_lib/store.js";
import { sanitizeSettings } from "../_lib/settings.js";

export default async function handler(req, res) {
  if (!allowMethods(req, res, ["GET", "PUT"])) return;
  if (!isAuthenticated(req)) return sendJson(res, 401, { error: "signed_out" });
  if (!storeConfigured()) return sendJson(res, 503, { error: "store_not_configured" });

  try {
    if (req.method === "GET") return sendJson(res, 200, sanitizeSettings(await readSettings()));

    if (!fromAdminPage(req, res)) return;
    const settings = sanitizeSettings(await readBody(req));
    await writeSettings(settings);
    sendJson(res, 200, settings);
  } catch {
    sendJson(res, 500, { error: "server_error" });
  }
}
