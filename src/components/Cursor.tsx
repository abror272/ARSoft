import { useEffect, useRef } from "react";

/** Maxsus kursor: nuqta + kechikib ergashuvchi halqa (faqat sichqonchali qurilmalarda) */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("cursor-on");
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target as HTMLElement | null;
      targetScale = t?.closest("[data-hover], a, button, input, textarea, select") ? 2.1 : 1;
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove("cursor-on");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="fixed top-0 left-0 z-[95] pointer-events-none hidden md:block">
        <div className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-coral" />
      </div>
      <div ref={ringRef} aria-hidden="true" className="fixed top-0 left-0 z-[94] pointer-events-none hidden md:block">
        <div className="w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border border-lime/70" />
      </div>
    </>
  );
}
