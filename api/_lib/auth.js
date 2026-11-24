// Admin sign-in: one password (ADMIN_PASSWORD env variable) and a signed, HttpOnly session cookie.
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { redis, storeConfigured } from "./store.js";

const COOKIE = "__Host-pf_admin";
const SESSION_HOURS = 8;
const MAX_FAILED_LOGINS = 5;
const LOCKOUT_SECONDS = 15 * 60;

export const passwordConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

// SESSION_SECRET signs the cookie. If it isn't set, one is derived from the password,
// so changing the password also signs everyone out.
const secret = () =>
  process.env.SESSION_SECRET || createHash("sha256").update(`pf-admin:${process.env.ADMIN_PASSWORD || ""}`).digest("hex");

const sha256 = (value) => createHash("sha256").update(String(value)).digest();
const sign = (payload) => createHmac("sha256", secret()).update(payload).digest("base64url");

/** Compares in constant time so the check doesn't leak how much of the password matched. */
export const passwordMatches = (attempt) =>
  passwordConfigured() && timingSafeEqual(sha256(attempt), sha256(process.env.ADMIN_PASSWORD));

const parseCookies = (header = "") =>
  Object.fromEntries(
    header.split(";").map((part) => {
      const index = part.indexOf("=");
      return index < 0 ? [part.trim(), ""] : [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
    })
  );

export function isAuthenticated(req) {
  if (!passwordConfigured()) return false;
  const value = parseCookies(req.headers.cookie)[COOKIE];
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export function setSessionCookie(res) {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_HOURS * 3600 * 1000, n: randomBytes(8).toString("hex") })
  ).toString("base64url");
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=${payload}.${sign(payload)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`
  );
}

export const clearSessionCookie = (res) =>
  res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);

// ---------- failed-login lockout, per IP address ----------
const clientIp = (req) => String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
const lockKey = (req) => `portfolio:admin:failed:${clientIp(req)}`;

export async function isLockedOut(req) {
  if (!storeConfigured()) return false;
  return Number((await redis("GET", lockKey(req))) || 0) >= MAX_FAILED_LOGINS;
}

export async function recordFailedLogin(req) {
  if (!storeConfigured()) return;
  const count = await redis("INCR", lockKey(req));
  if (count === 1) await redis("EXPIRE", lockKey(req), LOCKOUT_SECONDS);
}

export async function clearFailedLogins(req) {
  if (storeConfigured()) await redis("DEL", lockKey(req));
}
