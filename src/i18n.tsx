import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "uz" | "en" | "ru";
export const LANGS: Lang[] = ["uz", "en", "ru"];

const uz = {
  meta: { title: "Abror Raximbayev — Kotlin Developer | Xorazm" },
  boot: {
    subtitle: "PORTFOLIO INTERFEYSI — XORAZM BUILD",
    progress: "YUKLANMOQDA...",
    skip: "O'TKAZIB YUBORISH →",
    lines: [
      { s: "ok", t: "abror.os v3.0 — xorazm build" },
      { s: "ok", t: "Kotlin runtime ... yuklandi" },
      { s: "run", t: "Compose Multiplatform ... sozlanmoqda" },
      { s: "run", t: "tillar yuklanmoqda: O'ZBEK / ENGLISH / РУССКИЙ" },
      { s: "ok", t: "interfeys tayyor — xush kelibsiz!" },
    ],
  },
  nav: {
    links: [
      { href: "#about", label: "HAQIMDA" },
      { href: "#experience", label: "TAJRIBA" },
      { href: "#skills", label: "KO'NIKMALAR" },
      { href: "#projects", label: "LOYIHALAR" },
      { href: "#terminal", label: "TERMINAL" },
      { href: "#contact", label: "ALOQA" },
    ],
    menu: "Menyu",
    tashkent: "TOSHKENT",
  },
  hero: {
    status: "O'QISH + ISH + O'RGANISH",
    location: "HAZORASP → URGANCH, UZ",
    words: ["KOTLIN O'RGANAMAN", "KOTLIN MULTIPLATFORM", "UrDU TALABASI", "ARYFMA'DA ISHLAYMAN"],
    intro:
      "[[Kotlin]] va [[Kotlin Multiplatform]] yordamida ilovalar yozishni o'rganaman. UrDU'da Dastur Injinering yo'nalishida o'qiyman, ARYFMA'da ishlayman. Bo'sh vaqtimda shaxsiy loyihalarim ustida ishlayman.",
    cta: "LOYIHALARNI KO'RISH",
    stats: [
      { v: "1+", l: "YIL TAJRIBA" },
      { v: "2", l: "ISH JOYI" },
      { v: "∞", l: "O'RGANISH" },
    ],
    scroll: "PASTGA",
    scrollSub: "— QIZIQARLI QISMI",
    code: {
      comment: "// abror.os — ishga tushmoqda",
      fields: ["ism", "joy", "organayotganTil", "maqsad"],
      values: ["Abror Raximbayev", "Xorazm, UZ", "Kotlin", "Senior Full-Stack Dev"],
    },
    badge: "KOTLIN • MULTIPLATFORM • UrDU • XORAZM • ",
  },
  about: {
    title: "O'ZIM HAQIMDA",
    portraitAlt: "Abror Raximbayev — ish stolida, Kotlin yozayotgan dasturchi",
    p1: "Men **Abror Raximbayev**. Xorazmning Hazorasp tumanida tug'ilib o'sganman, hozir Urganchda yashayman — o'qiyman va ishlayman. Asosiy e'tiborimni [[Kotlin]]ga qaratganman. Urganch davlat universitetining Dastur Injinering yo'nalishida tahsil olaman.",
    p2: "Dasturlashdagi ilk ish tajribamni **BR Tech** kompaniyasida stajyor sifatida boshlaganman. Bir yildan ortiq vaqt davomida jamoada ishlash va real loyihalarda qatnashish tajribasiga ega bo'ldim. Hozirda **ARYFMA** kompaniyasida texnik yordam mutaxassisi bo'lib ishlayman.",
    p3: "Ayni paytda [[Kotlin]] va [[Kotlin Multiplatform]]ni o'rganib, Compose Multiplatform bilan mashq qilaman. Maqsadim — [[Senior Full-Stack Developer]] bo'lish va bilim hamda tajribamni doimiy oshirib borish.",
    facts: [
      { k: "ASOSIY YO'NALISH", v: "Kotlin Multiplatform" },
      { k: "TA'LIM", v: "UrDU · Dastur Injinering" },
      { k: "HOZIRGI ISH", v: "ARYFMA · Texnik yordam" },
      { k: "OLDINGI TAJRIBA", v: "BR Tech · Stajyor" },
      { k: "MAQSAD", v: "Senior Full-Stack Developer" },
    ],
    approach: "MENING YONDASHUVIM",
    principles: [
      { n: "01", t: "Amaliyot", d: "O'rgangan narsamni darhol kod yozib sinab ko'raman." },
      { n: "02", t: "Kichik qadamlar", d: "Har kuni bitta yangi narsa o'rganaman." },
      { n: "03", t: "So'rab o'rganish", d: "Tushunmagan narsamni so'rashdan to'xtamayman." },
    ],
    nowTitle: "HOZIRGI BANDLIK",
    now: [
      "Kotlin asoslarini mustahkamlamoqdaman",
      "Compose Multiplatform bilan mashq qilaman",
      "ARYFMA'da texnik yordam bo'limida ishlayman",
      "UrDU'da Dastur Injinering yo'nalishida o'qiyman",
    ],
  },
  experience: {
    label: "TAJRIBA",
    title: "O'QISH VA ISH",
    active: "FAOL",
    jobs: [
      {
        period: "IYUN 2026 — HOZIR",
        duration: "3 OY",
        company: "ARYFMA",
        role: "Texnik yordam mutaxassisi",
        place: "Urganch shahri, Xorazm viloyati",
        now: true,
        points: [
          "Xodimlarning kompyuter, tarmoq va dastur bilan bog'liq muammolarini hal qilaman",
          "Ichki tizimlarni kuzatib boraman va sozlashda yordamlashaman",
          "Takrorlanadigan muammolar uchun qo'llanmalar va yechimlar tayyorlayman",
        ],
      },
      {
        period: "IYUN 2025 — IYUN 2026",
        duration: "1 YIL",
        company: "BR TECH",
        role: "Stajyor",
        place: "Urganch shahri, Xorazm viloyati",
        now: false,
        points: [
          "Dasturlashdagi ilk tajribamni shu yerda boshladim",
          "Jamoada ishlashni va real loyihalarda qatnashishni o'rgandim",
          "Vazifalarni o'z vaqtida bajarish ko'nikmasini shakllantirdim",
        ],
      },
      {
        period: "2025 — HOZIR",
        duration: "TA'LIM",
        company: "URGANCH DAVLAT UNIVERSITETI",
        role: "Dastur Injinering talabasi",
        place: "Urganch, Xorazm viloyati",
        now: false,
        points: [
          "Dasturlash asoslari, algoritmlar va ma'lumotlar tuzilmalarini o'rganaman",
          "Kurs va amaliy topshiriqlar bajarib kelaman",
          "Texnik ingliz tilini rivojlantirib boraman",
        ],
      },
    ],
  },
  skills: {
    label: "ASBOBLAR",
    title: "KO'NIKMALAR XARITASI",
    note: "Hali o'rganish jarayonidaman — foizlar hozirgi bilimimni taxminan ifodalaydi. Vaqt o'tishi bilan yangilanib boradi.",
    group1: "KOTLIN / MULTIPLATFORM",
    group2: "TIZIM VA ASOSLAR",
    extraTitle: "QO'SHIMCHA KO'NIKMALAR",
    extra: ["MVVM", "COMPOSE", "CAPACITOR", "FIREBASE", "LINUX", "DOCKER", "TELEGRAM BOT", "GEMINI AI", "FIGMA", "SCRUM"],
  },
  projects: {
    label: "LOYIHALAR",
    title: "MENING LOYIHALARIM",
    side: "SHAXSIY VA OCHIQ LOYIHALAR",
    badgePersonal: "SHAXSIY",
    download: "YUKLAB OLISH",
    github: "GITHUB",
    close: "YOPISH [ESC]",
    closeAria: "Yopish",
    items: [
      {
        desc: "Kofe do'koni uchun onlayn savdo ilovasi — vitrina, savat va admin panel bilan.",
        long: "GitHub'da joylashtirilgan shaxsiy loyiham. Foydalanuvchi kofe mahsulotlarini tanlab buyurtma beradi, admin esa mahsulot va buyurtmalarni boshqaradi. Saytning barcha qismlari bitta tizimda ishlaydi.",
        stack: ["REACT", "TYPESCRIPT", "VITE", "ADMIN PANEL"],
        statV: "WEB",
        statL: "ONLAYN DO'KON",
      },
      {
        desc: "Fokus taymeri — Kotlin konsol ilovasi va zamonaviy web versiyasi.",
        long: "Ikki qismli shaxsiy loyiham: Kotlin'da yozilgan konsol ilova (Gradle, unit testlar, CI) va React + TypeScript'da qilingan web versiya. Kundalik statistika, streak, 7 kunlik tarix va shovqin effektlari bor.",
        stack: ["KOTLIN", "REACT", "TYPESCRIPT", "GRADLE"],
        statV: "APP",
        statL: "KOTLIN + WEB",
      },
      {
        desc: "IELTS'ga tayyorgarlik uchun reja va AI yordamchisi bilan platforma.",
        long: "Ingliz tili va IELTS tayyorgarligini bir joyga jamlagan loyiham. Gemini asosidagi AI funksiyalari bilan reja tuzish va mashq qilish imkonini beradi.",
        stack: ["HTML", "TAILWIND", "JAVASCRIPT", "GEMINI AI"],
        statV: "AI",
        statL: "AI INTEGRATSIYA",
      },
      {
        desc: "Ana shu ko'rib turgan portfolio saytim — uch tilda, ishlaydigan terminal bilan.",
        long: "React + TypeScript + Tailwind'da qurilgan shaxsiy portfolio. Ishlaydigan terminal, til almashtirish (O'zbekcha / English / Русский), animatsiyalar va kichik easter egg'lar bilan.",
        stack: ["REACT", "TYPESCRIPT", "TAILWIND", "VITE"],
        statV: "3",
        statL: "TIL QO'LLANADI",
      },
    ],
  },
  terminal: {
    label: "SINOV MAYDONI",
    title: "TERMINAL",
    side1: "BUYRUQ YOZING.",
    side2: "SINAB KO'RING.",
    testLabel: "TEZ SINOV:",
    ariaInput: "Terminal buyrug'i",
    welcome: ["ABROR.OS terminal v3.0 — Xorazm.", "'help' deb yozing va Enter bosing."],
    dateLabel: "TOSHKENT:",
    notFound: "buyruq topilmadi:",
    notFoundHint: "'help' yozib ko'ring.",
    fileNotFound: "bunday fayl topilmadi",
    help: [
      "BUYRUQLAR:",
      "  about        men haqimda",
      "  skills       ko'nikmalar",
      "  experience   tajriba",
      "  education    ta'lim",
      "  contact      aloqa",
      "  whoami       mehmon ma'lumoti",
      "  date         Toshkent vaqti",
      "  ls           fayllar",
      "  cat sir.txt  kichik sir",
      "  kofe         kofe",
      "  echo ...     takrorlash",
      "  hack         kichik hazil",
      "  matrix       Matrix rejimi",
      "  party        rangli rejim",
      "  clear        ekranni tozalash",
    ],
    out: {
      about: [
        "Abror Raximbayev — Kotlin va Kotlin Multiplatform o'rganayotgan dasturchi.",
        "UrDU talabasi (Dastur Injinering).",
        "ARYFMA'da texnik yordam mutaxassisi. Oldin BR Tech'da stajyor bo'lganman.",
      ],
      skills: [
        "KOTLIN          [###-------] 35%",
        "MULTIPLATFORM   [###-------] 30%",
        "COMPOSE         [###-------] 28%",
        "GIT/GITHUB      [###-------] 35%",
        "JAVA            [##--------] 25%",
        "SQL/SQLITE      [##--------] 22%",
      ],
      experience: [
        "ARYFMA   — Texnik yordam mutaxassisi (2026.06 — hozir)",
        "BR TECH  — Stajyor (2025.06 — 2026.06)",
      ],
      education: ["Urganch davlat universiteti — Dastur Injinering (2025 — hozir)"],
      contact: [
        "EMAIL    abrorraximbayev272@gmail.com",
        "LINKEDIN linkedin.com/in/abrorraximbayev-909512387",
        "MANZIL   Hazorasp, Xorazm viloyati",
      ],
      whoami: ["mehmon@portfolio — xush kelibsiz :)"],
      ls: "about.md  skills.json  experience/  talim.txt  sir.txt",
      sir: "\"Ayni vaqtda Kotlin Multiplatformni o'rganaman.\"",
      coffee: "KOFE TAYYOR — endi kod yozamiz!",
      hack: ["> TIZIMGA KIRILMOQDA...", "> HAZIL ALBATTA :) "],
      matrix: "> YASHIL REJIM YOQILDI.",
      party: "> RANGLI REJIM YOQILDI.",
      sudo: "Ruxsat berilmadi.",
      uname: "ABROR.OS 3.0.0 xorazm-kernel",
    },
  },
  contact: {
    label: "ALOQA",
    title: "BOG'LANISH",
    intro:
      "Men bilan bog'lanish uchun email yoki LinkedIn orqali yozishingiz mumkin. Kotlin va boshqa dasturlash mavzulari bo'yicha ham suhbatlashamiz.",
    email: "EMAIL",
    copy: "NUSXALASH",
    copied: "NUSXALANDI ✓",
    linkedin: "LINKEDIN",
    location: "LOKATSIYA",
    locationValue: "Hazorasp, Xorazm",
    locationWork: "ish: Urganch",
    form: {
      title: "// XABAR QOLDIRING",
      name: "ISM",
      email: "EMAIL",
      topic: "MAVZU",
      message: "XABAR",
      namePh: "Ismingiz",
      emailPh: "siz@pochta.uz",
      msgPh: "Xabaringizni yozing...",
      topics: ["Hamkorlik", "Kotlin bo'yicha suhbat", "G'oya almashish", "Boshqa"],
      errName: "Ismingizni kiriting",
      errEmail: "Email noto'g'ri ko'rinadi",
      errMsg: "Xabar juda qisqa",
      send: "POCHTAGA YUBORISH",
      sending: "YUBORILMOQDA...",
      mailHello: "Assalomu alaykum, Abror!",
      doneTitle: "XABAR TAYYOR!",
      doneText: "Pochta ilovasi ochilishi kerak. Ochilmagan bo'lsa, yuqoridagi emailni nusxalab oling.",
      again: "YANA YUBORISH",
    },
    footer: {
      tagline: "Kotlin va Kotlin Multiplatform o'rganish yo'lim haqidagi shaxsiy sayt.",
      pages: "SAHIFALAR",
      sections: "BO'LIMLAR",
      version: "v3.0",
      copyright: "© 2026 ABROR RAXIMBAYEV",
      place: "HAZORASP → URGANCH",
    },
  },
};

