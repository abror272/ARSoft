import { useEffect, useRef, useState } from "react";

export default function VisitorCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  useEffect(() => () => stopCamera(), []);

  const takePhoto = async () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      setMessage("Kamera hali tayyor emas.");
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL("image/jpeg", 0.88);
      const response = await fetch("/api/visitor-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          userAgent: navigator.userAgent,
          page: window.location.pathname,
          referrer: document.referrer || "Direct",
        }),
      });

      if (!response.ok) throw new Error("Telegram server error");
      setMessage("Surat yuborildi ✓");
      stopCamera();
      window.setTimeout(() => setOpen(false), 900);
    } catch {
      setMessage("Suratni yuborishda xatolik yuz berdi.");
    } finally {
      setBusy(false);
    }
  };

  const enableCamera = async () => {
    if (!window.isSecureContext) {
      setMessage("Kamera faqat HTTPS yoki localhost orqali ishlaydi.");
      return;
    }

    setMessage("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setOpen(true);
      window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      }, 0);
    } catch {
      setMessage("Kamera ruxsati berilmadi.");
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[70]">
        <button
          type="button"
          onClick={() => void enableCamera()}
          className="font-term text-[11px] tracking-[0.14em] border border-lime/50 bg-ink/90 text-lime px-4 py-2.5 backdrop-blur hover:bg-lime hover:text-ink transition-colors"
          aria-label="Kamera orqali surat olish"
        >
          📷 MEHMON SURATI
        </button>
        {message && !open && (
          <p className="mt-2 max-w-xs font-term text-[10px] text-coral bg-ink/90 border border-coral/30 px-3 py-2">
            {message}
          </p>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="w-full max-w-md border border-lime/40 bg-ink p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-display font-black text-xl text-cream">MEHMON KAMERASI</p>
                <p className="font-term text-[10px] text-sage mt-1">SURAT FAQAT SIZNING RUXSATINGIZ BILAN OLINADI</p>
              </div>
              <button
                type="button"
                onClick={() => { stopCamera(); setOpen(false); }}
                className="text-cream/50 hover:text-coral text-xl"
                aria-label="Yopish"
              >
                ×
              </button>
            </div>

            <div className="aspect-video bg-black overflow-hidden border border-cream/10">
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
            </div>

            <p className="font-term text-[10px] leading-relaxed text-cream/50 mt-3">
              Kamera ruxsati brauzer tomonidan so'raladi. Surat olish tugmasini bosganingizdan keyin
              surat portfolio egasining Telegram botiga yuboriladi.
            </p>

            <button
              type="button"
              onClick={() => void takePhoto()}
              disabled={busy}
              className="mt-4 w-full font-term text-xs tracking-[0.18em] bg-lime text-ink py-3 disabled:opacity-50 hover:brightness-110 transition"
            >
              {busy ? "YUBORILMOQDA..." : "📸 SURAT OLISH VA YUBORISH"}
            </button>

            {message && <p className="font-term text-xs text-lime mt-3 text-center">{message}</p>}
          </div>
        </div>
      )}
    </>
  );
}
