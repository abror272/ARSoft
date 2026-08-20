import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Reveal, SectionHead } from "../ui";

type Project = {
  num: string;
  title: string;
  year: string;
  badge: "O'RGANISH" | "EKSPERIMENT" | "AMALIYOT" | "SHAXSIY";
  desc: string;
  long: string;
  stack: string[];
  stat: { v: string; l: string };
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "ESLATMALAR ILOVASI",
    year: "2025",
    badge: "O'RGANISH",
    desc: "Kotlin'dagi ilk Android ilovam: eslatmalar yaratish, tahrirlash va o'chirish — oddiy, lekin oxirigacha ishlaydigan.",
    long: "Birinchi haqiqiy Android ilovam. RecyclerView bilan boshlab, keyin asta-sekin Compose'ga ko'chirdim. Room bilan saqlash, MVVM arxitekturasining eng sodda ko'rinishi. Katta ilova emas, lekin aynan shunda Android'ning qanday ishlashini tushunib qoldim — Activity hayot sikli, state saqlash va layout'lar bilan ishlash shu yerda o'rgandi.",
    stack: ["KOTLIN", "ANDROID", "ROOM", "MVVM"],
    stat: { v: "1.0", l: "BIRINCHI VERSIYA" },
  },
  {
    num: "02",
    title: "RUST — SALOM, DUNYO",
    year: "2026",
    badge: "EKSPERIMENT",
    desc: "Rust'dagi ilk urinishlarim: kichik CLI dasturlari, fayl o'qish va cargo bilan ishlashni o'rganish.",
    long: "Rust'ga endigina kirib keldim va ochiq aytaman — borrow checker bilan do'st bo'lish oson emas. Hozircha oddiy CLI dasturlari yozaman: fayllarni o'qish, argumentlarni qayta ishlash, xatolarni Result bilan boshqarish. Har bir kompilyator xatosi menga yangi narsa o'rgatyapti. Bu bo'lim vaqt o'tishi bilan to'lib boradi — va'da.",
    stack: ["RUST", "CARGO"],
    stat: { v: "20%", l: "O'ZLASHTIRILDI" },
  },
  {
    num: "03",
    title: "XARAJAT HISOBCHI",
    year: "2025",
    badge: "AMALIYOT",
    desc: "Kundalik xarajatlarni yozib borish uchun ilova: kategoriyalar, oylik hisobot va oddiy grafiklar.",
    long: "O'zimga kerak bo'lgani uchun yozdim — oy oxirida pul qayerga ketganini bilmasdim. Kotlin'da yozilgan, SQLite'da saqlanadi, MPAndroidChart bilan oylik grafik chiqaradi. Eng qiyin joyi — sana va valyuta bilan ishlash ekan, uni ham o'z usulimda hal qildim. Do'stlarimdan bir nechtasi ham ishlatib yuribdi.",
    stack: ["KOTLIN", "SQLITE", "MPANDROIDCHART"],
    stat: { v: "5+", l: "DO'ST ISHLATADI" },
  },
  {
    num: "04",
    title: "SHU SAYT",
    year: "2026",
    badge: "SHAXSIY",
    desc: "Hozir ko'rib turgan saytning o'zi — React, TypeScript va Tailwind'da yozilgan portfolio.",
    long: "Dasturchining portfolio'si — uning yuzi. Bu saytni o'zim yozdim: React va TypeScript, Tailwind CSS, o'z qo'lim bilan yig'ilgan animatsiyalar. Pastdagi terminal ham haqiqiy ishlaydi — sinab ko'ring. Bu sayt menga frontend tomonini ham yaxshiroq tushunishga yordam berdi.",
    stack: ["REACT", "TYPESCRIPT", "TAILWIND"],
    stat: { v: "SIZ", l: "HOZIR SHU YERDASIZ" },
  },
];

function TiltRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const elr = ref.current;
    if (!elr) return;
    const r = elr.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -2.5;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 2.5;
    elr.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const elr = ref.current;
    if (elr) elr.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform duration-300 will-change-transform"
    >
      {children}
    </div>
  );
}

const BADGE_STYLE: Record<Project["badge"], string> = {
  SHAXSIY: "border-lime/40 text-lime",
  EKSPERIMENT: "border-coral/50 text-coral",
  AMALIYOT: "border-cream/30 text-cream/80",
  "O'RGANISH": "border-sage/50 text-sage",
};

