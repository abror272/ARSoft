import { useEffect, useRef, useState } from "react";

/** Maxsus kursor: nuqta + kechikib ergashuvchi halqa. Faqat desktopda. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    document.body.classList.add("cursor-on");

    const p = { x: -100, y: -100 };
    const r = { x: -100, y: -100 };
    let hover = false;
    let down = false;
    let visible = false;
    let raf = 0;

    const move = (e: MouseEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
      visible = true;
      const t = e.target as HTMLElement | null;
      hover = !!t?.closest?.("a, button, [data-hover], input, textarea, select, label");
    };
    const onDown = () => {
      down = true;
    };
    const onUp = () => {
      down = false;
    };
    const onLeave = () => {
      visible = false;
    };
    const onEnter = () => {
      visible = true;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const loop = () => {
      r.x += (p.x - r.x) * 0.16;
      r.y += (p.y - r.y) * 0.16;
      const scale = !visible ? 0 : down ? 0.65 : hover ? 2 : 1;
      if (dot.current) {
        dot.current.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%) scale(${visible ? 1 : 0})`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%,-50%) scale(${scale})`;
        ring.current.style.borderColor = hover ? "var(--color-coral)" : "var(--color-lime)";
        ring.current.style.backgroundColor = hover ? "rgba(255,92,57,0.08)" : "transparent";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("cursor-on");
    };
  }, []);

  if (!on) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[999] h-9 w-9 rounded-full border pointer-events-none transition-colors duration-200"
        style={{ borderColor: "var(--color-lime)" }}
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-lime pointer-events-none"
      />
    </>
  );
}
