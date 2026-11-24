import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ExternalLink, Images, Lock, LogOut, RotateCcw, Save, TriangleAlert } from "lucide-react";
import { Logo } from "../components/Nav";
import { Link } from "../lib/router";
import { DEFAULT_HERO, cacheSettings, mergeSettings, useSettings } from "../lib/settings";

// Same limits the server enforces (api/_lib/settings.js).
const HERO_FIELDS = [
  { group: "Top badge", fields: [
    { key: "badgeLabel", label: "Badge label", max: 24 },
    { key: "badgeText", label: "Badge text", max: 140 },
  ] },
  { group: "Headline", fields: [
    { key: "headlineLine1", label: "Line 1", max: 60 },
    { key: "headlineLine2", label: "Line 2", max: 60 },
    { key: "headlineHighlight", label: "Highlighted words (gradient, underlined)", max: 40 },
  ] },
  { group: "Introduction", fields: [
    { key: "intro", label: "Intro paragraph", max: 600, multiline: true },
  ] },
  { group: "Buttons", fields: [
    { key: "primaryCta", label: "Main button", max: 40 },
    { key: "resumeLabel", label: "Resume button", max: 40 },
  ] },
  { group: "Summary card", fields: [
    { key: "available", label: "Availability line", max: 140 },
    { key: "role", label: "Role", max: 80 },
    { key: "location", label: "Based in", max: 80 },
    { key: "coreStack", label: "Core stack (comma-separated, up to 10)", max: 400, list: true },
  ] },
];

const EMPTY_HERO = Object.fromEntries(HERO_FIELDS.flatMap((g) => g.fields.map((f) => [f.key, ""])));

