import { useCallback, useEffect, useRef, useState } from "react";
import { useCountUp, useScramble, useTashkentTime, useTypewriter } from "../hooks";
import { ArrowDown, Diamond, Magnetic } from "../ui";

/* ---------------------------------- BOOT ---------------------------------- */

const BOOT_LINES = [
  { t: "[ 0.001s ] SARDOR.OS v2.4.1 — ishga tushmoqda...", c: "text-sage" },
  { t: "[ 0.342s ] yadro modullari tekshirildi .......... OK", c: "text-cream/80" },
  { t: "[ 0.781s ] tajriba drayveri: 5+ yil ............... OK", c: "text-cream/80" },
  { t: "[ 1.120s ] kofe rezervi: [########--] 82%", c: "text-lime" },
  { t: "[ 1.530s ] kreativlik dvigateli ................... FAOL", c: "text-cream/80" },
  { t: "[ 1.904s ] > XUSH KELIBSIZ", c: "text-coral" },
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 700);
  }, [onDone]);

  useEffect(() => {
    if (n >= BOOT_LINES.length) {
      const t = window.setTimeout(finish, 550);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setN((v) => v + 1), n === 0 ? 260 : 330);
    return () => window.clearTimeout(t);
  }, [n, finish]);

  return (
    <div
      className={`fixed inset-0 z-[90] bg-ink flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${
        leaving ? "-translate-y-full" : ""
      }`}
    >
      <div className="w-full max-w-xl px-6 font-term text-[12px] sm:text-[13px] md:text-sm leading-7">
        {BOOT_LINES.slice(0, n).map((l, i) => (
          <p key={l.t} className={`${l.c} animate-[modalin_0.2s_ease]`}>
            {l.t}
          </p>
        ))}
        <span className="inline-block w-2.5 h-4 bg-lime caret align-middle" />
        <div className="mt-6 h-[3px] bg-cream/10">
          <div
            className="h-full bg-lime transition-all duration-300 ease-out"
            style={{ width: `${(n / BOOT_LINES.length) * 100}%` }}
          />
        </div>
        <p className="mt-3 text-[10px] tracking-[0.3em] text-sage/70">
          TIZIM YUKLANMOQDA — ILTIMOS KUTING
        </p>
      </div>
      <button
        onClick={finish}
        data-hover
        className="absolute bottom-8 right-8 font-term text-[11px] tracking-[0.25em] text-sage hover:text-lime transition-colors"
      >
        O'TKAZIB YUBORISH →
      </button>
    </div>
  );
}

/* ---------------------------------- HERO ---------------------------------- */

const ROLES = ["FULL-STACK DEVELOPER", "UI MUHANDISI", "KREATIV DASTURCHI", "MUAMMO QOTILI"];

