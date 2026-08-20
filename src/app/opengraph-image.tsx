import { ImageResponse } from 'next/og';

// Social preview card — navy + teal, same language as the site hero.
export const alt = 'Nurzaman Asyabani — Frontend & Fullstack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#050b23',
          backgroundImage:
            'radial-gradient(circle at 25% 45%, rgba(13,148,136,0.28) 0%, rgba(5,11,35,0) 60%)',
          color: '#f5f6ff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 22,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span>Nurzaman Asyabani</span>
          <span style={{ width: 36, height: 2, background: '#2dd4bf' }} />
          <span style={{ color: '#2dd4bf' }}>Frontend &amp; Fullstack Developer</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'rgba(245,246,255,0.62)',
          }}
        >
          <span>Web design that works</span>
          <span>as hard as the</span>
          <span style={{ color: '#2dd4bf' }}>business behind it</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: 'rgba(245,246,255,0.7)',
          }}
        >
          <span>React · Next.js · Laravel · GSAP</span>
          <span style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Bandung, Indonesia
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
