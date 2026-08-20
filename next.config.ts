import type { NextConfig } from "next";

// DEPLOY_TARGET=github-pages → static export served at asyabani.github.io/portfolio
// (default) → standalone server bundle for Docker/Vercel-style hosting
const isGithubPages = process.env.DEPLOY_TARGET === 'github-pages';
const basePath = isGithubPages ? '/portfolio' : '';

const nextConfig: NextConfig = {
  output: isGithubPages ? 'export' : 'standalone',
  ...(isGithubPages ? { basePath, trailingSlash: true } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    ...(isGithubPages
      ? { loader: 'custom' as const, loaderFile: './src/lib/imageLoader.ts' }
      : {}),
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
