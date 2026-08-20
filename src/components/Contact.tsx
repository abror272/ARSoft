import { useState } from "react";
import { useTashkentTime } from "../hooks";
import { ArrowUpRight, Reveal, SectionHead } from "../ui";

const EMAIL = "abrorraximbayev272@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/abrorraximbayev-909512387";
const LINKEDIN_SHORT = "/in/abrorraximbayev-909512387";

type FormState = "idle" | "sending" | "done";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Hamkorlik");
  const [msg, setMsg] = useState("");
  const [errs, setErrs] = useState<{ name?: string; email?: string; msg?: string }>({});
  const [state, setState] = useState<FormState>("idle");
  const time = useTashkentTime();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* qo'lda tanlash mumkin */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errs = {};
    if (name.trim().length < 2) next.name = "Ismingizni kiriting";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Email noto'g'ri ko'rinadi";
    if (msg.trim().length < 5) next.msg = "Xabar juda qisqa";
    setErrs(next);
    if (Object.keys(next).length > 0) return;

    setState("sending");
    const subject = encodeURIComponent(`Portfolio: ${topic} — ${name}`);
    const body = encodeURIComponent(`Assalomu alaykum, Abror!\n\n${msg}\n\n—Ism: ${name}\n—Email: ${email}`);
    window.setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setState("done");
    }, 900);
  };

  const inputCls = (err?: string) =>
    `w-full bg-ink border px-4 py-3.5 font-term text-sm text-cream outline-none transition-colors duration-300 placeholder:text-cream/30 ${
      err ? "border-coral" : "border-cream/15 focus:border-lime"
    }`;

  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <SectionHead num="06" label="KANALLAR" title="GAPLASHAMIZMI?" />
            <Reveal delay={140}>
              <p className="mt-7 text-cream/70 leading-relaxed max-w-lg">
                Ochig'ini aytaman: <span className="text-coral font-semibold">buyurtma qabul qilmayman</span>{" "}
                — o'z kompaniyamda mahsulot yaratish bilan bandman. Lekin{" "}
                <span className="text-lime font-semibold">hamkorlik, g'oya almashish</span> va Kotlin
                yoki Rust haqidagi suhbat uchun eshigim doim ochiq.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              <Reveal delay={200}>
                <div className="group border border-cream/10 bg-ink2/50 px-6 py-5 flex flex-wrap items-center justify-between gap-4 hover:border-lime/50 transition-colors duration-300" data-hover>
                  <div className="min-w-0">
                    <p className="font-term text-[9px] tracking-[0.3em] text-sage">EMAIL</p>
                    <a href={`mailto:${EMAIL}`} className="font-term text-sm md:text-base text-cream group-hover:text-lime transition-colors break-all">
                      {EMAIL}
                    </a>
                  </div>
                  <button
                    onClick={copy}
                    data-hover
                    className={`font-term text-[10px] tracking-[0.2em] px-4 py-2.5 border transition-all duration-300 ${
                      copied
                        ? "border-lime bg-lime text-ink"
                        : "border-cream/20 text-cream/70 hover:border-lime hover:text-lime"
                    }`}
                  >
                    {copied ? "NUSXALANDI ✓" : "NUSXALASH"}
                  </button>
                </div>
              </Reveal>

              <Reveal delay={280}>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="group border border-cream/10 bg-ink2/50 px-6 py-5 flex items-center justify-between gap-4 hover:border-lime/50 transition-colors duration-300"
                >
                  <div className="min-w-0">
                    <p className="font-term text-[9px] tracking-[0.3em] text-sage">LINKEDIN</p>
                    <p className="font-term text-sm md:text-base text-cream group-hover:text-lime transition-colors truncate">
                      {LINKEDIN_SHORT}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-cream/50 group-hover:text-lime group-hover:rotate-45 transition-all duration-300 shrink-0" />
                </a>
              </Reveal>

              <Reveal delay={360}>
                <div className="group border border-cream/10 bg-ink2/50 px-6 py-5 flex items-center justify-between gap-4 hover:border-lime/50 transition-colors duration-300" data-hover>
                  <div>
                    <p className="font-term text-[9px] tracking-[0.3em] text-sage">LOKATSIYA</p>
                    <p className="font-term text-sm md:text-base text-cream">
                      Xazorasp, Xorazm <span className="text-sage">→</span> ish: Urgench
                    </p>
                  </div>
                  <span className="font-term text-[10px] text-sage tracking-[0.2em] tabular-nums shrink-0">TAS {time}</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={420}>
              <p className="mt-8 font-term text-[11px] text-sage leading-relaxed border-l-2 border-coral pl-4">
                Javob odatda <span className="text-cream">24 soat ichida</span> — darslar va ish
                orasida. Mavzu Kotlin yoki Rust bo'lsa, <span className="text-lime">undan ham tezroq</span>.
              </p>
            </Reveal>
          </div>

          {/* forma */}
          <Reveal delay={200}>
            <div className="border border-cream/15 bg-ink2/60 p-7 md:p-9 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-lime via-cream/40 to-coral" />
              <p className="font-term text-[11px] tracking-[0.35em] text-coral mb-7">// XABAR QOLDIRING</p>

              {state === "done" ? (
                <div className="py-14 text-center">
                  <svg viewBox="0 0 48 48" className="w-16 h-16 mx-auto" fill="none" stroke="#c6f24e" strokeWidth="3">
                    <circle cx="24" cy="24" r="21" stroke="#c6f24e33" />
                    <path d="M14 25l7 7 13-14" className="draw-check" strokeLinecap="square" />
                  </svg>
                  <p className="font-display font-bold text-2xl text-cream mt-6">XABAR TAYYOR!</p>
                  <p className="font-term text-xs text-sage mt-3 leading-relaxed max-w-xs mx-auto">
                    Pochta ilovasi ochilgan bo'lishi kerak. Ochilmagan bo'lsa, yuqoridagi emailni nusxalang.
                  </p>
                  <button
                    onClick={() => {
                      setState("idle");
                      setName("");
                      setEmail("");
                      setMsg("");
                    }}
                    data-hover
                    className="mt-7 font-term text-[11px] tracking-[0.2em] px-5 py-3 border border-cream/20 text-cream/70 hover:border-lime hover:text-lime transition-colors duration-300"
                  >
                    YANA YUBORISH
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-term text-[10px] tracking-[0.25em] text-sage block mb-2" htmlFor="f-name">ISM</label>
                      <input id="f-name" data-hover value={name} onChange={(e) => setName(e.target.value)} placeholder="Ismingiz" className={inputCls(errs.name)} />
                      {errs.name && <p className="font-term text-[10px] text-coral mt-1.5">{errs.name}</p>}
                    </div>
                    <div>
                      <label className="font-term text-[10px] tracking-[0.25em] text-sage block mb-2" htmlFor="f-email">EMAIL</label>
                      <input id="f-email" data-hover type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="siz@pochta.uz" className={inputCls(errs.email)} />
                      {errs.email && <p className="font-term text-[10px] text-coral mt-1.5">{errs.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="font-term text-[10px] tracking-[0.25em] text-sage block mb-2" htmlFor="f-topic">MAVZU</label>
                    <select id="f-topic" data-hover value={topic} onChange={(e) => setTopic(e.target.value)} className={`${inputCls()} appearance-none`}>
                      {["Hamkorlik", "Kotlin / Android suhbati", "Rust haqida", "G'oya almashish", "Boshqa"].map((t) => (
                        <option key={t} value={t} className="bg-ink text-cream">{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-term text-[10px] tracking-[0.25em] text-sage block mb-2" htmlFor="f-msg">XABAR</label>
                    <textarea id="f-msg" data-hover value={msg} onChange={(e) => setMsg(e.target.value)} rows={5} placeholder="Qisqa va lo'nda yozing..." className={`${inputCls(errs.msg)} resize-none`} />
                    {errs.msg && <p className="font-term text-[10px] text-coral mt-1.5">{errs.msg}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    data-hover
                    className="w-full group bg-lime text-ink font-display font-bold text-sm py-4 hover:bg-coral hover:text-cream transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-3"
                  >
                    {state === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-ink/40 border-t-ink rounded-full animate-spin" />
                        YUBORILMOQDA...
                      </>
                    ) : (
                      <>
                        POCHTAGA YUBORISH
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* footer */}
      <footer className="mt-24 border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-display font-black text-2xl text-cream">
              ABROR<span className="text-lime">.OS</span>
            </p>
            <p className="font-term text-[11px] text-sage mt-3 leading-relaxed max-w-xs">
              Kotlin, Rust va kofe ustida qurilgan shaxsiy sayt. Barcha kod — qo'lda, g'urur bilan.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <p className="font-term text-[10px] tracking-[0.3em] text-sage mb-3">SAHIFALAR</p>
              {[
                ["#about", "Haqimda"],
                ["#experience", "Tajriba"],
                ["#skills", "Ko'nikmalar"],
              ].map(([h, l]) => (
                <a key={h} href={h} data-hover className="block font-term text-xs text-cream/60 hover:text-lime transition-colors">
                  {l}
                </a>
              ))}
            </div>
            <div className="space-y-2.5">
              <p className="font-term text-[10px] tracking-[0.3em] text-sage mb-3">KANALLAR</p>
              {[
                ["#projects", "Loyihalar"],
                ["#terminal", "Terminal"],
                [LINKEDIN, "LinkedIn"],
              ].map(([h, l]) => (
                <a
                  key={l}
                  href={h}
                  target={h.startsWith("http") ? "_blank" : undefined}
                  rel={h.startsWith("http") ? "noreferrer" : undefined}
                  data-hover
                  className="block font-term text-xs text-cream/60 hover:text-lime transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="md:text-right">
            <p className="font-term text-[11px] text-sage tabular-nums">TOSHKENT — {time}</p>
            <p className="font-term text-[11px] text-sage mt-2">v2.5 — xorazm build</p>
            <p className="font-term text-[10px] text-cream/35 mt-4 hidden md:block">
              sir: ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-term text-[10px] tracking-[0.2em] text-cream/40">
              © 2026 ABROR RAXIMBAYEV — XOZORASP → URGENCH
            </p>
            <p className="font-term text-[10px] tracking-[0.2em] text-cream/40">
              KOFE VA <span className="text-lime">KOTLIN</span> BILAN QURILDI
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
