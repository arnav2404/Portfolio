import { allowMethods, fromAdminPage, readBody, sendJson } from "../_lib/http.js";
import {
  clearFailedLogins, isLockedOut, passwordConfigured, passwordMatches, recordFailedLogin, setSessionCookie,
} from "../_lib/auth.js";

export default async function handler(req, res) {
  if (!allowMethods(req, res, ["POST"]) || !fromAdminPage(req, res)) return;
  if (!passwordConfigured()) return sendJson(res, 503, { error: "not_configured" });

  try {
    if (await isLockedOut(req)) return sendJson(res, 429, { error: "locked" });

    const { password } = await readBody(req);
    if (typeof password !== "string" || !passwordMatches(password)) {
      await recordFailedLogin(req);
      // A small delay slows down password guessing.
      await new Promise((resolve) => setTimeout(resolve, 600));
      return sendJson(res, 401, { error: "wrong_password" });
    }

    await clearFailedLogins(req);
    setSessionCookie(res);
    sendJson(res, 200, { authenticated: true });
  } catch {
    sendJson(res, 500, { error: "server_error" });
  }
}
