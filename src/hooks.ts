import { useEffect, useRef, useState } from "react";

/** IntersectionObserver: element ko'ringanda bir marta true qaytaradi */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ХИДЖ";

/** Matnni "dekodlash" effekti: belgilar aralashib, keyin joyiga tushadi */
export function useScramble(text: string, start: boolean, speed = 26) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const totalFrames = Math.max(14, text.length * 3);
    const id = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / totalFrames) * text.length * 1.35);
      if (revealed >= text.length) {
        setDisplay(text);
        window.clearInterval(id);
        return;
      }
      let out = "";
      for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        if (ch === " ") {
          out += " ";
        } else if (i < revealed) {
          out += ch;
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, start, speed]);

  return display;
}

/** Raqamni 0 dan targetgacha sanab boradi */
export function useCountUp(target: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return val;
}

/** So'zlarni yozib-o'chirib turadigan mashinka */
export function useTypewriter(words: string[], typeMs = 70, holdMs = 1700) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    let t = 0;
    if (!deleting) {
      if (text.length < word.length) {
        t = window.setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      } else {
        t = window.setTimeout(() => setDeleting(true), holdMs);
      }
    } else if (text.length > 0) {
      t = window.setTimeout(() => setText(word.slice(0, text.length - 1)), 32);
    } else {
      setDeleting(false);
      setIdx((v) => v + 1);
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, idx, words, typeMs, holdMs]);

  return text;
}

/** Toshkent vaqti — har soniyada yangilanadi */
export function useTashkentTime(withSeconds = true) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: withSeconds ? "2-digit" : undefined,
      timeZone: "Asia/Tashkent",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [withSeconds]);
  return time;
}
