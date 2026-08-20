'use client';

/**
 * CreativeProcess – About page
 *
 * Faithful Next.js conversion of the CodePen "Creative Process" page.
 * Uses GSAP ScrollTrigger + SplitText + CustomEase, and the global
 * Lenis instance exposed by the layout's SmoothScroll component.
 * Uses the global ProgressBar loader (same as all other pages).
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import { useLoaderReady } from '@/hooks/useLoaderReady';
import { useSound } from '@/contexts/SoundContext';
import { AboutDetails } from '@/components/AboutDetails';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
  CustomEase.create('customEase', 'M0,0 C0.86,0 0.07,1 1,1');
}

/* ─── Section data ────────────────────────────────── */
const SECTIONS = [
  {
    artist: 'Nurzaman Asyabani',
    featured: 'Fullstack Developer',
    category: 'Professional Identity',
  },
  {
    artist: 'Kawalu & EGDev',
    featured: 'Shipping Real Products',
    category: 'Now',
  },
  {
    artist: 'React · Next.js · TypeScript',
    featured: 'Modern Frontend Stack',
    category: 'Frontend',
  },
  {
    artist: 'Node · Laravel · Go',
    featured: 'APIs That Scale',
    category: 'Backend',
  },
  {
    artist: 'PostgreSQL · Prisma · Redis',
    featured: 'Data & Queues',
    category: 'Data Layer',
  },
  {
    artist: 'Movora · Kasir · Taxpoint',
    featured: 'Products For Real Clients',
    category: 'Client Work',
  },
  {
    artist: 'Tests · CI · Docker',
    featured: 'Shipping With Confidence',
    category: 'Delivery',
  },
  {
    artist: 'GSAP · Three.js',
    featured: 'Interactive Experiences',
    category: 'Motion & 3D',
  },
  {
    artist: 'Information Systems · UT',
    featured: 'Learning in Parallel',
    category: 'Education',
  },
  {
    artist: 'Future Vision',
    featured: 'Impactful Digital Products',
    category: 'Ambition',
  },
];

// Inline background paths don't get Next's basePath automatically — prefix
// manually so the GitHub Pages build (served under /portfolio) still resolves.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const BACKGROUNDS = [
  '/img/about/p1.webp',
  '/img/about/p2.webp',
  '/img/about/p3.webp',
  '/img/about/p4.webp',
  '/img/about/p5.webp',
  '/img/about/p6.webp',
  '/img/about/p7.webp',
  '/img/about/p8.webp',
  '/img/about/p1.webp',
  '/img/about/p2.webp',
].map(path => `${BASE_PATH}${path}`);

const SOUND_URLS = {
  hover: 'https://assets.codepen.io/7558/click-reverb-001.mp3',
  click: 'https://assets.codepen.io/7558/shutter-fx-001.mp3',
  textChange: 'https://assets.codepen.io/7558/whoosh-fx-001.mp3',
};

const DURATION = 0.64;
const PARALLAX = 5;

/* ─── SoundManager ────────────────────────────────── */
class SoundManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  isEnabled = false;

  constructor() {
    this.loadSound('hover', SOUND_URLS.hover, 0.15);
    this.loadSound('click', SOUND_URLS.click, 0.3);
    this.loadSound('textChange', SOUND_URLS.textChange, 0.3);
  }

  private loadSound(name: string, url: string, volume: number) {
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.volume = volume;
    this.sounds[name] = audio;
  }

  enableAudio() {
    this.isEnabled = true;
  }

  play(name: string, delay = 0) {
    if (!this.isEnabled || !this.sounds[name]) return;
    if (delay > 0) {
      setTimeout(() => {
        this.sounds[name].currentTime = 0;
        this.sounds[name].play().catch(() => {});
      }, delay);
    } else {
      this.sounds[name].currentTime = 0;
      this.sounds[name].play().catch(() => {});
    }
  }
}

