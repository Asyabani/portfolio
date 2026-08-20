/**
 * Site-wide identity used by metadata, sitemap, robots, OG images, JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment (no trailing slash);
 * it falls back to the GitHub Pages URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asyabani.github.io/portfolio'
).replace(/\/$/, '');

export const SITE_NAME = 'Nurzaman Asyabani';
export const SITE_TITLE = 'Nurzaman Asyabani — Frontend & Fullstack Developer';
export const SITE_DESCRIPTION =
  'Portfolio of Nurzaman Asyabani, a frontend & fullstack developer from Bandung, Indonesia — production web apps and SaaS frontends built with React, Next.js, TypeScript, Node, PostgreSQL, and Go at Kawalu and Exempli Gratia (EGDev).';
