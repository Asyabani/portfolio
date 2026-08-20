'use client';

import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/data/projects';

// ─── deterministic seeded random (SSR-safe) ───────────────────────────────────
// (reserved for future staggered layouts)

// ─── constants ────────────────────────────────────────────────────────────────
const SLOT_DEG = 18; // degrees between adjacent card slots on the cylinder

// Card occupies 72% of slot width and 68% of canvas height — vertically centred
const CARD_W_RATIO = 0.72;
const CARD_H_RATIO = 0.68;

interface CardLayout {
  project: Project;
  index: number;
  y: number;
  w: number;
  h: number;
}

function buildLayout(
  projects: Project[],
  slotW: number,
  canvasH: number
): { cards: CardLayout[]; totalW: number } {
  const w = Math.round(slotW * CARD_W_RATIO);
  const h = Math.round(canvasH * CARD_H_RATIO);
  const y = Math.round((canvasH - h) / 2); // centred vertically in canvas

  const cards: CardLayout[] = projects.map((project, i) => ({
    project,
    index: i,
    y,
    w,
    h,
  }));

  const totalW = projects.length * slotW;
  return { cards, totalW };
}

// ─── Single card ─────────────────────────────────────────────────────────────
function ProjectCard({ card, slotW }: { card: CardLayout; slotW: number }) {
  const { project, index, y, w, h } = card;
  const isExternal = project.linkType === 'external';

  const slotX = index * slotW + Math.round((slotW - w) / 2);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: slotX,
    top: y,
    width: w,
    height: h,
  };

  const inner = (
    <div className="pw-card-inner">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
        sizes={`${w}px`}
        draggable={false}
        priority={false}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/5 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 py-3 pointer-events-none">
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold leading-tight truncate drop-shadow">
            {project.title}
          </p>
          <p className="text-white/55 text-[10px] mt-0.5 truncate">
            {project.tags.slice(0, 2).join(' · ')}
          </p>
        </div>
        <span className="shrink-0 ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/25 text-white transition-colors duration-200 group-hover:bg-white group-hover:text-black">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );

  const cls = 'pw-card group block focus-visible:outline-none';

  return isExternal ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      style={style}
    >
      {inner}
    </a>
  ) : (
    <Link href={project.url} className={cls} style={style}>
      {inner}
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ProjectsWorld({ projects }: { projects: Project[] }) {
  const worldRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const pageRef = useRef(0);
  const targetRef = useRef(0);

  const [slotW, setSlotW] = useState(500);
  const [canvasH, setCanvasH] = useState(640);

  /* ── measure ── */
  useEffect(() => {
    const measure = () => {
      if (!worldRef.current) return;
      // 1 slot = full viewport width → 1 scroll step = 1 card
      setSlotW(worldRef.current.clientWidth);
      setCanvasH(worldRef.current.clientHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (worldRef.current) ro.observe(worldRef.current);
    return () => ro.disconnect();
  }, []);

  const { cards, totalW } = useMemo(
    () => buildLayout(projects, slotW, canvasH),
    [projects, slotW, canvasH]
  );

  const pageW = slotW;
  const maxPages = Math.max(0, projects.length - 1);

  /* cylinder radius */
  const radius = useMemo(
    () => Math.round(slotW / (2 * Math.sin((SLOT_DEG / 2) * (Math.PI / 180)))),
    [slotW]
  );

  /* ── Snap ── */
  const snapTo = useCallback(
    (page: number) => {
      const clamped = Math.max(0, Math.min(page, maxPages));
      pageRef.current = clamped;
      targetRef.current = clamped * pageW;
    },
    [maxPages, pageW]
  );

  /* ── RAF lerp + cylinder warp ── */
  useEffect(() => {
    const track = trackRef.current;
    const world = worldRef.current;
    if (!track || !world) return;

    const LERP = 0.06;

    const tick = (ts: number) => {
      const last = lastTsRef.current ?? ts;
      const dt = Math.min(ts - last, 50);
      lastTsRef.current = ts;

      const diff = targetRef.current - posRef.current;
      if (Math.abs(diff) < 0.1) {
        posRef.current = targetRef.current;
      } else {
        posRef.current += diff * (1 - Math.pow(1 - LERP, dt));
      }

      const scrollX = posRef.current;
      const vpW = world.clientWidth;
      const vpCX = scrollX + vpW / 2;

      // Move the flat track
      track.style.transform = `translate3d(${-scrollX}px, 0, 0)`;
      const children = track.children;
      for (let i = 0; i < children.length; i++) {
        const el = children[i] as HTMLElement;
        const card = cards[i];
        if (!card || !el) continue;

        // world-space centre X of this card's slot
        const cx = card.index * slotW + slotW / 2;
        // normalised distance from viewport centre (-1 = prev slot, 0 = centre, +1 = next slot)
        const normDist = (cx - vpCX) / slotW;

        // Only render the centre card + its immediate neighbours as peek
        // anything beyond 1.3 slots away is invisible
        if (Math.abs(normDist) > 1.3) {
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          continue;
        }
        el.style.visibility = 'visible';

        // ── cylinder warp ──
        const theta = (cx - vpCX) / radius;
        const projX = radius * Math.sin(theta);
        const tz = radius * (Math.cos(theta) - 1);
        const rotY = -(theta * 180) / Math.PI;
        const shiftX = projX - (cx - vpCX);

        // ── scale + opacity: centre=full, ±1 slot=peek ghost ──
        // Use cos curve so the transition is smooth and continuous
        const t = Math.cos(normDist * Math.PI * 0.75); // 1 at centre, ~0 at ±1 slot
        const tClamped = Math.max(0, Math.min(1, t));
        const scale = 0.78 + 0.22 * tClamped; // 0.78 → 1.00
        const opacity = 0.25 + 0.75 * tClamped; // 0.25 → 1.00

        el.style.transform = `translate3d(${shiftX}px, 0, ${tz}px) rotateY(${rotY}deg) scale(${scale.toFixed(4)})`;
        el.style.opacity = opacity.toFixed(4);
      }

      // ── Backdrop "WORK" cylinder warp ──────────────────────────────────────
      const bdContainer = backdropRef.current;
      if (bdContainer) {
        const bdRadius = radius * 1.5;
        const bdWords = bdContainer.children;
        const bdCount = bdWords.length;
        // spread words across bdCount viewport-widths, scrolling at 40% speed
        const bdStep = vpW * 0.9;
        const bdOrigin = scrollX * 0.4;

        for (let j = 0; j < bdCount; j++) {
          const bdWord = bdWords[j] as HTMLElement;
          // world-X of this word (evenly spaced, centred around current vpCX)
          const bdCX = vpCX - (bdCount / 2 - 0.5 - j) * bdStep - bdOrigin;
          const bdTheta = (bdCX - vpCX) / bdRadius;
          const bdProjX = bdRadius * Math.sin(bdTheta);
          const bdTz = bdRadius * (Math.cos(bdTheta) - 1) - 60; // push 60 px further back
          const bdRotY = -(bdTheta * 180) / Math.PI;
          const bdShift = bdProjX - (bdCX - vpCX);
          bdWord.style.transform = `translate3d(${bdShift}px, 0, ${bdTz}px) rotateY(${bdRotY}deg)`;
          bdWord.style.opacity = String(Math.max(0, Math.cos(bdTheta) * 0.12));
        }
      }
      // ───────────────────────────────────────────────────────────────────────

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cards, slotW, radius]);

  /* ── Helpers to lock/unlock page scroll ── */
  const unlockScroll = useCallback(
    (scrollDirection: 'up' | 'down' = 'down') => {
      // 1. Remove body overflow lock
      document.body.style.overflow = '';

      // 2. Remove overflow:hidden from the sticky reveal panel so footer
      //    content below it is no longer clipped
      const revealPanel = worldRef.current?.closest<HTMLElement>(
        '.projects-scroll-reveal'
      );
      if (revealPanel) {
        revealPanel.style.overflow = 'visible';
      }

      // 3. Re-enable Lenis smooth scroll and update its scroll position
      const lenis = (
        window as Window & {
          lenis?: {
            stop(): void;
            start(): void;
            scrollTo(
              target: number | string | HTMLElement,
              opts?: object
            ): void;
          };
        }
      ).lenis;
      lenis?.start();

      // 4. When going down — scroll to the section after the panel (footer area)
      if (scrollDirection === 'down') {
        requestAnimationFrame(() => {
          const spacer = worldRef.current?.closest<HTMLElement>(
            '.projects-scroll-reveal-spacer'
          );
          const afterPanel = spacer
            ? spacer.getBoundingClientRect().bottom + window.scrollY
            : window.scrollY + window.innerHeight;

          if (lenis) {
            lenis.scrollTo(afterPanel, { duration: 0.8 });
          } else {
            window.scrollTo({ top: afterPanel, behavior: 'smooth' });
          }
        });
      }
    },
    []
  );

  /* ── Wheel ── */
  useEffect(() => {
    const el = worldRef.current;
    if (!el) return;

    // Cooldown: block a second snap until animation has had time to settle.
    // This prevents a fast scroll wheel from skipping multiple cards at once.
    let cooldown = false;
    const COOLDOWN_MS = 480; // roughly matches the lerp settle time

    const onWheel = (e: WheelEvent) => {
      const raw =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const dir = raw > 0 ? 1 : raw < 0 ? -1 : 0;
      if (!dir) return;

      const atStart = pageRef.current === 0;
      const atEnd = pageRef.current === maxPages;

      // At start and scrolling up → release scroll lock so page can scroll up
      if (atStart && dir < 0) {
        unlockScroll('up');
        return;
      }
      // At end and scrolling down → release scroll lock so footer is reachable
      if (atEnd && dir > 0) {
        unlockScroll('down');
        return;
      }

      // Consume the event
      e.preventDefault();
      e.stopPropagation();

      // Skip if still within cooldown window (prevents multi-card jumps)
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, COOLDOWN_MS);

      snapTo(pageRef.current + dir);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [snapTo, maxPages, unlockScroll]);

  /* ── Touch ── */
  useEffect(() => {
    const el = worldRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;

      // Only handle horizontal swipes
      if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 50) return;

      const dir = dx > 0 ? 1 : -1;
      const atStart = pageRef.current === 0;
      const atEnd = pageRef.current === maxPages;

      if (atStart && dir < 0) {
        unlockScroll('up');
        return;
      } // swipe right at start
      if (atEnd && dir > 0) {
        unlockScroll('down');
        return;
      } // swipe left at end

      snapTo(pageRef.current + dir);
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchend', onEnd);
    };
  }, [snapTo, maxPages, unlockScroll]);
  return (
    <div ref={worldRef} className="projects-world" aria-label="Projects">
      {/* Perspective stage — backdrop + track share the same 3-D scene */}
      <div className="pw-stage">
        {/* Cylinder backdrop: "WORK" words spaced around the cylinder */}
        <div ref={backdropRef} className="pw-backdrop-3d" aria-hidden="true">
          {Array.from({ length: Math.max(6, projects.length) }, (_, i) => (
            <span key={i} className="pw-backdrop-word">
              WORK
            </span>
          ))}
        </div>

        {/* Flat track — translateX'd by lerp, children curved by per-frame JS */}
        <div
          ref={trackRef}
          className="pw-track"
          style={{ width: totalW, height: canvasH }}
        >
          {cards.map((card, i) => (
            <ProjectCard key={card.project.id ?? i} card={card} slotW={slotW} />
          ))}
        </div>
      </div>
    </div>
  );
}