export type Dict = typeof uz;

const en: Dict = {
  meta: { title: "Abror Raximbayev — Kotlin Developer | Khorezm" },
  boot: {
    subtitle: "PORTFOLIO INTERFACE — KHOREZM BUILD",
    progress: "LOADING...",
    skip: "SKIP →",
    lines: [
      { s: "ok", t: "abror.os v3.0 — khorezm build" },
      { s: "ok", t: "Kotlin runtime ... loaded" },
      { s: "run", t: "Compose Multiplatform ... configuring" },
      { s: "run", t: "loading languages: O'ZBEK / ENGLISH / РУССКИЙ" },
      { s: "ok", t: "interface ready — welcome!" },
    ],
  },
  nav: {
    links: [
      { href: "#about", label: "ABOUT" },
      { href: "#experience", label: "EXPERIENCE" },
      { href: "#skills", label: "SKILLS" },
      { href: "#projects", label: "PROJECTS" },
      { href: "#terminal", label: "TERMINAL" },
      { href: "#contact", label: "CONTACT" },
    ],
    menu: "Menu",
    tashkent: "TASHKENT",
  },
  hero: {
    status: "STUDY + WORK + LEARN",
    location: "HAZORASP → URGANCH, UZ",
    words: ["LEARNING KOTLIN", "KOTLIN MULTIPLATFORM", "UrDU STUDENT", "WORKING AT ARYFMA"],
    intro:
      "I'm learning to build apps with [[Kotlin]] and [[Kotlin Multiplatform]]. I study Software Engineering at UrDU and currently work at ARYFMA. In my free time I work on my own projects.",
    cta: "VIEW MY PROJECTS",
    stats: [
      { v: "1+", l: "YEAR OF EXPERIENCE" },
      { v: "2", l: "WORKPLACES" },
      { v: "∞", l: "LEARNING" },
    ],
    scroll: "SCROLL DOWN",
    scrollSub: "— THE FUN PART",
    code: {
      comment: "// abror.os — booting up",
      fields: ["name", "location", "learning", "goal"],
      values: ["Abror Raximbayev", "Khorezm, UZ", "Kotlin", "Senior Full-Stack Dev"],
    },
    badge: "KOTLIN • MULTIPLATFORM • UrDU • KHOREZM • ",
  },
  about: {
    title: "ABOUT ME",
    portraitAlt: "Abror Raximbayev — a developer writing Kotlin at his desk",
    p1: "I'm **Abror Raximbayev**. I was born and grew up in the Hazorasp district of Khorezm, and now I live in Urganch — studying and working. My main focus is [[Kotlin]]. I study Software Engineering at Urganch State University.",
    p2: "I started my first programming experience as an intern at **BR Tech**. For over a year I gained experience of teamwork and taking part in real projects. Now I work as an IT support specialist at **ARYFMA**.",
    p3: "These days I'm learning [[Kotlin]] and [[Kotlin Multiplatform]], practicing with Compose Multiplatform. My goal is to become a [[Senior Full-Stack Developer]] and keep growing my knowledge and experience.",
    facts: [
      { k: "MAIN FOCUS", v: "Kotlin Multiplatform" },
      { k: "EDUCATION", v: "UrDU · Software Engineering" },
      { k: "CURRENT JOB", v: "ARYFMA · IT Support" },
      { k: "PREVIOUS", v: "BR Tech · Intern" },
      { k: "GOAL", v: "Senior Full-Stack Developer" },
    ],
    approach: "MY APPROACH",
    principles: [
      { n: "01", t: "Practice", d: "I test what I learn by writing code right away." },
      { n: "02", t: "Small steps", d: "I learn at least one new thing every day." },
      { n: "03", t: "Asking", d: "I keep asking until I fully understand." },
    ],
    nowTitle: "WHAT I'M UP TO",
    now: [
      "Strengthening my Kotlin fundamentals",
      "Practicing with Compose Multiplatform",
      "Working in ARYFMA's IT support team",
      "Studying Software Engineering at UrDU",
    ],
  },
  experience: {
    label: "EXPERIENCE",
    title: "STUDY & WORK",
    active: "ACTIVE",
    jobs: [
      {
        period: "JUNE 2026 — PRESENT",
        duration: "3 MOS",
        company: "ARYFMA",
        role: "IT Support Specialist",
        place: "Urganch city, Khorezm region",
        now: true,
        points: [
          "I fix employees' computer, network and software issues",
          "I help monitor and maintain internal systems",
          "I prepare guides and solutions for recurring problems",
        ],
      },
      {
        period: "JUNE 2025 — JUNE 2026",
        duration: "1 YEAR",
        company: "BR TECH",
        role: "Intern",
        place: "Urganch city, Khorezm region",
        now: false,
        points: [
          "I started my first programming experience here",
          "I learned teamwork and participation in real projects",
          "I built the habit of delivering tasks on time",
        ],
      },
      {
        period: "2025 — PRESENT",
        duration: "EDUCATION",
        company: "URGANCH STATE UNIVERSITY",
        role: "Software Engineering student",
        place: "Urganch, Khorezm region",
        now: false,
        points: [
          "Learning programming basics, algorithms and data structures",
          "Completing course and practical assignments",
          "Improving my technical English",
        ],
      },
    ],
  },
  skills: {
    label: "TOOLS",
    title: "SKILLS MAP",
    note: "I'm still learning — the percentages roughly reflect my current knowledge. They will grow over time.",
    group1: "KOTLIN / MULTIPLATFORM",
    group2: "SYSTEM & CORE",
    extraTitle: "EXTRA SKILLS",
    extra: ["MVVM", "COMPOSE", "CAPACITOR", "FIREBASE", "LINUX", "DOCKER", "TELEGRAM BOT", "GEMINI AI", "FIGMA", "SCRUM"],
  },
  projects: {
    label: "PROJECTS",
    title: "MY PROJECTS",
    side: "PERSONAL & OPEN PROJECTS",
    badgePersonal: "PERSONAL",
    download: "DOWNLOAD",
    github: "GITHUB",
    close: "CLOSE [ESC]",
    closeAria: "Close",
    items: [
      {
        desc: "Online coffee shop app with a storefront, cart and admin panel.",
        long: "My personal project hosted on GitHub. Users pick coffee products and place orders, while the admin manages products and orders. All parts of the site work as one system.",
        stack: ["REACT", "TYPESCRIPT", "VITE", "ADMIN PANEL"],
        statV: "WEB",
        statL: "ONLINE SHOP",
      },
      {
        desc: "Focus timer — a Kotlin console app plus a modern web version.",
        long: "A two-part personal project: a console app written in Kotlin (Gradle, unit tests, CI) and a web version built with React + TypeScript. It has daily stats, streaks, a 7-day history and sound effects.",
        stack: ["KOTLIN", "REACT", "TYPESCRIPT", "GRADLE"],
        statV: "APP",
        statL: "KOTLIN + WEB",
      },
      {
        desc: "IELTS prep platform with a study plan and an AI assistant.",
        long: "My project that brings English learning and IELTS preparation together. Gemini-powered AI features help you plan and practice.",
        stack: ["HTML", "TAILWIND", "JAVASCRIPT", "GEMINI AI"],
        statV: "AI",
        statL: "AI INTEGRATION",
      },
      {
        desc: "This very portfolio site — three languages with a working terminal.",
        long: "My personal portfolio built with React + TypeScript + Tailwind. A working terminal, language switching (O'zbekcha / English / Русский), animations and small easter eggs.",
        stack: ["REACT", "TYPESCRIPT", "TAILWIND", "VITE"],
        statV: "3",
        statL: "LANGUAGES",
      },
    ],
  },
  terminal: {
    label: "PLAYGROUND",
    title: "TERMINAL",
    side1: "TYPE A COMMAND.",
    side2: "TRY IT.",
    testLabel: "QUICK TRY:",
    ariaInput: "Terminal command",
    welcome: ["ABROR.OS terminal v3.0 — Khorezm.", "Type 'help' and press Enter."],
    dateLabel: "TASHKENT:",
    notFound: "command not found:",
    notFoundHint: "try 'help'.",
    fileNotFound: "no such file",
    help: [
      "COMMANDS:",
      "  about        about me",
      "  skills       my skills",
      "  experience   experience",
      "  education    education",
      "  contact      contacts",
      "  whoami       guest info",
      "  date         Tashkent time",
      "  ls           files",
      "  cat sir.txt  a little secret",
      "  kofe         coffee",
      "  echo ...     repeat",
      "  hack         a little joke",
      "  matrix       Matrix mode",
      "  party        color mode",
      "  clear        clear screen",
    ],
    out: {
      about: [
        "Abror Raximbayev — a developer learning Kotlin and Kotlin Multiplatform.",
        "UrDU student (Software Engineering).",
        "IT support specialist at ARYFMA. Previously an intern at BR Tech.",
      ],
      skills: [
        "KOTLIN          [###-------] 35%",
        "MULTIPLATFORM   [###-------] 30%",
        "COMPOSE         [###-------] 28%",
        "GIT/GITHUB      [###-------] 35%",
        "JAVA            [##--------] 25%",
        "SQL/SQLITE      [##--------] 22%",
      ],
      experience: [
        "ARYFMA   — IT Support Specialist (2026.06 — present)",
        "BR TECH  — Intern (2025.06 — 2026.06)",
      ],
      education: ["Urganch State University — Software Engineering (2025 — present)"],
      contact: [
        "EMAIL    abrorraximbayev272@gmail.com",
        "LINKEDIN linkedin.com/in/abrorraximbayev-909512387",
        "PLACE    Hazorasp, Khorezm region",
      ],
      whoami: ["guest@portfolio — welcome :)"],
      ls: "about.md  skills.json  experience/  talim.txt  sir.txt",
      sir: "\"Right now I'm learning Kotlin Multiplatform.\"",
      coffee: "COFFEE READY — let's code!",
      hack: ["> GAINING ACCESS...", "> JUST KIDDING :) "],
      matrix: "> GREEN MODE ON.",
      party: "> COLOR MODE ON.",
      sudo: "Permission denied.",
      uname: "ABROR.OS 3.0.0 khorezm-kernel",
    },
  },
  contact: {
    label: "CONTACT",
    title: "GET IN TOUCH",
    intro: "You can reach me by email or LinkedIn. We can also talk about Kotlin and other programming topics.",
    email: "EMAIL",
    copy: "COPY",
    copied: "COPIED ✓",
    linkedin: "LINKEDIN",
    location: "LOCATION",
    locationValue: "Hazorasp, Khorezm",
    locationWork: "work: Urganch",
    form: {
      title: "// LEAVE A MESSAGE",
      name: "NAME",
      email: "EMAIL",
      topic: "TOPIC",
      message: "MESSAGE",
      namePh: "Your name",
      emailPh: "you@mail.com",
      msgPh: "Write your message...",
      topics: ["Collaboration", "Kotlin talk", "Share an idea", "Other"],
      errName: "Please enter your name",
      errEmail: "That email doesn't look right",
      errMsg: "Message is too short",
      send: "SEND VIA EMAIL",
      sending: "SENDING...",
      mailHello: "Hello Abror!",
      doneTitle: "MESSAGE READY!",
      doneText: "Your mail app should have opened. If not, copy the email address above.",
      again: "SEND ANOTHER",
    },
    footer: {
      tagline: "My personal site about learning Kotlin and Kotlin Multiplatform.",
      pages: "PAGES",
      sections: "SECTIONS",
      version: "v3.0",
      copyright: "© 2026 ABROR RAXIMBAYEV",
      place: "HAZORASP → URGANCH",
    },
  },
};

