import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHead } from "../ui";

type Line = { t: "in" | "out" | "sys"; text: string };

let audioCtx: AudioContext | null = null;
function beep() {
  try {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    audioCtx = audioCtx ?? new AC();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "square";
    o.frequency.value = 520 + Math.random() * 260;
    g.gain.setValueAtTime(0.015, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.07);
    o.connect(g).connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.08);
  } catch {
    /* ovozsiz rejim */
  }
}

const HINTS = ["help", "company", "skills", "kofe", "cat sir.txt", "hack", "matrix", "party"];

export default function Terminal({
  onHack,
  onMatrix,
  onParty,
}: {
  onHack: () => void;
  onMatrix: () => void;
  onParty: () => void;
}) {
  const [lines, setLines] = useState<Line[]>([
    { t: "sys", text: "ABROR.OS terminal v2.5 — xorazm build." },
    { t: "sys", text: "'help' deb yozing va Enter bosing." },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const parts = cmd.split(/\s+/);
    const name = (parts[0] ?? "").toLowerCase();
    const args = parts.slice(1);
    const out: Line[] = [{ t: "in", text: cmd }];
    const push = (...texts: string[]) => texts.forEach((text) => out.push({ t: "out", text }));

    switch (name) {
      case "":
        break;
      case "help":
        push(
          "MAVCUD BUYRUQLAR:",
          "  about        kim u?",
          "  company      kompaniya bormi?",
          "  skills       ko'nikmalar darajasi",
          "  experience   ish tajribasi",
          "  education    ta'lim",
          "  contact      aloqa kanallari",
          "  whoami       siz kimsiz?",
          "  date         Toshkent vaqti",
          "  ls           fayllar ro'yxati",
          "  cat sir.txt  sirli faylni o'qish",
          "  kofe         kofe qaynatish",
          "  echo ...     takrorlash",
          "  hack         tizimga kirish (xavfli!)",
          "  matrix       yashil yomg'ir",
          "  party        rangli rejim",
          "  clear        ekranni tozalash"
        );
        break;
      case "about":
        push(
          "Abror Raximbayev — Kotlin o'rganayotgan dasturchi, Xorazmdan.",
          "UrDU talabasi (Software Engineering), Rust'ga endigina kirib keldim.",
          "ARYFMA'da texnik yordam mutaxassisi. Oldin BR Tech'da 1 yil stajyor."
        );
        break;
      case "company":
        push("Kompaniyam yo'q — hozircha o'qish va ish bilan bandman.");
        break;
      case "skills":
        push(
          "KOTLIN      [#######---] 68%",
          "ANDROID     [######----] 58%",
          "COMPOSE     [#####-----] 52%",
          "GIT/GITHUB  [#######---] 72%",
          "JAVA        [#####-----] 50%",
          "RUST        [##--------] 20% (o'rganilmoqda...)"
        );
        break;
      case "experience":
        push(
          "ARYFMA   — Texnik yordam mutaxassisi (2026.06 — hozir)",
          "BR TECH  — Stajyor (2025.06 — 2026.06, 1 yil 1 oy)"
        );
        break;
      case "education":
        push("Urganch davlat universiteti — Software Engineering (2025 — hozir)");
        break;
      case "contact":
        push(
          "EMAIL    abrorraximbayev272@gmail.com",
          "LINKEDIN linkedin.com/in/abrorraximbayev-909512387",
          "MANZIL   Hazorasp, Xorazm viloyati"
        );
        break;
      case "whoami":
        push("mehmon@portfolio — potensial do'st yoki hamkor :)");
        break;
      case "date": {
        const s = new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "medium",
          timeZone: "Asia/Tashkent",
        }).format(new Date());
        push(`TOSHKENT: ${s}`);
        break;
      }
      case "ls":
        push("about.md  company.txt  skills.json  experience/  ta'lim.txt  sir.txt");
        break;
      case "cat":
        if (args[0] === "sir.txt") {
          push('"Katta sirlar yo\'q — lekin Rust o\'rganyapman, bu ham kichik sir emas."');
        } else {
          push(`cat: ${args[0] ?? ""}: bunday fayl topilmadi`);
        }
        break;
      case "kofe":
      case "coffee":
        push(
          "      ( (",
          "       ) )",
          "    ........",
          "    |      |]",
          "    \\      /",
          "     `----'",
          "ESPRESSO TAYYOR — endi Rust bilan davom etamiz!"
        );
        break;
      case "echo":
        push(args.join(" "));
        break;
      case "hack":
        onHack();
        push("> TIZIMGA KIRILMOQDA...", "> PAROL: ********", "> XAZIL. Lekin deyarli edi.");
        break;
      case "matrix":
        onMatrix();
        push("> YASHIL YOMG'IR YOQILDI — 6 soniya.");
        break;
      case "party":
        onParty();
        push("> RANGLI REJIM ALMASHTIRILDI.");
        break;
      case "sudo":
        push("Ruxsat berilmadi: siz hali Abror emassiz.");
        break;
      case "uname":
        push("ABROR.OS 2.5.0 xorazm-kernel aarch64 GNU/Linux");
        break;
      case "clear":
        setLines([]);
        setInput("");
        beep();
        return;
      default:
        push(`buyruq topilmadi: ${name}. 'help' yozib ko'ring.`);
    }

    if (cmd) setHist((h) => [...h, cmd]);
    setHi(-1);
    setInput("");
    setLines((l) => [...l, ...out]);
    beep();
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hist.length === 0) return;
      const ni = hi === -1 ? hist.length - 1 : Math.max(0, hi - 1);
      setHi(ni);
      setInput(hist[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hi === -1) return;
      const ni = hi + 1;
      if (ni >= hist.length) {
        setHi(-1);
        setInput("");
      } else {
        setHi(ni);
        setInput(hist[ni]);
      }
    }
  };

  return (
    <section id="terminal" className="relative py-20 md:py-32 scroll-mt-20 bg-ink2/40 border-y border-cream/5">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHead num="05" label="SINOV MAYDONI" title="HAQIQIY TERMINAL" />
          <p className="font-term text-[11px] tracking-[0.25em] text-sage max-w-xs text-right hidden sm:block">
            BU RASM EMAS — BU ISHLAYDI.
            <br />
            <span className="text-coral">BUYRUQ YOZING.</span>
          </p>
        </div>

        <Reveal delay={120}>
          <div
            className="border border-cream/15 bg-[#080d0b] shadow-[0_35px_90px_-25px_rgba(0,0,0,0.9)] scanlines"
            onClick={() => inputRef.current?.focus()}
            data-hover
          >
            <div className="flex items-center justify-between border-b border-cream/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-coral" />
                <span className="w-3 h-3 rounded-full bg-cream/25" />
                <span className="w-3 h-3 rounded-full bg-lime" />
              </div>
              <p className="font-term text-[11px] text-sage tracking-[0.2em] hidden sm:block">abror@xorazm: ~/portfolio</p>
              <p className="font-term text-[10px] text-lime tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                ONLINE
              </p>
            </div>

            <div ref={bodyRef} className="h-72 md:h-80 overflow-y-auto px-5 py-4 font-term text-[12.5px] md:text-[13px] leading-6">
              {lines.map((l, i) => (
                <p
                  key={i}
                  className={
                    l.t === "in"
                      ? "text-cream whitespace-pre-wrap break-words"
                      : l.t === "sys"
                        ? "text-sage whitespace-pre-wrap break-words"
                        : "text-lime/90 whitespace-pre-wrap break-words"
                  }
                >
                  {l.t === "in" && <span className="text-coral">abror@xorazm:~$ </span>}
                  {l.text}
                </p>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-coral shrink-0">abror@xorazm:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  aria-label="Terminal buyrug'i"
                  className="flex-1 bg-transparent outline-none text-cream caret-lime font-term"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-term text-[10px] tracking-[0.25em] text-sage mr-2">TEZ SINOV:</span>
            {HINTS.map((h) => (
              <button
                key={h}
                onClick={() => run(h)}
                data-hover
                className="font-term text-[11px] px-3 py-1.5 border border-cream/15 text-cream/70 hover:border-lime hover:text-lime hover:-translate-y-0.5 transition-all duration-300"
              >
                {h}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
