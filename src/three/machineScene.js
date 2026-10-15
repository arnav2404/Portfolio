import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// An original, procedurally built engine. It renders as polished metal, turns into a technical
// line drawing on "paper", and comes apart layer by layer. Every part knows its layer and the
// direction it travels when exploded, so scroll can take it apart and put it back together.

export const PAPER = "#e7e4dc";
// Layer colours, tuned to read on paper. Index 0 is the plain ink colour.
export const LAYER_INK = ["#1d2026", "#4f7300", "#0b8295", "#6b4fd8", "#cf4b2a", "#a86f00"];

const Z = new THREE.Vector3(0, 0, 1);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const ease = (t) => t * t * (3 - 2 * t);

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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  camera.position.set(0, 0, 17);

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
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

  // ---------- 2 · Workflow: drive gear and timing rings ----------
  const gearOut = [0, 3.1, 1.5];
  part(ring(1.18, 1.62, 0.85, 1.2, 96), { layer: 2, out: gearOut, delay: 0.1, spin: 0.25 });
  part(around(44, () => box(0.13, 0.2, 0.3), 1.62, 1.02), { layer: 2, out: gearOut, delay: 0.1, spin: 0.25 });
  part(around(6, () => box(0.14, 1.0, 0.16).translate(0, -0.5, 0), 1.2, 1.02, 0.3), { layer: 2, kind: "light", out: gearOut, delay: 0.1, spin: 0.25 });
  part(ring(0.22, 0.42, 0.88, 1.18, 48), { layer: 2, kind: "light", out: gearOut, delay: 0.1, spin: 0.25 });
  part(ring(1.42, 1.7, 0.55, 0.75, 96), { layer: 2, kind: "light", out: [0, 0, 1.6], delay: 0.15, spin: -0.15 });
  part(around(36, () => box(0.05, 0.08, 0.2), 1.7, 0.65), { layer: 2, out: [0, 0, 1.6], delay: 0.15, spin: -0.15 });

  // ---------- 3 · Data core: main body, hex collar, memory cells ----------
  const core = part(stepped(0.6, [[1.18, -1.05], [1.3, -0.9], [1.22, -0.55], [1.32, -0.45], [1.22, 0.1], [1.3, 0.2], [1.14, 0.55]], 96), { layer: 3 });
  part(toZ(new THREE.CylinderGeometry(1.5, 1.5, 0.32, 8)).translate(0, 0, -0.18), { layer: 3, kind: "light", out: [0, 0, 0.3] });
  part(around(10, () => box(0.34, 0.14, 0.42), 1.28, -0.75, 0.1), { layer: 3, out: [0, 0, -0.2], delay: 0.05 });
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
  }

  // ---------- 5 · Security: rear housing, bolt ring, cage, base plate ----------
  part(stepped(0.9, [[1.75, -2.45], [1.95, -2.3], [1.62, -2.1], [1.42, -1.5], [1.5, -1.35], [1.3, -1.05]], 96), { layer: 5, out: [0, 0, -2.6], delay: 0.1 });
  part(around(12, () => toZ(new THREE.CylinderGeometry(0.09, 0.09, 0.22, 6)), 1.84, -2.1), { layer: 5, kind: "light", out: [0, 0, -3.3], delay: 0.15 });
  part(around(6, () => rod(0.045, 1.9, 8), 1.66, -0.15, Math.PI / 6), { layer: 5, kind: "light", out: [0, 0, -1.4], delay: 0.2 });
  part(mergeGeometries([ring(0.3, 1.6, -2.85, -2.6, 96), around(8, () => rod(0.13, 0.3, 12), 1.1, -2.72)]), { layer: 5, out: [0, 0, -4.4], delay: 0.3 });

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
  function drawScreen(t) {
    const a = colors.accent;
    const css = (al) => `rgba(${(a.r * 255) | 0},${(a.g * 255) | 0},${(a.b * 255) | 0},${al})`;
    sctx.fillStyle = "#0b0d11";
    sctx.fillRect(0, 0, 256, 256);
    for (let y = 30; y < 226; y += 5) {
      const k = (y - 128) / 98;
      const w = (1 - k * k) * (70 + 22 * Math.sin(y * 0.06 + t * 1.3) + 14 * Math.sin(y * 0.15 - t));
      sctx.fillStyle = css(0.18 + 0.25 * (1 - Math.abs(k)));
      sctx.fillRect(128 - w, y, w * 2, 2);
    }
    sctx.fillStyle = css(1);
    for (let x = 40; x < 216; x += 7) {
      const y = 128 + 38 * Math.sin(x * 0.035 + t * 1.6) * Math.cos(x * 0.011 - t * 0.4);
      sctx.beginPath();
      sctx.arc(x, y, 2.4, 0, Math.PI * 2);
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

  // ---------- overlay: leader-line labels for the toolbox, tags for exploded layers ----------
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "absolute inset-0 h-full w-full text-ink-3");
  overlay.appendChild(svg);
  const anchorParts = parts.filter((p) => p.kind === "light" || p === core);
  const toolbox = [...labelText.toolboxRight.map((t) => ({ t, side: "r" })), ...labelText.toolboxLeft.map((t) => ({ t, side: "l" }))].map((l, i) => {
    const line = document.createElementNS(svgNS, "polyline");
    line.setAttribute("fill", "none");
    line.setAttribute("stroke", "currentColor");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);
    const el = document.createElement("div");
    el.className = "absolute left-0 top-0 whitespace-nowrap font-mono text-[11px] text-ink-2";
    el.textContent = l.t;
    el.style.opacity = "0";
    overlay.appendChild(el);
    return { ...l, el, line, anchor: anchorParts[(i * 5 + 2) % anchorParts.length], width: 0 };
  });
  const layerTags = labelText.layers.map((t, i) => {
    const el = document.createElement("div");
    el.className = "absolute left-0 top-0 flex items-center gap-2 whitespace-nowrap font-mono text-[11px]";
    const dot = document.createElement("span");
    dot.className = "h-2 w-2 rounded-full";
    dot.style.background = LAYER_INK[i + 1];
    const label = document.createElement("span");
    label.textContent = t;
    el.append(dot, label);
    el.style.opacity = "0";
    el.style.color = LAYER_INK[i + 1];
    overlay.appendChild(el);
    const own = parts.filter((p) => p.layer === i + 1);
    return { el, anchor: own.find((p) => p.kind === "light") || own[0] };
  });

  // ---------- poses: one orientation per step, slerped by scroll ----------
  const state = { b: 0, explode: 0, toolbox: 0, tags: 0, focus: 0, pose: 0, progress: 0 };
  const poses = [];
  const pose = (x, y, z, roll = 0) =>
    new THREE.Quaternion().setFromUnitVectors(Z, new THREE.Vector3(x, y, z).normalize()).multiply(new THREE.Quaternion().setFromAxisAngle(Z, roll));
  const setPoses = (n) => {
    poses.length = 0;
    poses.push(pose(0.42, 0.28, 1)); // looking into the lens
    poses.push(pose(-0.72, 0.62, 0.4, 0.4)); // blueprint, lens up and to the left
    for (let i = 0; i < n - 3; i++) poses.push(pose(-0.95 + i * 0.06, 0.32 - i * 0.04, 0.42 + i * 0.03, 0.6 + i * 0.12)); // exploded
    poses.push(pose(-0.35, 0.22, 1, 1.4)); // reassembled
  };
  setPoses(8);

  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const size = { w: 1, h: 1, mobile: false, fit: 1 };
  const qA = new THREE.Quaternion();
  const qP = new THREE.Quaternion();
  const eul = new THREE.Euler();
  const v = new THREE.Vector3();
  const pt = { x: 0, y: 0 };
  const project = (p) => {
    v.copy(p.center);
    p.g.localToWorld(v);
    v.project(camera);
    pt.x = (v.x * 0.5 + 0.5) * size.w;
    pt.y = (-v.y * 0.5 + 0.5) * size.h;
    return pt;
  };

  function frame(t) {
    const { b, explode, focus } = state;
    ptr.x += (ptr.tx - ptr.x) * 0.06;
    ptr.y += (ptr.ty - ptr.y) * 0.06;

    const pi = Math.min(poses.length - 1, Math.max(0, state.pose));
    const i0 = Math.floor(pi);
    qA.copy(poses[i0]).slerp(poses[Math.min(poses.length - 1, i0 + 1)], ease(clamp01((pi - i0 - 0.15) / 0.7)));
    qP.setFromEuler(eul.set(ptr.y * 0.12, ptr.x * 0.18, 0));
    machine.quaternion.copy(qP).multiply(qA);
    spinner.rotation.z = state.progress * 2.2 + t * 0.00004;
    machine.scale.setScalar(size.fit * (1 - 0.34 * ease(clamp01(explode))));
    machine.position.x = size.mobile ? 0 : 1.1 * ease(clamp01(explode));

    for (const p of parts) {
      const e = ease(clamp01(explode * 1.4 - p.delay));
      p.g.position.copy(p.out).multiplyScalar(e * 0.85);
      if (p.spin) p.g.rotation.z = t * 0.0002 * p.spin + e * p.spin * 3;
      p.hl += ((focus && p.layer === focus ? 1 : 0) - p.hl) * 0.12;
      const m = p.mesh.material;
      m.color.copy(p.base).lerp(black, b);
      m.emissive.copy(paper).multiplyScalar(b);
      m.metalness = (p.kind === "light" ? 0.55 : 0.7) * (1 - b);
      m.roughness = 0.4 + 0.6 * b;
      const lm = p.lines.material;
      lm.color.copy(tmpColor.set(colors.dark ? 0xffffff : 0xd9dce4)).lerp(inkCols[0], b).lerp(inkCols[p.layer], p.hl * b);
      lm.opacity = (0.13 + 0.7 * b) * (!focus || p.layer === focus ? 1 : 0.28) + p.hl * 0.1;
    }

    const g = 1 - b;
    ringMat.opacity = g;
    haloMat.opacity = 0.22 * g;
    tickMat.opacity = 0.3 * g;
    screenMat.opacity = g;
    starMat.opacity = 0.5 * g * (colors.dark ? 1 : 0.4);
    heart.material.opacity = 0.6 * g;
    heart.material.color.copy(colors.accent);
    heart.rotation.set(t * 0.0003, t * 0.0005, 0);
    const be = ease(clamp01(explode * 1.4));
    glow.position.set(0, 0, 2.8).addScaledVector(bezelOut, be * 0.85);
    screen.position.set(0, 0, 2.32).addScaledVector(bezelOut, be * 0.85);
    heart.position.set(0, 0, 1.7).addScaledVector(bezelOut, be * 0.6);
    if (g > 0.01) drawScreen(t / 1000);

    renderer.render(scene, camera);

    // labels follow the parts they point at
    const showTool = state.toolbox > 0.01 && !size.mobile;
    svg.style.opacity = showTool ? state.toolbox : 0;
    const right = toolbox.filter((l) => l.side === "r");
    const left = toolbox.filter((l) => l.side === "l");
    for (const l of toolbox) {
      l.el.style.opacity = showTool ? state.toolbox : 0;
      if (!showTool) continue;
      if (!l.width) l.width = l.el.offsetWidth;
      const list = l.side === "r" ? right : left;
      const k = list.indexOf(l);
      const y = l.side === "r" ? 112 + k * 19 : size.h - 48 - (list.length - 1 - k) * 19;
      const x = l.side === "r" ? size.w - 32 - l.width : 32;
      l.el.style.transform = `translate(${x}px, ${y - 8}px)`;
      project(l.anchor);
      const sx = l.side === "r" ? x - 8 : x + l.width + 8;
      const elbow = l.side === "r" ? Math.max(pt.x + 30, sx - 120 - k * 34) : Math.min(pt.x - 30, sx + 140 + (list.length - k) * 40);
      l.line.setAttribute("points", `${sx},${y} ${elbow},${y} ${pt.x},${pt.y}`);
    }
    layerTags.forEach((tag, i) => {
      const a = state.tags * (!focus || focus === i + 1 ? 1 : size.mobile ? 0 : 0.5);
      tag.el.style.opacity = a;
      if (a <= 0.01) return;
      project(tag.anchor);
      tag.el.style.transform = `translate(${pt.x + 14}px, ${pt.y - 22}px)`;
      tag.el.style.fontWeight = focus === i + 1 ? "700" : "400";
    });
  }

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
      toolbox.forEach((l) => (l.width = 0));
      if (!running) frame(performance.now());
    },
    set(s) {
      Object.assign(state, s);
      if (s.steps && s.steps !== poses.length) setPoses(s.steps);
      if (!running) frame(performance.now());
    },
    pointer(x, y) {
      ptr.tx = x;
      ptr.ty = y;
    },
    theme() {
      readTheme();
      if (!running) frame(performance.now());
    },
    start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    dispose() {
      this.stop();
      scene.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose?.();
      });
      screenTex.dispose();
      renderer.dispose();
      overlay.replaceChildren();
    },
  };
}
