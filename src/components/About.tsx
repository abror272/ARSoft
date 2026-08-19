import { useCountUp, useReveal } from "../hooks";
import { ArrowUpRight, Reveal, SectionHead } from "../ui";

const PORTRAIT =
  "https://image.qwenlm.ai/generated-images/6fb4950e-c079-4faf-9e61-8d98d29f8b5f/_result.png";

const FOCUS = [
  { i: "01", t: "AI integratsiyalari — LLM va agentlar" },
  { i: "02", t: "Real-time tizimlar: WebRTC, WebSocket" },
  { i: "03", t: "3D va WebGL tajribalari" },
  { i: "04", t: "Design-tizimlar va UI arxitektura" },
];

export default function About() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.3);
  const years = useCountUp(5, inView);
  const projects = useCountUp(47, inView);
  const clients = useCountUp(18, inView);
  const coffees = useCountUp(3120, inView);

  return (
    <section id="about" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20">
        {/* chap yopishqoq ustun */}
        <div className="lg:sticky lg:top-28 self-start">
          <SectionHead num="01" label="KIM MEN?" title="KOD — MENING ONA TILIM" />
          <Reveal delay={150}>
            <div className="group relative mt-12 max-w-md" data-hover>
              <div className="absolute inset-0 border border-coral translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              <div className="relative overflow-hidden border border-cream/15 bg-ink2">
                <img
                  src={PORTRAIT}
                  alt="Sardor — ish stolida kod yozayotgan dasturchi illstratsiyasi"
                  className="w-full object-cover saturate-[0.85] group-hover:scale-[1.03] group-hover:saturate-100 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent px-4 pt-10 pb-3 flex items-center justify-between">
                  <span className="font-term text-[10px] tracking-[0.25em] text-lime">SARDOR.DEV</span>
                  <span className="font-term text-[10px] tracking-[0.15em] text-sage">41.2995°N 69.2401°E</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* o'ng ustun */}
        <div>
          <Reveal>
            <p className="text-xl md:text-2xl leading-relaxed text-cream/90 font-medium">
              Salom! Men <span className="text-lime">Sardor</span> — Toshkentda yashaydigan full-stack
              dasturchi. 5 yildan beri veb-g'oyalarni jonli mahsulotlarga aylantiraman: oddiy landing
              sahifalardan tortib,{" "}
              <span className="text-coral">yuqori yuklamali fintech tizimlarigacha</span>.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-cream/65 leading-relaxed md:text-lg">
              Mening qoidam oddiy: kod — bu hunarmandchilik. Har bir piksel, har bir millisekund
              muhim. Foydalanuvchi ekranga qarab "wow" demaguncha — ish hali tugamagan deb hisoblayman.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-12">
              <p className="font-term text-[11px] tracking-[0.35em] text-sage mb-5">
                <span className="text-coral">//</span> HOZIRGI FOKUS
              </p>
              <div className="border-t border-cream/10">
                {FOCUS.map((f) => (
                  <div
                    key={f.i}
                    data-hover
                    className="group flex items-center gap-5 border-b border-cream/10 py-4 hover:bg-cream/[0.03] hover:pl-3 transition-all duration-300"
                  >
                    <span className="font-term text-xs text-coral">{f.i}</span>
                    <span className="flex-1 text-cream/85 font-medium">{f.t}</span>
                    <ArrowUpRight className="w-4 h-4 text-sage group-hover:text-lime group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* statistika */}
          <div ref={ref} className="mt-12 grid grid-cols-2 gap-px bg-cream/10 border border-cream/10">
            {[
              { v: `${years}+`, l: "YIL TAJRIBA", c: "text-lime" },
              { v: `${projects}`, l: "TUGALLANGAN LOYIHA", c: "text-coral" },
              { v: `${clients}`, l: "MAMNUN MIJOZ", c: "text-cream" },
              { v: `${coffees}`, l: "PIYOLA KOFE", c: "text-lime" },
            ].map((s, i) => (
              <div
                key={s.l}
                data-hover
                className={`group bg-ink p-6 md:p-8 hover:bg-ink2 transition-colors duration-300 ${
                  inView ? "reveal is-in" : "reveal"
                }`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <p className={`font-display font-black text-3xl md:text-5xl tabular-nums ${s.c} group-hover:scale-105 origin-left transition-transform duration-300 inline-block`}>
                  {s.v}
                </p>
                <p className="font-term text-[10px] tracking-[0.25em] text-sage mt-3">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