/* ─── Component ───────────────────────────────────── */
export function CreativeProcess() {
  const loaderReady = useLoaderReady();
  const { isSoundEnabled } = useSound();

  /* ── element refs ─────────────────────────────── */
  const wrapperRef = useRef<HTMLElement>(null);
  const debugRef = useRef<HTMLDivElement>(null);
  const fixedContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const currentSectionNumRef = useRef<HTMLSpanElement>(null);

  /* ── array refs ───────────────────────────────── */
  const bgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const artistRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featuredContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── imperative state (no re-renders) ─────────── */
  const stateRef = useRef({
    currentSection: 0,
    isAnimating: false,
    isSnapping: false,
    lastProgress: 0,
    scrollDirection: 0,
    sectionPositions: [] as number[],
    splitTexts: {} as Record<string, { words: HTMLElement[] }>,
    sound: null as SoundManager | null,
  });

  /* ── Sync sound context with SoundManager ───── */
  useEffect(() => {
    const sm = stateRef.current.sound;
    if (!sm) return;
    sm.isEnabled = isSoundEnabled;
    if (isSoundEnabled) sm.enableAudio();
  }, [isSoundEnabled]);

  /* ── main setup (runs after global loader finishes) ── */
  useEffect(() => {
    if (!loaderReady) return;

    const s = stateRef.current;
    s.sound = new SoundManager();

    // Wait for fonts, then init
    const initTimer = setTimeout(() => {
      document.fonts.ready.then(() => initPage());
    }, 300);

    /* ────────────────────────────────────────────── */
    function initPage() {
      const wrapper = wrapperRef.current;
      const fixedContainer = fixedContainerRef.current;
      const header = headerRef.current;
      const content = contentRef.current;
      const footer = footerRef.current;
      const leftColumn = leftColumnRef.current;
      const rightColumn = rightColumnRef.current;
      const featured = featuredRef.current;
      const progressFill = progressFillRef.current;
      const currentSectionDisplay = currentSectionNumRef.current;
      const debug = debugRef.current;

      if (!fixedContainer || !header || !content || !footer) return;

      const fixedSectionEl = fixedContainer.parentElement as HTMLElement;

      /* ── Fade wrapper in (same feel as other pages) ── */
      if (wrapper) {
        gsap.to(wrapper, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }

      /* ── Animate columns stagger ───────────────── */
      function animateColumns() {
        artistRefs.current.forEach((el, i) => {
          setTimeout(() => el?.classList.add('loaded'), i * 60);
        });
        categoryRefs.current.forEach((el, i) => {
          setTimeout(() => el?.classList.add('loaded'), i * 60 + 200);
        });
      }

      animateColumns();

      /* ── SplitText setup ───────────────────────── */
      try {
        featuredContentRefs.current.forEach((fc, index) => {
          if (!fc) return;
          const h3 = fc.querySelector('h3');
          if (!h3) return;

          const split = new SplitText(h3, {
            type: 'words',
            wordsClass: 'cp-split-word',
          });

          (split.words as HTMLElement[]).forEach(word => {
            const mask = document.createElement('div');
            mask.className = 'cp-word-mask';
            mask.style.display = 'inline-block';
            mask.style.overflow = 'hidden';
            word.parentNode!.insertBefore(mask, word);
            mask.appendChild(word);

            if (index !== 0) {
              gsap.set(word, { yPercent: 100, opacity: 0 });
            } else {
              gsap.set(word, { yPercent: 0, opacity: 1 });
            }
          });

          s.splitTexts[`featured-${index}`] = {
            words: split.words as HTMLElement[],
          };
        });
      } catch (e) {
        console.error('SplitText error:', e);
      }

      /* ── Section positions ─────────────────────── */
      const fixedSectionTop = fixedSectionEl.offsetTop;
      const fixedSectionHeight = fixedSectionEl.offsetHeight;
      for (let i = 0; i < 10; i++) {
        s.sectionPositions.push(
          fixedSectionTop + (fixedSectionHeight * i) / 10
        );
      }

      /* ── Progress numbers ──────────────────────── */
      function updateProgressNumbers() {
        if (currentSectionDisplay) {
          currentSectionDisplay.textContent = (s.currentSection + 1)
            .toString()
            .padStart(2, '0');
        }
      }

      /* ── Change section ────────────────────────── */
      function changeSection(newSection: number) {
        if (newSection === s.currentSection || s.isAnimating) return;
        s.isAnimating = true;
        const isDown = newSection > s.currentSection;
        const prev = s.currentSection;
        s.currentSection = newSection;

        updateProgressNumbers();
        if (progressFill) {
          progressFill.style.width = `${(s.currentSection / 9) * 100}%`;
        }

        /* featured content: hide all except prev & new */
        featuredContentRefs.current.forEach((fc, i) => {
          if (!fc || i === newSection || i === prev) return;
          fc.classList.remove('active');
          gsap.set(fc, { visibility: 'hidden', opacity: 0 });
        });

        /* animate previous featured words out */
        const prevWords = s.splitTexts[`featured-${prev}`]?.words;
        if (prevWords) {
          gsap.to(prevWords, {
            yPercent: isDown ? -100 : 100,
            opacity: 0,
            duration: DURATION * 0.6,
            stagger: isDown ? 0.03 : -0.03,
            ease: 'customEase',
            onComplete: () => {
              const prevFc = featuredContentRefs.current[prev];
              if (prevFc) {
                prevFc.classList.remove('active');
                gsap.set(prevFc, { visibility: 'hidden' });
              }
            },
          });
        }

        /* animate new featured words in */
        const newWords = s.splitTexts[`featured-${newSection}`]?.words;
        if (newWords) {
          s.sound?.play('textChange', 250);
          const newFc = featuredContentRefs.current[newSection];
          if (newFc) {
            newFc.classList.add('active');
            gsap.set(newFc, { visibility: 'visible', opacity: 1 });
          }
          gsap.set(newWords, {
            yPercent: isDown ? 100 : -100,
            opacity: 0,
          });
          gsap.to(newWords, {
            yPercent: 0,
            opacity: 1,
            duration: DURATION,
            stagger: isDown ? 0.05 : -0.05,
            ease: 'customEase',
          });
        }

        /* background crossfade */
        bgRefs.current.forEach((bg, i) => {
          if (!bg) return;
          bg.classList.remove('previous', 'active');

          if (i === newSection) {
            if (isDown) {
              gsap.set(bg, { opacity: 1, y: 0, clipPath: 'inset(100% 0 0 0)' });
              gsap.to(bg, {
                clipPath: 'inset(0% 0 0 0)',
                duration: DURATION,
                ease: 'customEase',
              });
            } else {
              gsap.set(bg, { opacity: 1, y: 0, clipPath: 'inset(0 0 100% 0)' });
              gsap.to(bg, {
                clipPath: 'inset(0 0 0% 0)',
                duration: DURATION,
                ease: 'customEase',
              });
            }
            bg.classList.add('active');
          } else if (i === prev) {
            bg.classList.add('previous');
            gsap.to(bg, {
              y: isDown ? `${PARALLAX}%` : `-${PARALLAX}%`,
              duration: DURATION,
              ease: 'customEase',
            });
            gsap.to(bg, {
              opacity: 0,
              delay: DURATION * 0.5,
              duration: DURATION * 0.5,
              ease: 'customEase',
              onComplete: () => {
                bg.classList.remove('previous');
                gsap.set(bg, { y: 0 });
                s.isAnimating = false;
              },
            });
          } else {
            gsap.to(bg, {
              opacity: 0,
              duration: DURATION * 0.3,
              ease: 'customEase',
            });
          }
        });

        /* artist active state */
        artistRefs.current.forEach((el, i) => {
          if (!el) return;
          if (i === newSection) {
            el.classList.add('active');
            gsap.to(el, { opacity: 1, duration: 0.3, ease: 'power2.out' });
          } else {
            el.classList.remove('active');
            gsap.to(el, { opacity: 0.3, duration: 0.3, ease: 'power2.out' });
          }
        });

        /* category active state */
        categoryRefs.current.forEach((el, i) => {
          if (!el) return;
          if (i === newSection) {
            el.classList.add('active');
            gsap.to(el, { opacity: 1, duration: 0.3, ease: 'power2.out' });
          } else {
            el.classList.remove('active');
            gsap.to(el, { opacity: 0.3, duration: 0.3, ease: 'power2.out' });
          }
        });
      }

      /* ── Snap to section ───────────────────────── */
      function snapToSection(target: number) {
        if (
          target < 0 ||
          target > 9 ||
          target === s.currentSection ||
          s.isAnimating
        )
          return;
        s.isSnapping = true;
        changeSection(target);

        const lenis = (window as any).lenis;
        const pos = s.sectionPositions[target];
        if (lenis) {
          lenis.scrollTo(pos, {
            duration: 0.6,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            lock: true,
            onComplete: () => {
              s.isSnapping = false;
            },
          });
        } else {
          window.scrollTo({ top: pos, behavior: 'smooth' });
          s.isSnapping = false;
        }
      }

      /* ── Navigate to section (click) ───────────── */
      function navigateToSection(index: number) {
        if (index === s.currentSection || s.isAnimating || s.isSnapping) return;
        s.sound?.play('click');
        s.isSnapping = true;
        changeSection(index);

        const lenis = (window as any).lenis;
        const pos = s.sectionPositions[index];
        if (lenis) {
          lenis.scrollTo(pos, {
            duration: 0.8,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            lock: true,
            onComplete: () => {
              s.isSnapping = false;
            },
          });
        } else {
          window.scrollTo({ top: pos, behavior: 'smooth' });
          s.isSnapping = false;
        }
      }

      /* ── Click / hover listeners ───────────────── */
      const clickHandlers: Array<{
        el: HTMLElement;
        handler: (e: Event) => void;
      }> = [];
      const hoverHandlers: Array<{ el: HTMLElement; handler: () => void }> = [];

      artistRefs.current.forEach((el, i) => {
        if (!el) return;
        const click = (e: Event) => {
          e.preventDefault();
          navigateToSection(i);
        };
        const hover = () => {
          s.sound?.play('hover');
        };
        el.addEventListener('click', click);
        el.addEventListener('mouseenter', hover);
        clickHandlers.push({ el, handler: click });
        hoverHandlers.push({ el, handler: hover });
      });

      categoryRefs.current.forEach((el, i) => {
        if (!el) return;
        const click = (e: Event) => {
          e.preventDefault();
          navigateToSection(i);
        };
        const hover = () => {
          s.sound?.play('hover');
        };
        el.addEventListener('click', click);
        el.addEventListener('mouseenter', hover);
        clickHandlers.push({ el, handler: click });
        hoverHandlers.push({ el, handler: hover });
      });

      /* ── Fixed-container initial state ─────────── */
      gsap.set(fixedContainer, { height: '100vh' });

      /* ── Main ScrollTrigger ────────────────────── */
      ScrollTrigger.create({
        trigger: '.cp-fixed-section',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.cp-fixed-container',
        pinSpacing: true,
        onUpdate: self => {
          if (s.isSnapping) return;
          const progress = self.progress;
          const delta = progress - s.lastProgress;

          if (Math.abs(delta) > 0.001) {
            s.scrollDirection = delta > 0 ? 1 : -1;
          }

          const targetSection = Math.min(9, Math.floor(progress * 10));

          if (targetSection !== s.currentSection && !s.isAnimating) {
            const next =
              s.currentSection + (targetSection > s.currentSection ? 1 : -1);
            snapToSection(next);
          }

          s.lastProgress = progress;
          if (progressFill) {
            progressFill.style.width = `${(s.currentSection / 9) * 100}%`;
          }
          if (debug) {
            debug.textContent = `Section: ${s.currentSection}, Target: ${targetSection}, Progress: ${progress.toFixed(3)}, Direction: ${s.scrollDirection}`;
          }
        },
      });

      /* ── End-section ScrollTrigger ──────────────── */
      ScrollTrigger.create({
        trigger: '.cp-end-section',
        start: 'top center',
        end: 'bottom bottom',
        onLeaveBack: () => {
          // Hard reset — a fast scroll back up can leave the shrink/translate
          // tweens stuck mid-flight, pinning all content to the top
          gsap.killTweensOf([fixedContainer, header, content, footer]);
          gsap.set(fixedContainer, { height: '100vh' });
          gsap.set(header, { y: 0 });
          gsap.set(content, { y: 0, yPercent: -50 });
          gsap.set(footer, { y: 0 });
          footer.classList.remove('blur');
          leftColumn?.classList.remove('blur');
          rightColumn?.classList.remove('blur');
          featured?.classList.remove('blur');
        },
        onUpdate: self => {
          /* blur */
          if (self.progress > 0.1) {
            footer.classList.add('blur');
            leftColumn?.classList.add('blur');
            rightColumn?.classList.add('blur');
            featured?.classList.add('blur');
          } else {
            footer.classList.remove('blur');
            leftColumn?.classList.remove('blur');
            rightColumn?.classList.remove('blur');
            featured?.classList.remove('blur');
          }

          /* shrink / translate */
          if (self.progress > 0.1) {
            const newH = Math.max(0, 100 - ((self.progress - 0.1) / 0.9) * 100);
            gsap.to(fixedContainer, {
              height: `${newH}vh`,
              duration: 0.1,
              ease: 'power1.out',
            });

            const moveY = (-(self.progress - 0.1) / 0.9) * 200;
            gsap.to(header, {
              y: moveY * 1.5,
              duration: 0.1,
              ease: 'power1.out',
            });
            gsap.to(content, {
              y: moveY,
              yPercent: -50,
              duration: 0.1,
              ease: 'power1.out',
            });
            gsap.to(footer, {
              y: moveY * 0.5,
              duration: 0.1,
              ease: 'power1.out',
            });
          } else {
            gsap.to(fixedContainer, {
              height: '100vh',
              duration: 0.1,
              ease: 'power1.out',
            });
            gsap.to(header, { y: 0, duration: 0.1, ease: 'power1.out' });
            gsap.to(content, {
              y: 0,
              yPercent: -50,
              duration: 0.1,
              ease: 'power1.out',
            });
            gsap.to(footer, { y: 0, duration: 0.1, ease: 'power1.out' });
          }

          if (debug) {
            debug.textContent = `End Section - Height: ${(fixedContainer as HTMLElement).style.height}, Progress: ${self.progress.toFixed(2)}`;
          }
        },
      });

      /* ── Keyboard shortcut: H to toggle debug ──── */
      const handleKey = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === 'h' && debug) {
          debug.style.display =
            debug.style.display === 'none' ? 'block' : 'none';
        }
      };
      document.addEventListener('keydown', handleKey);

      updateProgressNumbers();

      /* ── Cleanup (returned from outer useEffect) ── */
      cleanupFn = () => {
        clearTimeout(initTimer);
        ScrollTrigger.getAll().forEach(st => st.kill());
        clickHandlers.forEach(({ el, handler }) =>
          el.removeEventListener('click', handler)
        );
        hoverHandlers.forEach(({ el, handler }) =>
          el.removeEventListener('mouseenter', handler)
        );
        document.removeEventListener('keydown', handleKey);
      };
    }

    let cleanupFn: (() => void) | undefined;

    return () => {
      clearTimeout(initTimer);
      cleanupFn?.();
    };
  }, [loaderReady]);


  /* ── Render ─────────────────────────────────────── */
  return (
    <main ref={wrapperRef} className="cp-wrapper" style={{ opacity: 0 }}>
      {/* Debug info */}
      <div ref={debugRef} className="cp-debug-info">
        Current Section: 0
      </div>

      {/* Scroll container */}
      <div className="cp-scroll-container">
        {/* Fixed section */}
        <div className="cp-fixed-section">
          <div ref={fixedContainerRef} className="cp-fixed-container">
            {/* Background images */}
            <div className="cp-background-container">
              {BACKGROUNDS.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  ref={el => {
                    bgRefs.current[i] = el;
                  }}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  className={`cp-background-image${i === 0 ? ' active' : ''}`}
                />
              ))}
            </div>

            {/* Grid layout */}
            <div className="cp-grid-container">
              {/* Header */}
              <h1 ref={headerRef} className="cp-header">
                <span className="cp-header-row">Building Digital</span>
                <span className="cp-header-row">Experiences</span>
              </h1>

              {/* Content */}
              <div ref={contentRef} className="cp-content">
                {/* Left column – artists */}
                <div ref={leftColumnRef} className="cp-left-column">
                  {SECTIONS.map((sec, i) => (
                    <div
                      key={i}
                      ref={el => {
                        artistRefs.current[i] = el;
                      }}
                      className={`cp-artist${i === 0 ? ' active' : ''}`}
                      data-index={i}
                    >
                      {sec.artist}
                    </div>
                  ))}
                </div>

                {/* Center – featured */}
                <div ref={featuredRef} className="cp-featured">
                  {SECTIONS.map((sec, i) => (
                    <div
                      key={i}
                      ref={el => {
                        featuredContentRefs.current[i] = el;
                      }}
                      className={`cp-featured-content${i === 0 ? ' active' : ''}`}
                      data-index={i}
                    >
                      <h3>{sec.featured}</h3>
                    </div>
                  ))}
                </div>

                {/* Right column – categories */}
                <div ref={rightColumnRef} className="cp-right-column">
                  {SECTIONS.map((sec, i) => (
                    <div
                      key={i}
                      ref={el => {
                        categoryRefs.current[i] = el;
                      }}
                      className={`cp-category${i === 0 ? ' active' : ''}`}
                      data-index={i}
                    >
                      {sec.category}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div ref={footerRef} className="cp-footer">
                <div className="cp-header-row">Digital</div>
                <div className="cp-header-row">Craft</div>
                <div className="cp-progress-indicator">
                  <div className="cp-progress-numbers">
                    <span ref={currentSectionNumRef}>01</span>
                    <span>10</span>
                  </div>
                  <div ref={progressFillRef} className="cp-progress-fill" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End section */}
        <div className="cp-end-section">
          <p className="cp-fin">Asyabani</p>
        </div>
      </div>

      {/* The substantive part: bio, stack, experience, education, contact */}
      <AboutDetails />
    </main>
  );
}
