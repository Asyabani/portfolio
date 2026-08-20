'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/data/projects';
import { useLoaderReady } from '@/hooks/useLoaderReady';
import { ArrowRight } from 'lucide-react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ProjectCardAnimated Component
 *
 * Project card with GSAP hover and scroll animations
 */
export function ProjectCardAnimated({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const loaderReady = useLoaderReady();

  useEffect(() => {
    if (!loaderReady) return;

    const card = cardRef.current;
    const imageContainer = imageRef.current;
    const arrowIcon = arrowRef.current;
    const titleText = titleTextRef.current;
    let initialLetterSpacing: string | null = null;
    if (!card || !imageContainer) return;

    // Phones: play entrances once — replaying (and re-scrambling tags) on every
    // scroll pass causes visible jank on low-power devices
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const toggleActions = isMobile
      ? 'play none none none'
      : 'play reverse play reverse';

    if (arrowIcon) {
      gsap.set(arrowIcon, { opacity: 0, x: -12, rotate: 0 });
    }

    if (titleText) {
      initialLetterSpacing = window.getComputedStyle(titleText).letterSpacing;
      gsap.set(titleText, {
        x: 0,
        skewX: 0,
        letterSpacing: initialLetterSpacing || '0em',
      });
    }

    const getThemeTitleColor = () => {
      if (!titleText) return null;
      const previousColor = titleText.style.color;
      titleText.style.removeProperty('color');
      const themeColor = window.getComputedStyle(titleText).color;
      titleText.style.color = previousColor;
      return themeColor;
    };

    // Set initial state with zoom on image (no blur)
    gsap.set(imageContainer, {
      scale: 1.03,
    });

    // Initial scroll-trigger animation from center
    gsap.fromTo(
      card,
      {
        opacity: 1,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
          end: 'bottom 20%',
          toggleActions,
        },
      }
    );

    // Animate title reveal from top to bottom (faster)
    const titleElement = card.querySelector('.char-reveal-title');
    if (titleElement) {
      gsap.fromTo(
        titleElement,
        {
          y: -30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            end: 'bottom 20%',
            toggleActions,
          },
        }
      );
    }

    // Animate tags with random character typing effect
    const tagsContainer = card.querySelector('.tags-container');
    if (tagsContainer) {
      const text = tagsContainer.textContent || '';
      const chars = text.split('');

      // Clear original text and create character spans
      tagsContainer.textContent = '';
      const charElements: HTMLElement[] = [];

      chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className =
          'inline-block tag-char text-sm text-secondary dark:text-gray-400';
        span.style.opacity = '0';
        span.style.whiteSpace = 'pre';
        tagsContainer.appendChild(span);
        charElements.push(span);
      });

      // Animate with random character effect then reveal
      charElements.forEach((charEl, index) => {
        const targetChar = charEl.textContent || '';
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

        // Set initial state
        gsap.set(charEl, { opacity: 0 });

        // Create timeline for each character
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            end: 'bottom 20%',
            toggleActions,
          },
        });

        // Fade in with random characters
        const randomDuration = 0.03; // Faster random changes
        const revealDelay = 0.2 + index * 0.05;

        // Create random character animation
        for (let i = 0; i < 4; i++) {
          tl.to(
            charEl,
            {
              duration: randomDuration,
              onStart: () => {
                if (charEl.textContent === targetChar) {
                  charEl.textContent =
                    randomChars[Math.floor(Math.random() * randomChars.length)];
                }
              },
            },
            revealDelay + i * randomDuration
          );
        }

        // Finally reveal the correct character
        tl.to(charEl, {
          opacity: 1,
          duration: 0.3,
          onStart: () => {
            charEl.textContent = targetChar;
          },
        });
      });
    }

    // Hover animation - only shake effect, reset image scale
    const handleMouseEnter = () => {
      // Reset image scale to normal
      gsap.to(imageContainer, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (arrowIcon) {
        gsap.to(arrowIcon, {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: 'power2.out',
        });
      }

      if (titleText) {
        gsap.to(titleText, {
          x: 28,
          skewX: -5,
          letterSpacing: '0.1em',
          color: '#0d9488',
          duration: 0.35,
          ease: 'power2.out',
        });
      }

      // Continuous shake/vibration effect
      gsap.to(card, {
        x: '+=2',
        y: '+=2',
        duration: 0.05,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    };

    const handleMouseLeave = () => {
      // Remove all animations
      gsap.killTweensOf(card);
      gsap.killTweensOf(imageContainer);

      // Reset card position
      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Reset image to zoomed state
      gsap.to(imageContainer, {
        scale: 1.03,
        duration: 0.4,
        ease: 'power2.out',
      });

      if (arrowIcon) {
        gsap.to(arrowIcon, {
          opacity: 0,
          x: -12,
          rotate: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }

      if (titleText) {
        const targetColor = getThemeTitleColor();
        gsap.to(titleText, {
          x: 0,
          skewX: 0,
          letterSpacing: initialLetterSpacing || '0em',
          color: targetColor || 'currentColor',
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => {
            if (titleText) {
              titleText.style.removeProperty('color');
            }
          },
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [loaderReady]);

  // Determine if this is an external link or internal detail page
  const isExternal = project.linkType === 'external';

  // Common card content
  const cardContent = (
    <>
      <div
        className="card-body shadow-md overflow-hidden relative rounded-[15px] aspect-[20/9] md:aspect-auto md:h-80"
      >
        <div ref={imageRef} className="relative overflow-hidden w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <h3 className="font-bold text-lg md:text-2xl text-dark mb-0 pb-0 mt-3 md:mt-4 dark:text-white uppercase overflow-hidden min-h-8 md:h-10">
        <span className="relative inline-flex items-center char-reveal-title">
          <span
            ref={arrowRef}
            className="absolute left-0 -translate-x-full inline-flex text-primary dark:text-teal-300"
            aria-hidden="true"
          >
            <ArrowRight className="w-5 h-5" />
          </span>
          <span ref={titleTextRef}>{project.title}</span>
        </span>
      </h3>
      <div className="mt-0 pt-0 tags-container">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="tag-item text-sm text-secondary dark:text-gray-400"
          >
            {tag}
            {index < project.tags.length - 1 && ' • '}
          </span>
        ))}
      </div>
      {project.description && (
        <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300/80 line-clamp-2 md:line-clamp-3 max-w-prose">
          {project.description}
        </p>
      )}
    </>
  );

  return (
    <div ref={cardRef} className="card group">
      {isExternal ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </a>
      ) : (
        <Link href={project.url} className="block">
          {cardContent}
        </Link>
      )}
    </div>
  );
}
