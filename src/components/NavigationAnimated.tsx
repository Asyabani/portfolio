'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { socialLinks } from '@/lib/data/social';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MoreHorizontal, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useLoaderReady } from '@/hooks/useLoaderReady';
import { useTheme } from '@/contexts/ThemeContext';
import { useSound } from '@/contexts/SoundContext';

interface NavLink {
  href: string;
  label: string;
  download?: boolean;
}

/**
 * NavigationAnimated Component
 *
 * Navigation bar with smooth GSAP animations
 */
export function NavigationAnimated() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isProjectsPage = pathname?.startsWith('/projects');
  const isAboutPage = pathname === '/about';
  const { theme } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownPanelRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const widthTargetsRef = useRef({ expanded: 0, collapsed: 0 });
  const loaderReady = useLoaderReady();

  useEffect(() => {
    if (!loaderReady) return;

    // Pre-set opacity to 0 so there's no flash between CSS rule removal and GSAP start
    gsap.set(headerRef.current, { opacity: 0, y: -100 });
    gsap.set(logoRef.current, { opacity: 0, x: -30 });
    if (navLinksRef.current) {
      const animatedChildren = Array.from(navLinksRef.current.children).filter(
        child =>
          !(
            child instanceof HTMLElement &&
            child.dataset?.role === 'theme-toggle'
          )
      );
      gsap.set(animatedChildren, { opacity: 0, y: -20 });
    }

    // Animate in
    gsap.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'transform',
    });

    gsap.to(logoRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out',
    });

    if (navLinksRef.current) {
      const animatedChildren = Array.from(navLinksRef.current.children).filter(
        child =>
          !(
            child instanceof HTMLElement &&
            child.dataset?.role === 'theme-toggle'
          )
      );

      gsap.to(animatedChildren, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.35,
        ease: 'power2.out',
      });
    }
  }, [loaderReady]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const panel = dropdownPanelRef.current;
    if (!panel) return;

    const runEnterAnimation = () => {
      const cards = panel.querySelectorAll('[data-dropdown-card]');
      gsap.set(cards, {
        y: 90,
        rotate: (index: number) => (index === 0 ? 7 : -7),
      });
      gsap.to(cards, {
        y: 0,
        rotate: 0,
        duration: 0.55,
        delay: 0.05,
        stagger: 0.08,
        ease: 'power3.out',
      });
    };

    const runExitAnimation = () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.in', duration: 0.35 },
      });

      tl.to(panel.querySelectorAll('[data-dropdown-card]'), {
        y: 90,
        rotate: (index: number) => (index === 0 ? 7 : -7),
      }).to(
        panel,
        {
          y: 90,
          opacity: 0,
        },
        '-=0.15'
      );

      return tl;
    };

    const ctx = gsap.context(() => {
      if (isDropdownOpen) {
        runEnterAnimation();
      } else {
        const timeline = runExitAnimation();
        return () => timeline.kill();
      }
    }, panel);

    return () => ctx.revert();
  }, [isDropdownOpen]);

  useEffect(() => {
    const panel = mobilePanelRef.current;
    if (!panel) return;

    const cards = panel.querySelectorAll('[data-mobile-card]');

    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.set(cards, {
          y: 90,
          rotate: (index: number) => (index === 0 ? 7 : -7),
        });
        gsap.to(cards, {
          y: 0,
          rotate: 0,
          duration: 0.55,
          delay: 0.05,
          stagger: 0.08,
          ease: 'power3.out',
        });
      } else {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.in', duration: 0.35 },
        });
        tl.to(cards, {
          y: 90,
          rotate: (index: number) => (index === 0 ? 7 : -7),
        });
      }
    }, panel);

    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    if (!loaderReady || !navContainerRef.current) return;

    const navEl = navContainerRef.current;
    const isMobile = () => window.innerWidth < 768;

    // On mobile: no scroll collapse at all — just listen for resize to desktop
    if (isMobile()) {
      const onResize = () => {
        if (!isMobile()) window.location.reload();
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const clamp = gsap.utils.clamp(0, 1);
    const collapseStart = 30;
    const collapseEnd = 260;
    const collapseThreshold = 0.85;
    const expandThreshold = 0.25;

    let lastProgress = 0;
    let isFirstUpdate = true;
    let rafId: number | null = null;

    const recalcWidths = () => {
      if (!navEl) return;
      const parentWidth = navEl.parentElement?.clientWidth ?? window.innerWidth;
      const availableWidth = Math.max(360, parentWidth - 32);
      const expandedWidth = Math.min(availableWidth, 1440);
      const collapsedCandidate = Math.max(
        expandedWidth * 0.78,
        expandedWidth - 220
      );
      const collapsedWidth = Math.max(
        360,
        Math.min(collapsedCandidate, expandedWidth)
      );

      widthTargetsRef.current.expanded = expandedWidth;
      widthTargetsRef.current.collapsed = collapsedWidth;
    };

    const updateNavState = () => {
      // If resized to mobile, clear GSAP styles and bail
      if (isMobile()) {
        gsap.killTweensOf(navEl);
        navEl.removeAttribute('style');
        setIsScrolled(false);
        return;
      }

      const scrollY = window.scrollY;
      const rawProgress =
        (scrollY - collapseStart) / (collapseEnd - collapseStart);
      const progress = clamp(rawProgress);
      const easedProgress = progress ** 0.75;
      const paddingY = gsap.utils.interpolate(24, 12, easedProgress);
      const paddingX = gsap.utils.interpolate(16, 24, easedProgress);
      const roundingValue = gsap.utils.interpolate(18, 999, easedProgress);
      const blurAmount = gsap.utils.interpolate(0, 0.6, easedProgress);
      const yOffset = gsap.utils.interpolate(0, 18, easedProgress);
      const widthValue = gsap.utils.interpolate(
        widthTargetsRef.current.expanded || navEl.offsetWidth,
        widthTargetsRef.current.collapsed || navEl.offsetWidth,
        easedProgress
      );
      const boxShadowColor = document.documentElement.classList.contains('dark')
        ? `rgba(0, 0, 0, ${0.45 * easedProgress})`
        : `rgba(15, 23, 42, ${0.12 * easedProgress})`;

      const scrollingDown = progress > lastProgress;
      lastProgress = progress;

      setIsScrolled(prev => {
        if (progress > collapseThreshold && !prev) return true;
        if (progress < expandThreshold && prev) return false;
        return prev;
      });

      gsap.to(navEl, {
        y: yOffset,
        scale: 1 - easedProgress * 0.08,
        filter: `blur(${blurAmount}px)`,
        borderRadius: `${roundingValue}px`,
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        maxWidth: `${widthValue}px`,
        boxShadow: `0 16px 45px ${boxShadowColor}`,
        duration: isFirstUpdate ? 0 : scrollingDown ? 0.45 : 0.3,
        ease: scrollingDown ? 'power3.out' : 'power2.out',
        overwrite: true,
      });

      if (isFirstUpdate) {
        isFirstUpdate = false;
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateNavState();
        rafId = null;
      });
    };

    const handleResize = () => {
      recalcWidths();
      updateNavState();
    };

    recalcWidths();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    updateNavState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [loaderReady]);

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/certificates', label: 'Certificates' },
    { href: '/resume', label: 'Resume' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    const subject = encodeURIComponent('Newsletter Subscription');
    const body = encodeURIComponent(
      `Please subscribe ${email.trim()} to the newsletter.`
    );
    const mailtoLink = `${socialLinks.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    setEmail('');
    setIsDropdownOpen(false);
  };

  const navContainerBaseClass =
    'w-full md:max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-6 transition-colors duration-500';
  const navContainerColorClass = isProjectsPage
    ? isScrolled
      ? isDark
        ? 'bg-transparent md:bg-[#050b23]/95 md:text-white md:shadow-[0_16px_45px_rgba(5,11,35,0.55)]'
        : 'bg-transparent md:bg-[#f5f6ff]/95 md:text-dark md:shadow-[0_16px_45px_rgba(15,23,42,0.12)] md:backdrop-blur-xl'
      : 'bg-transparent'
    : isScrolled
      ? 'bg-transparent md:bg-[#f5f6ff] md:dark:bg-[#081226] md:backdrop-blur-xl'
      : 'bg-transparent dark:bg-transparent';
  const navContainerClass = `${navContainerBaseClass} ${navContainerColorClass}`;

  return (
    <header
      ref={headerRef}
      style={{ opacity: 0 }}
      className={`navbar-fixed fixed top-0 left-0 right-0 z-50 transition-[background-color,padding] duration-300 ${
        isScrolled
          ? 'md:flex md:justify-center md:px-4'
          : 'bg-transparent dark:bg-transparent'
      }${isAboutPage ? ' navbar-on-photo' : ''}`}
    >
      <nav
        ref={navContainerRef}
        className={`${navContainerClass} relative transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            className={`group text-base md:text-2xl font-bold overflow-hidden inline-block ${
              isAboutPage
                ? isScrolled
                  ? 'text-white md:text-dark md:dark:text-white'
                  : 'text-white'
                : isProjectsPage
                  ? isDark
                    ? 'text-white'
                    : 'text-dark dark:text-white'
                  : 'text-dark dark:text-white'
            }`}
          >
            <span className="relative inline-block h-[1.25em] leading-tight overflow-hidden align-middle">
              <span className="block leading-tight transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                ASYABANI
              </span>
              <span className="absolute inset-0 flex items-center translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 font-black tracking-wide">
                ASYABANI
              </span>
            </span>
          </Link>

          {/* Desktop Navigation - Right side */}
          <div
            ref={navLinksRef}
            className="hidden md:flex items-center space-x-4"
          >
            <div data-role="theme-toggle" className="flex items-center gap-2">
              {isAboutPage && (
                <button
                  onClick={toggleSound}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f6ff] dark:bg-white text-dark shadow-sm hover:shadow-md border border-gray-200 transition-all shrink-0"
                  aria-label={isSoundEnabled ? 'Mute sound' : 'Unmute sound'}
                  title={isSoundEnabled ? 'Mute sound' : 'Unmute sound'}
                >
                  {isSoundEnabled ? (
                    <Volume2 className="w-5 h-5 text-dark" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-dark" />
                  )}
                </button>
              )}
              <ThemeToggle />
            </div>
            <a
              href={socialLinks.email}
              className="cursor-pointer px-5 py-3 rounded-full text-base font-semibold transition-colors bg-dark text-white hover:bg-dark/90"
            >
              LET&apos;S TALK
            </a>
            {/* Menu Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`group cursor-pointer flex items-center gap-2 px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-all text-base font-medium overflow-hidden border ${
                  isProjectsPage && isDark
                    ? 'bg-white/10 text-white border-white/20 backdrop-blur'
                    : 'bg-[#f5f6ff] dark:bg-white text-dark border-gray-200'
                }`}
                aria-expanded={isDropdownOpen}
              >
                <span className="relative inline-block w-12 h-5 leading-tight overflow-hidden text-left">
                  <span
                    className={`block transition-transform duration-300 ${isDropdownOpen ? '-translate-y-full' : 'translate-y-0'}`}
                  >
                    MENU
                  </span>
                  <span
                    className={`absolute top-0 left-0 transition-transform duration-300 ${isDropdownOpen ? 'translate-y-0' : 'translate-y-full'}`}
                  >
                    CLOSE
                  </span>
                </span>
                <MoreHorizontal className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Dropdown Content */}
              <div
                ref={dropdownPanelRef}
                className={`absolute top-full right-0 w-80 transition-all duration-300 z-50 ${
                  isDropdownOpen
                    ? 'opacity-100 visible translate-y-0 scale-100'
                    : 'opacity-0 invisible translate-y-6 scale-95 pointer-events-none'
                }`}
              >
                <div className="px-5 space-y-4">
                  <div
                    data-dropdown-card
                    className={`${
                      isProjectsPage
                        ? 'bg-white text-dark'
                        : 'bg-[#f5f6ff] dark:bg-white'
                    } py-5 rounded-xl shadow-lg border border-gray-100`}
                  >
                    {navLinks.map(link => {
                      const itemClass =
                        'group relative block px-9 py-3 text-xl font-medium text-gray-800 first:rounded-t-3xl last:rounded-b-3xl transition-colors overflow-hidden';
                      const closeMenus = () => {
                        setIsDropdownOpen(false);
                        setIsOpen(false);
                      };
                      // Text flip: current label slides up, hover text slides in from below
                      const label = (
                        <span className="relative inline-block h-[1.25em] overflow-hidden align-middle">
                          {/* Original text — slides up on hover */}
                          <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                            {link.label}
                          </span>
                          {/* Hover text — slides up into view, semibold */}
                          <span className="absolute inset-0 flex items-center translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 font-semibold">
                            {link.label}
                          </span>
                        </span>
                      );
                      // Internal routes use client-side navigation so the
                      // global loader doesn't replay on every menu click
                      return link.download ? (
                        <a
                          key={link.href}
                          href={link.href}
                          download
                          className={itemClass}
                          onClick={closeMenus}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={itemClass}
                          onClick={closeMenus}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>

                  <div
                    data-dropdown-card
                    className={`px-7 py-7 rounded-xl shadow-lg border border-gray-100 ${
                      isProjectsPage
                        ? 'bg-white text-dark'
                        : 'bg-[#f5f6ff] dark:bg-white'
                    }`}
                  >
                    <form onSubmit={handleSubscribe}>
                      <p className="text-2xl font-medium tracking-tight">
                        Subscribe to our newsletter
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="Your email"
                          required
                          className="flex-1 rounded-xl bg-dark/10 px-4 py-3 text-sm text-dark placeholder:text-dark/60 focus:outline-none focus:ring-2 focus:ring-white/70"
                        />
                        <button
                          type="submit"
                          aria-label="Subscribe to newsletter"
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent text-slate-900 transition"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Theme toggle + Sound toggle + Hamburger - Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            {isAboutPage && (
              <button
                onClick={toggleSound}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f6ff] dark:bg-white text-dark shadow-sm hover:shadow-md border border-gray-200 transition-all shrink-0"
                aria-label={isSoundEnabled ? 'Mute sound' : 'Unmute sound'}
                title={isSoundEnabled ? 'Mute sound' : 'Unmute sound'}
              >
                {isSoundEnabled ? (
                  <Volume2 className="w-4 h-4 text-dark" />
                ) : (
                  <VolumeX className="w-4 h-4 text-dark" />
                )}
              </button>
            )}
            <ThemeToggle />
            <button
              className={`p-3 -m-3 ${isOpen ? 'hamburger-active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          ref={mobilePanelRef}
          className={`md:hidden transition-all duration-400 ease-in-out ${
            isOpen
              ? 'max-h-[calc(100dvh-7rem)] opacity-100 mt-4 overflow-y-auto overscroll-contain'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 space-y-4">
            <div
              data-mobile-card
              className={`${
                isProjectsPage
                  ? 'bg-white text-dark'
                  : 'bg-[#f5f6ff] dark:bg-white'
              } py-5 rounded-xl shadow-lg border border-gray-100`}
            >
              {navLinks.map(link => {
                const itemClass =
                  'group relative block px-7 py-2.5 text-base font-medium text-gray-800 first:rounded-t-3xl last:rounded-b-3xl transition-colors overflow-hidden';
                const label = (
                  <span className="relative inline-block h-[1.25em] overflow-hidden align-middle">
                    <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                      {link.label}
                    </span>
                    <span className="absolute inset-0 flex items-center translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 font-semibold">
                      {link.label}
                    </span>
                  </span>
                );
                return link.download ? (
                  <a
                    key={link.href}
                    href={link.href}
                    download
                    className={itemClass}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={itemClass}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            <div
              data-mobile-card
              className={`px-7 py-7 rounded-xl shadow-lg border border-gray-100 ${
                isProjectsPage
                  ? 'bg-white text-dark'
                  : 'bg-[#f5f6ff] dark:bg-white'
              }`}
            >
              <form onSubmit={handleSubscribe}>
                <p className="text-lg font-medium tracking-tight text-dark">
                  Subscribe to our newsletter
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 rounded-xl bg-dark/10 px-4 py-2.5 text-sm text-dark placeholder:text-dark/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-slate-900 transition"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>

            <a
              href={socialLinks.email}
              className="block text-center px-5 py-3 rounded-full text-sm font-semibold bg-dark text-white hover:bg-dark/90 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              LET&apos;S TALK
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
