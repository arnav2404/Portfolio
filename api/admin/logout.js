import { allowMethods, fromAdminPage, sendJson } from "../_lib/http.js";
import { clearSessionCookie } from "../_lib/auth.js";

export default function handler(req, res) {
  if (!allowMethods(req, res, ["POST"]) || !fromAdminPage(req, res)) return;
  clearSessionCookie(res);
  sendJson(res, 200, { authenticated: false });
}
