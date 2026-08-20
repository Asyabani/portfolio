/**
 * About page + resume copy — kept as data so it can be edited without touching layout.
 * Sources: the Oct 2024 resume PDF (public/file/) for the 2022–2024 history, and the
 * project repos / commit history for 2025–2026 (see src/lib/data/projects.ts).
 * The /resume page and the generated resume PDF read from this file too.
 */

export const aboutIntro = {
  eyebrow: 'About me',
  headline:
    'Frontend & fullstack developer from Bandung who ships whole products at Kawalu and EGDev — from SaaS frontends to client platforms in production.',
  paragraphs: [
    "I'm Nurzaman Asyabani. Since 2022 I've built for real businesses through Exempli Gratia (EGDev), a software house that started out in Bandung and is now based in Tasikmalaya: company profiles and landing pages early on, then full web apps — a tax platform, a sports-venue booking platform, a role-based POS. These days I split my time between frontend work at Kawalu, an academic-services SaaS where I'm the primary author of the Next.js 16 rewrite and built the admin dashboard, and fullstack client work at EGDev.",
    "My home base is the front end — React, Next.js, TypeScript, Tailwind, with GSAP and Three.js when motion genuinely helps — but I'm comfortable owning the whole stack: Node/Express and Laravel APIs, PostgreSQL and MongoDB, Redis queues, and lately Go and SvelteKit for the Architract rewrite. I care about the unglamorous parts too: tests, CI, SEO, and documentation. Alongside this I'm completing an Information Systems degree at Universitas Terbuka.",
  ],
};

export const aboutFacts = [
  { label: 'Based in', value: 'Bandung, Indonesia' },
  {
    label: 'Now',
    value:
      'Frontend Developer at Kawalu · Fullstack Developer at EGDev',
  },
  {
    label: 'Studying',
    value: 'Information Systems · Universitas Terbuka (2023 — 2027)',
  },
  { label: 'Strongest in', value: 'React · Next.js · TypeScript · Node · PostgreSQL' },
];

