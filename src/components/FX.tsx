import { useEffect, useRef, useState } from "react";

/** Yashil yomg'ir — 6 soniyalik fullscreen effekt */
export function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const step = 18;
    const cols = Math.floor(w / step);
    const drops = Array.from({ length: cols }, () => Math.random() * -40);
    const chars = "アカサタナハマヤラワ01<>/*+-=ABRORDEV";

    const id = window.setInterval(() => {
      ctx.fillStyle = "rgba(11,18,16,0.16)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "15px 'JetBrains Mono', monospace";
      for (let i = 0; i < cols; i += 1) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.85 ? "#ff5c39" : "#c6f24e";
        ctx.fillText(ch, i * step, drops[i] * step);
        if (drops[i] * step > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    }, 45);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[75] pointer-events-none opacity-90 animate-[modalin_0.3s_ease]"
    />
  );
}

/** "TIZIMGA KIRILDI" glitch overlay */
export function GlitchOverlay() {
  return (
    <div
      className="fixed inset-0 z-[85] pointer-events-none animate-[shake_0.12s_infinite]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-coral/10" />
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          className="absolute inset-x-0 bg-lime/15 animate-[glitchslice_0.5s_steps(4)_infinite]"
          style={{
            top: `${(i * 13 + 4) % 100}%`,
            height: `${2 + (i % 3) * 2}%`,
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-display font-black text-[7vw] sm:text-4xl md:text-7xl text-coral tracking-tight px-4">
          TIZIMGA KIRILDI
        </p>
        <p className="font-term text-[10px] md:text-xs text-lime tracking-[0.4em] mt-4">
          // HAZIL. DEYARLI. //
        </p>
      </div>
    </div>
  );
}

/** Konfeti portlashi */
export function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = ["#c6f24e", "#ff5c39", "#ede8dc", "#7e967e"];
    const parts = Array.from({ length: 190 }, () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 320,
      y: window.innerHeight / 3,
      vx: (Math.random() - 0.5) * 15,
      vy: -Math.random() * 13 - 4,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
    }));

    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.vy += 0.32;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (t - t0 < 4200) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;
  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-[78] pointer-events-none" />;
}
