/*
 * Hero scene — a calm, slowly drifting field of light points with faint
 * geometric structure. Designed to read as precise and steady rather than
 * flashy: slow motion, soft fog, restrained palette.
 */
import * as THREE from "../vendor/three.module.min.js";

const PALETTE = {
  fog: 0x0a1b33,
  low: new THREE.Color(0x16335c),
  mid: new THREE.Color(0x2ec8b5),
  high: new THREE.Color(0xbdf3ec),
  wire: 0x5ce4d3,
};

export function initHeroScene(container) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch (err) {
    container.classList.add("no-webgl");
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(PALETTE.fog, 18, 58);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
  const camHome = new THREE.Vector3(0, 6.5, 26);
  camera.position.copy(camHome);
  camera.lookAt(0, 1.5, 0);

  /* ---- Wave field ------------------------------------------------------ */
  const COLS = 150;
  const ROWS = 85;
  const SPACING = 0.62;
  const count = COLS * ROWS;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const base = []; // unchanging x/z per point

  let i = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = (c - COLS / 2) * SPACING;
      const z = (r - ROWS / 2) * SPACING - 6;
      base.push(x, z);
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;
      i++;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  points.position.y = -2.2;
  scene.add(points);

  function waveHeight(x, z, t) {
    return (
      Math.sin(x * 0.16 + t * 0.45) * Math.cos(z * 0.13 + t * 0.32) * 1.35 +
      Math.sin((x + z) * 0.06 + t * 0.18) * 0.9 +
      Math.sin(x * 0.04 - t * 0.1) * 0.5
    );
  }

  const tmp = new THREE.Color();
  function updateField(t) {
    const pos = geometry.attributes.position.array;
    const col = geometry.attributes.color.array;
    for (let p = 0; p < count; p++) {
      const x = base[p * 2];
      const z = base[p * 2 + 1];
      const y = waveHeight(x, z, t);
      pos[p * 3 + 1] = y;

      // height → color: deep navy valleys, teal crests, icy peaks
      const n = THREE.MathUtils.clamp((y + 2.4) / 4.8, 0, 1);
      if (n < 0.62) {
        tmp.copy(PALETTE.low).lerp(PALETTE.mid, n / 0.62);
      } else {
        tmp.copy(PALETTE.mid).lerp(PALETTE.high, (n - 0.62) / 0.38);
      }
      col[p * 3] = tmp.r;
      col[p * 3 + 1] = tmp.g;
      col[p * 3 + 2] = tmp.b;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  }

  /* ---- Faint structural wireframes ------------------------------------ */
  const wires = new THREE.Group();
  const wireMat = new THREE.LineBasicMaterial({
    color: PALETTE.wire,
    transparent: true,
    opacity: 0.07,
  });
  const specs = [
    { radius: 5.5, detail: 1, pos: [13, 6, -10], spin: 0.05 },
    { radius: 2.6, detail: 0, pos: [-15, 8, -16], spin: -0.08 },
  ];
  for (const s of specs) {
    const geo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(s.radius, s.detail));
    const mesh = new THREE.LineSegments(geo, wireMat);
    mesh.position.set(...s.pos);
    mesh.userData.spin = s.spin;
    wires.add(mesh);
  }
  scene.add(wires);

  /* ---- Sizing ---------------------------------------------------------- */
  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  /* ---- Parallax -------------------------------------------------------- */
  const target = { x: 0, y: 0 };
  if (!reducedMotion) {
    window.addEventListener(
      "pointermove",
      (e) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );
  }

  /* ---- Render loop ----------------------------------------------------- */
  const clock = new THREE.Clock();
  let rafId = null;
  let inView = true;

  function frame() {
    rafId = null;
    const t = clock.getElapsedTime();
    updateField(t);

    for (const w of wires.children) {
      w.rotation.y = t * w.userData.spin;
      w.rotation.x = t * w.userData.spin * 0.6;
    }

    camera.position.x += (target.x * 1.4 - camera.position.x) * 0.03;
    camera.position.y += (camHome.y + target.y * -0.8 - camera.position.y) * 0.03;
    camera.lookAt(0, 1.5, 0);

    renderer.render(scene, camera);
    schedule();
  }

  function schedule() {
    if (reducedMotion || document.hidden || !inView || rafId !== null) return;
    rafId = requestAnimationFrame(frame);
  }

  if (reducedMotion) {
    // Single composed frame; no animation.
    updateField(2.5);
    renderer.render(scene, camera);
  } else {
    document.addEventListener("visibilitychange", schedule);
    new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        schedule();
      },
      { threshold: 0 }
    ).observe(container);
    schedule();
  }
}
