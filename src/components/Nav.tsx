import { useEffect, useState } from "react";
import { useTashkentTime } from "../hooks";

const LINKS = [
  { href: "#about", label: "HAQIMDA" },
  { href: "#experience", label: "TAJRIBA" },
  { href: "#skills", label: "KO'NIKMALAR" },
  { href: "#projects", label: "LOYIHALAR" },
  { href: "#terminal", label: "TERMINAL" },
  { href: "#contact", label: "ALOQA" },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const time = useTashkentTime();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-md border-b border-cream/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="h-[3px] bg-cream/10">
          <div
            className="h-full bg-lime"
            style={{ width: `${progress * 100}%`, transition: "width 120ms linear" }}
          />
        </div>
        <nav className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between">
          <a href="#top" data-hover className="flex items-center gap-2 group">
            <span className="font-display font-bold text-lg text-lime border border-lime/60 px-2 py-0.5 group-hover:bg-lime group-hover:text-ink transition-colors duration-300">
              AR<span className="caret">_</span>
            </span>
            <span className="font-term text-[10px] text-sage hidden sm:block tracking-[0.25em]">
              v2.5
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6 xl:gap-7">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                data-hover
                className="font-term text-[11px] tracking-[0.2em] text-cream/70 hover:text-lime transition-colors relative group"
              >
                <span className="text-coral/80 mr-1">0{i + 1}.</span>
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <span className="font-term text-[11px] text-sage border border-cream/15 px-2.5 py-1 tracking-[0.15em] tabular-nums">
              TAS {time}
            </span>
          </div>

          <button
            onClick={() => setOpen(!open)}
            data-hover
            aria-label="Menyu"
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block h-0.5 w-6 bg-lime transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-cream transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-coral transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      {/* mobil menyu */}
      <div
        className={`fixed inset-0 z-[65] lg:hidden bg-ink/95 backdrop-blur-lg transition-all duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-display text-2xl sm:text-3xl font-bold text-cream hover:text-lime transition-all duration-500 py-4 border-b border-cream/10 flex items-baseline gap-4 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <span className="font-term text-xs text-coral">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <p className="font-term text-xs text-sage mt-8 tracking-[0.25em] tabular-nums">
            TOSHKENT — {time}
          </p>
        </div>
      </div>
    </>
  );
}
