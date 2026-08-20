import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import ParticleField from "./components/ParticleField";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Terminal from "./components/Terminal";
import Contact from "./components/Contact";
import { Confetti, GlitchOverlay, MatrixRain } from "./components/FX";
import { ArrowUp } from "./ui";

const BOOT_LINES: { s: "ok" | "warn" | "run"; t: string }[] = [
  { s: "ok", t: "abror.os v2.5 — xorazm build" },
  { s: "ok", t: "Kotlin runtime ... yuklandi" },
  { s: "run", t: "Rust toolchain ... o'rganilmoqda" },
  { s: "warn", t: "freelans so'rovlar bloklandi (o'z kompaniya)" },
  { s: "ok", t: "interfeys tayyor — xush kelibsiz!" },
];

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-hover
      aria-label="Yuqoriga"
      className="fixed bottom-6 right-6 z-[60] w-11 h-11 border border-lime/60 bg-ink/80 text-lime flex items-center justify-center hover:bg-lime hover:text-ink transition-colors duration-300 backdrop-blur"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [matrix, setMatrix] = useState(false);
  const [party, setParty] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (booted) return;
    const lineTimer = window.setInterval(() => {
      setVisibleLines((v) => Math.min(v + 1, BOOT_LINES.length));
    }, 240);
    const progressTimer = window.setInterval(() => {
      setBootProgress((p) => {
        const n = p + Math.random() * 9 + 3;
        return n >= 100 ? 100 : n;
      });
    }, 90);
    const finish = window.setTimeout(() => setBooted(true), 2100);
    return () => {
      window.clearInterval(lineTimer);
      window.clearInterval(progressTimer);
      window.clearTimeout(finish);
    };
  }, [booted]);

  useEffect(() => {
    const buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") return;
      buf.push(e.key);
      if (buf.length > KONAMI.length) buf.shift();
      if (KONAMI.every((k, i) => buf[i] === k)) {
        setConfetti(true);
        setParty(true);
        buf.length = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const doHack = () => {
    setGlitch(true);
    window.setTimeout(() => setGlitch(false), 1500);
  };
  const doMatrix = () => {
    setMatrix(true);
    window.setTimeout(() => setMatrix(false), 6000);
  };
  const doParty = () => {
    setConfetti(true);
    setParty((p) => !p);
  };

  if (!booted) {
    return (
      <div className="fixed inset-0 z-[100] bg-ink flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <p className="font-display font-black text-4xl md:text-6xl text-cream tracking-tight">
            ABROR<span className="text-lime">.OS</span>
          </p>
          <p className="font-term text-[11px] text-sage tracking-[0.3em] mt-2 mb-8">
            PORTFOLIO INTERFEYSI — XORAZM BUILD
          </p>
          <div className="font-term text-xs md:text-sm space-y-1.5 min-h-[9.5rem]">
            {BOOT_LINES.slice(0, visibleLines).map((l, i) => (
              <p key={i}>
                <span className={l.s === "warn" ? "text-coral" : l.s === "run" ? "text-cream/60" : "text-lime"}>
                  {l.s === "ok" ? "[  OK  ]" : l.s === "warn" ? "[ WARN ]" : "[..  ]"}
                </span>{" "}
                <span className="text-cream/80">{l.t}</span>
              </p>
            ))}
            <span className="caret text-lime">▊</span>
          </div>
          <div className="mt-6 h-[3px] bg-cream/10 overflow-hidden">
            <div className="h-full bg-lime transition-all duration-200" style={{ width: `${bootProgress}%` }} />
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="font-term text-[11px] text-sage tabular-nums">YUKLANMOQDA... {Math.min(99, Math.floor(bootProgress))}%</p>
            <button
              onClick={() => setBooted(true)}
              data-hover
              className="font-term text-[11px] tracking-[0.2em] text-cream/50 hover:text-lime transition-colors border border-cream/15 hover:border-lime px-3 py-1.5"
            >
              O'TKAZIB YUBORISH →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="top" className="relative min-h-screen bg-ink text-cream font-body">
      <Cursor />
      <ParticleField />
      <div className="bg-grid fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Terminal onHack={doHack} onMatrix={doMatrix} onParty={doParty} />
        <Contact />
      </main>

      {/* easter-egg qatlamlari */}
      {party && <div className="party-veil" aria-hidden="true" />}
      {matrix && <MatrixRain />}
      {glitch && <GlitchOverlay />}
      {confetti && <Confetti />}
      <BackToTop />
    </div>
  );
}
