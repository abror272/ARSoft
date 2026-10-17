import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import ParticleField from "./ParticleField";

/**
 * Three.js fon: 3D zarralar "globusi".
 *
 * Asosiy tushunchalar:
 *  - Scene      -> sahna (obyektlar konteyneri)
 *  - Camera     -> ko'rinish nuqtasi
 *  - Renderer   -> har bir kadrni canvas'ga chizadi
 *  - Geometry   -> shakl (bu yerda: zarrachalar koordinatalari)
 *  - Material   -> sirt/ rang/ shaffoflik qoidalari
 *  - Mesh/Points/LineSegments -> geometry + material juftligi
 *
 * Hamma hisob-kitob GPU'da (vertex buffer) bo'ladi; JS har kadrda faqat
 * guruhni aylantiradi, shuning uchun 2D canvas'dan arzonroq ishlaydi.
 */
export default function ThreeField({ fallback = null }: { fallback?: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- 1. Renderer -------------------------------------------------
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebgl(false); // WebGL yo'q -> 2D fallback
      return;
    }
    setWebgl(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    // --- 2. Sahna va kamera -----------------------------------------
    const scene = new THREE.Scene();
    // Uzoq nuqtalar xiralashadi — hajm (depth) hissi beradi
    scene.fog = new THREE.FogExp2(0x0b1210, 0.011);
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
    camera.position.set(0, 0, 30);

    const group = new THREE.Group();
    group.rotation.set(0.18, 0, -0.08);
    scene.add(group);

    // --- 3. Zarrachalar geometriyasi ---------------------------------
    // Fibonachchi sferasi: nuqtalar yuzaga teng taqsimlanadi.
    const COUNT = isMobile ? 320 : 620;
    const RADIUS = 11;
    const SHELL_MAX = 1.15;
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const LIME = new THREE.Color("#c6f24e");
    const CREAM = new THREE.Color("#ede8dc");
    const CORAL = new THREE.Color("#ff5c39");
    const SAGE = new THREE.Color("#7e967e");

    for (let i = 0; i < COUNT; i += 1) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * GOLDEN;
      const rr = RADIUS * (0.8 + Math.random() * (SHELL_MAX - 0.8));

      positions[i * 3] = Math.cos(theta) * ring * rr;
      positions[i * 3 + 1] = y * rr;
      positions[i * 3 + 2] = Math.sin(theta) * ring * rr;

      const roll = Math.random();
      const c = roll > 0.94 ? CORAL : roll > 0.82 ? CREAM : roll > 0.7 ? SAGE : LIME;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Yumaloq nuqta uchun radial-gradient tekstura (canvas'da chiziladi)
    const dot = document.createElement("canvas");
    dot.width = dot.height = 64;
    const dctx = dot.getContext("2d")!;
    const grad = dctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.9)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    dctx.fillStyle = grad;
    dctx.fillRect(0, 0, 64, 64);
    const dotTex = new THREE.CanvasTexture(dot);
    dotTex.colorSpace = THREE.SRGBColorSpace;

    const pointsMat = new THREE.PointsMaterial({
      size: 0.5,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.62 : 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      fog: true,
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    // --- 4. Bog'lanish chiziqlari (bir marta hisoblanadi) ------------
    const lineVerts: number[] = [];
    const MAX_DIST = 2.3;
    const MAX_PER_POINT = 2;
    const MAX_D2 = MAX_DIST * MAX_DIST;

    for (let i = 0; i < COUNT; i += 1) {
      let made = 0;
      for (let j = i + 1; j < COUNT && made < MAX_PER_POINT; j += 1) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz > MAX_D2) continue;
        lineVerts.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
        );
        made += 1;
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc6f24e,
      transparent: true,
      opacity: isMobile ? 0.06 : 0.08,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: true,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // --- 5. O'lcham va sichqoncha parallaksi --------------------------
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);

      // Globus ekranning ~65% ini egallashi uchun masshtab
      const vFov = (camera.fov * Math.PI) / 180;
      const viewH = 2 * Math.tan(vFov / 2) * camera.position.z;
      const viewW = viewH * camera.aspect;
      group.scale.setScalar((Math.min(viewH, viewW) * 0.33) / (RADIUS * SHELL_MAX));
    };
    resize();

    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      const t = clock.getElapsedTime();

      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;

      group.rotation.y = t * 0.055 + pointer.x * 0.4;
      group.rotation.x = Math.sin(t * 0.13) * 0.07 + 0.18 + pointer.y * 0.22;
      group.position.y = (isMobile ? 7 : 0) + Math.sin(t * 0.4) * 0.4;
      pointsMat.size = 0.5 + Math.sin(t * 0.9) * 0.04;

      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    document.addEventListener("pointermove", onPointer, { passive: true });

    if (reduced) {
      render(); // harakat yo'q: bitta statik kadr
    } else {
      raf = requestAnimationFrame(loop);
    }

    // --- 6. Tozalash (component unmount bo'lganda) -------------------
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", onPointer);
      pointsGeo.dispose();
      pointsMat.dispose();
      dotTex.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  if (webgl === false) return <>{fallback}</>;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 z-0 block h-full w-full pointer-events-none transition-opacity duration-1000 ${
        webgl ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