export default function Hero({ go }: { go: boolean }) {
  const [go2, setGo2] = useState(false);
  const l1 = useScramble("SARDOR", go, 45);
  const l2 = useScramble("KARIMOV", go2, 45);
  const role = useTypewriter(go ? ROLES : [""], 65, 1700);
  const time = useTashkentTime();

  const years = useCountUp(5, go, 1200);
  const projects = useCountUp(47, go, 1400);
  const quality = useCountUp(99, go, 1600);

  useEffect(() => {
    if (!go) return;
    const t = window.setTimeout(() => setGo2(true), 500);
    return () => window.clearTimeout(t);
  }, [go]);

  const el = `transition-all duration-700 ease-out ${
    go ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-20">
      {/* ambient qatlamlar */}
      <div className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full bg-lime/[0.05] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[40rem] h-[40rem] rounded-full bg-coral/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/4 font-display font-black text-[24vw] leading-none text-cream/[0.03] select-none pointer-events-none hidden lg:block">
        DEV
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-8 grid lg:grid-cols-[1fr_auto] items-center gap-12">
        <div>
          {/* meta qator */}
          <div style={{ transitionDelay: "100ms" }} className={`flex flex-wrap items-center gap-x-6 gap-y-2 font-term text-[11px] tracking-[0.25em] mb-8 ${el}`}>
            <span className="flex items-center gap-2 text-lime">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              LOYIHALAR OCHIQ
            </span>
            <span className="text-sage hidden sm:block">TOSHKENT, UZBEKISTON</span>
            <span className="text-cream/50 tabular-nums">{time}</span>
          </div>

          <h1 className="select-none">
            <span className="block font-display font-black text-[15vw] sm:text-7xl lg:text-[6.8rem] leading-[0.98] tracking-tight text-cream">
              {l1}
            </span>
            <span
              data-text="KARIMOV"
              className="glitch block font-display font-black text-[15vw] sm:text-7xl lg:text-[6.8rem] leading-[0.98] tracking-tight text-outline mt-1"
            >
              {l2}
            </span>
          </h1>

          <p style={{ transitionDelay: "250ms" }} className={`font-term text-sm md:text-base mt-7 text-lime ${el}`}>
            <span className="text-sage">&raquo;</span> {role}
            <span className="caret text-coral ml-1">&#9610;</span>
          </p>

          <p style={{ transitionDelay: "350ms" }} className={`mt-6 max-w-xl text-cream/70 text-base md:text-lg leading-relaxed ${el}`}>
            G'oyalarni <span className="text-lime font-semibold">jonli mahsulotga</span> aylantiraman —
            birinchi pikseldan oxirgi deploygacha. Bu saytning o'zi ham o'sha hunarning isboti:
            pastda <span className="text-coral font-semibold">haqiqiy terminal</span> ham bor, sinab ko'ring.
          </p>

          <div style={{ transitionDelay: "450ms" }} className={`mt-9 flex flex-wrap gap-4 ${el}`}>
            <Magnetic>
              <a
                href="#projects"
                data-hover
                className="group inline-flex items-center gap-3 bg-lime text-ink font-display font-bold text-sm px-7 py-4 hover:bg-coral hover:text-cream transition-colors duration-300"
              >
                LOYIHALARIM
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#terminal"
                data-hover
                className="group inline-flex items-center gap-3 border border-cream/25 text-cream font-term text-sm px-7 py-4 hover:border-lime hover:text-lime transition-colors duration-300"
              >
                TERMINAL OCHISH
                <span className="text-coral group-hover:text-lime transition-colors">&gt;_</span>
              </a>
            </Magnetic>
          </div>

          {/* mini statistika */}
          <div style={{ transitionDelay: "550ms" }} className={`mt-14 grid grid-cols-3 max-w-lg divide-x divide-cream/10 border-y border-cream/10 ${el}`}>
            {[
              { v: `${years}+`, l: "YIL TAJRIBA" },
              { v: `${projects}`, l: "LOYIHA" },
              { v: `${quality}%`, l: "SIFAT" },
            ].map((s) => (
              <div key={s.l} className="py-4 px-3 md:px-5 first:pl-0 hover:bg-cream/[0.03] transition-colors" data-hover>
                <p className="font-display font-bold text-2xl md:text-3xl text-lime tabular-nums">{s.v}</p>
                <p className="font-term text-[10px] tracking-[0.2em] text-sage mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* o'ng ustun: aylanuvchi emblema + suzuvchi kod */}
        <div style={{ transitionDelay: "600ms" }} className={`hidden lg:flex flex-col items-center gap-10 ${el}`}>
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 100 100" className="w-full h-full spin-slow">
              <defs>
                <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="8" letterSpacing="2.6" fill="var(--color-sage)" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                <textPath href="#circ">SARDOR.DEV — FULL STACK — SARDOR.DEV — </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-lime" />
            </div>
          </div>

          <div className="animate-[floaty_6s_ease-in-out_infinite]">
            <div className="font-term text-[11px] leading-5 bg-ink2 border border-cream/15 px-4 py-3 text-sage shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]">
              <p>
                <span className="text-coral">const</span> <span className="text-cream">hayot</span> ={" "}
                <span className="text-lime">kodYoz()</span>;
              </p>
              <p>
                <span className="text-coral">while</span>(<span className="text-cream">true</span>){" "}
                <span className="text-cream">takomillash()</span>;
              </p>
            </div>
          </div>

          <p className="font-term text-[10px] tracking-[0.4em] text-cream/40 [writing-mode:vertical-rl]">
            PORTFOLIO — 2025
          </p>
        </div>
      </div>

      {/* scroll indikatori */}
      <div style={{ transitionDelay: "700ms" }} className={`absolute bottom-8 left-5 md:left-8 flex items-center gap-4 ${el}`}>
        <div className="relative h-14 w-px bg-cream/15 overflow-hidden">
          <span className="absolute inset-x-0 h-full bg-lime animate-[drop_1.6s_ease-in-out_infinite]" />
        </div>
        <span className="font-term text-[10px] tracking-[0.35em] text-sage">PASTGA SURING</span>
      </div>
    </section>
  );
}

/* --------------------------------- MARQUEE -------------------------------- */

const TECH = [
  "REACT",
  "TYPESCRIPT",
  "NEXT.JS",
  "NODE.JS",
  "TAILWIND",
  "POSTGRESQL",
  "DOCKER",
  "THREE.JS",
  "PYTHON",
  "REDIS",
  "FIGMA",
  "GIT",
];

export function Marquee() {
  return (
    <div className="marquee relative border-y border-cream/10 bg-ink2/70 py-4 overflow-hidden select-none">
      <div className="marquee-track">
        {[...TECH, ...TECH].map((t, i) => (
          <span key={`a-${i}`} className="flex items-center whitespace-nowrap">
            <span className="px-7 font-display font-bold text-2xl md:text-3xl text-cream/90">{t}</span>
            <Diamond className="w-2.5 h-2.5 text-coral" />
          </span>
        ))}
      </div>
      <div className="marquee-track rev mt-3">
        {[...TECH, ...TECH].map((t, i) => (
          <span key={`b-${i}`} className="flex items-center whitespace-nowrap">
            <span className="px-7 font-display font-bold text-2xl md:text-3xl text-outline-cream">{t}</span>
            <Diamond className="w-2.5 h-2.5 text-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}
