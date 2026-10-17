import { Suspense, lazy, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Cursor from "./components/Cursor";
import ParticleField from "./components/ParticleField";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import KhorezmGate from "./components/KhorezmGate";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Terminal from "./components/Terminal";
import Contact from "./components/Contact";
import { Confetti, GlitchOverlay, MatrixRain } from "./components/FX";
import Logo from "./components/Logo";
import { ArrowUp } from "./ui";
import { LangProvider, useLang } from "./i18n";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

// Three.js og'ir (~170 KB gzip) — alohida chunk'da yuklanadi
const GlobeField = lazy(() => import("./components/GlobeField"));

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-hover aria-label="Yuqoriga" className="fixed bottom-6 right-6 z-[60] w-11 h-11 border border-lime/60 bg-ink/80 text-lime flex items-center justify-center hover:bg-lime hover:text-ink transition-colors duration-300 backdrop-blur">
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

function BootScreen({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [bootProgress, setBootProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const lineTimer = window.setInterval(() => setVisibleLines((v) => Math.min(v + 1, t.boot.lines.length)), 240);
    const progressTimer = window.setInterval(() => setBootProgress((p) => Math.min(100, p + Math.random() * 9 + 3)), 90);
    const finish = window.setTimeout(onDone, 2100);
    return () => { window.clearInterval(lineTimer); window.clearInterval(progressTimer); window.clearTimeout(finish); };
  }, [onDone, t.boot.lines.length]);

  return (
    <div className="fixed inset-0 z-[100] bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-4">
          <Logo className="w-12 h-12 md:w-14 md:h-14" />
          <div>
            <p className="font-display font-black text-4xl md:text-6xl text-cream tracking-tight leading-none">ABROR<span className="text-lime">.OS</span></p>
            <p className="font-term text-[11px] text-sage tracking-[0.15em] sm:tracking-[0.3em] mt-2">{t.boot.subtitle}</p>
          </div>
        </div>
        <div className="font-term text-xs md:text-sm space-y-1.5 min-h-[9.5rem] mt-8 mb-8">
          {t.boot.lines.slice(0, visibleLines).map((l, i) => <p key={i}><span className={l.s === "run" ? "text-cream/60" : "text-lime"}>{l.s === "ok" ? "[  OK  ]" : "[..  ]"}</span>{" "}<span className="text-cream/80">{l.t}</span></p>)}
          <span className="caret text-lime">▊</span>
        </div>
        <div className="h-[3px] bg-cream/10 overflow-hidden"><div className="h-full bg-lime transition-all duration-200" style={{ width: `${bootProgress}%` }} /></div>
        <div className="flex flex-wrap justify-between items-center gap-2 mt-3">
          <p className="font-term text-[11px] text-sage tabular-nums">{t.boot.progress} {Math.min(99, Math.floor(bootProgress))}%</p>
          <button onClick={onDone} data-hover className="font-term text-[11px] tracking-[0.2em] text-cream/50 hover:text-lime transition-colors border border-cream/15 hover:border-lime px-3 py-1.5">{t.boot.skip}</button>
        </div>
      </div>
    </div>
  );
}

function Site() {
  const [booted, setBooted] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [party, setParty] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") return;
      buf.push(e.key);
      if (buf.length > KONAMI.length) buf.shift();
      if (KONAMI.every((k, i) => buf[i] === k)) { setConfetti(true); setParty(true); buf.length = 0; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const doHack = () => { setGlitch(true); window.setTimeout(() => setGlitch(false), 1500); };
  const doMatrix = () => { setMatrix(true); window.setTimeout(() => setMatrix(false), 6000); };
  const doParty = () => { setConfetti(true); setParty((p) => !p); };

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;

  return (
    <div id="top" className="relative min-h-screen bg-ink text-cream font-body">
      <Cursor /><Suspense fallback={<ParticleField />}><GlobeField fallback={<ParticleField />} /></Suspense><div className="bg-grid fixed inset-0 z-0 pointer-events-none" aria-hidden="true" /><div className="noise" aria-hidden="true" /><Nav />
      <main className="relative z-10"><Hero /><KhorezmGate /><About /><Experience /><Skills /><Projects /><Terminal onHack={doHack} onMatrix={doMatrix} onParty={doParty} /><Contact /></main>
      {party && <div className="party-veil" aria-hidden="true" />}{matrix && <MatrixRain />}{glitch && <GlitchOverlay />}{confetti && <Confetti />}<BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Site />
      <Analytics />
      <SpeedInsights />
    </LangProvider>
  );
}
