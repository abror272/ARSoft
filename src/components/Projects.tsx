import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Reveal, SectionHead } from "../ui";
import { useLang } from "../i18n";

type Base = { num: string; title: string; year: string; url?: string; downloadUrl?: string };
const BASE: Base[] = [
  { num: "01", title: "COFFEIN", year: "2026", url: "https://github.com/abror272/Coffein" },
  { num: "02", title: "POMODORO", year: "2026", url: "https://github.com/abror272/pomodoro", downloadUrl: "https://abror272.github.io/pomodoro/pomodoro-debug.apk" },
  { num: "03", title: "IELTS ACCELERATOR", year: "2026", url: "https://github.com/abror272/ielts-acccelerator" },
  { num: "04", title: "ARSOFT", year: "2026", url: "https://github.com/abror272/ARSoft" },
];

type Project = Base & { desc: string; long: string; stack: string[]; statV: string; statL: string };

function TiltRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -2.5;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 2.5;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)"; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="transition-transform duration-300 will-change-transform">{children}</div>;
}

export default function Projects() {
  const { t } = useLang();
  const p = t.projects;
  const PROJECTS: Project[] = BASE.map((b, i) => ({ ...b, ...p.items[i] }));
  const [sel, setSel] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSel(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="relative py-20 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <SectionHead num="04" label={p.label} title={p.title} />
          <p className="font-term text-[11px] tracking-[0.25em] text-sage max-w-xs text-right hidden sm:block">{p.side}</p>
        </div>
        <div className="space-y-6">
          {PROJECTS.map((pr, i) => (
            <Reveal key={pr.num} delay={i * 80}>
              <TiltRow>
                <button onClick={() => setSel(pr)} data-hover className="group w-full text-left grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 border border-cream/10 bg-ink2/50 px-6 md:px-10 py-8 md:py-10 hover:border-lime/50 hover:bg-ink2 transition-colors duration-300">
                  <span className="font-display font-black text-5xl md:text-7xl text-outline-cream group-hover:text-outline transition-all duration-500 leading-none select-none">{pr.num}</span>
                  <span className="block">
                    <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <span className="font-display font-bold text-2xl md:text-3xl text-cream group-hover:text-lime transition-colors duration-300">{pr.title}</span>
                      <span className="font-term text-[9px] tracking-[0.25em] px-2 py-1 border border-lime/40 text-lime">{p.badgePersonal}</span>
                      <span className="font-term text-[10px] tracking-[0.25em] text-sage">{pr.year}</span>
                    </span>
                    <span className="block mt-3 text-cream/60 max-w-2xl leading-relaxed">{pr.desc}</span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      {pr.stack.slice(0, 3).map(s => <span key={s} className="font-term text-[10px] tracking-[0.15em] px-2.5 py-1 bg-cream/5 text-cream/60">{s}</span>)}
                      {pr.stack.length > 3 && <span className="font-term text-[10px] tracking-[0.15em] px-2.5 py-1 text-coral">+{pr.stack.length - 3}</span>}
                    </span>
                  </span>
                  <span className="hidden md:flex flex-col items-end gap-4">
                    <span className="text-right">
                      <span className="block font-display font-bold text-2xl text-coral">{pr.statV}</span>
                      <span className="block font-term text-[9px] tracking-[0.25em] text-sage mt-1">{pr.statL}</span>
                    </span>
                    <span className="w-11 h-11 border border-cream/20 flex items-center justify-center text-cream/60 group-hover:bg-lime group-hover:border-lime group-hover:text-ink group-hover:rotate-45 transition-all duration-300"><ArrowUpRight className="w-5 h-5" /></span>
                  </span>
                </button>
              </TiltRow>
            </Reveal>
          ))}
        </div>
      </div>
      {sel && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-5" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={() => setSel(null)} />
          <div className="relative bg-ink2 border border-lime/30 max-w-2xl w-full p-5 sm:p-7 md:p-10 max-h-[85vh] overflow-y-auto animate-[modalin_0.3s_ease]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-term text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.3em] text-coral mb-3">{sel.num} / {sel.year} — <span className="text-lime">{p.badgePersonal}</span></p>
                <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl leading-tight text-cream">{sel.title}</h3>
              </div>
              <button onClick={() => setSel(null)} data-hover aria-label={p.closeAria} className="shrink-0 w-10 h-10 border border-cream/20 text-cream/70 hover:border-coral hover:text-coral hover:rotate-90 transition-all duration-300 font-term text-sm">✕</button>
            </div>
            <p className="mt-6 text-cream/75 leading-relaxed">{sel.long}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {sel.stack.map(s => <span key={s} className="font-term text-[11px] tracking-[0.15em] px-3 py-1.5 border border-cream/15 text-cream/75">{s}</span>)}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-cream/10 pt-6">
              <div>
                <p className="font-display font-black text-3xl text-lime">{sel.statV}</p>
                <p className="font-term text-[10px] tracking-[0.25em] text-sage mt-1">{sel.statL}</p>
              </div>
              <div className="flex gap-3">
                {sel.downloadUrl && <a href={sel.downloadUrl} download data-hover className="inline-flex items-center gap-2 bg-lime text-ink font-term text-xs px-5 py-3 hover:bg-coral hover:text-cream transition-colors duration-300">{p.download} <ArrowUpRight className="w-3.5 h-3.5" /></a>}
                {sel.url && <a href={sel.url} target="_blank" rel="noreferrer" data-hover className="inline-flex items-center gap-2 border border-cream/20 text-cream/70 font-term text-xs px-5 py-3 hover:border-lime hover:text-lime transition-colors duration-300">{p.github} <ArrowUpRight className="w-3.5 h-3.5" /></a>}
                <button onClick={() => setSel(null)} data-hover className="font-term text-xs px-5 py-3 border border-cream/20 text-cream/70 hover:border-cream/60 hover:text-cream transition-colors duration-300">{p.close}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
