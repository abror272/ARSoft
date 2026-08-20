# ABROR.OS — Abror Raximbayev portfolio

React + Vite + TypeScript + Tailwind CSS da yozilgan shaxsiy portfolio sayt.
Ishlaydigan terminal, zarralar foni, glitch/matrix/party effektlari va boshqa interaktiv bo'limlar.

## Vercel'ga joylash (eng oson usul)

1. Loyihani GitHub'ga yuklang:

```bash
git init
git add .
git commit -m "portfolio v2.5"
git branch -M main
git remote add origin https://github.com/SIZNING_LOGININGIZ/portfolio.git
git push -u origin main
```

2. [vercel.com](https://vercel.com) ga kiring → **Add New → Project**
3. GitHub repo'ni ulang → Vercel **Vite** ni avtomatik tanlaydi
4. Hech narsani o'zgartirmasdan **Deploy** bosing — tamom.

## Vercel CLI orqali (terminalda)

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Lokal ishga tushirish

```bash
npm install
npm run dev      # ishlab chiqish rejimi (http://localhost:5173)
npm run build    # production build (dist/)
```

## Texnologiyalar

- **React 18** + **TypeScript** — barcha komponentlar
- **Vite** — build
- **Tailwind CSS v4** — stillar
- Shriftlar: Unbounded (display) + Manrope (body) + JetBrains Mono (terminal)
