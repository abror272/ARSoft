import { Diamond, Reveal, SectionHead } from "../ui";

type Entry = {
  period: string;
  org: string;
  role: string;
  place: string;
  tag: string;
  bullets: string[];
  current?: boolean;
};

const ENTRIES: Entry[] = [
  {
    period: "2025 — HOZIRGACHA",
    org: "SHAXSIY KOMPANIYA",
    role: "Asoschi / Builder",
    place: "Xorazm, O'zbekiston",
    tag: "FOUNDER",
    bullets: [
      "O'z mahsulotimni noldan qurish — g'oyadan deploygacha",
      "Buyurtma emas: faqat o'z g'oyalarim, o'z qoidalarim",
      "Mahsulot, dizayn va marketing — hammasi bir qo'lda",
    ],
    current: true,
  },
  {
    period: "IYUN 2026 — HOZIR (3 OY)",
    org: "ARYFMA",
    role: "IT yordam mutaxassisi",
    place: "Urgench, Xorazm viloyati",
    tag: "FULL-TIME",
    bullets: [
      "Ichki IT tizimlarini qo'llab-quvvatlash va rivojlantirish",
      "Xodimlarga tezkor texnik yordam ko'rsatish",
      "Qurilma va tarmoq infratuzilmasini boshqarish",
    ],
    current: true,
  },
  {
    period: "IYUN 2025 — IYUN 2026 (1 YIL 1 OY)",
    org: "BR TECH",
    role: "Stajyor",
    place: "Urgench, Xorazm viloyati",
    tag: "STAJ",
    bullets: [
      "Real loyihalarda amaliy ishtirok — nazariya emas, ishlaydigan kod",
      "Jamoaviy oqimlar: code review, git flow, muddatlar",
      "Mijoz bilan ishlash va texnik muloqot tajribasi",
    ],
  },
  {
    period: "2025 — HOZIR",
    org: "URGANCH DAVLAT UNIVERSITETI",
    role: "Software Engineering",
    place: "Urgench, O'zbekiston",
    tag: "TA'LIM",
    bullets: [
      "Dasturiy ta'minot muhandisligi asoslari",
      "Algoritmlar, ma'lumotlar tuzilmalari, arxitektura",
      "Amaliy loyihalar va jamoaviy ishlar",
    ],
    current: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <SectionHead num="02" label="YO'L XARITASI" title="TAJRIBA" outline />
          <p className="font-term text-[11px] tracking-[0.25em] text-sage max-w-xs text-right hidden sm:block">
            STAJDAN — IT MUTAXASSISIGA.
            <br />
            <span className="text-coral">PARALLELDAN — O'Z KOMPANIYA.</span>
          </p>
        </div>

        <div className="relative max-w-4xl">
          {/* vertikal chiziq */}
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-cream/12" aria-hidden="true" />

          <div className="space-y-10">
            {ENTRIES.map((e, i) => (
              <Reveal key={e.org} delay={i * 100}>
                <div className="relative pl-10 md:pl-16 group">
                  <span
                    className={`absolute left-0 md:left-1 top-2 transition-colors duration-300 ${
                      e.current ? "text-lime" : "text-sage group-hover:text-lime"
                    }`}
                  >
                    <Diamond className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </span>

                  <div
                    data-hover
                    className={`border bg-ink2/50 px-6 md:px-8 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] ${
                      e.current
                        ? "border-lime/35 hover:border-lime/70"
                        : "border-cream/10 hover:border-lime/50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <h3 className="font-display font-bold text-xl md:text-2xl text-cream group-hover:text-lime transition-colors duration-300">
                        {e.org}
                      </h3>
                      <span className="font-term text-[10px] tracking-[0.25em] px-2.5 py-1 border border-cream/15 text-sage">
                        {e.tag}
                      </span>
                      {e.current && (
                        <span className="font-term text-[10px] tracking-[0.2em] text-lime flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lime" />
                          </span>
                          DAVOM ETMOQDA
                        </span>
                      )}
                    </div>

                    <p className="font-term text-[11px] tracking-[0.2em] text-coral mt-2">
                      {e.role.toUpperCase()} · <span className="text-sage">{e.period}</span>
                    </p>
                    <p className="font-term text-[11px] text-cream/50 mt-1">{e.place}</p>

                    <ul className="mt-4 space-y-2">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-cream/70 text-sm md:text-[15px] leading-relaxed">
                          <span className="text-lime font-term mt-0.5 shrink-0">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
