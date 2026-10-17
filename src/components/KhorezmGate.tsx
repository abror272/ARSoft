import { Reveal } from "../ui";
import { useLang } from "../i18n";

/**
 * Xorazm darvozasi — Hero va "Haqimda" orasidagi bo'sh ekran.
 * Bu oraliqda 3D globus scroll bilan Xivaga yaqinlashadi (GlobeField).
 * Matn oddiy oqimda bo'lgani uchun keyingi bo'lim bilan ustma-ust tushmaydi.
 */
export default function KhorezmGate() {
  const { t } = useLang();
  const g = t.globe;

  return (
    <section
      id="khorezm"
      data-khorezm-gate
      aria-labelledby="khorezm-title"
      className="relative flex h-screen items-center justify-center px-6"
    >
      <Reveal className="w-full max-w-xl">
        <div className="relative mx-auto text-center [text-shadow:0_2px_18px_rgba(7,15,12,0.95),0_0_46px_rgba(7,15,12,0.85)]">
          <div className="relative">
            <div className="mx-auto mb-5 h-12 w-px bg-gradient-to-b from-transparent via-lime/70 to-transparent" />
            <p className="font-term text-[9px] tracking-[0.32em] text-lime sm:text-[10px]">
              {g.region}
            </p>
            <h2
              id="khorezm-title"
              className="mt-3 font-display text-5xl font-black tracking-tight text-cream sm:text-6xl md:text-7xl"
            >
              {g.city}
            </h2>
            <p className="mx-auto mt-4 max-w-md font-term text-[10px] leading-relaxed text-cream/75 sm:text-[11px]">
              {g.note}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
