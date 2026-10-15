import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// An original, procedurally built engine. It renders as polished metal, turns into a technical
// line drawing on "paper", and comes apart layer by layer. Every part knows its layer and the
// direction it travels when exploded, so scroll can take it apart and put it back together.

export const PAPER = "#e7e4dc";
// Layer colours, tuned to read on paper. Index 0 is the plain ink colour.
export const LAYER_INK = ["#1d2026", "#4f7300", "#0b8295", "#6b4fd8", "#cf4b2a", "#a86f00"];

const Z = new THREE.Vector3(0, 0, 1);
// Each layer turns to face the viewer, given as the direction the lens points plus a roll:
// the lens head on, the gear from above, the core from the side, the pods and fins from behind,
// and the rear housing from behind and below.
const LAYER_FACING = [[0.3, 0.2, 1, 0.2], [0.25, -0.75, 0.6, 0.3], [-1, 0.25, 0.35, 0.6], [-0.35, 0.3, -1, 0.4], [0.5, -0.45, -0.75, 0.9]];
// Scroll-driven values the scene glides towards instead of jumping with each wheel notch.
const DAMPED = ["explode", "tags", "pose", "progress"];

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const ease = (t) => t * t * (3 - 2 * t);
// Frame-rate independent smoothing: moves `cur` towards `to` with time constant `tau` (ms).
const damp = (cur, to, tau, dt) => cur + (to - cur) * (1 - Math.exp(-dt / tau));

// ---------- geometry helpers (machine axis is +Z, front of the engine faces +Z) ----------
const toZ = (g) => g.rotateX(Math.PI / 2);
const lathe = (profile, seg = 72) => toZ(new THREE.LatheGeometry(profile.map(([r, z]) => new THREE.Vector2(r, z)), seg));
// A closed ring section between two radii.
const ring = (r1, r2, z1, z2, seg) => lathe([[r1, z1], [r2, z1], [r2, z2], [r1, z2], [r1, z1]], seg);
// A turned part: inner radius plus an outer silhouette given as [[r, z], ...] from back to front.
const stepped = (rIn, steps, seg) => {
  const pts = [[rIn, steps[0][1]]];
  steps.forEach(([r, z], i) => {
    if (i) pts.push([steps[i - 1][0], z]);
    pts.push([r, z]);
  });
  pts.push([rIn, steps[steps.length - 1][1]], [rIn, steps[0][1]]);
  return lathe(pts, seg);
};
// Repeats a small part evenly around the axis.
function around(count, make, r, z = 0, phase = 0) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const g = make(i);
    g.translate(0, r, 0);
    g.rotateZ(phase + (i / count) * Math.PI * 2 - Math.PI / 2);
    g.translate(0, 0, z);
    list.push(g);
  }
  return mergeGeometries(list);
}
const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const rod = (r, len, sides = 12) => toZ(new THREE.CylinderGeometry(r, r, len, sides));

