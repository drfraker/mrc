import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
 * A calm, slowly drifting field of light points with faint geometric
 * structure — tuned to read as precise and steady rather than flashy.
 * Honors prefers-reduced-motion and pauses when off-screen or hidden.
 */
const PALETTE = {
    fog: 0x0a1b33,
    low: new THREE.Color(0x16335c),
    mid: new THREE.Color(0x2ec8b5),
    high: new THREE.Color(0xbdf3ec),
    wire: 0x5ce4d3,
};

export default function HeroScene() {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = hostRef.current;

        if (!container) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        let renderer: THREE.WebGLRenderer;

        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'low-power',
            });
        } catch {
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

        // Wave field
        const COLS = 150;
        const ROWS = 85;
        const SPACING = 0.62;
        const count = COLS * ROWS;

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const base: number[] = [];

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
        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3),
        );
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

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

        const waveHeight = (x: number, z: number, t: number) =>
            Math.sin(x * 0.16 + t * 0.45) *
                Math.cos(z * 0.13 + t * 0.32) *
                1.35 +
            Math.sin((x + z) * 0.06 + t * 0.18) * 0.9 +
            Math.sin(x * 0.04 - t * 0.1) * 0.5;

        const tmp = new THREE.Color();
        const updateField = (t: number) => {
            const pos = geometry.attributes.position.array as Float32Array;
            const col = geometry.attributes.color.array as Float32Array;

            for (let p = 0; p < count; p++) {
                const x = base[p * 2];
                const z = base[p * 2 + 1];
                const y = waveHeight(x, z, t);
                pos[p * 3 + 1] = y;

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
        };

        // Faint structural wireframes
        const wires = new THREE.Group();
        const wireMat = new THREE.LineBasicMaterial({
            color: PALETTE.wire,
            transparent: true,
            opacity: 0.07,
        });
        const specs = [
            { radius: 5.5, detail: 1, pos: [13, 6, -10] as const, spin: 0.05 },
            {
                radius: 2.6,
                detail: 0,
                pos: [-15, 8, -16] as const,
                spin: -0.08,
            },
        ];

        for (const s of specs) {
            const geo = new THREE.WireframeGeometry(
                new THREE.IcosahedronGeometry(s.radius, s.detail),
            );
            const mesh = new THREE.LineSegments(geo, wireMat);
            mesh.position.set(s.pos[0], s.pos[1], s.pos[2]);
            mesh.userData.spin = s.spin;
            wires.add(mesh);
        }

        scene.add(wires);

        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;

            if (!w || !h) {
                return;
            }

            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const target = { x: 0, y: 0 };
        const onPointer = (e: PointerEvent) => {
            target.x = (e.clientX / window.innerWidth - 0.5) * 2;
            target.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };

        if (!reducedMotion) {
            window.addEventListener('pointermove', onPointer, {
                passive: true,
            });
        }

        const clock = new THREE.Clock();
        let rafId: number | null = null;
        let inView = true;
        let disposed = false;

        const frame = () => {
            rafId = null;
            const t = clock.getElapsedTime();
            updateField(t);

            for (const w of wires.children) {
                w.rotation.y = t * (w.userData.spin as number);
                w.rotation.x = t * (w.userData.spin as number) * 0.6;
            }

            camera.position.x += (target.x * 1.4 - camera.position.x) * 0.03;
            camera.position.y +=
                (camHome.y + target.y * -0.8 - camera.position.y) * 0.03;
            camera.lookAt(0, 1.5, 0);

            renderer.render(scene, camera);
            schedule();
        };

        const schedule = () => {
            if (
                reducedMotion ||
                disposed ||
                document.hidden ||
                !inView ||
                rafId !== null
            ) {
                return;
            }

            rafId = requestAnimationFrame(frame);
        };

        const onVisibility = () => schedule();
        let io: IntersectionObserver | null = null;

        if (reducedMotion) {
            updateField(2.5);
            renderer.render(scene, camera);
        } else {
            document.addEventListener('visibilitychange', onVisibility);
            io = new IntersectionObserver(
                (entries) => {
                    inView = entries[0].isIntersecting;
                    schedule();
                },
                { threshold: 0 },
            );
            io.observe(container);
            schedule();
        }

        return () => {
            disposed = true;

            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }

            ro.disconnect();
            io?.disconnect();
            window.removeEventListener('pointermove', onPointer);
            document.removeEventListener('visibilitychange', onVisibility);
            geometry.dispose();
            material.dispose();
            wireMat.dispose();
            wires.children.forEach((c) =>
                (c as THREE.LineSegments).geometry.dispose(),
            );
            renderer.dispose();

            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={hostRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full"
        />
    );
}
