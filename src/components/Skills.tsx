import { useCountUp, useReveal } from "../hooks";
import { Reveal, SectionHead } from "../ui";

const KOTLIN = [
  { name: "KOTLIN", pct: 92 },
  { name: "ANDROID SDK", pct: 88 },
  { name: "JETPACK COMPOSE", pct: 85 },
  { name: "COROUTINES / FLOW", pct: 84 },
];

const SYSTEM = [
  { name: "GIT / GIT FLOW", pct: 88 },
  { name: "REST API / RETROFIT", pct: 82 },
  { name: "JAVA", pct: 76 },
  { name: "SQL / SQLITE", pct: 74 },
];

const EXTRA = [
  "MVVM",
  "HILT",
  "ROOM",
  "MATERIAL 3",
  "FIREBASE",
  "CARGO",
  "LINUX",
  "DOCKER",
  "TELEGRAM BOT",
  "PLAY CONSOLE",
  "FIGMA",
  "SCRUM",
];

function Bar({
  name,
  pct,
  delay,
  active,
  fill,
  label,
}: {
  name: string;
  pct: number;
  delay: number;
  active: boolean;
  fill: string;
  label: string;
}) {
  const v = useCountUp(pct, active, 1300);
  return (
    <div data-hover>
      <div className="flex justify-between items-baseline font-term text-xs tracking-[0.15em] mb-2">
        <span className="text-cream/85">{name}</span>
        <span className={`tabular-nums ${label}`}>{v}%</span>
      </div>
      <div className="h-[6px] bg-cream/10 overflow-hidden">
        <div
          className={`h-full ${fill}`}
          style={{
            width: active ? `${pct}%` : "0%",
            transition: `width 1300ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  const rust = useCountUp(45, inView, 2200);

  return (
    <section id="skills" className="relative py-24 md:py-32 scroll-mt-20 bg-ink2/40 border-y border-cream/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHead num="03" label="ASBOBLAR" title="KO'NIKMALAR XARITASI" />
            <Reveal delay={150}>
              <p className="mt-6 text-cream/60 leading-relaxed max-w-sm">
                Foizlar — bu shunchaki raqam emas. Har biri ortida kechki debug sessiyalari,
                StackOverflow'da yopilgan yuzlab tab va bitta ishlaydigan yechim uchun o'tgan soatlar bor.
              </p>
            </Reveal>
          </div>

          <div ref={ref} className="space-y-14">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
              <div>
                <p className="font-term text-[11px] tracking-[0.35em] text-coral mb-7 flex items-center gap-3">
                  KOTLIN / ANDROID <span className="h-px flex-1 bg-cream/10" />
                </p>
                <div className="space-y-7">
                  {KOTLIN.map((s, i) => (
                    <Bar key={s.name} {...s} active={inView} delay={i * 120} fill="bg-lime" label="text-lime" />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-term text-[11px] tracking-[0.35em] text-coral mb-7 flex items-center gap-3">
                  TIZIM &amp; ASOSLAR <span className="h-px flex-1 bg-cream/10" />
                </p>
                <div className="space-y-7">
                  {SYSTEM.map((s, i) => (
                    <Bar key={s.name} {...s} active={inView} delay={i * 120 + 200} fill="bg-cream/70" label="text-cream/70" />
                  ))}
                </div>
              </div>
            </div>

            {/* Rust — o'rganilmoqda */}
            <div data-hover className="border border-coral/35 bg-coral/[0.05] px-6 md:px-8 py-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <p className="font-display font-bold text-xl text-cream">
                  RUST <span className="font-term text-[10px] tracking-[0.25em] text-coral align-middle ml-2">O'RGANILMOQDA</span>
                </p>
                <p className="font-term text-xs text-coral tabular-nums">{rust}% — har hafta +2%</p>
              </div>
              <div className="h-[8px] bg-cream/10 overflow-hidden">
                <div
                  className="h-full bg-coral bar-stripes"
                  style={{
                    width: inView ? "45%" : "0%",
                    transition: "width 2200ms cubic-bezier(0.22,1,0.36,1) 400ms",
                  }}
                />
              </div>
              <p className="font-term text-[11px] text-cream/50 mt-4 leading-relaxed">
                ownership, borrowing, lifetimes — compiler bilan har kuni yangi janjal.
                <span className="text-coral"> Lekin g'alaba yaqin.</span>
              </p>
            </div>
          </div>
        </div>

        <Reveal delay={200}>
          <div className="mt-16">
            <p className="font-term text-[11px] tracking-[0.35em] text-sage mb-5">
              <span className="text-coral">//</span> EKOTIZIM
            </p>
            <div className="flex flex-wrap gap-3">
              {EXTRA.map((t) => (
                <span
                  key={t}
                  data-hover
                  className="font-term text-[11px] tracking-[0.15em] px-4 py-2 border border-cream/15 text-cream/70 hover:border-lime hover:text-lime hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
