import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Reveal, SectionHead } from "../ui";

type Project = {
  num: string;
  title: string;
  year: string;
  role: string;
  desc: string;
  long: string;
  stack: string[];
  stat: { v: string; l: string };
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "SAMO TRAVEL",
    year: "2024",
    role: "FULL-STACK",
    desc: "O'zbekiston bo'ylab sayohat uchun interaktiv platforma: 3D xarita, real-time bronlash va AI maslahatchi.",
    long: "Samarqanddan Xivagacha — 40 000+ foydalanuvchi sayohatini rejalashtirgan platforma. Mapbox GL ustida maxsus 3D qatlam, Stripe orqali xalqaro to'lovlar va LLM asosidagi marshrut maslahatchisi qurdim. Eng sevimli qism: offline rejimda ham ishlaydigan PWA xarita.",
    stack: ["NEXT.JS", "TYPESCRIPT", "MAPBOX GL", "STRIPE", "POSTGRESQL"],
    stat: { v: "40K+", l: "FOYDALANUVCHI" },
  },
  {
    num: "02",
    title: "BILIM EDU",
    year: "2024",
    role: "FRONTEND LEAD",
    desc: "Jonli darslar va AI-tekshiruvli testlar bilan ta'lim platformasi. Offline-first PWA arxitektura.",
    long: "5 nafar frontend dasturchidan iborat jamoani boshqardim. WebRTC orqali 500+ talaba bir vaqtda jonli darsda qatnashadi. Zustand bilan bashoratli holat boshqaruvi, service-worker orqali darslar internetsiz ham davom etadi.",
    stack: ["REACT", "ZUSTAND", "WEBRTC", "PWA", "SUPABASE"],
    stat: { v: "120+", l: "VIDEO KURS" },
  },
  {
    num: "03",
    title: "NON & NON",
    year: "2023",
    role: "SOLO DEVELOPER",
    desc: "Hunarmand nonvoyxona uchun headless e-commerce — issiq non har kuni soat 06:00 da saytda.",
    long: "Butun loyihani noldan deploygacha yakka o'zim qurdim. Shopify headless API, Next.js ISR va Framer Motion mikro-animatsiyalar. Natija: savdo 3 barobar o'sdi, sahifa yuklanishi 0.8 soniyaga tushdi. Lighthouse — 100/100/100/100.",
    stack: ["NEXT.JS", "SHOPIFY", "TAILWIND", "FRAMER MOTION"],
    stat: { v: "3X", l: "SAVDO O'SISHI" },
  },
  {
    num: "04",
    title: "CHIRCHIQ PAY",
    year: "2023",
    role: "BACKEND",
    desc: "Kichik biznes uchun to'lov terminallari boshqaruvi: real-time monitoring va antifraud tizimi.",
    long: "Kuniga 200 000+ tranzaksiyani qayta ishlaydigan mikroservislar arxitekturasi. Kafka navbatlari, Redis kesh va Grafana dashbordlari. Eng katta faxr: 14 oy davomida 99.98% uptime — bitta jiddiy insidentsiz.",
    stack: ["NODE.JS", "REDIS", "KAFKA", "DOCKER", "GRAFANA"],
    stat: { v: "99.98%", l: "UPTIME" },
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
          <SectionHead num="03" label="TANLANGAN ISHLAR" title="LOYIHALAR" />
          <p className="font-term text-[11px] tracking-[0.25em] text-sage">
            [ 2023 — 2025 ] &nbsp;<span className="text-coral">4 TA</span>
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
                    <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                      <span className="font-display font-bold text-2xl md:text-4xl text-cream group-hover:text-lime transition-colors duration-300">
                        {p.title}
                      </span>
                      <span className="font-term text-[10px] tracking-[0.25em] text-sage">
                        {p.year} — {p.role}
                      </span>
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
                  {sel.num} / {sel.year} — {sel.role}
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
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="inline-flex items-center gap-2 bg-lime text-ink font-term text-xs px-5 py-3 hover:bg-coral hover:text-cream transition-colors duration-300"
                >
                  GITHUB <ArrowUpRight className="w-3.5 h-3.5" />
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
