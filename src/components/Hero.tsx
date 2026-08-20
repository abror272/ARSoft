import { useEffect, useState } from "react";
import { useScramble, useTashkentTime, useTypewriter } from "../hooks";
import { ArrowDown, ArrowUpRight, Magnetic } from "../ui";

const WORDS = [
  "KOTLIN O'RGANYAPMAN",
  "ANDROID YO'LIDA",
  "RUST QIZIQUVCHISI",
  "UrDU TALABASI",
];

const STATS = [
  { v: "1+", l: "YIL TAJRIBA" },
  { v: "2", l: "ISH JOYI" },
  { v: "∞", l: "O'RGANISH" },
];

const BADGE_TEXT = "RUST O'RGANYAPMAN • KOTLIN • ANDROID • UrDU • XORAZM • ";

export default function Hero() {
  const [go, setGo] = useState(false);
  const time = useTashkentTime();
  const role = useTypewriter(WORDS);
  const l1 = useScramble("ABROR", go, 55);
  const l2 = useScramble("RAXIMBAYEV", go, 42);

  useEffect(() => {
    const t = window.setTimeout(() => setGo(true), 250);
    return () => window.clearTimeout(t);
  }, []);

  const el = `transition-all duration-700 ease-out ${
    go ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-32 md:pb-24">
      {/* fon aksentlari */}
      <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-lime/[0.05] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[40rem] h-[40rem] rounded-full bg-coral/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/4 font-display font-black text-[22vw] leading-none text-cream/[0.03] select-none pointer-events-none hidden lg:block">
        KT
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-8 grid lg:grid-cols-[1fr_auto] items-center gap-14">
        <div>
          {/* meta qator */}
          <div style={{ transitionDelay: "100ms" }} className={`flex flex-wrap items-center gap-x-6 gap-y-2 font-term text-[11px] tracking-[0.25em] mb-8 ${el}`}>
            <span className="flex items-center gap-2 text-lime">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              O'QISH + ISH + O'RGANISH
            </span>
            <span className="text-sage hidden sm:block">HAZORASP → URGENCH, UZ</span>
            <span className="text-cream/50 tabular-nums">{time}</span>
          </div>

          <h1 className="select-none">
            <span className="block font-display font-black text-[9.5vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] leading-[1.02] tracking-tight text-cream">
              {l1}
            </span>
            <span
              data-text="RAXIMBAYEV"
              className="glitch block font-display font-black text-[9.5vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] leading-[1.02] tracking-tight text-outline mt-1"
            >
              {l2}
            </span>
          </h1>

          <p style={{ transitionDelay: "250ms" }} className={`font-term text-sm md:text-base mt-7 text-lime ${el}`}>
            <span className="text-sage">&raquo;</span> {role}
            <span className="caret text-coral ml-1">&#9610;</span>
          </p>

          <p style={{ transitionDelay: "350ms" }} className={`mt-6 max-w-xl text-cream/70 text-base md:text-lg leading-relaxed ${el}`}>
            <span className="text-lime font-semibold">Kotlin</span>'da Android ilovalari yozishni
            o'rganyapman, endigina <span className="text-coral font-semibold">Rust</span>'ga qadam
            qo'ydim. UrDU'da Software Engineering o'qiyman, ARYFMA'da ishlayman — qolgan vaqtimda
            kod yozaman va har kuni biroz oldinga siljiyman.
          </p>

          <div style={{ transitionDelay: "450ms" }} className={`mt-8 md:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 ${el}`}>
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#projects"
                data-hover
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 sm:gap-3 bg-lime text-ink font-display font-bold text-xs sm:text-sm px-5 py-3.5 sm:px-7 sm:py-4 hover:bg-coral hover:text-cream transition-colors duration-300"
              >
                ISHLARIM BILAN TANISHING
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href="https://www.linkedin.com/in/abrorraximbayev-909512387"
                target="_blank"
                rel="noreferrer"
                data-hover
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 sm:gap-3 border border-cream/25 text-cream font-display font-bold text-xs sm:text-sm px-5 py-3.5 sm:px-7 sm:py-4 hover:border-lime hover:text-lime transition-colors duration-300"
              >
                LINKEDIN
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-45 transition-transform duration-300" />
              </a>
            </Magnetic>
          </div>

          <div style={{ transitionDelay: "550ms" }} className={`mt-14 grid grid-cols-3 max-w-lg divide-x divide-cream/10 border-y border-cream/10 ${el}`}>
            {STATS.map((s) => (
              <div key={s.l} className="px-4 md:px-6 py-5 hover:bg-cream/[0.03] transition-colors" data-hover>
                <p className="font-display font-black text-2xl md:text-4xl text-lime">{s.v}</p>
                <p className="font-term text-[9px] md:text-[10px] tracking-[0.25em] text-sage mt-1.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* o'ng ustun: Kotlin kod kartasi + aylanuvchi emblema */}
        <div style={{ transitionDelay: "600ms" }} className={`hidden lg:flex flex-col items-center gap-10 ${el}`}>
          <div className="relative">
            <div className="floaty w-[26rem] border border-cream/15 bg-ink2/90 backdrop-blur px-7 py-6 font-term text-[13px] leading-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-coral" />
                <span className="w-2.5 h-2.5 rounded-full bg-cream/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-lime" />
                <span className="ml-3 text-[10px] text-sage tracking-[0.2em]">main.kt</span>
              </div>
              <p className="text-sage italic">// abror.os — ishga tushmoqda</p>
              <p><span className="text-coral">fun</span> <span className="text-cream">main</span>() {"{"}</p>
              <p className="pl-5">
                <span className="text-coral">val</span> abror = <span className="text-lime">Developer</span>(
              </p>
              <p className="pl-10">ism = <span className="text-lime">"Abror Raximbayev"</span>,</p>
              <p className="pl-10">joy = <span className="text-lime">"Xorazm, UZ"</span>,</p>
              <p className="pl-10">kuchliTil = <span className="text-lime">"Kotlin"</span>,</p>
              <p className="pl-10">o'rganilmoqda = <span className="text-lime">"Rust"</span></p>
              <p className="pl-5">)</p>
              <p className="pl-5">
                <span className="text-coral">while</span> (abror.ishtiyoq &gt; 0) {"{"}
              </p>
              <p className="pl-10">abror.<span className="text-cream">kodYoz</span>()</p>
              <p className="pl-10">abror.<span className="text-cream">yangiNarsaOrgan</span>()</p>
              <p className="pl-5">{"}"}</p>
              <p>{"}"}</p>
            </div>

            {/* aylanuvchi emblema */}
            <div className="absolute -bottom-12 -left-12 w-36 h-36">
              <svg viewBox="0 0 120 120" className="w-full h-full spin-slow" aria-hidden="true">
                <defs>
                  <path id="badge-circle" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
                </defs>
                <text fill="#c6f24e" fontSize="9.5" letterSpacing="2.5" fontFamily="'JetBrains Mono', monospace">
                  <textPath href="#badge-circle">{BADGE_TEXT}</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-black text-2xl text-cream border border-cream/20 bg-ink rounded-full w-16 h-16 flex items-center justify-center">
                  AR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ transitionDelay: "700ms" }} className={`absolute bottom-8 left-5 md:left-8 flex items-center gap-4 ${el}`}>
        <ArrowDown className="w-4 h-4 text-lime bounce-slow" />
        <p className="font-term text-[10px] tracking-[0.3em] text-sage">
          PASTGA — <span className="text-cream/70">QIZIQARLI QISMI</span>
        </p>
      </div>
    </section>
  );
}
