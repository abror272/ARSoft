import { Reveal, SectionHead } from "../ui";
import { Rich, useLang } from "../i18n";

const PORTRAIT =
  "https://image.qwenlm.ai/generated-images/6fb4950e-c079-4faf-9e61-8d98d29f8b5f/_result.png";

const NOW_DOTS = ["bg-lime", "bg-coral", "bg-cream/60", "bg-sage"];

export default function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="about" className="relative py-20 md:py-32 scroll-mt-20 bg-ink2/40 border-y border-cream/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-[minmax(0,26rem)_1fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <div className="relative group" data-hover>
              <div className="absolute -inset-3 border border-lime/30 translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
              <div className="relative overflow-hidden border border-cream/15">
                <img
                  src={PORTRAIT}
                  alt={a.portraitAlt}
                  className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-lime/10 mix-blend-overlay pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 bg-ink/85 backdrop-blur px-4 sm:px-5 py-3 flex items-center justify-between gap-3 border-t border-cream/10">
                  <p className="font-term text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.25em] text-cream/80 truncate">ABROR RAXIMBAYEV</p>
                  <p className="font-term text-[9px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.2em] text-sage shrink-0">HAZORASP / URGANCH</p>
                </div>
              </div>
              <span className="absolute -top-5 -right-3 sm:-right-4 rotate-6 bg-coral text-cream font-display font-bold text-[11px] sm:text-xs px-3 py-1.5 shadow-lg">UrDU '25+</span>
            </div>
          </Reveal>

          <div>
            <SectionHead num="01" title={a.title} />
            <Reveal delay={120}>
              <p className="mt-7 text-cream/75 leading-relaxed text-[15px] md:text-lg">
                <Rich text={a.p1} />
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-cream/75 leading-relaxed text-[15px] md:text-lg">
                <Rich text={a.p2} />
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-5 text-cream/75 leading-relaxed text-[15px] md:text-lg">
                <Rich text={a.p3} />
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-9 grid sm:grid-cols-2 border border-cream/10">
                {a.facts.map((f, i) => (
                  <div key={f.k} data-hover className={`px-5 py-4 hover:bg-cream/[0.04] transition-colors duration-300 ${i % 2 === 0 ? "sm:border-r sm:border-cream/10" : ""} ${i < 4 ? "border-b border-cream/10" : ""}`}>
                    <p className="font-term text-[9px] tracking-[0.3em] text-sage">{f.k}</p>
                    <p className="font-semibold text-cream mt-1 text-[15px]">{f.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-8">
                <p className="font-term text-[10px] tracking-[0.3em] text-sage mb-4"><span className="text-coral">//</span> {a.approach}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {a.principles.map((p) => (
                    <div key={p.n} data-hover className="group border border-cream/10 bg-ink/40 px-5 py-4 flex items-start gap-4 hover:border-lime/40 hover:bg-ink2 transition-all duration-300">
                      <span className="font-display font-black text-2xl text-outline-cream group-hover:text-outline transition-all duration-300 leading-none">{p.n}</span>
                      <span><span className="block font-display font-bold text-sm text-cream">{p.t}</span><span className="block text-cream/55 text-[13px] mt-1 leading-relaxed">{p.d}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={480}>
              <div className="mt-8 border border-lime/25 bg-lime/[0.04] px-5 sm:px-6 py-6">
                <p className="font-term text-[10px] tracking-[0.12em] sm:tracking-[0.3em] text-lime mb-4 flex items-center gap-3"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-lime" /></span>{a.nowTitle}</p>
                <ul className="space-y-3">{a.now.map((n, i) => <li key={n} className="flex items-center gap-3 text-cream/75 text-sm md:text-[15px]"><span className={`w-1.5 h-1.5 rounded-full shrink-0 ${NOW_DOTS[i % 4]}`} />{n}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
