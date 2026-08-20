# Nurzaman Asyabani — Frontend & Fullstack Developer Portfolio

Personal portfolio: 23 real-world projects with case studies, certifications, and a
generated resume — built with Next.js 16 and a GSAP/Lenis animation system.

**Live:** [asyabani.github.io/portfolio](https://asyabani.github.io/portfolio/)

## Tech stack

- **Next.js 16** (App Router, static generation) · **React 19** · **TypeScript 5**
- **Tailwind CSS 4** (class-based dark mode, `@theme` tokens)
- **GSAP + ScrollTrigger** and **Lenis** smooth scroll for the animation system
- **Three.js** (react-three-fiber) · **lucide-react** icons · **DM Sans** via `next/font`

## Features

- Cinematic once-per-session loader, masked-line hero reveals, scroll-driven parallax
- **/projects** — studio index: featured case-study rows, filterable archive with a
  cursor-trailing image preview
- **/certificates** — year-grouped timeline with 3D-tilt cards
- **/portfolio/[id]** — 23 case-study pages with real screenshots, galleries, stacks
- **/resume** — printable resume rendered from data, plus a downloadable PDF
- Full SEO suite: per-page metadata & canonicals, sitemap (40 URLs), robots,
  Open Graph/Twitter images, SSR JSON-LD (Person), favicon set
- Dark/light theme, responsive layouts, `prefers-reduced-motion` respected

## Getting started

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # production build (standalone output)
npm run lint     # ESLint
```

## Editing content

All copy lives in data files — no layout changes needed:

| File | Drives |
|---|---|
| `src/lib/data/projects.ts` | Project cards, ordering, case-study pages |
| `src/lib/data/certificates.ts` | Certificate timeline & detail pages |
| `src/lib/data/about.ts` | About page, `/resume`, and the resume PDF |
| `src/lib/data/social.ts` | Social links & resume PDF path |
| `src/lib/site.ts` | Site URL, title, description |

After changing resume-related data, print `/resume` to A4 PDF (light theme) and save
it as `public/file/Nurzaman-Asyabani-Resume-2026.pdf`.

## Deployment

**GitHub Pages (current):** every push to `main` runs
`.github/workflows/deploy-pages.yml`, which builds a static export
(`DEPLOY_TARGET=github-pages` → `output: 'export'`, `basePath: /portfolio`, custom
image loader) and deploys it to Pages. The previous site is preserved on the
`legacy` branch.

**Docker (alternative):** the default build is a standalone server bundle.

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com -t portfolio .
docker run -p 3000:3000 portfolio
```

Set `NEXT_PUBLIC_SITE_URL` at build time on any host — it is baked into canonicals,
the sitemap, and JSON-LD.

## Structure

```
src/
├── app/                  # Routes: home, projects, portfolio/[id], certificates(+/[id]),
│   │                     # about, resume — plus sitemap, robots, OG images
├── components/           # Shared UI + projects/, certificates/, resume/ sections
├── contexts/  hooks/     # Theme, loader-ready
└── lib/                  # site.ts, imageLoader.ts, data/
public/                   # Real project screenshots (WebP), certificates, resume PDF
```

---

© Nurzaman Asyabani · nurzamanasya@gmail.com
