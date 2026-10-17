import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection } from "geojson";
import world from "world-atlas/countries-110m.json";
import ParticleField from "./ParticleField";

/**
 * THREE.JS — 3D YER SHARI
 *
 * Scroll 0  -> butun dunyo ko'rinadi, Xiva (Xorazm)dan barcha qit'alarga
 *              "algoritm" aloqalari tarqalgan.
 * Scroll 1  -> kamera yaqinlashadi, globus burilib Xiva markazga keladi va
 *              "XIVA / XORAZM" belgisi chiqadi.
 *
 * Asosiy tushunchalar:
 *   Scene / Camera / Renderer  — sahna, ko'rish nuqtasi, chizuvchi
 *   BufferGeometry             — barcha nuqtalar bitta Float32Array'da (GPU)
 *   LineSegments               — davlat chegaralari (juft nuqtalar)
 *   Points                     — yulduzlar va harakatlanuvchi impulslar
 *   ShaderMaterial             — atmosfera halqasi (fresnel glow)
 *   Quaternion.slerp           — globusning silliq burilishi
 */

// Xiva (Xorazm) — Al-Xorazmiy vatani
const KHIVA = { lon: 60.3639, lat: 41.3783 };

// Dunyoning yirik texnologiya markazlari (lon, lat)
const DESTINATIONS: [number, number][] = [
  [-122.08, 37.42], // AQSh — Silicon Valley
  [-79.38, 43.65], // Kanada — Toronto
  [-46.63, -23.55], // Braziliya — San-Paulu
  [-0.13, 51.51], // Buyuk Britaniya — London
  [2.35, 48.86], // Fransiya — Parij
  [13.4, 52.52], // Germaniya — Berlin
  [37.62, 55.75], // Rossiya — Moskva
  [28.98, 41.01], // Turkiya — Istanbul
  [31.24, 30.04], // Misr — Qohira
  [46.72, 24.71], // Saudiya — Ar-Riyod
  [77.59, 12.97], // Hindiston — Bangalor
  [116.4, 39.9], // Xitoy — Pekin
  [139.69, 35.68], // Yaponiya — Tokio
  [126.99, 37.55], // Koreya — Seul
  [103.82, 1.35], // Singapur
  [151.2, -33.87], // Avstraliya — Sidney
  [28.04, -26.2], // Janubiy Afrika — Yoxannesburg
  [76.9, 43.24], // Qozog'iston — Olmaota
  [-99.13, 19.43], // Meksika — Mexiko
  [72.88, 19.08], // Hindiston — Mumbay
];

const DEG = Math.PI / 180;
const END_DIST = 1.75;

