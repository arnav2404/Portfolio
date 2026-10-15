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
3. Keep your custom domain on the project. If the domain is not `arnav-my-porfolio.uk`, search-and-replace it in `index.html`, `public/robots.txt` and `public/sitemap.xml`.
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

To add screenshots: export as WebP (1600px wide for full, 560px for thumbs), drop them in a folder under both `screens/` and `thumbs/` with the same file names, then add a matching entry in `meta` inside `src/data/screens.js`.
