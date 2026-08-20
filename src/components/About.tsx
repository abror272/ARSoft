import { Reveal, SectionHead } from "../ui";

const PORTRAIT =
  "https://image.qwenlm.ai/generated-images/6fb4950e-c079-4faf-9e61-8d98d29f8b5f/_result.png";

const FACTS = [
  { k: "ASOSIY TIL", v: "Kotlin" },
  { k: "YANGI YO'NALISH", v: "Rust" },
  { k: "TA'LIM", v: "UrDU · Software Engineering" },
  { k: "HOZIRGI ISH", v: "ARYFMA · Texnik yordam mutaxassisi" },
  { k: "OLDINGI TAJRIBA", v: "BR Tech · 1 yil staj" },
  { k: "MAQSAD", v: "Kuchli Android dasturchisi" },
];

const NOW = [
  { dot: "bg-lime", text: "Kotlin: Android asoslarini chuqurlashtiryapman" },
  { dot: "bg-coral", text: "Rust: ownership va borrowing — eng boshidan" },
  { dot: "bg-cream/60", text: "ARYFMA: texnik yordam va ichki tizimlar bilan ishlash" },
  { dot: "bg-sage", text: "UrDU: dasturiy muhandislik, 2025-yildan talabaman" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 scroll-mt-20 bg-ink2/40 border-y border-cream/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-[minmax(0,26rem)_1fr] gap-14 lg:gap-20 items-start">
          {/* portret */}
          <Reveal>
            <div className="relative group" data-hover>
              <div className="absolute -inset-3 border border-lime/30 translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
              <div className="relative overflow-hidden border border-cream/15">
                <img
                  src={PORTRAIT}
                  alt="Abror Raximbayev — ish stolida, Kotlin yozayotgan dasturchi"
                  className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-lime/10 mix-blend-overlay pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 bg-ink/85 backdrop-blur px-5 py-3 flex items-center justify-between border-t border-cream/10">
                  <p className="font-term text-[10px] tracking-[0.25em] text-cream/80">
                    ABROR RAXIMBAYEV
                  </p>
                  <p className="font-term text-[10px] tracking-[0.2em] text-sage">XOZORASP / URGENCH</p>
                </div>
              </div>
              <span className="absolute -top-5 -right-4 rotate-6 bg-coral text-cream font-display font-bold text-xs px-3 py-1.5 shadow-lg">
                UrDU '25+
              </span>
            </div>
          </Reveal>

          {/* matn */}
          <div>
            <SectionHead num="01" label="KIM MEN" title="HAQIMDA" />

            <Reveal delay={120}>
              <p className="mt-7 text-cream/75 leading-relaxed text-base md:text-lg">
                Men <span className="text-cream font-semibold">Abror Raximbayev</span> — Xorazmning
                Xazorasp tumanidanman, hozirda Urgenchda yashayman va ishlayman. Asosiy tilim —{" "}
                <span className="text-lime font-semibold">Kotlin</span>, Android ilovalari sohasida
                rivojlanyapman. Urganch davlat universitetida Software Engineering yo'nalishida o'qiyman.
                Men uchun kod yozish shunchaki ish emas — muammoni topib, uni chiroyli yechish usuli.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-cream/75 leading-relaxed text-base md:text-lg">
                Mehnat faoliyatimni <span className="text-cream font-semibold">BR Tech</span> kompaniyasida
                stajyor bo'lib boshlaganman — bir yil davomida haqiqiy jamoada ishlashni, muddatga
                ulgurishni va sifatni tushirmaslikni o'rgandim. Hozir{" "}
                <span className="text-cream font-semibold">ARYFMA</span>'da texnik yordam mutaxassisi
                bo'lib ishlayman: ichki tizimlar, xodimlarga ko'mak va umuman infratuzilma — barchasi
                menga ishonib topshirilgan.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-5 text-cream/75 leading-relaxed text-base md:text-lg">
                Til bilish darajam haqida ochiq aytaman:{" "}
                <span className="text-coral font-semibold">Kotlin — asosiy yo'nalishim</span>, unda
                ancha erkinman; <span className="text-coral font-semibold">Rust</span> esa endigina
                boshlangan sarguzasht. Hammasini bilaman deb ayta olmayman — lekin har hafta yangi
                narsa o'rganib, o'sha bilimni amalda sinab ko'raman. Maqsadim aniq: kuchli Android
                dasturchisi bo'lish va Rust'da mustahkam poydevor qurish.
              </p>
            </Reveal>

            {/* faktlar jadvali */}
            <Reveal delay={360}>
              <div className="mt-10 grid sm:grid-cols-2 border border-cream/10">
                {FACTS.map((f, i) => (
                  <div
                    key={f.k}
                    data-hover
                    className={`px-5 py-4 hover:bg-cream/[0.04] transition-colors duration-300 ${
                      i % 2 === 0 ? "sm:border-r sm:border-cream/10" : ""
                    } ${i < 5 ? "border-b border-cream/10" : ""} ${i === 4 ? "sm:border-b-0" : ""}`}
                  >
                    <p className="font-term text-[9px] tracking-[0.3em] text-sage">{f.k}</p>
                    <p className="font-semibold text-cream mt-1">{f.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* hozir nima qilyapman */}
            <Reveal delay={440}>
              <div className="mt-8 border border-lime/25 bg-lime/[0.04] px-6 py-6">
                <p className="font-term text-[10px] tracking-[0.3em] text-lime mb-4 flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
                  </span>
                  HOZIR NIMA BILAN BANDMAN
                </p>
                <ul className="space-y-3">
                  {NOW.map((n) => (
                    <li key={n.text} className="flex items-center gap-3 text-cream/75 text-sm md:text-[15px]">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${n.dot}`} />
                      {n.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