const api = async (path, { method = "GET", body } = {}) => {
  const response = await fetch(path, {
    method,
    credentials: "same-origin",
    headers: { Accept: "application/json", ...(body !== undefined ? { "Content-Type": "application/json", "X-Portfolio-Admin": "1" } : {}) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const isJson = String(response.headers.get("content-type")).includes("application/json");
  const data = isJson ? await response.json().catch(() => ({})) : null;
  if (!isJson) throw Object.assign(new Error("api_missing"), { code: "api_missing" });
  if (!response.ok) throw Object.assign(new Error(data.error || "error"), { code: data.error || "error", status: response.status });
  return data;
};

/** Saved settings → form values (strings; blank means "use the built-in text"). */
const toDraft = (saved = {}) => ({
  showScreenshots: Boolean(saved.showScreenshots),
  hero: {
    ...EMPTY_HERO,
    ...Object.fromEntries(Object.entries(saved.hero || {}).map(([k, v]) => [k, Array.isArray(v) ? v.join(", ") : String(v)])),
  },
});

/** Form values → what gets saved. */
const fromDraft = (draft) => ({
  showScreenshots: draft.showScreenshots,
  hero: Object.fromEntries(
    Object.entries(draft.hero)
      .map(([k, v]) => [k, k === "coreStack" ? v.split(",").map((s) => s.trim()).filter(Boolean) : v.trim()])
      .filter(([, v]) => (Array.isArray(v) ? v.length : v))
  ),
});

export default function Admin() {
  const [status, setStatus] = useState("loading"); // loading | signedOut | signedIn | apiMissing
  const [config, setConfig] = useState({ passwordConfigured: true, storeConfigured: true });
  const signedIn = useCallback(() => setStatus("signedIn"), []);
  const signedOut = useCallback(() => setStatus("signedOut"), []);

  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");

    api("/api/admin/session")
      .then((s) => {
        setConfig(s);
        setStatus(s.authenticated ? "signedIn" : "signedOut");
      })
      .catch((e) => setStatus(e.code === "api_missing" ? "apiMissing" : "signedOut"));
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Back to the site"><Logo /></Link>
            <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Admin center</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-ink-2 transition hover:bg-surface hover:text-ink">
              View site <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            {status === "signedIn" && (
              <button
                type="button"
                onClick={async () => {
                  try { await api("/api/admin/logout", { method: "POST", body: {} }); } catch { /* signed out either way */ }
                  setStatus("signedOut");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm transition hover:bg-surface"
              >
                <LogOut className="h-3.5 w-3.5" /> Log out
              </button>
            )}
          </div>
        </div>
      </header>

      {status === "loading" && <p className="mx-auto max-w-6xl px-4 py-16 text-ink-3 sm:px-6">Checking your session…</p>}
      {status === "apiMissing" && <ApiMissing />}
      {status === "signedOut" && <Login config={config} onSignedIn={signedIn} />}
      {status === "signedIn" && <Panel config={config} onSignedOut={signedOut} />}
    </div>
  );
}

function ApiMissing() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 sm:px-6">
      <div className="card p-6">
        <TriangleAlert className="h-5 w-5 text-coral" />
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight">The admin API isn't running here</h1>
        <p className="mt-2 text-sm text-ink-2">
          <code className="font-mono">npm run dev</code> only serves the site. Run <code className="font-mono">vercel dev</code> locally, or use the
          deployed site, to sign in and save settings.
        </p>
      </div>
    </div>
  );
}

function Login({ config, onSignedIn }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const messages = {
    wrong_password: "That password isn't right.",
    locked: "Too many wrong attempts. Try again in 15 minutes.",
    not_configured: "No admin password is set. Add ADMIN_PASSWORD in Vercel's environment variables, then redeploy.",
    api_missing: "The admin API isn't reachable.",
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/login", { method: "POST", body: { password } });
      setPassword("");
      onSignedIn();
    } catch (err) {
      setError(messages[err.code] || "Couldn't sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl place-items-center px-4 py-16 sm:px-6">
      <form onSubmit={submit} className="card w-full max-w-sm p-6 sm:p-7">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent-text"><Lock className="h-4 w-4" /></span>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-ink-3">Admin center for this portfolio.</p>

        {!config.passwordConfigured && <p className="mt-4 rounded-lg border border-coral/40 bg-coral/10 p-3 text-sm">{messages.not_configured}</p>}

        <label htmlFor="admin-password" className="mt-6 block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">Password</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 outline-none transition focus:border-accent-text"
        />
        {error && <p role="alert" className="mt-3 text-sm text-coral">{error}</p>}

        <button
          type="submit"
          disabled={busy || !password}
          className="mt-5 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-accent-ink transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Panel({ config, onSignedOut }) {
  const { setSettings } = useSettings();
  const [saved, setSaved] = useState(null); // last saved settings (raw), null while loading
  const [draft, setDraft] = useState(toDraft());
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null); // { type: "ok" | "error", text }

  useEffect(() => {
    api("/api/admin/settings")
      .then((data) => {
        setSaved(data);
        setDraft(toDraft(data));
      })
      .catch((e) => {
        if (e.code === "signed_out") return onSignedOut();
        setSaved({});
        setNotice({ type: "error", text: e.code === "store_not_configured" ? "The settings database isn't connected yet (see below)." : "Couldn't load the saved settings." });
      });
  }, [onSignedOut]);

  const dirty = saved !== null && JSON.stringify(fromDraft(draft)) !== JSON.stringify(fromDraft(toDraft(saved)));

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const preview = useMemo(() => mergeSettings(fromDraft(draft)).hero, [draft]);
  const setHero = (key, value) => setDraft((d) => ({ ...d, hero: { ...d.hero, [key]: value } }));

  const save = async () => {
    setBusy(true);
    setNotice(null);
    try {
      const result = await api("/api/admin/settings", { method: "PUT", body: fromDraft(draft) });
      setSaved(result);
      setDraft(toDraft(result));
      // Show it straight away in this browser too.
      cacheSettings(result);
      setSettings(mergeSettings(result));
      setNotice({ type: "ok", text: "Saved. Visitors will see the changes within a few seconds." });
    } catch (e) {
      if (e.code === "signed_out") return onSignedOut();
      setNotice({ type: "error", text: e.code === "store_not_configured" ? "Not saved: the settings database isn't connected." : "Not saved. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  if (saved === null) return <p className="mx-auto max-w-6xl px-4 py-16 text-ink-3 sm:px-6">Loading settings…</p>;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Site settings</h1>
      <p className="mt-2 text-ink-3">Changes go live for every visitor when you save.</p>

      {!config.storeConfigured && (
        <div className="mt-6 flex gap-3 rounded-xl border border-coral/40 bg-coral/10 p-4 text-sm">
          <TriangleAlert className="mt-0.5 h-4 w-4 flex-none text-coral" />
          <p>
            Settings can't be saved until a database is connected. In Vercel, open the project, go to <b>Storage</b>, add <b>Upstash Redis</b> (the free
            plan is enough) and connect it to this project, then redeploy.
          </p>
        </div>
      )}

      {/* ---------- Screenshots ---------- */}
      <section className="card mt-8 p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3"><Images className="h-3.5 w-3.5" /> Screenshots</p>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">Show screenshots</h2>
            <p className="mt-1 max-w-2xl text-sm text-ink-3">
              The home page Screens section and its menu link, screenshot covers on the project cards (drawings show when off), and the Screens grid on
              case study pages.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={draft.showScreenshots}
            aria-label="Show screenshots"
            onClick={() => setDraft((d) => ({ ...d, showScreenshots: !d.showScreenshots }))}
            className={`relative mt-1 h-7 w-12 flex-none rounded-full border transition ${draft.showScreenshots ? "border-transparent bg-accent" : "border-line-strong bg-surface-2"}`}
          >
            <span className={`absolute top-0.5 h-5.5 w-5.5 rounded-full shadow transition-all ${draft.showScreenshots ? "left-[calc(100%-1.5rem)] bg-accent-ink" : "left-0.5 bg-ink-3"}`} style={{ width: 22, height: 22 }} />
          </button>
        </div>
      </section>

      {/* ---------- Hero ---------- */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">Home page</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">Hero text</h2>
              <p className="mt-1 text-sm text-ink-3">Leave a field blank to use the built-in text (shown faded).</p>
            </div>
            <button
              type="button"
              onClick={() => setDraft((d) => ({ ...d, hero: { ...EMPTY_HERO } }))}
              className="inline-flex flex-none items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs transition hover:bg-surface"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Use built-in text
            </button>
          </div>

          {HERO_FIELDS.map((g) => (
            <fieldset key={g.group} className="mt-6 border-t border-line pt-5">
              <legend className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent-text">{g.group}</legend>
              <div className="mt-3 space-y-4">
                {g.fields.map((f) => {
                  const placeholder = f.list ? DEFAULT_HERO[f.key].join(", ") : DEFAULT_HERO[f.key];
                  const common = {
                    id: `hero-${f.key}`,
                    value: draft.hero[f.key],
                    maxLength: f.max,
                    placeholder,
                    onChange: (e) => setHero(f.key, e.target.value),
                    className: "mt-1.5 w-full rounded-xl border border-line-strong bg-surface px-3.5 py-2.5 text-sm outline-none transition placeholder:text-ink-3/60 focus:border-accent-text",
                  };
                  return (
                    <div key={f.key}>
                      <div className="flex items-baseline justify-between gap-3">
                        <label htmlFor={common.id} className="text-sm text-ink-2">{f.label}</label>
                        <span className="font-mono text-[10px] text-ink-3">{draft.hero[f.key].length}/{f.max}</span>
                      </div>
                      {f.multiline ? <textarea rows={4} {...common} /> : <input type="text" {...common} />}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <HeroPreview hero={preview} />
      </section>

      {/* ---------- Save bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <p className={`mr-auto text-sm ${notice?.type === "error" ? "text-coral" : notice?.type === "ok" && !dirty ? "text-accent-text" : "text-ink-3"}`} role="status">
            {dirty ? "You have unsaved changes." : notice ? (
              <span className="inline-flex items-center gap-1.5">{notice.type === "ok" && <Check className="h-4 w-4" />}{notice.text}</span>
            ) : "All changes saved."}
          </p>
          <button
            type="button"
            disabled={!dirty || busy}
            onClick={() => setDraft(toDraft(saved))}
            className="rounded-xl border border-line px-4 py-2.5 text-sm transition hover:bg-surface disabled:opacity-40"
          >
            Discard
          </button>
          <button
            type="button"
            disabled={!dirty || busy || !config.storeConfigured}
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40"
          >
            <Save className="h-4 w-4" /> {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** A compact copy of the home page hero, to check the text before saving. */
function HeroPreview({ hero }) {
  return (
    <div className="lg:sticky lg:top-6 lg:self-start">
      <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">Preview</p>
      <div className="noise relative overflow-hidden rounded-2xl border border-line bg-bg-2 p-6 sm:p-8">
        <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-3.5 text-xs text-ink-2">
          <span className="flex h-5 items-center gap-1.5 rounded-full bg-accent-soft px-2 font-mono text-[10px] uppercase tracking-wider text-accent-text">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {hero.badgeLabel}
          </span>
          <span className="truncate">{hero.badgeText}</span>
        </div>

        <p className="mt-6 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          {hero.headlineLine1}
          <br />
          {hero.headlineLine2} <span className="text-gradient">{hero.headlineHighlight}</span>
        </p>

        <p className="mt-5 text-sm leading-relaxed text-ink-2">{hero.intro}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-accent-ink">
            {hero.primaryCta} <ArrowDownRight className="h-3.5 w-3.5" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3.5 py-2 text-xs font-semibold">
            {hero.resumeLabel} <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="mt-5 rounded-xl border border-line bg-surface/60 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-text">{hero.available}</p>
          <dl className="mt-3 grid gap-x-5 gap-y-2.5 text-xs sm:grid-cols-2">
            {[["Role", hero.role], ["Core stack", hero.coreStack.join(" · ")], ["Based in", hero.location]].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-3">Experience years are worked out automatically and aren't shown here.</p>
    </div>
  );
}