export const aboutStack: { group: string; items: string[] }[] = [
  {
    group: 'Frontend',
    items: [
      'React 19',
      'Next.js 15/16',
      'TypeScript',
      'Tailwind CSS 4',
      'SvelteKit',
      'GSAP',
      'Three.js',
      'React Native · Expo',
    ],
  },
  {
    group: 'Backend & data',
    items: [
      'Node.js · Express',
      'Laravel',
      'Go (chi, pgx)',
      'PostgreSQL · Prisma',
      'MongoDB · Mongoose',
      'Redis · BullMQ',
      'Socket.IO · MQTT',
      'REST · OpenAPI/Zod',
    ],
  },
  {
    group: 'Quality & delivery',
    items: [
      'Vitest',
      'Playwright',
      'GitHub Actions',
      'Docker · Compose',
      'MinIO / S3',
      'Nginx',
      'SEO',
      'Figma',
    ],
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
}

export const aboutExperience: ExperienceItem[] = [
  {
    company: 'Kawalu',
    role: 'Frontend Developer',
    period: 'Mar 2026 — Present',
    location: 'Remote',
    points: [
      'Lead the frontend rewrite of kawalu.id — an academic-services SaaS covering paraphrasing, AI humanizer, AI & plagiarism checks, a service marketplace, and freelance services — migrating an Express + EJS monolith to Next.js 16, React 19, TypeScript, and Tailwind CSS 4, including the service catalogue, order tracking, subscriptions, blog, and PWA support.',
      'Designed and built the admin dashboard as a standalone Next.js application for managing orders, services, and content, consuming the backend team\'s TypeScript/Express API through a fully typed client generated from OpenAPI/Zod schemas.',
      'Maintain automated test coverage with Vitest and Playwright, and deliver SEO, performance optimisation, and GSAP-based motion consistent with the production visual language.',
    ],
  },
  {
    company: 'PT. Exempli Gratia Indonesia (EGDev)',
    role: 'Fullstack Developer',
    period: 'May 2023 — Present',
    location: 'Tasikmalaya',
    points: [
      'Deliver client systems end-to-end — data modelling, API design, UI, automated testing, and deployment — with Next.js/TypeScript, PostgreSQL with Prisma, Redis/BullMQ background jobs, MinIO object storage, Vitest + Playwright, CI on GitHub Actions, and Dockerised releases; serve as the primary technical contact for client teams.',
      'Developed Movora, a sports-venue booking platform — booking flow, payment processing, QR check-in, and team management — on Express, TypeScript, and Prisma, with real-time features over Socket.IO and MQTT; and Kasir, a role-based point-of-sale system covering cashier workflows, down-payment and full-payment schemes, invoicing, and sales dashboards.',
      'Leading the rewrite of Architract, a 3D/architecture asset marketplace, from Express + EJS to SvelteKit with a Go (chi, pgx) API on PostgreSQL 16 — JWT cookie authentication, Docker, and Dokploy deployment.',
      'Shipped Taxpoint (taxpoint.id), a tax platform in production, and the EGDev company site with its Three.js hero — UI/UX implementation, API integration, and SEO fundamentals.',
    ],
  },
  {
    company: 'PT. GITS Indonesia',
    role: 'Fullstack Developer (Bootcamp)',
    period: '2023',
    location: 'Bandung',
    points: [
      'Completed an intensive fullstack bootcamp covering React.js, Go, Flutter, and Docker through project-based training.',
      'Built a game-voucher e-commerce platform as the final project with Laravel, React (Inertia.js), and Tailwind CSS — authentication, product management, cart, orders, payments, and invoicing.',
    ],
  },
  {
    company: 'PT. Sevenlay Teknologi Indonesia',
    role: 'Fullstack Developer',
    period: 'Jun 2022 — Dec 2022',
    location: 'Bandung',
    points: [
      'Designed, built, and maintained three web-based systems end-to-end on Node.js and Express.',
      'Implemented client-side interactivity and asynchronous data flows with jQuery and AJAX.',
    ],
  },
  {
    company: 'PT. Exempli Gratia Indonesia (EGDev)',
    role: 'Frontend Developer',
    period: 'Jan 2022 — Jun 2022',
    location: 'Bandung',
    points: [
      'Implemented 10+ responsive, production-ready websites from UI/UX designs.',
      'Frontend developer for SiapQurban, a qurban commerce web application supported by Bank BJB.',
    ],
  },
];

export const aboutEducation = [
  {
    school: 'Universitas Terbuka',
    degree: 'Bachelor of Information Systems',
    period: '2023 — 2027',
  },
  {
    school: 'SMK Negeri 2 Tasikmalaya',
    degree: 'Sistem Informatika, Jaringan dan Aplikasi',
    period: '2019 — 2023',
  },
];

/* ─── Resume-only data (used by /resume and the generated PDF) ───────────── */

export const resumeProfile = {
  name: 'Nurzaman Asyabani',
  title: 'Frontend & Fullstack Developer — React / Next.js · Node · PostgreSQL',
  location: 'Bandung, Indonesia',
  email: 'nurzamanasya@gmail.com',
  website: 'asyabani.github.io/portfolio',
  github: 'github.com/Asyabani',
  linkedin: 'linkedin.com/in/nurzaman-asyabani',
  summary:
    'Frontend developer at Kawalu and fullstack developer at Exempli Gratia (EGDev), with four years of experience delivering production web applications — SaaS platforms, booking and point-of-sale systems, marketplaces, and company sites. Primary author of the Next.js 16 rewrite of kawalu.id and sole builder of its admin dashboard; at EGDev, responsible for client systems end-to-end, from data model and API design to UI, automated testing, and Dockerised deployment. Core stack: React/Next.js and TypeScript, with Node/Express, Laravel, Go, PostgreSQL, and MongoDB. Currently completing a Bachelor\'s degree in Information Systems at Universitas Terbuka.',
};

/** Project ids (from projects.ts) to feature on the resume, in order */
export const resumeProjectIds = ['kartinis-bms', 'kawalu', 'architract', 'movora'];

export const resumeCertifications = [
  'Junior Web Developer — VSGA Digital Talent Scholarship, KOMINFO (Aug 2023)',
  'Best Team — Certificate of Achievement, GITS Academy · SMKDEV (Sep 2024)',
  'Dicoding — Front-End Web untuk Pemula (2024), Dasar Pemrograman Web & JavaScript (2023), Memulai Pemrograman dengan Kotlin (2022)',
  'Edspert.id mini bootcamps — Introduction to React JS, Introduction to Flutter (2023)',
  'Progate — Web Development Path, Node.js (2020)',
  'Cyber Security Training — CompTIA Linux+ / Security+ / PenTest+ modules, InfraDigital Foundation (2021)',
  'DQLab — Introduction to Data Science with R (2023)',
];
