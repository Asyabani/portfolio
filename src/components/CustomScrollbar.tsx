'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CustomScrollbar Component
 *
 * Overlay scrollbar that floats on top of content
 * Works with Lenis smooth scrolling
 */
export function CustomScrollbar({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const thumbStartTop = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let lenisInstance: any = null;

    // Try to get Lenis instance from window
    const getLenisInstance = () => {
      if (typeof window !== 'undefined') {
        return (window as any).lenis;
      }
      return null;
    };

    const updateThumb = () => {
      const thumb = thumbRef.current;
      if (!thumb) return;

      lenisInstance = getLenisInstance();
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Use Lenis scroll position if available, otherwise use window scroll
      const scrollTop = lenisInstance ? lenisInstance.scroll : window.scrollY;

      // Calculate thumb height based on visible content ratio
      const visibleRatio = clientHeight / scrollHeight;
      const thumbHeight = Math.max(visibleRatio * 100, 20); // At least 30% height

      // Calculate thumb position based on scroll progress
      const scrollableHeight = scrollHeight - clientHeight;
      const scrollProgress =
        scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
      const availableTrack = 100 - thumbHeight;
      const thumbTop = scrollProgress * availableTrack;

      // Direct DOM manipulation - no React state update
      thumb.style.height = `${thumbHeight}%`;
      thumb.style.top = `${thumbTop}%`;
    };

    // Update every frame for instant response
    const smoothUpdate = () => {
      updateThumb();
      rafId = requestAnimationFrame(smoothUpdate);
    };

    // Start the smooth update loop
    rafId = requestAnimationFrame(smoothUpdate);

    // Initial update
    updateThumb();

    // Also update on resize
    const handleResize = () => {
      updateThumb();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsVisible(true);
    dragStartY.current = e.clientY;
    // Store initial scroll position instead of thumb position
    thumbStartTop.current = window.scrollY;
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const trackHeight = clientHeight * 0.2; // 20vh track height
      const trackTop = clientHeight * 0.4; // Track starts at 40vh

      // Calculate mouse position relative to track (in percentage)
      const mouseInTrack = e.clientY - trackTop;
      const mouseRatio = Math.max(0, Math.min(1, mouseInTrack / trackHeight));

      // Calculate new scroll position
      const scrollableHeight = scrollHeight - clientHeight;
      const newScrollTop = mouseRatio * scrollableHeight;

      // Try to use Lenis for instant scroll, fallback to window.scrollTo
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(Math.max(0, Math.min(newScrollTop, scrollableHeight)), {
          immediate: true,
        });
      } else {
        window.scrollTo({
          top: Math.max(0, Math.min(newScrollTop, scrollableHeight)),
          behavior: 'instant',
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      {children}
      {/* Custom Scrollbar Overlay */}
      <div
        className="custom-scrollbar-overlay fixed top-0 pointer-events-none z-[9999] opacity-100 hidden md:block"
        style={{ height: '20vh', top: '40vh', width: '10px', right: '20px' }}
      >
        {/* Track Background */}
        <div
          className="absolute rounded-full bg-slate-300/30 dark:bg-slate-700/30"
          style={{
            width: '6px',
            right: '2px',
            height: '100%',
            top: '0',
          }}
        />
        {/* Thumb */}
        <div
          ref={thumbRef}
          className="absolute rounded-full bg-primary dark:bg-primary hover:brightness-110 dark:hover:brightness-110 transition-all duration-150"
          style={{
            width: '6px',
            right: '2px',
            height: '20%',
            top: '0%',
            pointerEvents: isDragging ? 'none' : 'auto',
            cursor: 'pointer',
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </>
  );
}
