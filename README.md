# ABROR.OS — Abror Raximbayev portfolio

React + Vite + TypeScript + Tailwind CSS da yozilgan shaxsiy portfolio sayt.
Ishlaydigan terminal, zarralar foni, glitch/matrix/party effektlari va boshqa interaktiv bo'limlar.

---

## GitHub'ga joylash (3 qadam)

### 1-qadam: GitHub'da yangi repo yarating

[github.com/new](https://github.com/new) ga o'ting, nomini yozing (masalan `portfolio`),
**"Add a README" belgilamang**, Create repository bosing.

### 2-qadam: Kodni push qiling

Terminal oching (loyiha papkasida) va quyidagilarni ketma-ket bajaring:

```bash
git init
git add .
git commit -m "portfolio v2.5"
git branch -M main
git remote add origin https://github.com/SIZNING_LOGININGIZ/portfolio.git
git push -u origin main
```

> `SIZNING_LOGININGIZ` o'rniga GitHub loginingizni yozing (masalan: `abrorraximbayev`).

### 3-qadam: GitHub Pages'ni yoqing (faqat birinchi marta)

1. Repo sahifasida **Settings** → chap menuda **Pages**
2. **Source** bo'limida **GitHub Actions** ni tanlang
3. Tamom! Push qilganingizdan ~1 daqiqa o'tib sayt tayyor bo'ladi.

Sayt manzili: **`https://SIZNING_LOGININGIZ.github.io/portfolio/`**

Endi kodni o'zgartirsangiz, shunchaki:

```bash
git add .
git commit -m "yangilanish"
git push
```

— sayt **avtomatik** yangilanadi (boshqa hech narsa bosish shart emas).

---

## Vercel'ga joylash (muqobil)

1. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub repo'ni ulang
2. Hech narsani o'zgartirmasdan **Deploy** bosing — tamom.

Yoki terminalda:

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

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
- **GitHub Actions** — avtomatik deploy (`.github/workflows/deploy.yml`)
- Shriftlar: Unbounded (display) + Manrope (body) + JetBrains Mono (terminal)
