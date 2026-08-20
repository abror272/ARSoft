import { useRef, type ReactNode } from "react";
import { useReveal, useScramble } from "./hooks";

/** Scroll-da paydo bo'lish o'rami */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Bo'lim sarlavhasi: raqam + yorliq + dekodlanuvchi katta sarlavha */
export function SectionHead({
  num,
  label,
  title,
  outline = false,
  className = "",
}: {
  num: string;
  label?: string;
  title: string;
  outline?: boolean;
  className?: string;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const decoded = useScramble(title, inView, 22);
  return (
    <div ref={ref} className={className}>
      {label && (
      <p className="font-term text-[11px] md:text-xs tracking-[0.18em] sm:tracking-[0.35em] text-coral mb-4">
        <span className="text-sage">{num}</span> // {label}
      </p>      )}
      <h2
        className={`font-display font-bold leading-[1.14] text-[26px] sm:text-4xl md:text-5xl lg:text-6xl ${
          outline ? "text-outline" : "text-cream"
        }`}
      >
        {decoded}
      </h2>
    </div>
  );
}

/** Magnit effekt: element kursor tomon tortiladi */
export function Magnetic({
  children,
  className = "",
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

export function ArrowUpRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowUp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 20V4m0 0l-6 6m6-6l6 6" strokeLinecap="square" />
    </svg>
  );
}

export function Diamond({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6 0l6 6-6 6L0 6z" />
    </svg>
  );
}