export function createMachine(canvas, overlay, labelText) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  const camBase = new THREE.Vector3(0, 0, 17);
  camera.position.copy(camBase);

  // A soft studio environment gives the metal real reflections, which is most of its depth.
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xffffff, 0.12));
  scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x1a120c, 0.55));
  const key = new THREE.DirectionalLight(0xffe2d2, 2.4);
  key.position.set(6, 7, 9);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffb59a, 1.6);
  rim.position.set(-7, 3, -5);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0x9fb4ff, 0.6);
  fill.position.set(-4, -6, 6);
  scene.add(fill);

  const paper = new THREE.Color(PAPER);
  const inkCols = LAYER_INK.map((c) => new THREE.Color(c));
  const black = new THREE.Color(0, 0, 0);
  const colors = {};
  const readTheme = () => {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    colors.accent = new THREE.Color(v || "#d4ff3f");
    colors.dark = document.documentElement.getAttribute("data-theme") !== "light";
  };
  readTheme();

  const machine = new THREE.Group(); // overall pose
  const spinner = new THREE.Group(); // slow roll around the axis
  machine.add(spinner);
  scene.add(machine);
  const parts = [];
  const tmpColor = new THREE.Color();

  // kind: "dark" metal or "light" (warm machined) metal
  function part(geometry, { layer, kind = "dark", out = [0, 0, 0], delay = 0, spin = 0 }) {
    const base = new THREE.Color(kind === "light" ? 0x8a7a72 : 0x2b2f37);
    const mat = new THREE.MeshStandardMaterial({
      color: base.clone(),
      metalness: kind === "light" ? 0.55 : 0.7,
      roughness: 0.4,
      envMapIntensity: 0.55,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const mesh = new THREE.Mesh(geometry, mat);
    const lines = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, 22),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })
    );
    const g = new THREE.Group();
    g.add(mesh, lines);
    spinner.add(g);
    geometry.computeBoundingSphere();
    const p = { g, mesh, lines, layer, base, kind, out: new THREE.Vector3(...out), delay, spin, hl: 0, center: geometry.boundingSphere.center.clone() };
    parts.push(p);
    return p;
  }

  // ---------- 1 · Interface: front bezel, knurled grip, lens rings ----------
  part(stepped(1.42, [[1.72, 1.95], [1.9, 2.15], [1.98, 2.55], [1.84, 2.62], [1.7, 2.75]], 96), { layer: 1, kind: "light", out: [0, 0, 3.6] });
  part(around(84, () => box(0.06, 0.1, 0.36), 1.98, 2.35), { layer: 1, out: [0, 0, 3.6] });
  part(new THREE.CircleGeometry(1.43, 72).translate(0, 0, 2.3), { layer: 1, out: [0, 0, 3.6] });
  part(stepped(1.36, [[1.62, 1.35], [1.78, 1.45], [1.7, 1.62], [1.8, 1.72], [1.66, 1.92]], 96), { layer: 1, out: [0, 0, 2.5], delay: 0.05 });
  part(around(24, () => box(0.22, 0.08, 0.16), 1.79, 1.53), { layer: 1, out: [0, 0, 2.5], delay: 0.05 });
  // Face screws and an iris of overlapping blades sunk behind the glass.
  part(around(16, () => rod(0.05, 0.06, 6), 1.84, 2.78), { layer: 1, kind: "light", out: [0, 0, 3.6] });
  part(around(12, () => box(0.62, 0.05, 0.03).rotateZ(0.5), 1.18, 2.2), { layer: 1, out: [0, 0, 3.3], delay: 0.03 });

  // ---------- 2 · Workflow: drive gear and timing rings ----------
  const gearOut = [0, 3.1, 1.5];
  part(ring(1.18, 1.62, 0.85, 1.2, 96), { layer: 2, out: gearOut, delay: 0.1, spin: 0.25 });
  part(around(44, () => box(0.13, 0.2, 0.3), 1.62, 1.02), { layer: 2, out: gearOut, delay: 0.1, spin: 0.25 });
  part(around(6, () => box(0.14, 1.0, 0.16).translate(0, -0.5, 0), 1.2, 1.02, 0.3), { layer: 2, kind: "light", out: gearOut, delay: 0.1, spin: 0.25 });
  part(ring(0.22, 0.42, 0.88, 1.18, 48), { layer: 2, kind: "light", out: gearOut, delay: 0.1, spin: 0.25 });
  part(ring(1.42, 1.7, 0.55, 0.75, 96), { layer: 2, kind: "light", out: [0, 0, 1.6], delay: 0.15, spin: -0.15 });
  part(around(36, () => box(0.05, 0.08, 0.2), 1.7, 0.65), { layer: 2, out: [0, 0, 1.6], delay: 0.15, spin: -0.15 });
  // Bearing race the drive gear rides on.
  part(mergeGeometries([ring(1.34, 1.42, 0.62, 0.8, 96), around(28, () => new THREE.SphereGeometry(0.05, 8, 6), 1.38, 0.71)]), { layer: 2, out: [0, 0, 1.1], delay: 0.12, spin: 0.1 });

  // ---------- 3 · Data core: main body, hex collar, memory cells ----------
  part(stepped(0.6, [[1.18, -1.05], [1.3, -0.9], [1.22, -0.55], [1.32, -0.45], [1.22, 0.1], [1.3, 0.2], [1.14, 0.55]], 96), { layer: 3 });
  part(toZ(new THREE.CylinderGeometry(1.5, 1.5, 0.32, 8)).translate(0, 0, -0.18), { layer: 3, kind: "light", out: [0, 0, 0.3] });
  part(around(10, () => box(0.34, 0.14, 0.42), 1.28, -0.75, 0.1), { layer: 3, out: [0, 0, -0.2], delay: 0.05 });
  // Cooling fins between the collar and the memory cells.
  part(around(40, () => box(0.03, 0.14, 0.34), 1.36, -0.28), { layer: 3, kind: "light", out: [0, 0, -0.05], delay: 0.08 });
  const heart = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.62, 1),
    new THREE.MeshBasicMaterial({ color: colors.accent, wireframe: true, transparent: true, opacity: 0.6, toneMapped: false })
  );
  spinner.add(heart);

  // ---------- 4 · Integrations: side pods and solar fins ----------
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const pod = mergeGeometries([
      rod(0.24, 1.3, 16),
      rod(0.3, 0.12, 16).translate(0, 0, 0.5),
      rod(0.3, 0.12, 16).translate(0, 0, -0.5),
      rod(0.12, 0.25, 12).translate(0, 0, 0.75),
      toZ(new THREE.CylinderGeometry(0.17, 0.27, 0.3, 16)).translate(0, 0, -0.8), // exhaust bell
      ...[-0.2, 0, 0.2].map((z) => rod(0.255, 0.03, 16).translate(0, 0, z)), // cooling bands
    ]).translate(Math.cos(a) * 1.58, Math.sin(a) * 1.58, -0.35);
    part(pod, { layer: 4, kind: i % 2 ? "dark" : "light", out: [Math.cos(a) * 2.4, Math.sin(a) * 2.4, -0.2], delay: 0.2 + i * 0.03 });
  }
  for (const s of [-1, 1]) {
    const fin = mergeGeometries([
      box(2.2, 0.05, 1.05).translate(s * 3.15, 0, 0.15),
      box(0.9, 0.12, 0.12).translate(s * 1.95, 0, 0.15),
      ...[-0.3, 0.1, 0.5].map((z) => box(2.1, 0.07, 0.03).translate(s * 3.15, 0, z + 0.05)),
    ]);
    part(fin, { layer: 4, kind: "light", out: [s * 1.6, 0, 0.3], delay: 0.25 });
    // Dark panel cells laid on the fin.
    const cells = [];
    for (let x = 0; x < 5; x++) for (let z = 0; z < 2; z++) cells.push(box(0.38, 0.08, 0.42).translate(s * (2.3 + x * 0.45), 0, -0.1 + z * 0.5));
    part(mergeGeometries(cells), { layer: 4, out: [s * 1.6, 0, 0.3], delay: 0.25 });
  }

  // ---------- 5 · Security: rear housing, bolt ring, cage, base plate ----------
  part(stepped(0.9, [[1.75, -2.45], [1.95, -2.3], [1.62, -2.1], [1.42, -1.5], [1.5, -1.35], [1.3, -1.05]], 96), { layer: 5, out: [0, 0, -2.6], delay: 0.1 });
  part(around(12, () => toZ(new THREE.CylinderGeometry(0.09, 0.09, 0.22, 6)), 1.84, -2.1), { layer: 5, kind: "light", out: [0, 0, -3.3], delay: 0.15 });
  part(around(6, () => rod(0.045, 1.9, 8), 1.66, -0.15, Math.PI / 6), { layer: 5, kind: "light", out: [0, 0, -1.4], delay: 0.2 });
  const base = part(mergeGeometries([ring(0.3, 1.6, -2.85, -2.6, 96), around(8, () => rod(0.13, 0.3, 12), 1.1, -2.72)]), { layer: 5, out: [0, 0, -4.4], delay: 0.3 });
  // Vent slots around the housing and a rear exhaust cone with a glowing throat.
  part(around(24, () => box(0.05, 0.08, 0.34), 1.5, -1.78), { layer: 5, kind: "light", out: [0, 0, -2.6], delay: 0.1 });
  part(lathe([[0.3, -2.85], [0.52, -2.95], [0.66, -3.25], [0.58, -3.3], [0.44, -3.02], [0.3, -2.95]], 64), { layer: 5, kind: "light", out: [0, 0, -4.4], delay: 0.3 });
  const throatMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const throat = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.42, 48).rotateY(Math.PI).translate(0, 0, -3.0), throatMat);
  base.g.add(throat);

  // ---------- hero dressing: colour ring, tick ring and a live "screen" in the lens ----------
  const glow = new THREE.Group();
  spinner.add(glow);
  const stops = ["#ff5a5f", "#ffb020", "#d4ff3f", "#2ee6c5", "#4f7cff", "#a78bfa", "#ff5a5f"].map((c) => new THREE.Color(c));
  const gradient = (geo) => {
    const cols = [];
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const t = ((Math.atan2(pos.getY(i), pos.getX(i)) / (Math.PI * 2) + 1) % 1) * (stops.length - 1);
      const c = stops[Math.floor(t)].clone().lerp(stops[Math.ceil(t)], t % 1);
      cols.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    return geo;
  };
  const ringMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, toneMapped: false });
  const haloMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  glow.add(new THREE.Mesh(gradient(new THREE.TorusGeometry(1.86, 0.028, 8, 260)), ringMat));
  glow.add(new THREE.Mesh(gradient(new THREE.TorusGeometry(1.86, 0.09, 8, 260)), haloMat));
  const tickPts = [];
  for (let i = 0; i < 180; i++) {
    const a = (i / 180) * Math.PI * 2;
    const r2 = i % 15 === 0 ? 2.12 : 2.03;
    tickPts.push(Math.cos(a) * 1.96, Math.sin(a) * 1.96, 0, Math.cos(a) * r2, Math.sin(a) * r2, 0);
  }
  const tickGeo = new THREE.BufferGeometry();
  tickGeo.setAttribute("position", new THREE.Float32BufferAttribute(tickPts, 3));
  const tickMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
  glow.add(new THREE.LineSegments(tickGeo, tickMat));

  const sc = document.createElement("canvas");
  sc.width = sc.height = 256;
  const sctx = sc.getContext("2d");
  const screenTex = new THREE.CanvasTexture(sc);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, transparent: true, toneMapped: false, depthWrite: false });
  const screen = new THREE.Mesh(new THREE.CircleGeometry(1.42, 72), screenMat);
  spinner.add(screen);
  const bezelOut = new THREE.Vector3(0, 0, 3.6);
  // `boost` (0 to 1) brightens the waveform while the camera is in close.
  function drawScreen(t, boost = 0) {
    const a = colors.accent;
    const css = (al) => `rgba(${(a.r * 255) | 0},${(a.g * 255) | 0},${(a.b * 255) | 0},${al})`;
    sctx.fillStyle = "#0b0d11";
    sctx.fillRect(0, 0, 256, 256);
    for (let y = 30; y < 226; y += 5) {
      const k = (y - 128) / 98;
      const w = (1 - k * k) * (70 + 22 * Math.sin(y * 0.06 + t * 1.3) + 14 * Math.sin(y * 0.15 - t));
      sctx.fillStyle = css((0.18 + 0.25 * (1 - Math.abs(k))) * (1 + 0.8 * boost));
      sctx.fillRect(128 - w, y, w * 2, 2);
    }
    // Range rings and a crosshair give the lens a sense of depth.
    sctx.strokeStyle = css(0.22 + 0.2 * boost);
    sctx.lineWidth = 1;
    for (const r of [46, 88, 118]) {
      sctx.beginPath();
      sctx.arc(128, 128, r, 0, Math.PI * 2);
      sctx.stroke();
    }
    sctx.beginPath();
    sctx.moveTo(128, 6); sctx.lineTo(128, 26); sctx.moveTo(128, 230); sctx.lineTo(128, 250);
    sctx.moveTo(6, 128); sctx.lineTo(26, 128); sctx.moveTo(230, 128); sctx.lineTo(250, 128);
    sctx.stroke();
    sctx.fillStyle = css(1);
    for (let x = 40; x < 216; x += 7) {
      const y = 128 + 38 * Math.sin(x * 0.035 + t * 1.6) * Math.cos(x * 0.011 - t * 0.4);
      sctx.beginPath();
      sctx.arc(x, y, 2.4 + boost, 0, Math.PI * 2);
      sctx.fill();
    }
    screenTex.needsUpdate = true;
  }

  // ---------- stars (fade out on paper) ----------
  const starGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(1200 * 3);
  for (let i = 0; i < 1200; i++) {
    const r = 40 + Math.random() * 50;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    sp.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph) - 30], i * 3);
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.5, depthWrite: false });
  scene.add(new THREE.Points(starGeo, starMat));

  // ---------- overlay: layer tags and the close-up reticle ----------
  const svgNS = "http://www.w3.org/2000/svg";
  const svgEl = (tag, attrs = {}) => {
    const el = document.createElementNS(svgNS, tag);
    for (const a in attrs) el.setAttribute(a, attrs[a]);
    return el;
  };
  const div = (className) => {
    const el = document.createElement("div");
    el.className = `absolute left-0 top-0 ${className}`;
    el.style.opacity = "0";
    overlay.appendChild(el);
    return el;
  };
  const svg = svgEl("svg", { class: "absolute inset-0 h-full w-full text-ink-3" });
  overlay.appendChild(svg);
  const layerTags = labelText.layers.map((t, i) => {
    const el = div("flex items-center gap-2 whitespace-nowrap font-mono text-[11px]");
    const dot = document.createElement("span");
    dot.className = "h-2 w-2 rounded-full";
    dot.style.background = LAYER_INK[i + 1];
    const label = document.createElement("span");
    label.textContent = t;
    el.append(dot, label);
    el.style.color = LAYER_INK[i + 1];
    const own = parts.filter((p) => p.layer === i + 1);
    return { el, anchor: own.find((p) => p.kind === "light") || own[0] };
  });
  // Close-up: corner brackets lock onto the lens and a leader line runs to the machine's name plate.
  const hud = svg.appendChild(svgEl("g", { fill: "none", "stroke-width": "1.5", opacity: "0" }));
  hud.style.stroke = "var(--accent-text)";
  const brackets = [0, 1, 2, 3].map(() => hud.appendChild(svgEl("path")));
  const hudLine = hud.appendChild(svgEl("polyline", { "stroke-width": "1", opacity: "0.7" }));
  const plate = div("whitespace-nowrap rounded-lg bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] px-3 py-2.5 backdrop-blur-sm");
  plate.innerHTML =
    '<p class="font-mono text-[10px] uppercase tracking-[0.24em] text-accent-text"></p>' +
    '<p class="mt-1 font-display text-[clamp(1.4rem,2.2vw,2rem)] font-extrabold leading-none tracking-[-0.02em] text-ink"></p>' +
    '<p class="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3"></p>';
  [labelText.suit?.code, labelText.suit?.name, labelText.suit?.note].forEach((t, i) => (plate.children[i].textContent = t || ""));

  // ---------- poses: one orientation per step, slerped by scroll ----------
  // A pose is the direction the lens (machine +Z) points, plus a roll around it.
  const pose = (x, y, z, roll = 0) =>
    new THREE.Quaternion().setFromUnitVectors(Z, new THREE.Vector3(x, y, z).normalize()).multiply(new THREE.Quaternion().setFromAxisAngle(Z, roll));
  const poses = [];
  const setPoses = (n) => {
    poses.length = 0;
    poses.push(pose(0.42, 0.28, 1)); // looking into the lens
    for (let i = 0; i < n - 2; i++) poses.push(pose(...(LAYER_FACING[i] || [-0.95 + i * 0.06, 0.32 - i * 0.04, 0.42 + i * 0.03, 0.6 + i * 0.12])));
    poses.push(pose(-0.35, 0.22, 1, 1.4)); // reassembled
  };
  setPoses(8);
  const facePose = pose(0.1, 0.06, 1);

  // ---------- state ----------
  // target is what scroll asked for; state is what is drawn, eased towards target.
  const target = { b: 0, explode: 0, tags: 0, focus: 0, pose: 0, progress: 0, hoverable: false };
  const state = { ...target };
  // All camera input lives here: hovering the assembled machine pulls the camera in to the lens
  // (zoom), dragging turns it and a pinch or Ctrl + wheel dollies in and out (view). Both ease
  // back to the scripted framing when the scroll step changes.
  const zoom = { v: 0, on: false, at: 0, rect: null, cb: null };
  const view = { yaw: 0, pitch: 0, dolly: 1, to: { yaw: 0, pitch: 0, dolly: 1 }, drag: null, step: -1 };
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const size = { w: 1, h: 1, mobile: false, fit: 1 };
  const perf = { last: 0, slow: 0 };
  const setZoom = (on) => {
    if (zoom.on === on) return;
    zoom.on = on;
    zoom.at = performance.now();
    zoom.cb?.(on);
  };

  const qA = new THREE.Quaternion();
  const qP = new THREE.Quaternion();
  const qU = new THREE.Quaternion();
  const eul = new THREE.Euler();
  const camTo = new THREE.Vector3();
  const v = new THREE.Vector3();
  const corners = Array.from({ length: 8 }, () => new THREE.Vector3());
  const pt = { x: 0, y: 0 };
  const toScreen = (p) => {
    p.project(camera);
    pt.x = (p.x * 0.5 + 0.5) * size.w;
    pt.y = (-p.y * 0.5 + 0.5) * size.h;
    return pt;
  };
  const project = (p) => toScreen(p.g.localToWorld(v.copy(p.center)));
  // Screen bounds of a box given in an object's local space.
  const bounds = (obj, min, max) => {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    corners.forEach((c, i) => {
      toScreen(obj.localToWorld(c.set(i & 1 ? max.x : min.x, i & 2 ? max.y : min.y, i & 4 ? max.z : min.z)));
      x0 = Math.min(x0, pt.x); x1 = Math.max(x1, pt.x); y0 = Math.min(y0, pt.y); y1 = Math.max(y1, pt.y);
    });
    return { l: x0, r: x1, t: y0, b: y1 };
  };
  // The body (fins left out) for hover tests, and the lens for the close-up.
  const bodyMin = new THREE.Vector3(-2.4, -2.4, -2.9), bodyMax = new THREE.Vector3(2.4, 2.4, 2.8);
  const lensMin = new THREE.Vector3(-1.5, -1.5, 2.3), lensMax = new THREE.Vector3(1.5, 1.5, 2.6);
  const closeUp = new THREE.Vector3(0, 0, 2.4);

  function frame(t) {
    const dt = Math.min(64, perf.last ? t - perf.last : 16);
    perf.last = t;
    // Drop to 1x resolution if this device keeps missing frames.
    perf.slow = dt > 24 ? perf.slow + 1 : Math.max(0, perf.slow - 1);
    if (running && perf.slow > 90 && dpr > 1) {
      dpr = 1;
      renderer.setPixelRatio(1);
      renderer.setSize(size.w, size.h, false);
    }
    for (const kk of DAMPED) state[kk] = running ? damp(state[kk], target[kk], 110, dt) : target[kk];
    const { b, explode, focus } = state;
    ptr.x = damp(ptr.x, ptr.tx, 260, dt);
    ptr.y = damp(ptr.y, ptr.ty, 260, dt);

    const pi = Math.min(poses.length - 1, Math.max(0, state.pose));
    const i0 = Math.floor(pi);
    if (!state.hoverable || explode > 0.02 || b > 0.05) setZoom(false);
    zoom.v = damp(zoom.v, zoom.on ? 1 : 0, 380, dt);
    const z = ease(clamp01(zoom.v));
    const step = Math.round(pi);
    if (step !== view.step && !view.drag) {
      view.step = step;
      Object.assign(view.to, { yaw: 0, pitch: 0, dolly: 1 });
    }
    for (const kk of ["yaw", "pitch", "dolly"]) view[kk] = damp(view[kk], view.to[kk], 120, dt);

    qA.copy(poses[i0]).slerp(poses[Math.min(poses.length - 1, i0 + 1)], ease(clamp01((pi - i0 - 0.15) / 0.7)));
    qA.slerp(facePose, z);
    qP.setFromEuler(eul.set(ptr.y * 0.12 * (1 - 0.6 * z), ptr.x * 0.18 * (1 - 0.6 * z), 0));
    qU.setFromEuler(eul.set(view.pitch, view.yaw, 0, "YXZ"));
    machine.quaternion.copy(qP).multiply(qU).multiply(qA);
    spinner.rotation.z = state.progress * 2.2 + t * 0.00004;
    machine.scale.setScalar(size.fit * (1 - 0.34 * ease(clamp01(explode))));
    machine.position.x = size.mobile ? 0 : 1.1 * ease(clamp01(explode));
    machine.updateMatrixWorld(true);
    camTo.copy(closeUp);
    spinner.localToWorld(camTo);
    camTo.z += 12 * machine.scale.x;
    camera.position.lerpVectors(camBase, camTo, z);
    camera.position.z *= view.dolly;
    camera.updateMatrixWorld();
    // Remember where the machine sits on screen, so hovering it can be tested cheaply.
    if (z < 0.01) zoom.rect = bounds(machine, bodyMin, bodyMax);

    for (const p of parts) {
      const e = ease(clamp01(explode * 1.4 - p.delay));
      p.hl = damp(p.hl, focus && p.layer === focus ? 1 : 0, 130, dt);
      p.g.position.copy(p.out).multiplyScalar(e * (0.85 + 0.2 * p.hl));
      if (p.spin) p.g.rotation.z = t * 0.0002 * p.spin + e * p.spin * 3;
      const m = p.mesh.material;
      m.color.copy(p.base).lerp(black, b);
      m.emissive.copy(paper).multiplyScalar(b);
      m.metalness = (p.kind === "light" ? 0.55 : 0.7) * (1 - b);
      m.roughness = 0.4 + 0.6 * b;
      m.envMapIntensity = 0.55 * (1 - b);
      const lm = p.lines.material;
      lm.color.copy(tmpColor.set(colors.dark ? 0xffffff : 0xd9dce4)).lerp(inkCols[0], b).lerp(inkCols[p.layer], p.hl * b);
      lm.opacity = (0.13 + 0.7 * b) * (!focus || p.layer === focus ? 1 : 0.28) + p.hl * 0.1;
    }

    const g = 1 - b;
    // The lens powers up with a short flicker as the camera arrives, then holds bright.
    const flicker = zoom.on && t - zoom.at < 500 ? (Math.sin(t * 0.09) > 0 ? 1 : 0.35) : 1;
    ringMat.opacity = g;
    haloMat.opacity = (0.22 + 0.35 * z) * g * flicker;
    tickMat.opacity = (0.3 + 0.4 * z) * g;
    screenMat.opacity = g * flicker;
    screenMat.color.setScalar(1 + 0.5 * z);
    starMat.opacity = 0.5 * g * (colors.dark ? 1 : 0.4);
    heart.material.opacity = 0.6 * g;
    throatMat.color.copy(colors.accent);
    throatMat.opacity = (0.55 + 0.25 * Math.sin(t * 0.004)) * g;
    heart.material.color.copy(colors.accent);
    heart.rotation.set(t * 0.0003, t * 0.0005, 0);
    const be = ease(clamp01(explode * 1.4));
    glow.position.set(0, 0, 2.8).addScaledVector(bezelOut, be * 0.85);
    screen.position.set(0, 0, 2.32).addScaledVector(bezelOut, be * 0.85);
    heart.position.set(0, 0, 1.7).addScaledVector(bezelOut, be * 0.6);
    if (g > 0.01) drawScreen(t / 1000, z);

    renderer.render(scene, camera);

    // layer tags follow the parts they point at
    layerTags.forEach((tag, i) => {
      const a = state.tags * (!focus || focus === i + 1 ? 1 : size.mobile ? 0 : 0.5);
      tag.el.style.opacity = a;
      if (a <= 0.01) return;
      project(tag.anchor);
      tag.el.style.transform = `translate(${pt.x + 14}px, ${pt.y - 22}px)`;
      tag.el.style.fontWeight = focus === i + 1 ? "700" : "400";
    });

    // Reticle and name plate arrive late in the zoom, once the lens has settled, and the plate breathes slowly.
    const hudA = clamp01((z - 0.55) / 0.45);
    hud.setAttribute("opacity", hudA.toFixed(3));
    plate.style.opacity = hudA * (0.8 + 0.2 * Math.sin(t * 0.0016));
    if (hudA > 0) {
      const q = bounds(machine, lensMin, lensMax);
      const pad = 14, len = Math.min(26, (q.r - q.l) / 4);
      const [x0, y0, x1, y1] = [q.l - pad, q.t - pad, q.r + pad, q.b + pad];
      [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]].forEach(([x, y, sx, sy], i) =>
        brackets[i].setAttribute("d", `M${x},${y + sy * len} V${y} H${x + sx * len}`)
      );
      const px = Math.min(size.w - 280, x1 + 70);
      const py = Math.max(96, y0 - 10);
      hudLine.setAttribute("points", `${x1},${y0 + 18} ${x1 + 30},${py + 14} ${px - 10},${py + 14}`);
      plate.style.transform = `translate(${px}px, ${py}px)`;
    }
  }

  // ---------- input ----------
  const overMachine = (e, pad = 0) => {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top, q = zoom.rect;
    return !!q && x > q.l - pad && x < q.r + pad && y > q.t - pad && y < q.b + pad;
  };
  const onMove = (e) => {
    ptr.tx = (e.clientX / window.innerWidth) * 2 - 1;
    ptr.ty = (e.clientY / window.innerHeight) * 2 - 1;
    const d = view.drag;
    if (d) {
      view.to.yaw = d.yaw + ((e.clientX - d.x) / size.w) * Math.PI * 2;
      view.to.pitch = Math.max(-1.2, Math.min(1.2, d.pitch + ((e.clientY - d.y) / size.h) * Math.PI));
    } else if (e.pointerType === "mouse") {
      const over = overMachine(e, zoom.on ? 60 : 0);
      setZoom(over && state.hoverable && !size.mobile);
      canvas.style.cursor = over ? "grab" : "";
    }
    if (!running) frame(performance.now());
  };
  const onDown = (e) => {
    if (e.button !== 0 || !overMachine(e)) return;
    view.drag = { x: e.clientX, y: e.clientY, yaw: view.to.yaw, pitch: view.to.pitch, id: e.pointerId };
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
    e.preventDefault();
  };
  const onUp = (e) => {
    if (!view.drag || e.pointerId !== view.drag.id) return;
    view.drag = null;
    canvas.style.cursor = overMachine(e) ? "grab" : "";
  };
  // Plain wheel keeps scrolling the tour; a trackpad pinch (sent as Ctrl + wheel) or Ctrl + wheel zooms.
  const onWheel = (e) => {
    if (!e.ctrlKey || !overMachine(e)) return;
    e.preventDefault();
    view.to.dolly = Math.max(0.45, Math.min(1.8, view.to.dolly * Math.exp(e.deltaY * 0.01)));
  };
  const onLeave = () => setZoom(false);
  canvas.style.touchAction = "pan-y";
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });

  let raf = 0;
  let running = false;
  const loop = (t) => {
    frame(t);
    raf = requestAnimationFrame(loop);
  };

  return {
    resize(w, h) {
      size.w = Math.max(1, w);
      size.h = Math.max(1, h);
      size.mobile = w < 760;
      renderer.setSize(size.w, size.h, false);
      camera.aspect = size.w / size.h;
      size.fit = size.mobile ? Math.min(0.7, (w / h) * 1.15) : Math.min(1.05, w / h / 1.55);
      if (w > 900) camera.setViewOffset(w, h, -w * 0.15, h * 0.02, w, h);
      else camera.setViewOffset(w, h, 0, h * 0.17, w, h);
      camera.updateProjectionMatrix();
      if (!running) frame(performance.now());
    },
    set(s) {
      Object.assign(target, s);
      for (const kk in s) if (!DAMPED.includes(kk)) state[kk] = s[kk];
      if (s.steps && s.steps !== poses.length) setPoses(s.steps);
      if (!running) frame(performance.now());
    },
    onZoom(cb) {
      zoom.cb = cb;
    },
    theme() {
      readTheme();
      if (!running) frame(performance.now());
    },
    start() {
      if (running) return;
      running = true;
      perf.last = 0;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    dispose() {
      this.stop();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("wheel", onWheel);
      scene.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose?.();
      });
      screenTex.dispose();
      scene.environment?.dispose();
      renderer.dispose();
      overlay.replaceChildren();
    },
  };
}
