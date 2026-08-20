export type ProjectStatus =
  | 'live' // public URL available
  | 'in-progress' // actively being built
  | 'private' // client / internal system, no public URL
  | 'side-project' // personal or bootcamp work, source usually public
  | 'archived' // shipped, but the site is no longer online
  | 'concept'; // prototype / design exploration

export interface Project {
  id: string;
  title: string;
  tags: string[];
  image: string;
  category: string;
  linkType: 'external' | 'detail';
  url: string;
  description?: string;
  // ── Case-study fields (rendered on /portfolio/[id] when present) ──
  period?: string;
  role?: string;
  status?: ProjectStatus;
  liveUrl?: string;
  /** Button label for liveUrl when it isn't the product itself (default "Visit site") */
  liveLabel?: string;
  repoUrl?: string;
  stack?: string[];
  highlights?: string[];
  /** Extra screenshots for the case-study page: [src, caption] */
  gallery?: [string, string][];
}

// Order matters: the first six are the "Featured Work" on the home page.
// Rule: sites still live in production first (newest first), then the newest
// work, then everything else by recency. Every entry opens a detail page;
// live/repo links live on that page.
export const projects: Project[] = [
  {
    id: 'kawalu',
    title: 'Kawalu',
    tags: ['WEB', 'SAAS', 'NEXT.JS', 'ACADEMIC SERVICES', 'ADMIN DASHBOARD'],
    image: '/img/projects/kawalu-platform.webp',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/kawalu',
    description:
      'Academic-services platform — paraphrasing, AI humanizer, AI & plagiarism checks, document fixes, marketplace and freelance jobs. I build its frontend rewrite from an EJS monolith to Next.js 16 and its admin dashboard.',
    period: 'Mar 2026 — present',
    role: 'Frontend developer at Kawalu — Next.js 16 rewrite (primary author) and admin dashboard (solo)',
    status: 'live',
    liveUrl: 'https://kawalu.id',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'GSAP',
      'PWA',
      'Vitest',
      'Playwright',
      'Express + TypeScript API (team)',
    ],
    highlights: [
      'Separated the customer frontend from a legacy Express + EJS monolith into a Next.js 16 / React 19 app: services, order tracking, subscriptions, blog, FAQ, PWA manifest, sitemap.',
      'Built the admin dashboard (orders, services, content) as a standalone Next.js app.',
      "Typed API client against the team's TypeScript/Express backend (OpenAPI from Zod schemas).",
      'GSAP motion and responsive layouts in the same visual language as the live product.',
    ],
  },
  {
    id: 'taxpoint',
    title: 'Taxpoint',
    tags: ['WEB', 'TAXATION', 'INFORMATION', 'SERVICES'],
    image: '/img/projects/taxpoint-live.webp',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/taxpoint',
    description:
      'Tax platform positioned as AI-assisted, safe, and affordable: tax-literacy content, SPT price check, consultation booking (Taxvisor), and a client tax portal.',
    period: '2025 — 2026',
    role: 'Frontend developer in the EGDev team',
    status: 'live',
    liveUrl: 'https://taxpoint.id',
  },
  {
    id: 'egdev',
    title: 'EGDEV',
    tags: ['WEB', 'THREEJS', '3D', 'COMPANY PROFILE'],
    image: '/img/projects/egdev-live.webp',
    category: 'Company Profile',
    linkType: 'detail',
    url: '/portfolio/egdev',
    description:
      'Company site for Exempli Gratia (EGDev), a software house in Tasikmalaya: Three.js 3D hero, services, case studies, insights, and contact flow.',
    role: 'Frontend developer — company site with the Three.js hero, maintained with the EGDev team',
    period: '2023 — present',
    status: 'live',
    liveUrl: 'https://egdev.id/',
  },
  {
    id: 'emicon',
    title: 'Emicon',
    tags: ['WEB', 'VISA', 'CONSULTING', 'INDONESIA', 'BUSINESS'],
    image: '/img/projects/emicon-live.webp',
    category: 'Company Profile',
    linkType: 'detail',
    url: '/portfolio/emicon',
    description:
      'Company profile for a visa and business consulting firm in Indonesia, built around service pages and an inquiry flow.',
    role: 'Frontend developer (EGDev)',
    status: 'live',
    liveUrl: 'https://emicon.id/',
  },
  {
    id: 'kartinis-bms',
    title: 'Kartinis BMS',
    tags: ['WEB APP', 'ERP', 'NEXT.JS', 'POSTGRESQL', 'SOLO BUILD'],
    image: '/img/projects/kartinis-bms-dashboard.webp',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/kartinis-bms',
    description:
      'Business management system for Kartinis Label that connects R&D, production, marketing, finance, and warehouse in one platform — tiered approvals, two-stage QC, vendor scorecards, and P&L — designed, built, and shipped solo.',
    period: 'Apr 2026 — present',
    role: 'Sole developer (EGDev project for Kartinis Label) — architecture, data model, API, UI, testing, deployment; direct contact with the client team',
    status: 'private',
    stack: [
      'Next.js 15',
      'TypeScript',
      'React 19',
      'Tailwind CSS 4',
      'shadcn/ui',
      'PostgreSQL 16',
      'Prisma',
      'Redis',
      'BullMQ',
      'MinIO',
      'NextAuth (RBAC)',
      'Vitest',
      'Playwright',
      'Docker',
      'GitHub Actions',
    ],
    highlights: [
      '5 department modules (R&D, Production, Marketing, Finance, Warehouse) plus HR, approvals, and master-product catalog — 78 API routes over 43 Prisma models.',
      'Status-driven workflows: product concept → sampling → approval; production planning → cutting → sewing → QC1/QC2 with rework, downgrade, or scrap decisions.',
      'Role-based access (owner, managers, staff) with NextAuth, audit trail, and tiered approval chains.',
      'Background jobs on BullMQ/Redis, S3-compatible file storage on MinIO, Pino logging, Nginx reverse proxy.',
      'Vitest unit tests, Playwright E2E and demo flows, CI on GitHub Actions, Dockerised deployment.',
      'Built at Exempli Gratia (EGDev) for Kartinis Label; I was the single developer and the day-to-day contact with the client team for requirements and feedback.',
      'Screenshots show the development seed data, not client data.',
    ],
    gallery: [
      [
        '/img/projects/kartinis-bms-production.webp',
        'Production module — pipeline by status, monthly trend, deadlines',
      ],
      [
        '/img/projects/kartinis-bms-warehouse.webp',
        'Warehouse — active SKUs, fulfilment rate, orders per channel',
      ],
      [
        '/img/projects/kartinis-bms-finance.webp',
        'Finance — budget vs actual per department, monthly spend',
      ],
      [
        '/img/projects/kartinis-bms-approvals.webp',
        'Approval queue — tiered decisions with full history',
      ],
    ],
  },
  {
    id: 'architract',
    title: 'Architract',
    tags: ['WEB', 'MARKETPLACE', 'SVELTEKIT', 'GO', 'POSTGRESQL'],
    image: '/img/projects/architract.webp',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/architract',
    description:
      'Marketplace for architecture and 3D visual assets, rewritten from Express + EJS to SvelteKit on the front and a Go API (chi + pgx) on PostgreSQL 16 — JWT auth in httpOnly cookies, Docker, Dokploy deploy.',
    period: 'Aug 2026 — present',
    role: 'Sole developer on the rewrite — frontend, API, data migration blueprint, deployment',
    status: 'in-progress',
    stack: [
      'SvelteKit',
      'TypeScript',
      'Go 1.25',
      'chi',
      'pgx',
      'PostgreSQL 16',
      'Docker',
      'Dokploy',
    ],
    highlights: [
      'SSR landing + SPA user area in SvelteKit; REST API in Go with migrations and catalog seeding on boot.',
      'JWT auth via httpOnly cookies, role-guarded admin area, privacy/terms pages.',
      'One-command Docker Compose for web + API + PostgreSQL; documented migration blueprint from the legacy codebase.',
    ],
  },
  {
    id: 'movora',
    title: 'Movora',
    tags: ['WEB', 'BOOKING', 'PAYMENT', 'QR CHECK-IN', 'REALTIME'],
    image: '/img/projects/movora-home.webp',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/movora',
    description:
      'Sports-venue booking platform: court booking by sport and time slot, payments, QR check-in, teams and community matchmaking — Express + TypeScript + Prisma with Socket.IO and MQTT.',
    period: 'Sep 2025 — Mar 2026',
    role: 'Frontend & feature developer in a team of four — home, booking flow, payment, QR check-in, teams',
    status: 'private',
    stack: [
      'Express',
      'TypeScript',
      'Prisma',
      'Socket.IO',
      'MQTT',
      'MinIO',
      'EJS',
      'Zod',
    ],
    highlights: [
      'Booking flow with court/sport filters, availability, and payment-method selection.',
      'QR-code check-in tied to bookings, with realtime updates over Socket.IO and MQTT hooks.',
      'Team creation and profiles, community module with its own test plan.',
    ],
    gallery: [
      [
        '/img/projects/movora-booking.webp',
        'Venue booking — filter by sport, location, date, price',
      ],
      [
        '/img/projects/movora-competition.webp',
        'Competitions — leagues, cups, brackets',
      ],
      ['/img/projects/movora-gallery.webp', 'Community gallery'],
    ],
  },
  {
    id: 'kasir',
    title: 'Kasir',
    tags: ['WEB APP', 'POS', 'ROLE-BASED', 'REALTIME'],
    image: '/img/projects/kasir-orders.webp',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/kasir',
    description:
      'Role-based order management for a production business: cashier creates orders with variants and notes, production admin prints job sheets and scans barcodes through the stages, super admin sees revenue reports.',
    period: 'Jun — Sep 2025',
    role: 'Lead contributor in a team of three — cashier flow, DP/full payment, invoices, dashboards',
    status: 'private',
    stack: ['Node.js', 'Express', 'EJS', 'Socket.IO', 'MongoDB'],
    highlights: [
      'Checkout with full payment or down payment, automatic change/remaining-balance calculation, printable invoices.',
      'Production pipeline: unprocessed → in progress (job sheet) → completed (barcode scan) → delivered to store.',
      'Super-admin role management and daily/monthly/yearly revenue reports.',
    ],
    gallery: [
      [
        '/img/projects/kasir-dashboard.webp',
        'Super-admin dashboard — orders, payments, production status, sales chart',
      ],
      [
        '/img/projects/kasir-products.webp',
        'Product management with SKU, photo, and status',
      ],
      [
        '/img/projects/kasir-cashier.webp',
        'Cashier view — product grid by category, cart, checkout',
      ],
    ],
  },
  {
    id: 'edupou',
    title: 'EduPou',
    tags: ['MOBILE', 'REACT NATIVE', 'EXPO', 'EDUCATION'],
    image: '/img/projects/edupou-screens.webp',
    category: 'Mobile App',
    linkType: 'detail',
    url: '/portfolio/edupou',
    description:
      'Educational mobile game for kids inspired by Pou: a reading library, math quiz, drawing canvas, memory match, puzzle, gacha, and bedtime routine — built with React Native, Expo, and TypeScript.',
    period: '2025',
    role: 'Personal project — design and development',
    status: 'side-project',
    repoUrl: 'https://github.com/Asyabani/EduPou',
    stack: ['React Native', 'Expo', 'expo-router', 'TypeScript'],
    highlights: [
      'Seven rooms as separate routes via expo-router: ReadingRoom (letter library with speech), MathRoom (10-question quiz), DrawingRoom (canvas + colour palette), MatchRoom (memory game), PuzzleRoom, Gacha (reward spin), Bedroom.',
      'Touch-first, big-target UI tuned for young children; haptics, sounds, and confetti for feedback.',
      'Also runs on the web through react-native-web — the screenshots here are from the web build.',
    ],
  },
  {
    id: 'mobacash',
    title: 'Mobacash',
    tags: ['WEB', 'PAYMENT', 'GAMING', 'TOPUP'],
    image: '/img/mobacash.png',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/mobacash',
    description:
      'Game top-up and digital payment platform: browse popular titles, pick a nominal, and check out in a few taps.',
    role: 'Frontend developer in the EGDev team',
    liveLabel: 'Case study on egdev.id',
    status: 'archived',
    liveUrl: 'https://egdev.id/work/mobacash',
  },
  {
    id: 'egame',
    title: 'EGAME',
    tags: ['WEB', 'LARAVEL', 'REACT', 'INERTIA', 'ECOMMERCE'],
    image: '/img/1.png',
    category: 'E-commerce',
    linkType: 'detail',
    url: '/portfolio/egame',
    description:
      'Game-voucher marketplace built fullstack as my GITS Academy final project: Laravel + React via Inertia.js with Tailwind — auth, product/tag management, cart and wishlist, orders, payments, and invoices.',
    period: '2024',
    role: 'Fullstack — solo bootcamp final project',
    status: 'side-project',
    repoUrl: 'https://github.com/Asyabani/Ecommerce',
    stack: ['Laravel', 'React', 'Inertia.js', 'Tailwind CSS', 'MySQL'],
  },
  {
    id: 'global-tech',
    title: 'Global Tech',
    tags: ['WEB', 'RESPONSIVE', 'COMPANY PROFILE', 'OPTIMIZATION'],
    image: '/img/global.png',
    category: 'Company Profile',
    linkType: 'detail',
    url: '/portfolio/global-tech',
    description:
      'Responsive company profile for a technology retailer, tuned for fast loads and clear product storytelling.',
    role: 'Frontend developer in the EGDev team',
    status: 'archived',
  },
  {
    id: 'xepuh',
    title: 'Xepuh',
    tags: ['WEB', 'FREEPIK', 'DOWNLOADER', 'PREMIUM'],
    image: '/img/xepuhh.png',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/xepuh',
    description:
      'Premium asset downloader: paste a Freepik link, get the file — with quota tracking and membership handling.',
    role: 'Frontend developer in the EGDev team',
    status: 'archived',
  },
  {
    id: 'siapqurban',
    title: 'Siapqurban',
    tags: ['PWA', 'QURBAN', 'BANK BJB', 'PROGRESSIVE'],
    image: '/img/sq.png',
    category: 'PWA',
    linkType: 'detail',
    url: '/portfolio/siapqurban',
    role: 'Frontend developer (EGDev, supported by Bank BJB)',
    status: 'archived',
  },
  {
    id: 'siapqurban-v2',
    title: 'Siapqurban V2',
    tags: ['PWA', 'QURBAN', 'QURAN', 'SEDEKAH', 'BANK BJB'],
    image: '/img/sqv2.png',
    category: 'PWA',
    linkType: 'detail',
    url: '/portfolio/siapqurban-v2',
    description:
      'Second-generation qurban PWA that streamlines donations, reporting, and volunteer coordination.',
    status: 'private',
  },
  {
    id: 'siap',
    title: 'SIAP(Sistem Admin Pemerintahan) RT/RW',
    tags: ['WEB', 'GOVERNMENT', 'ADMIN', 'RT/RW', 'BANDUNG'],
    image: '/img/siap.png',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/siap',
    description:
      'Administrative portal for neighborhood RT/RW operations with resident, finance, and document management.',
    status: 'private',
  },
  {
    id: 'djp',
    title: 'DJP(Direktorat Jendral pajak)',
    tags: ['WEB', 'ADMIN', 'TAX', 'GOVERNMENT', 'DJP'],
    image: '/img/djp-login.png',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/djp',
    description:
      'Internal taxation dashboard that modernizes authentication flows and streamlines officer workflows.',
    status: 'private',
    repoUrl: 'https://github.com/Asyabani/djp',
  },
  {
    id: 'sharks-market',
    title: 'Sharks Market',
    tags: ['REACT', 'MARKETPLACE', 'AOS', 'ANIMATION'],
    image: '/img/sharks.png',
    category: 'E-commerce',
    linkType: 'detail',
    url: '/portfolio/sharks-market',
    description:
      'Animated marketplace front-end tailored for smooth browsing and bite-sized product storytelling.',
    status: 'side-project',
    repoUrl: 'https://github.com/Asyabani/Sharks',
  },
  {
    id: 'fkp',
    title: 'FKP (Forum Kewirausahaan Pemuda)',
    tags: ['WEB', 'DATA', 'ENTREPRENEURSHIP', 'YOUTH', 'ADMIN'],
    image: '/img/4.png',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/fkp',
    description:
      'Data platform that helps youth entrepreneurs oversee programs, mentors, and success indicators.',
    status: 'private',
  },
  {
    id: 'joko-project',
    title: 'Joko Project',
    tags: ['WEB', 'MARKETPLACE', 'ECOMMERCE', 'BUY/SELL'],
    image: '/img/joko.png',
    category: 'E-commerce',
    linkType: 'detail',
    url: '/portfolio/joko-project',
    description:
      'Marketplace prototype emphasizing trusted escrow, clean product cards, and responsive layouts.',
    status: 'concept',
  },
  {
    id: 'rekber',
    title: 'Rekber',
    tags: ['WEB', 'REKBER', 'TRANSACTION', 'SECURE'],
    image: '/img/rekberr.png',
    category: 'Web App',
    linkType: 'detail',
    url: '/portfolio/rekber',
    description:
      'Escrow landing page that explains the payment flow and highlights user security assurances.',
    status: 'concept',
  },
  {
    id: 'xquorion',
    title: 'XQuorion',
    tags: ['WEB', 'POS', 'SYSTEM', 'LANDING PAGE'],
    image: '/img/POS.png',
    category: 'Landing Page',
    linkType: 'detail',
    url: '/portfolio/xquorion',
    description:
      'Point-of-sale SaaS landing that spotlights device integrations, analytics, and onboarding steps.',
    status: 'concept',
  },
  {
    id: 'travel',
    title: 'Travel',
    tags: ['WEB', 'FIGMA', 'BOOTSTRAP', 'LANDING PAGE'],
    image: '/img/ezstayy.png',
    category: 'Landing Page',
    linkType: 'detail',
    url: '/portfolio/travel',
    description:
      'Travel booking concept that combines Figma components with Bootstrap for rapid experimentation.',
    status: 'concept',
  },
];
