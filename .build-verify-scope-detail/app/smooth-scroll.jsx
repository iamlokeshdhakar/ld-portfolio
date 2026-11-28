'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { getSamePageAnchor } from '../lib/motion.mjs';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.35,
      easing: (progress) => 1 - Math.pow(1 - progress, 4),
      wheelMultiplier: 0.85,
      smoothWheel: true,
      syncTouch: false,
      respectReducedMotion: true,
    });

    const handleAnchor = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const hash = getSamePageAnchor(link.href, window.location.href);
      if (!hash) return;
      let target;
      try {
        target = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return;
      }
      if (!target) return;
      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
      lenis.scrollTo(target, {
        onComplete: () => {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        },
      });
    };

    document.addEventListener('click', handleAnchor);
    return () => {
      document.removeEventListener('click', handleAnchor);
      lenis.destroy();
    };
  }, []);

  return null;
}
