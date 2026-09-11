import { Reveal, SectionHead } from "../ui";
import { useLang } from "../i18n";

export default function Experience() {
  const { t } = useLang();
  const e = t.experience;
  return (
    <section id="experience" className="relative py-20 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead num="02" label={e.label} title={e.title} className="mb-16" />
        <div className="relative border-l border-cream/15 ml-2 md:ml-4">
          {e.jobs.map((job, i) => (
            <Reveal key={job.company} delay={i * 100}>
              <div className="relative pl-8 md:pl-14 pb-14 last:pb-0 group">
                <span className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rotate-45 border-2 ${job.now ? "bg-lime border-lime" : "bg-ink border-cream/40"} group-hover:scale-125 transition-transform duration-300`} />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                  <span className="font-term text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.25em] text-coral">{job.period}</span>
                  <span className="font-term text-[9px] tracking-[0.12em] sm:tracking-[0.25em] text-sage border border-cream/15 px-2 py-0.5">{job.duration}</span>
                  {job.now && <span className="font-term text-[9px] tracking-[0.12em] sm:tracking-[0.25em] text-lime flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />{e.active}</span>}
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-cream group-hover:text-lime transition-colors duration-300">{job.company}</h3>
                <p className="font-term text-[11px] sm:text-xs tracking-[0.08em] sm:tracking-[0.15em] text-sage mt-2">{job.role.toUpperCase()} — {job.place}</p>
                <ul className="mt-5 space-y-2.5 max-w-2xl">
                  {job.points.map(p => <li key={p} className="flex gap-3 text-cream/65 leading-relaxed text-sm md:text-[15px]"><span className="text-lime font-term shrink-0">+</span>{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
