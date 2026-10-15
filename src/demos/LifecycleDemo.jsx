import React, { useEffect, useRef, useState } from "react";

// Simulated Innov8 pipeline: ideas advance through stages, each move is logged as a workflow event.
export const STAGES = ["Draft", "Screening", "Evaluation", "Sprint", "Implementation", "Implemented"];
const SHORT = ["Draft", "Screen", "Eval", "Sprint", "Build", "Done"];
const FLOW_NOTES = ["routed to evaluators", "owner notified", "status updated", "sprint board refreshed", "exec dashboard updated"];

const seed = () =>
  [3, 2, 2, 1, 1, 0].flatMap((n, stage) =>
    Array.from({ length: n }, (_, i) => ({ id: 1040 + stage * 3 + i, stage, hold: false }))
  );

const stamp = () => new Date().toTimeString().slice(0, 8);

export default function LifecycleDemo({ running = true }) {
  const [ideas, setIdeas] = useState(seed);
  const [log, setLog] = useState([{ t: "--:--:--", text: "listening for workflow events…", tone: "muted" }]);
  const [moved, setMoved] = useState(null);
  const nextId = useRef(1060);

  const ideasRef = useRef(ideas);
  ideasRef.current = ideas;

  useEffect(() => {
    if (!running) return undefined;
    const push = (entry) => setLog((l) => [{ t: stamp(), ...entry }, ...l].slice(0, 4));
    const tick = setInterval(() => {
      let list = ideasRef.current.filter((i) => !(i.stage === STAGES.length - 1 && Math.random() < 0.35));
      if (Math.random() < 0.3 || list.length < 6) {
        const id = nextId.current++;
        push({ text: `IDEA-${id} submitted · draft saved`, tone: "new" });
        setMoved(id);
        setIdeas([...list, { id, stage: 0, hold: false }]);
        return;
      }
      const movable = list.filter((i) => i.stage < STAGES.length - 1);
      const pick = movable[Math.floor(Math.random() * movable.length)];
      if (!pick) return setIdeas(list);
      if (pick.hold) {
        push({ text: `IDEA-${pick.id} resumed from Hold`, tone: "info" });
        list = list.map((i) => (i.id === pick.id ? { ...i, hold: false } : i));
      } else if (pick.stage === 2 && Math.random() < 0.2) {
        push({ text: `IDEA-${pick.id} Evaluation → Hold`, tone: "warn" });
        list = list.map((i) => (i.id === pick.id ? { ...i, hold: true } : i));
      } else {
        const to = pick.stage + 1;
        const note = FLOW_NOTES[Math.floor(Math.random() * FLOW_NOTES.length)];
        push({ text: `IDEA-${pick.id} ${STAGES[pick.stage]} → ${STAGES[to]} · flow: ${note}`, tone: "ok" });
        list = list.map((i) => (i.id === pick.id ? { ...i, stage: to } : i));
      }
      setMoved(pick.id);
      setIdeas(list);
    }, 1500);
    return () => clearInterval(tick);
  }, [running]);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-6 gap-1.5">
        {STAGES.map((s, si) => {
          const here = ideas.filter((i) => i.stage === si);
          return (
            <div key={s} className="flex min-w-0 flex-col rounded-lg border border-line bg-bg/40 p-1.5">
              <div className="mb-1.5 flex items-center justify-between gap-1">
                <span className="truncate font-mono text-[9px] uppercase tracking-wider text-ink-3 sm:text-[10px]">
                  {SHORT[si]}
                </span>
                <span className="font-mono text-[10px] text-ink-2">{here.length}</span>
              </div>
              <div className="flex min-h-[92px] flex-col gap-1">
                {here.slice(0, 4).map((i) => (
                  <div
                    key={i.id}
                    className={`rise truncate rounded-md border px-1 py-1 text-center font-mono text-[9px] sm:text-[10px] ${
                      i.hold
                        ? "border-coral/40 bg-coral/10 text-coral"
                        : moved === i.id
                          ? "border-accent-text/50 bg-accent-soft text-accent-text"
                          : si === STAGES.length - 1
                            ? "border-cyan/30 bg-cyan/10 text-cyan"
                            : "border-line bg-surface-2 text-ink-2"
                    }`}
                  >
                    #{i.id}
                  </div>
                ))}
                {here.length > 4 && <div className="text-center font-mono text-[9px] text-ink-3">+{here.length - 4}</div>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-auto rounded-lg border border-line bg-bg/60 p-2.5 font-mono text-[10.5px] leading-relaxed sm:text-[11px]">
        <div className="mb-1 flex items-center gap-2 text-ink-3">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" /> WorkflowEvents
        </div>
        {log.map((l, i) => (
          <div key={`${l.t}-${i}-${l.text}`} className={`truncate ${i === 0 ? "rise" : ""}`} style={{ opacity: 1 - i * 0.2 }}>
            <span className="text-ink-3">{l.t} </span>
            <span className={l.tone === "warn" ? "text-coral" : l.tone === "new" ? "text-violet" : l.tone === "ok" ? "text-accent-text" : "text-ink-2"}>
              {l.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
