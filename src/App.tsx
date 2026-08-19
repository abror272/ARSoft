import { useCallback, useEffect, useRef, useState } from "react";
import Cursor from "./components/Cursor";
import ParticleField from "./components/ParticleField";
import Nav from "./components/Nav";
import Hero, { BootScreen, Marquee } from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Terminal from "./components/Terminal";
import Contact, { Footer } from "./components/Contact";
import { Confetti, GlitchOverlay, MatrixRain } from "./components/FX";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

export default function App() {
  const [booted, setBooted] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [party, setParty] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [toast, setToast] = useState("");
  const partyEverOn = useRef(false);
  const toastTimer = useRef(0);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2800);
  }, []);

  const triggerMatrix = useCallback(() => {
    setMatrix(true);
    window.setTimeout(() => setMatrix(false), 6000);
  }, []);

  const triggerGlitch = useCallback(() => {
    setGlitch(true);
    window.setTimeout(() => setGlitch(false), 1200);
  }, []);

  const toggleParty = useCallback(() => {
    setParty((p) => !p);
  }, []);

  useEffect(() => {
    if (party) {
      partyEverOn.current = true;
      setConfettiKey((k) => k + 1);
      flash("SYURPRIZ OCHILDI — RANGLI REJIM!");
    } else if (partyEverOn.current) {
      flash("RANGLI REJIM O'CHIRILDI");
    }
  }, [party, flash]);

  /* Konami kodi: ↑↑↓↓←→←→BA */
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === KONAMI[idx]) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          toggleParty();
        }
      } else {
        idx = k === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleParty]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  return (
    <div id="top" className="relative min-h-screen bg-ink text-cream font-body">
      {/* fon qatlamlari */}
      <ParticleField />
      <div className="bg-grid fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <Cursor />
      <Nav />

      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      <main className="relative z-10">
        <Hero go={booted} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Terminal onHack={triggerGlitch} onMatrix={triggerMatrix} onParty={toggleParty} />
        <Contact />
        <Footer />
      </main>

      {/* easter-egg qatlamlari */}
      {party && <div className="party-veil" aria-hidden="true" />}
      {matrix && <MatrixRain />}
      {glitch && <GlitchOverlay />}
      {confettiKey > 0 && <Confetti key={confettiKey} />}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[88] font-term text-[11px] md:text-xs tracking-[0.2em] bg-lime text-ink px-5 py-3 animate-[modalin_0.25s_ease] shadow-[0_15px_50px_-10px_rgba(198,242,78,0.5)]">
          {toast}
        </div>
      )}
    </div>
  );
}
