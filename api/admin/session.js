// Tells the admin page whether it is signed in, and whether the server side is set up.
import { allowMethods, sendJson } from "../_lib/http.js";
import { isAuthenticated, passwordConfigured } from "../_lib/auth.js";
import { storeConfigured } from "../_lib/store.js";

export default function handler(req, res) {
  if (!allowMethods(req, res, ["GET"])) return;
  sendJson(res, 200, {
    authenticated: isAuthenticated(req),
    passwordConfigured: passwordConfigured(),
    storeConfigured: storeConfigured(),
  });
}
