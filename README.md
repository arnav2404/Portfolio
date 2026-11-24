# Arnav Dixit · Portfolio v2

React 19 + Vite 7 + Tailwind CSS 4. Static SPA, deploys on Vercel's free (Hobby) plan with no server functions.

## Run locally
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the production build
```
Node 20.19+ (or 22) is required.

## Deploy to Vercel (Hobby)
1. Push this folder to a GitHub repo (or replace the contents of your existing portfolio repo).
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected as **Vite**; build `npm run build`, output `dist` (already set in `vercel.json`).
3. Keep your custom domain (`arnavdixit.com`) on the project. If it ever changes, update `SITE` in `src/lib/seo.js` and the sitemap line in `public/robots.txt`; the sitemap and every page's links are generated from `SITE`.
4. Optional: enable **Web Analytics** in the Vercel project (free tier) — `@vercel/analytics` is already wired in.

`vercel.json` adds an SPA rewrite so `/work/innov8` style links work on refresh, long-term caching for hashed assets, and basic security headers.

## Where to edit content
| What | File |
|---|---|
| Name, email, phone, LinkedIn, hero lines, stats, principles, skills, experience, education | `src/data/profile.js` |
| Case studies (Innov8, Athar, Tawasol, Corp DMS, GlobalOne, MetaPort) | `src/data/work.js` |
| Screenshot sets and captions | `src/data/screens.js` + `src/assets/screens/<set>/NN.webp` (full) and `src/assets/thumbs/<set>/NN.webp` (560px) |
| Resume PDF | `public/Arnav_Dixit_Resume.pdf` |
| Colours / fonts | `src/index.css` (tokens at the top) |

Whether screenshots show on the site is a switch in the admin center (see below). They are off by default.

To add screenshots: export as WebP (1600px wide for full, 560px for thumbs), drop them in a folder under both `screens/` and `thumbs/` with the same file names, then add a matching entry in `meta` inside `src/data/screens.js`.

## Admin center (`/admin`)

A password-protected page for site settings: the **Show screenshots** switch and the **hero text** on the home page. Saving makes the change live for every visitor within a few seconds; blank hero fields fall back to the built-in text in `src/lib/settings.jsx`.

One-time setup in Vercel:

1. **Storage → Upstash Redis** (free plan): create a database and connect it to this project. This adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`).
2. **Settings → Environment Variables**: add `ADMIN_PASSWORD` (a long password). Optionally add `SESSION_SECRET` (any long random string) to sign sessions; without it one is derived from the password.
3. Redeploy.

How it works: the serverless functions in `api/` check the password, set an 8-hour HttpOnly session cookie, and read/write one settings record in Redis. Five wrong passwords lock that IP address out for 15 minutes. `npm run dev` doesn't run `api/`; use `vercel dev` to try the admin center locally.