export default function Projects() {
  const [sel, setSel] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <SectionHead num="04" label="QURILAYOTGAN NARSALAR" title="LOYIHALAR & EKSPERIMENTLAR" />
          <p className="font-term text-[11px] tracking-[0.25em] text-sage max-w-xs text-right hidden sm:block">
            KATTA EMAS — <span className="text-coral">LEKIN HALOL ISHLAR.</span>
          </p>
        </div>

        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.num} delay={i * 80}>
              <TiltRow>
                <button
                  onClick={() => setSel(p)}
                  data-hover
                  className="group w-full text-left grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 border border-cream/10 bg-ink2/50 px-6 md:px-10 py-8 md:py-10 hover:border-lime/50 hover:bg-ink2 transition-colors duration-300"
                >
                  <span className="font-display font-black text-5xl md:text-7xl text-outline-cream group-hover:text-outline transition-all duration-500 leading-none select-none">
                    {p.num}
                  </span>
                  <span className="block">
                    <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <span className="font-display font-bold text-2xl md:text-3xl text-cream group-hover:text-lime transition-colors duration-300">
                        {p.title}
                      </span>
                      <span className={`font-term text-[9px] tracking-[0.25em] px-2 py-1 border ${BADGE_STYLE[p.badge]}`}>
                        {p.badge}
                      </span>
                      <span className="font-term text-[10px] tracking-[0.25em] text-sage">{p.year}</span>
                    </span>
                    <span className="block mt-3 text-cream/60 max-w-2xl leading-relaxed">{p.desc}</span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      {p.stack.slice(0, 3).map((s) => (
                        <span key={s} className="font-term text-[10px] tracking-[0.15em] px-2.5 py-1 bg-cream/5 text-cream/60">
                          {s}
                        </span>
                      ))}
                      <span className="font-term text-[10px] tracking-[0.15em] px-2.5 py-1 text-coral">
                        +{p.stack.length - 3}
                      </span>
                    </span>
                  </span>
                  <span className="hidden md:flex flex-col items-end gap-4">
                    <span className="text-right">
                      <span className="block font-display font-bold text-2xl text-coral">{p.stat.v}</span>
                      <span className="block font-term text-[9px] tracking-[0.25em] text-sage mt-1">{p.stat.l}</span>
                    </span>
                    <span className="w-11 h-11 border border-cream/20 flex items-center justify-center text-cream/60 group-hover:bg-lime group-hover:border-lime group-hover:text-ink group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </span>
                </button>
              </TiltRow>
            </Reveal>
          ))}
        </div>
      </div>

      {/* modal */}
      {sel && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-5" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={() => setSel(null)} />
          <div className="relative bg-ink2 border border-lime/30 max-w-2xl w-full p-7 md:p-10 max-h-[85vh] overflow-y-auto animate-[modalin_0.3s_ease]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-term text-[11px] tracking-[0.3em] text-coral mb-3">
                  {sel.num} / {sel.year} — <span className={BADGE_STYLE[sel.badge].split(" ")[1]}>{sel.badge}</span>
                </p>
                <h3 className="font-display font-black text-3xl md:text-4xl text-cream">{sel.title}</h3>
              </div>
              <button
                onClick={() => setSel(null)}
                data-hover
                aria-label="Yopish"
                className="shrink-0 w-10 h-10 border border-cream/20 text-cream/70 hover:border-coral hover:text-coral hover:rotate-90 transition-all duration-300 font-term text-sm"
              >
                ✕
              </button>
            </div>

            <p className="mt-6 text-cream/75 leading-relaxed">{sel.long}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {sel.stack.map((s) => (
                <span key={s} className="font-term text-[11px] tracking-[0.15em] px-3 py-1.5 border border-cream/15 text-cream/75">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-cream/10 pt-6">
              <div>
                <p className="font-display font-black text-3xl text-lime">{sel.stat.v}</p>
                <p className="font-term text-[10px] tracking-[0.25em] text-sage mt-1">{sel.stat.l}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/abrorraximbayev-909512387"
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="inline-flex items-center gap-2 bg-lime text-ink font-term text-xs px-5 py-3 hover:bg-coral hover:text-cream transition-colors duration-300"
                >
                  LINKEDIN'DA SO'RANG <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setSel(null)}
                  data-hover
                  className="font-term text-xs px-5 py-3 border border-cream/20 text-cream/70 hover:border-cream/60 hover:text-cream transition-colors duration-300"
                >
                  YOPISH [ESC]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
