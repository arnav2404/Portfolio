import React, { useEffect, useState } from "react";
import { Database, Zap } from "lucide-react";

// Simulated Corp DMS search: filters are applied one by one and the KQL query is composed live.
const FILTERS = [
  { label: "Category", value: "Finance", kql: [["prop", "DmsCategory"], ["op", ":"], ["str", '"Finance*"']] },
  { label: "Direction", value: "Incoming", kql: [["prop", "DmsDirection"], ["op", ":"], ["str", '"Incoming"']] },
  { label: "Ref No", value: "PRJ/2026/*", kql: [["prop", "RefNo"], ["op", ":"], ["str", '"PRJ/2026/*"']] },
  { label: "Received", value: "≥ 01 Jan 2026", kql: [["prop", "Received"], ["op", ">="], ["num", "2026-01-01"]] },
];
const COUNTS = [48210, 6182, 2904, 316, 128];

const tone = { prop: "text-cyan", op: "text-ink-3", str: "text-accent-text", num: "text-violet", kw: "text-coral" };

export default function KqlDemo({ running = true }) {
  const [n, setN] = useState(0);
  const [cached, setCached] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(
      () => {
        if (n < FILTERS.length) {
          setN(n + 1);
          setCached(false);
        } else if (!cached) setCached(true);
        else {
          setN(0);
          setCached(false);
        }
      },
      n < FILTERS.length ? 1300 : 1800
    );
    return () => clearTimeout(t);
  }, [n, cached, running]);

  const active = FILTERS.slice(0, n);

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f, i) => (
          <span
            key={f.label}
            className={`rounded-md border px-2 py-1 text-[10.5px] transition-all duration-500 ${
              i < n ? "border-accent-text/40 bg-accent-soft text-ink" : "border-line text-ink-3 opacity-60"
            }`}
          >
            <span className="text-ink-3">{f.label}:</span> {f.value}
          </span>
        ))}
      </div>

      <div className="min-h-[96px] rounded-lg border border-line bg-bg/60 p-3 font-mono text-[11px] leading-relaxed">
        <div className="mb-1 text-[10px] uppercase tracking-wider text-ink-3">query.kql</div>
        <span className="text-cyan">ContentTypeId</span>
        <span className="text-ink-3">:</span>
        <span className="text-violet">0x0101*</span>
        {active.map((f) => (
          <span key={f.label} className="rise">
            <span className="text-coral"> AND </span>
            {f.kql.map(([k, v], i) => (
              <span key={i} className={tone[k]}>
                {v}
              </span>
            ))}
          </span>
        ))}
        <span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent-text/70" />
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2">
        <Metric label="Results" value={COUNTS[n].toLocaleString("en-US")} highlight />
        <Metric label="Source" value={n >= 3 ? "Search + SQL" : "Search"} icon={<Database className="h-3 w-3" />} />
        <Metric
          label="Cache"
          value={cached ? "hit · 0 calls" : n ? "miss · 1 call" : "idle"}
          icon={<Zap className={`h-3 w-3 ${cached ? "text-accent-text" : ""}`} />}
        />
      </div>
    </div>
  );
}

function Metric({ label, value, icon, highlight }) {
  return (
    <div className="rounded-lg border border-line bg-bg/40 p-2">
      <div className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider text-ink-3">
        {icon}
        {label}
      </div>
      <div className={`mt-1 truncate font-mono text-[12px] sm:text-[13px] ${highlight ? "text-accent-text" : "text-ink"}`}>{value}</div>
    </div>
  );
}