/** Uzunlik/kenglik -> sfera ustidagi nuqta */
function lonLatToVec3(lon: number, lat: number, r: number, out = new THREE.Vector3()) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  const sp = Math.sin(phi);
  return out.set(-r * sp * Math.cos(theta), r * Math.cos(phi), r * sp * Math.sin(theta));
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Yumshoq yorug' nuqta teksturasi (yulduz / impuls / marker uchun) */
function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function GlobeField({ fallback = null }: { fallback?: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      setWebgl(false);
      return;
    }
    setWebgl(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));

    const trash: { dispose: () => void }[] = [];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 400);

    // ---------- Yulduzlar -------------------------------------------------
    const glowTex = makeGlowTexture();
    trash.push(glowTex);

    const STAR_COUNT = isMobile ? 700 : 1800;
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    const starWhite = new THREE.Color("#ffffff");
    const starLime = new THREE.Color("#c6f24e");
    for (let i = 0; i < STAR_COUNT; i += 1) {
      const v = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize().multiplyScalar(28 + Math.random() * 70);
      starPos.set([v.x, v.y, v.z], i * 3);
      const c = starWhite.clone().lerp(starLime, Math.random() * 0.6);
      const dim = 0.35 + Math.random() * 0.65;
      starCol.set([c.r * dim, c.g * dim, c.b * dim], i * 3);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starCol, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.42,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    trash.push(starGeo, starMat);
    const stars = new THREE.Points(starGeo, starMat);
    stars.renderOrder = -1;
    scene.add(stars);

    // ---------- Globus ----------------------------------------------------
    const earth = new THREE.Group();
    scene.add(earth);

    const earthGeo = new THREE.SphereGeometry(1, 96, 64);
    const earthMat = new THREE.MeshBasicMaterial({ color: 0x070f0c });
    trash.push(earthGeo, earthMat);
    earth.add(new THREE.Mesh(earthGeo, earthMat));

    // Davlat chegaralari (TopoJSON -> GeoJSON -> chiziqlar)
    const topo = world as unknown as Topology<{ countries: GeometryCollection }>;
    const countries = feature(topo, topo.objects.countries) as unknown as FeatureCollection;

    const borderVerts: number[] = [];
    const addRing = (ring: number[][]) => {
      for (let i = 0; i < ring.length - 1; i += 1) {
        const [lon1, lat1] = ring[i];
        const [lon2, lat2] = ring[i + 1];
        if (Math.abs(lon1 - lon2) > 180) continue; // antimeridian sakrashi
        const a = lonLatToVec3(lon1, lat1, 1.002);
        const b = lonLatToVec3(lon2, lat2, 1.002);
        borderVerts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    };
    for (const f of countries.features) {
      const geo = f.geometry;
      if (!geo) continue;
      if (geo.type === "Polygon") {
        geo.coordinates.forEach((ring) => addRing(ring as number[][]));
      } else if (geo.type === "MultiPolygon") {
        geo.coordinates.forEach((poly) => poly.forEach((ring) => addRing(ring as number[][])));
      }
    }

    const borderGeo = new THREE.BufferGeometry();
    borderGeo.setAttribute("position", new THREE.Float32BufferAttribute(borderVerts, 3));
    const borderMat = new THREE.LineBasicMaterial({
      color: 0xc6f24e,
      transparent: true,
      opacity: 0.26,
      depthWrite: false,
    });
    trash.push(borderGeo, borderMat);
    earth.add(new THREE.LineSegments(borderGeo, borderMat));

    // Meridian / parallellar (juda nozik to'r)
    const gratVerts: number[] = [];
    const gratSeg = (lon1: number, lat1: number, lon2: number, lat2: number) => {
      const a = lonLatToVec3(lon1, lat1, 1.001);
      const b = lonLatToVec3(lon2, lat2, 1.001);
      gratVerts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    };
    for (let lat = -60; lat <= 60; lat += 30) {
      for (let lon = -180; lon < 180; lon += 6) gratSeg(lon, lat, lon + 6, lat);
    }
    for (let lon = -180; lon < 180; lon += 30) {
      for (let lat = -84; lat < 84; lat += 6) gratSeg(lon, lat, lon, lat + 6);
    }
    const gratGeo = new THREE.BufferGeometry();
    gratGeo.setAttribute("position", new THREE.Float32BufferAttribute(gratVerts, 3));
    const gratMat = new THREE.LineBasicMaterial({
      color: 0x7e967e,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    trash.push(gratGeo, gratMat);
    earth.add(new THREE.LineSegments(gratGeo, gratMat));

    // Atmosfera halqasi (fresnel glow)
    const atmGeo = new THREE.SphereGeometry(1.035, 64, 48);
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color("#9ad14a") } },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vNormal;
        uniform vec3 uColor;
        void main() {
          float rim = pow(clamp(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 3.0);
          gl_FragColor = vec4(uColor, 1.0) * rim * 0.55;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    trash.push(atmGeo, atmMat);
    earth.add(new THREE.Mesh(atmGeo, atmMat));

    // ---------- Xiva -> dunyo yoylari -------------------------------------
    const khivaDir = lonLatToVec3(KHIVA.lon, KHIVA.lat, 1);
    const khivaAt = khivaDir.clone().multiplyScalar(1.004);

    const arcVerts: number[] = [];
    const arcCols: number[] = [];
    const curves: THREE.QuadraticBezierCurve3[] = [];
    const cLime = new THREE.Color("#c6f24e");
    const cCream = new THREE.Color("#ede8dc");

    for (const [lon, lat] of DESTINATIONS) {
      const to = lonLatToVec3(lon, lat, 1.004);
      const dist = khivaAt.distanceTo(to);
      const mid = khivaAt.clone().add(to).normalize().multiplyScalar(1 + dist * 0.34);
      const curve = new THREE.QuadraticBezierCurve3(khivaAt.clone(), mid, to);
      curves.push(curve);

      const SEG = 48;
      for (let i = 0; i < SEG; i += 1) {
        const a = curve.getPoint(i / SEG);
        const b = curve.getPoint((i + 1) / SEG);
        arcVerts.push(a.x, a.y, a.z, b.x, b.y, b.z);
        const c1 = cLime.clone().lerp(cCream, i / SEG);
        const c2 = cLime.clone().lerp(cCream, (i + 1) / SEG);
        arcCols.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
      }
    }

    const arcGeo = new THREE.BufferGeometry();
    arcGeo.setAttribute("position", new THREE.Float32BufferAttribute(arcVerts, 3));
    arcGeo.setAttribute("color", new THREE.Float32BufferAttribute(arcCols, 3));
    const arcMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    trash.push(arcGeo, arcMat);
    earth.add(new THREE.LineSegments(arcGeo, arcMat));

    // Yoylar bo'ylab harakatlanuvchi impulslar
    const pulsePos = new Float32Array(curves.length * 3);
    for (let i = 0; i < curves.length; i += 1) {
      const p = curves[i].getPoint((i * 0.41) % 1);
      pulsePos.set([p.x, p.y, p.z], i * 3);
    }
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 0.022,
      map: glowTex,
      color: 0xff5c39,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    trash.push(pulseGeo, pulseMat);
    earth.add(new THREE.Points(pulseGeo, pulseMat));

    // ---------- Xiva markazidagi belgi ------------------------------------
    const marker = new THREE.Group();
    marker.position.copy(khivaAt);
    marker.lookAt(khivaDir.clone().multiplyScalar(3));

    const dotGeo = new THREE.CircleGeometry(0.009, 24);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0xff5c39,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    trash.push(dotGeo, dotMat);
    marker.add(new THREE.Mesh(dotGeo, dotMat));

    const ringGeo = new THREE.RingGeometry(0.019, 0.023, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc6f24e,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    trash.push(ringGeo, ringMat);
    const ring = new THREE.Mesh(ringGeo, ringMat);
    marker.add(ring);

    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: 0xff5c39,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    halo.scale.setScalar(0.12);
    trash.push(halo.material);
    marker.add(halo);

    earth.add(marker);

    // ---------- Boshlang'ich / yakuniy burilish ----------------------------
    const qEnd = new THREE.Quaternion().setFromUnitVectors(khivaDir, new THREE.Vector3(0, 0, 1));
    const qStart = qEnd.clone().multiply(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0.14, 0.95, 0, "YXZ")),
    );
    earth.quaternion.copy(qStart);

    // ---------- Scroll -> kamera ------------------------------------------
    // Zoom "Xorazm darvozasi" bo'limigacha davom etadi (Hero -> gate -> About)
    let gateTop = window.innerHeight;

    const scrollTarget = () => {
      const vh = window.innerHeight;
      const start = gateTop - vh * 0.85;
      const span = vh * 0.85;
      return Math.min(1, Math.max(0, (window.scrollY - start) / span));
    };

    let progress = scrollTarget();
    let fitDist = 3;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);

      const vFov = camera.fov * DEG;
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      const eff = Math.min(vFov, hFov);
      fitDist = 1 / Math.sin(eff / 2) / 0.86; // globus ekranning ~86% i

      const gate = document.querySelector("[data-khorezm-gate]");
      gateTop = gate ? gate.getBoundingClientRect().top + window.scrollY : window.innerHeight;
    };

    const clock = new THREE.Clock();
    let raf = 0;
    let lastDim = -1;

    const render = () => {
      const time = clock.getElapsedTime();
      progress += (scrollTarget() - progress) * 0.1;
      const e = progress * progress * (3 - 2 * progress);

      earth.quaternion.slerpQuaternions(qStart, qEnd, e);
      camera.position.z = THREE.MathUtils.lerp(fitDist, END_DIST, e);
      camera.lookAt(0, 0, 0);

      if (!reduced) {
        // yoylardagi impulslar
        const attr = pulseGeo.getAttribute("position") as THREE.BufferAttribute;
        for (let i = 0; i < curves.length; i += 1) {
          const s = (time * 0.13 + i * 0.41) % 1;
          const p = curves[i].getPoint(s);
          attr.setXYZ(i, p.x, p.y, p.z);
        }
        attr.needsUpdate = true;

        // Xiva halqasi
        const cyc = (time * 0.55) % 1;
        ring.scale.setScalar(1 + cyc * 2.2);
        ringMat.opacity = 0.7 * (1 - cyc);
        halo.material.opacity = 0.4 + Math.sin(time * 2.4) * 0.15;
      }

      // canvas yorqinligi: Xivaga yetgach, kontent o'qilishi uchun sekin so'nadi
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const dim = 1 - 0.7 * smoothstep(gateTop + vh * 0.55, gateTop + vh * 1.5, sy);
      if (Math.abs(dim - lastDim) > 0.004) {
        canvas.style.opacity = dim.toFixed(3);
        lastDim = dim;
      }

      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      trash.forEach((item) => item.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  if (webgl === false) return <>{fallback}</>;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
