// Small helpers shared by the API routes.

export function sendJson(res, status, body, cache = "no-store") {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache);
  res.end(JSON.stringify(body));
}

export function allowMethods(req, res, methods) {
  if (methods.includes(req.method)) return true;
  res.setHeader("Allow", methods.join(", "));
  sendJson(res, 405, { error: "Method not allowed" });
  return false;
}

/**
 * Changes must come from the admin page itself: a JSON request carrying our custom header.
 * Together with the SameSite=Strict cookie this blocks cross-site form posts.
 */
export function fromAdminPage(req, res) {
  const ok = req.headers["x-portfolio-admin"] === "1" && String(req.headers["content-type"] || "").includes("application/json");
  if (!ok) sendJson(res, 403, { error: "Forbidden" });
  return ok;
}

/** Reads a JSON body whether or not the platform already parsed it. */
export async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 64 * 1024) break; // settings are tiny; ignore anything huge
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { return {}; }
}
