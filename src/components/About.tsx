import { Reveal, SectionHead } from "../ui";

const PORTRAIT =
  "https://image.qwenlm.ai/generated-images/6fb4950e-c079-4faf-9e61-8d98d29f8b5f/_result.png";

const FACTS = [
  { k: "ASOSIY YO'NALISH", v: "Kotlin / Android" },
  { k: "TA'LIM", v: "UrDU · Software Engineering" },
  { k: "HOZIRGI ISH", v: "ARYFMA · Texnik yordam mutaxassisi" },
  { k: "OLDINGI TAJRIBA", v: "BR Tech · 1 yil staj" },
  { k: "MAQSAD", v: "Android dasturchisi bo'lish" },
];

const PRINCIPLES = [
  { n: "01", t: "Amaliyot", d: "O'rgangan narsamni kod yozib sinab ko'raman." },
  { n: "02", t: "Kichik qadamlar", d: "Har kuni yangi narsani o'rganishga harakat qilaman." },
  { n: "03", t: "Savol berish", d: "Tushunmagan narsamni so'rashdan qo'rqmayman." },
];

const NOW = [
  { dot: "bg-lime", text: "Kotlin: Android asoslarini o'rganyapman" },
  { dot: "bg-coral", text: "Android: Jetpack va Compose bilan ishlayapman" },
  { dot: "bg-cream/60", text: "ARYFMA: texnik yordam va ichki tizimlar bilan ishlayman" },
  { dot: "bg-sage", text: "UrDU: Software Engineering yo'nalishida o'qiyman" },
];

export default function About() {
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
                  alt="Abror Raximbayev — ish stolida, Kotlin yozayotgan dasturchi"
                  className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-lime/10 mix-blend-overlay pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 bg-ink/85 backdrop-blur px-4 sm:px-5 py-3 flex items-center justify-between gap-3 border-t border-cream/10">
                  <p className="font-term text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.25em] text-cream/80 truncate">ABROR RAXIMBAYEV</p>
                  <p className="font-term text-[9px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.2em] text-sage shrink-0">HAZORASP / URGENCH</p>
                </div>
              </div>
              <span className="absolute -top-5 -right-3 sm:-right-4 rotate-6 bg-coral text-cream font-display font-bold text-[11px] sm:text-xs px-3 py-1.5 shadow-lg">UrDU '25+</span>
            </div>
          </Reveal>

          <div>
            <SectionHead num="01" title="O'ZIM HAQIMDA" />
            <Reveal delay={120}>
              <p className="mt-7 text-cream/75 leading-relaxed text-[15px] md:text-lg">
                Men <span className="text-cream font-semibold">Abror Raximbayev</span>. Xorazmning Hazorasp tumanida tug'ilib o'sganman va hozir Urgenchda yashab, o'qib va ishlayapman. Hozir asosiy e'tiborimni <span className="text-lime font-semibold">Kotlin va Android</span>'ga qaratganman. Urganch davlat universitetida Software Engineering yo'nalishida o'qiyman.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-cream/75 leading-relaxed text-[15px] md:text-lg">
                Dasturlashdagi ilk ish tajribamni <span className="text-cream font-semibold">BR Tech</span>'da stajyor sifatida oldim. Bir yil davomida jamoada ishlash, vazifalarni bajarish va yangi narsalarni o'rganish bo'yicha tajriba orttirdim. Hozir <span className="text-cream font-semibold">ARYFMA</span>'da texnik yordam mutaxassisi bo'lib ishlayman.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-5 text-cream/75 leading-relaxed text-[15px] md:text-lg">
                Hozir <span className="text-lime font-semibold">Kotlin</span>ni o'rganyapman va Android ilovalar yozishni mashq qilyapman. Hali ko'p narsani o'rganishim kerak, shuning uchun o'zimni tajribali dasturchi deb hisoblamayman. Maqsadim — Android dasturchisi bo'lib, bilim va tajribamni asta-sekin oshirish.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-9 grid sm:grid-cols-2 border border-cream/10">
                {FACTS.map((f, i) => (
                  <div key={f.k} data-hover className={`px-5 py-4 hover:bg-cream/[0.04] transition-colors duration-300 ${i % 2 === 0 ? "sm:border-r sm:border-cream/10" : ""} ${i < 4 ? "border-b border-cream/10" : ""}`}>
                    <p className="font-term text-[9px] tracking-[0.3em] text-sage">{f.k}</p>
                    <p className="font-semibold text-cream mt-1 text-[15px]">{f.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-8">
                <p className="font-term text-[10px] tracking-[0.3em] text-sage mb-4"><span className="text-coral">//</span> MENING YONDASHUVIM</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PRINCIPLES.map((p) => (
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
                <p className="font-term text-[10px] tracking-[0.12em] sm:tracking-[0.3em] text-lime mb-4 flex items-center gap-3"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-lime" /></span>HOZIR NIMA BILAN BANDMAN</p>
                <ul className="space-y-3">{NOW.map((n) => <li key={n.text} className="flex items-center gap-3 text-cream/75 text-sm md:text-[15px]"><span className={`w-1.5 h-1.5 rounded-full shrink-0 ${n.dot}`} />{n.text}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
