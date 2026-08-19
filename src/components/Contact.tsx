import { useState, type FormEvent } from "react";
import { useReveal, useScramble } from "../hooks";
import { ArrowUp, ArrowUpRight, Magnetic, Reveal } from "../ui";

const SOCIALS = [
  { n: "GITHUB", h: "@sardorcodes", url: "https://github.com" },
  { n: "TELEGRAM", h: "@sardor_dev", url: "https://t.me" },
  { n: "LINKEDIN", h: "/in/sardor-dev", url: "https://linkedin.com" },
  { n: "INSTAGRAM", h: "@sardor.codes", url: "https://instagram.com" },
];

export default function Contact() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  const t1 = useScramble("LOYIHA BORMI?", inView, 30);
  const t2 = useScramble("GAPLASHAMIZ.", inView, 30);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("salom@sardor.dev");
    } catch {
      /* eski brauzer — muhim emas */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[36rem] h-[36rem] rounded-full bg-lime/[0.04] blur-3xl pointer-events-none" />
      <div ref={ref} className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <p className="font-term text-[11px] md:text-xs tracking-[0.35em] text-coral mb-4">
              <span className="text-sage">05</span> // ALOQA
            </p>
            <h2 className="font-display font-black leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-cream">
              {t1}
              <span className="block text-outline mt-2">{t2}</span>
            </h2>
            <p className="mt-7 text-cream/65 leading-relaxed max-w-md text-lg">
              G'oya, taklif yoki shunchaki "salom" — hammasiga ochiqman. Odatda{" "}
              <span className="text-lime">24 soat ichida</span> javob beraman.
            </p>

            <div className="mt-10 border-t border-cream/10">
              <div className="flex items-center justify-between gap-4 border-b border-cream/10 py-5">
                <div>
                  <p className="font-term text-[10px] tracking-[0.3em] text-sage">EMAIL</p>
                  <a href="mailto:salom@sardor.dev" data-hover className="font-display font-bold text-lg md:text-xl text-cream hover:text-lime transition-colors">
                    salom@sardor.dev
                  </a>
                </div>
                <button
                  onClick={copy}
                  data-hover
                  className={`shrink-0 font-term text-[11px] tracking-[0.15em] px-4 py-2.5 border transition-all duration-300 ${
                    copied
                      ? "border-lime bg-lime text-ink"
                      : "border-cream/20 text-cream/70 hover:border-lime hover:text-lime"
                  }`}
                >
                  {copied ? "NUSXALANDI ✓" : "NUSXALASH"}
                </button>
              </div>

              {SOCIALS.map((s, i) => (
                <Reveal key={s.n} delay={i * 70}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    data-hover
                    className="group flex items-center justify-between gap-4 border-b border-cream/10 py-4 hover:bg-cream/[0.03] hover:pl-3 transition-all duration-300"
                  >
                    <span className="font-display font-bold text-sm md:text-base text-cream/85 group-hover:text-coral transition-colors">
                      {s.n}
                    </span>
                    <span className="font-term text-[11px] text-sage">{s.h}</span>
                    <ArrowUpRight className="w-4 h-4 text-sage group-hover:text-lime group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </a>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 font-term text-[10px] tracking-[0.25em] text-sage flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              HOZIR YANGI LOYIHALAR QABUL QILINMOQDA
            </p>
          </div>

          {/* forma */}
          <Reveal delay={150}>
            <div className="border border-cream/15 bg-ink2/60 p-7 md:p-10 relative">
              <div className="absolute -top-3 left-6 bg-ink px-3 font-term text-[10px] tracking-[0.3em] text-coral">
                TEZ XABAR
              </div>

              {sent ? (
                <div className="py-16 text-center">
                  <svg viewBox="0 0 52 52" className="w-16 h-16 mx-auto" fill="none">
                    <circle cx="26" cy="26" r="24" stroke="var(--color-lime)" strokeWidth="2" opacity="0.4" />
                    <path
                      d="M15 27l8 8 15-17"
                      stroke="var(--color-lime)"
                      strokeWidth="3"
                      strokeLinecap="square"
                      className="draw-check"
                    />
                  </svg>
                  <p className="mt-6 font-display font-bold text-2xl text-cream">XABARINGIZ UCHDI!</p>
                  <p className="mt-3 font-term text-xs text-sage tracking-[0.15em]">
                    {form.name.toUpperCase() ? `${form.name.toUpperCase()}, ` : ""}24 SOAT ICHIDA JAVOB BERAMAN.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", msg: "" });
                    }}
                    data-hover
                    className="mt-8 font-term text-[11px] tracking-[0.2em] text-coral hover:text-lime transition-colors"
                  >
                    ← YANA YOZISH
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-6">
                  {(
                    [
                      { k: "name", l: "ISMINGIZ", ph: "Aziz Azizov", type: "text" },
                      { k: "email", l: "EMAIL", ph: "aziz@misol.uz", type: "email" },
                    ] as const
                  ).map((f) => (
                    <div key={f.k}>
                      <label className="block font-term text-[10px] tracking-[0.3em] text-sage mb-2" htmlFor={f.k}>
                        {f.l} <span className="text-coral">*</span>
                      </label>
                      <input
                        id={f.k}
                        type={f.type}
                        required
                        value={form[f.k]}
                        onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                        placeholder={f.ph}
                        className="w-full bg-transparent border-b border-cream/20 focus:border-lime outline-none py-3 text-cream placeholder:text-cream/25 transition-colors duration-300 font-medium"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-term text-[10px] tracking-[0.3em] text-sage mb-2" htmlFor="msg">
                      XABAR <span className="text-coral">*</span>
                    </label>
                    <textarea
                      id="msg"
                      required
                      rows={4}
                      value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      placeholder="Loyihangiz haqida qisqacha..."
                      className="w-full bg-transparent border-b border-cream/20 focus:border-lime outline-none py-3 text-cream placeholder:text-cream/25 transition-colors duration-300 resize-none font-medium"
                    />
                  </div>
                  <Magnetic>
                    <button
                      type="submit"
                      data-hover
                      className="group w-full inline-flex items-center justify-center gap-3 bg-lime text-ink font-display font-bold text-sm px-7 py-4 hover:bg-coral hover:text-cream transition-colors duration-300"
                    >
                      YUBORISH
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </Magnetic>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-cream/10 py-8">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-term text-[10px] md:text-[11px] text-sage tracking-[0.2em]">
          © 2025 SARDOR KARIMOV — TOSHKENT
        </p>
        <p className="font-term text-[10px] md:text-[11px] text-cream/35 tracking-[0.2em] text-center">
          SYURPRIZ: <span className="text-coral">↑ ↑ ↓ ↓ ← → ← → B A</span>
        </p>
        <div className="flex items-center gap-6">
          <p className="font-term text-[10px] md:text-[11px] text-sage tracking-[0.2em] hidden sm:block">
            0 TAYYOR SHABLON — 100% QO'LDA
          </p>
          <a
            href="#top"
            data-hover
            aria-label="Yuqoriga"
            className="w-9 h-9 border border-cream/20 flex items-center justify-center text-cream/70 hover:border-lime hover:text-lime hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