const ru: Dict = {
  meta: { title: "Аброр Рахимбаев — Kotlin Developer | Хорезм" },
  boot: {
    subtitle: "ПОРТФОЛИО-ИНТЕРФЕЙС — ХОРЕЗМ BUILD",
    progress: "ЗАГРУЗКА...",
    skip: "ПРОПУСТИТЬ →",
    lines: [
      { s: "ok", t: "abror.os v3.0 — хорезм build" },
      { s: "ok", t: "Kotlin runtime ... загружен" },
      { s: "run", t: "Compose Multiplatform ... настраивается" },
      { s: "run", t: "загружаю языки: O'ZBEK / ENGLISH / РУССКИЙ" },
      { s: "ok", t: "интерфейс готов — добро пожаловать!" },
    ],
  },
  nav: {
    links: [
      { href: "#about", label: "ОБО МНЕ" },
      { href: "#experience", label: "ОПЫТ" },
      { href: "#skills", label: "НАВЫКИ" },
      { href: "#projects", label: "ПРОЕКТЫ" },
      { href: "#terminal", label: "ТЕРМИНАЛ" },
      { href: "#contact", label: "СВЯЗЬ" },
    ],
    menu: "Меню",
    tashkent: "ТАШКЕНТ",
  },
  hero: {
    status: "УЧЁБА + РАБОТА + ОБУЧЕНИЕ",
    location: "ХАЗОРАСП → УРГАНЧ, UZ",
    words: ["ИЗУЧАЮ KOTLIN", "KOTLIN MULTIPLATFORM", "СТУДЕНТ UrDU", "РАБОТАЮ В ARYFMA"],
    intro:
      "Учусь писать приложения на [[Kotlin]] и [[Kotlin Multiplatform]]. Учусь по направлению «Программная инженерия» в UrDU, работаю в ARYFMA. В свободное время занимаюсь своими проектами.",
    cta: "СМОТРЕТЬ ПРОЕКТЫ",
    stats: [
      { v: "1+", l: "ЛЕТ ОПЫТА" },
      { v: "2", l: "МЕСТА РАБОТЫ" },
      { v: "∞", l: "ОБУЧЕНИЕ" },
    ],
    scroll: "ВНИЗ",
    scrollSub: "— ИНТЕРЕСНАЯ ЧАСТЬ",
    code: {
      comment: "// abror.os — запускается",
      fields: ["imya", "gorod", "izuchayu", "cel"],
      values: ["Abror Raximbayev", "Xorazm, UZ", "Kotlin", "Senior Full-Stack Dev"],
    },
    badge: "KOTLIN • MULTIPLATFORM • UrDU • ХОРЕЗМ • ",
  },
  about: {
    title: "ОБО МНЕ",
    portraitAlt: "Аброр Рахимбаев — разработчик, пишущий Kotlin за рабочим столом",
    p1: "Меня зовут **Аброр Рахимбаев**. Я родился и вырос в Хазораспе, Хорезмской области, а сейчас живу в Урганче — учусь и работаю. Основной фокус — [[Kotlin]]. Учусь по направлению «Программная инженерия» в Урганчском государственном университете.",
    p2: "Свой первый опыт в программировании я получил стажёром в компании **BR Tech**. Больше года набирался опыта командной работы и участия в реальных проектах. Сейчас работаю специалистом технической поддержки в **ARYFMA**.",
    p3: "Сейчас изучаю [[Kotlin]] и [[Kotlin Multiplatform]], практикуюсь с Compose Multiplatform. Моя цель — стать [[Senior Full-Stack Developer]] и постоянно расти в знаниях и опыте.",
    facts: [
      { k: "ОСНОВНОЕ НАПРАВЛЕНИЕ", v: "Kotlin Multiplatform" },
      { k: "ОБРАЗОВАНИЕ", v: "UrDU · Программная инженерия" },
      { k: "ТЕКУЩАЯ РАБОТА", v: "ARYFMA · Тех. поддержка" },
      { k: "ПРОШЛЫЙ ОПЫТ", v: "BR Tech · Стажёр" },
      { k: "ЦЕЛЬ", v: "Senior Full-Stack Developer" },
    ],
    approach: "МОЙ ПОДХОД",
    principles: [
      { n: "01", t: "Практика", d: "Выученное сразу проверяю, написав код." },
      { n: "02", t: "Маленькие шаги", d: "Каждый день изучаю что-то новое." },
      { n: "03", t: "Спрашиваю", d: "Не стесняюсь спрашивать, если что-то не понял." },
    ],
    nowTitle: "ЧЕМ ЗАНЯТ СЕЙЧАС",
    now: [
      "Укрепляю основы Kotlin",
      "Практикуюсь с Compose Multiplatform",
      "Работаю в техподдержке ARYFMA",
      "Учусь на направлении «Программная инженерия» в UrDU",
    ],
  },
  experience: {
    label: "ОПЫТ",
    title: "УЧЁБА И РАБОТА",
    active: "АКТИВЕН",
    jobs: [
      {
        period: "ИЮНЬ 2026 — СЕЙЧАС",
        duration: "3 МЕС",
        company: "ARYFMA",
        role: "Специалист технической поддержки",
        place: "г. Урганч, Хорезмская область",
        now: true,
        points: [
          "Решаю проблемы сотрудников с компьютерами, сетью и программами",
          "Помогаю следить за внутренними системами и настраивать их",
          "Готовлю инструкции и решения для повторяющихся проблем",
        ],
      },
      {
        period: "ИЮНЬ 2025 — ИЮНЬ 2026",
        duration: "1 ГОД",
        company: "BR TECH",
        role: "Стажёр",
        place: "г. Урганч, Хорезмская область",
        now: false,
        points: [
          "Здесь начался мой первый опыт в программировании",
          "Научился работать в команде и участвовать в реальных проектах",
          "Выработал привычку выполнять задачи вовремя",
        ],
      },
      {
        period: "2025 — СЕЙЧАС",
        duration: "УЧЁБА",
        company: "УРГАНЧСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ",
        role: "студент направления «Программная инженерия»",
        place: "Урганч, Хорезмская область",
        now: false,
        points: [
          "Изучаю основы программирования, алгоритмы и структуры данных",
          "Выполняю курсовые и практические задания",
          "Развиваю технический английский",
        ],
      },
    ],
  },
  skills: {
    label: "ИНСТРУМЕНТЫ",
    title: "КАРТА НАВЫКОВ",
    note: "Я всё ещё учусь — проценты примерно отражают мои текущие знания. Со временем они растут.",
    group1: "KOTLIN / MULTIPLATFORM",
    group2: "СИСТЕМА И ОСНОВЫ",
    extraTitle: "ДОПОЛНИТЕЛЬНЫЕ НАВЫКИ",
    extra: ["MVVM", "COMPOSE", "CAPACITOR", "FIREBASE", "LINUX", "DOCKER", "TELEGRAM BOT", "GEMINI AI", "FIGMA", "SCRUM"],
  },
  projects: {
    label: "ПРОЕКТЫ",
    title: "МОИ ПРОЕКТЫ",
    side: "ЛИЧНЫЕ И ОТКРЫТЫЕ ПРОЕКТЫ",
    badgePersonal: "ЛИЧНЫЙ",
    download: "СКАЧАТЬ",
    github: "GITHUB",
    close: "ЗАКРЫТЬ [ESC]",
    closeAria: "Закрыть",
    items: [
      {
        desc: "Онлайн-магазин кофейни: витрина, корзина и админ-панель.",
        long: "Мой личный проект на GitHub. Пользователь выбирает кофейные товары и оформляет заказ, а админ управляет товарами и заказами. Все части сайта работают как единая система.",
        stack: ["REACT", "TYPESCRIPT", "VITE", "ADMIN PANEL"],
        statV: "WEB",
        statL: "ОНЛАЙН-МАГАЗИН",
      },
      {
        desc: "Таймер фокусировки — консольное приложение на Kotlin и веб-версия.",
        long: "Проект из двух частей: консольное приложение на Kotlin (Gradle, unit-тесты, CI) и веб-версия на React + TypeScript. Есть дневная статистика, серия, история за 7 дней и звуковые эффекты.",
        stack: ["KOTLIN", "REACT", "TYPESCRIPT", "GRADLE"],
        statV: "APP",
        statL: "KOTLIN + WEB",
      },
      {
        desc: "Платформа подготовки к IELTS с планом занятий и AI-помощником.",
        long: "Мой проект, объединяющий изучение английского и подготовку к IELTS. AI-функции на базе Gemini помогают планировать и практиковаться.",
        stack: ["HTML", "TAILWIND", "JAVASCRIPT", "GEMINI AI"],
        statV: "AI",
        statL: "AI-ИНТЕГРАЦИЯ",
      },
      {
        desc: "Это и есть мой сайт-портфолио — на трёх языках, с работающим терминалом.",
        long: "Личное портфолио на React + TypeScript + Tailwind. Работающий терминал, переключение языков (O'zbekcha / English / Русский), анимации и маленькие пасхалки.",
        stack: ["REACT", "TYPESCRIPT", "TAILWIND", "VITE"],
        statV: "3",
        statL: "ЯЗЫКА НА САЙТЕ",
      },
    ],
  },
  terminal: {
    label: "ПОЛИГОН",
    title: "ТЕРМИНАЛ",
    side1: "НАПИШИТЕ КОМАНДУ.",
    side2: "ПОПРОБУЙТЕ.",
    testLabel: "БЫСТРЫЙ ТЕСТ:",
    ariaInput: "Команда терминала",
    welcome: ["ABROR.OS terminal v3.0 — Хорезм.", "Напишите 'help' и нажмите Enter."],
    dateLabel: "ТАШКЕНТ:",
    notFound: "команда не найдена:",
    notFoundHint: "попробуйте 'help'.",
    fileNotFound: "такой файл не найден",
    help: [
      "КОМАНДЫ:",
      "  about        обо мне",
      "  skills       навыки",
      "  experience   опыт",
      "  education    учёба",
      "  contact      контакты",
      "  whoami       инфо о госте",
      "  date         время в Ташкенте",
      "  ls           файлы",
      "  cat sir.txt  маленький секрет",
      "  kofe         кофе",
      "  echo ...     повторить",
      "  hack         маленькая шутка",
      "  matrix       режим Matrix",
      "  party        цветной режим",
      "  clear        очистить экран",
    ],
    out: {
      about: [
        "Аброр Рахимбаев — разработчик, изучающий Kotlin и Kotlin Multiplatform.",
        "Студент UrDU (Программная инженерия).",
        "Специалист технической поддержки в ARYFMA. Раньше стажёр в BR Tech.",
      ],
      skills: [
        "KOTLIN          [###-------] 35%",
        "MULTIPLATFORM   [###-------] 30%",
        "COMPOSE         [###-------] 28%",
        "GIT/GITHUB      [###-------] 35%",
        "JAVA            [##--------] 25%",
        "SQL/SQLITE      [##--------] 22%",
      ],
      experience: [
        "ARYFMA   — Специалист тех. поддержки (2026.06 — сейчас)",
        "BR TECH  — Стажёр (2025.06 — 2026.06)",
      ],
      education: ["Урганчский государственный университет — Программная инженерия (2025 — сейчас)"],
      contact: [
        "EMAIL    abrorraximbayev272@gmail.com",
        "LINKEDIN linkedin.com/in/abrorraximbayev-909512387",
        "АДРЕС    Хазорасп, Хорезмская область",
      ],
      whoami: ["guest@portfolio — добро пожаловать :)"],
      ls: "about.md  skills.json  experience/  talim.txt  sir.txt",
      sir: "\"Сейчас я изучаю Kotlin Multiplatform.\"",
      coffee: "КОФЕ ГОТОВ — пишем код!",
      hack: ["> ПОЛУЧАЕМ ДОСТУП...", "> ШУЧУ, КОНЕЧНО :) "],
      matrix: "> ЗЕЛЁНЫЙ РЕЖИМ ВКЛЮЧЁН.",
      party: "> ЦВЕТНОЙ РЕЖИМ ВКЛЮЧЁН.",
      sudo: "Доступ запрещён.",
      uname: "ABROR.OS 3.0.0 khorezm-kernel",
    },
  },
  contact: {
    label: "СВЯЗЬ",
    title: "СВЯЗАТЬСЯ",
    intro: "Со мной можно связаться по email или через LinkedIn. Также можем поговорить о Kotlin и других темах программирования.",
    email: "EMAIL",
    copy: "КОПИРОВАТЬ",
    copied: "СКОПИРОВАНО ✓",
    linkedin: "LINKEDIN",
    location: "ЛОКАЦИЯ",
    locationValue: "Хазорасп, Хорезм",
    locationWork: "работа: Урганч",
    form: {
      title: "// ОСТАВЬТЕ СООБЩЕНИЕ",
      name: "ИМЯ",
      email: "EMAIL",
      topic: "ТЕМА",
      message: "СООБЩЕНИЕ",
      namePh: "Ваше имя",
      emailPh: "vy@mail.ru",
      msgPh: "Напишите ваше сообщение...",
      topics: ["Сотрудничество", "Разговор о Kotlin", "Обмен идеями", "Другое"],
      errName: "Введите ваше имя",
      errEmail: "Email выглядит некорректно",
      errMsg: "Сообщение слишком короткое",
      send: "ОТПРАВИТЬ НА ПОЧТУ",
      sending: "ОТПРАВЛЯЕТСЯ...",
      mailHello: "Привет, Аброр!",
      doneTitle: "СООБЩЕНИЕ ГОТОВО!",
      doneText: "Почтовое приложение должно было открыться. Если нет — скопируйте email выше.",
      again: "ОТПРАВИТЬ ЕЩЁ",
    },
    footer: {
      tagline: "Личный сайт о моём пути изучения Kotlin и Kotlin Multiplatform.",
      pages: "СТРАНИЦЫ",
      sections: "РАЗДЕЛЫ",
      version: "v3.0",
      copyright: "© 2026 ABROR RAXIMBAYEV",
      place: "ХАЗОРАСП → УРГАНЧ",
    },
  },
};

const DICTS: Record<Lang, Dict> = { uz, en, ru };

type LangCtxValue = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangCtx = createContext<LangCtxValue>({ lang: "uz", setLang: () => {}, t: uz });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = window.localStorage.getItem("abror-lang");
      return saved === "en" || saved === "ru" ? saved : "uz";
    } catch {
      return "uz";
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("abror-lang", lang);
    } catch {}
    document.documentElement.lang = lang === "uz" ? "uz" : lang;
    document.title = DICTS[lang].meta.title;
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

/** **...** → oq yarim qalin, [[...]] → lime yarim qalin */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <span key={i} className="text-cream font-semibold">
            {p.slice(2, -2)}
          </span>
        ) : p.startsWith("[[") ? (
          <span key={i} className="text-lime font-semibold">
            {p.slice(2, -2)}
          </span>
        ) : (
          p
        )
      )}
    </>
  );
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex border border-cream/15 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          data-hover
          aria-label={l === "uz" ? "O'zbekcha" : l === "en" ? "English" : "Русский"}
          className={`px-2.5 py-1 font-term text-[10px] tracking-[0.12em] transition-colors duration-300 ${
            lang === l ? "bg-lime text-ink" : "text-cream/60 hover:text-lime"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
