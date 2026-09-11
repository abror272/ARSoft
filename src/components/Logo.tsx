import { useId } from "react";

/** ABROR.OS logo belgisi: gradient plashka + "A" monogram + terminal kursori */
export default function Logo({ className = "w-9 h-9", blink = true }: { className?: string; blink?: boolean }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`lg${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C6F24E" />
          <stop offset="55%" stopColor="#8FD469" />
          <stop offset="100%" stopColor="#3E9B63" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill={`url(#lg${gid})`} />
      <path d="M9 39 24 6l15 33h-7.2L24 20l-7.8 19H9Z" fill="#0B1210" />
      <rect x="17.5" y="28" width="13" height="4.6" fill="#0B1210" />
      <rect x="33" y="30" width="6" height="9" fill="#0B1210" className={blink ? "logo-blink" : undefined} />
    </svg>
  );
}
