import { useCountUp, useReveal } from "../hooks";
import { Reveal, SectionHead } from "../ui";

const FRONT = [
  { name: "REACT / NEXT.JS", pct: 95 },
  { name: "TYPESCRIPT", pct: 90 },
  { name: "TAILWIND / CSS ARXITEKTURA", pct: 94 },
  { name: "THREE.JS / WEBGL", pct: 76 },
];

const BACK = [
  { name: "NODE.JS / EXPRESS", pct: 88 },
  { name: "PYTHON", pct: 82 },
  { name: "POSTGRESQL / PRISMA", pct: 85 },
  { name: "DOCKER / CI-CD", pct: 80 },
];

const EXTRA = [
  "GRAPHQL",
  "REDIS",
  "AWS",
  "ZUSTAND",
  "JEST",
  "GIT",
  "FIGMA",
  "SOCKET.IO",
  "VERCEL",
  "KAFKA",
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

  return (
    <section id="skills" className="relative py-24 md:py-32 scroll-mt-20 bg-ink2/40 border-y border-cream/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHead num="02" label="ASBOBLAR" title="KO'NIKMALAR XARITASI" />
            <Reveal delay={150}>
              <p className="mt-6 text-cream/60 leading-relaxed max-w-sm">
                Foizlar — bu shunchaki raqam emas. Har biri ortida yuzlab soat debug, refactor va
                "oxirgi marta, va'da" deb nomlangan commitlar yotibdi.
              </p>
            </Reveal>
          </div>

          <div ref={ref} className="grid md:grid-cols-2 gap-x-12 gap-y-14">
            <div>
              <p className="font-term text-[11px] tracking-[0.35em] text-coral mb-7 flex items-center gap-3">
                FRONTEND <span className="h-px flex-1 bg-cream/10" />
              </p>
              <div className="space-y-7">
                {FRONT.map((s, i) => (
                  <Bar key={s.name} {...s} active={inView} delay={i * 120} fill="bg-lime" label="text-lime" />
                ))}
              </div>
            </div>
            <div>
              <p className="font-term text-[11px] tracking-[0.35em] text-coral mb-7 flex items-center gap-3">
                BACKEND &amp; DEVOPS <span className="h-px flex-1 bg-cream/10" />
              </p>
              <div className="space-y-7">
                {BACK.map((s, i) => (
                  <Bar key={s.name} {...s} active={inView} delay={i * 120 + 200} fill="bg-coral" label="text-coral" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={200}>
          <div className="mt-16">
            <p className="font-term text-[11px] tracking-[0.35em] text-sage mb-5">
              <span className="text-coral">//</span> SHUNINGDEK KUNLIK ISHLATAMAN
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
