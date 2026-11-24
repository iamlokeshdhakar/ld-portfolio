'use client';

import { useEffect, useRef } from 'react';

export default function EngineeringReveal({ children, className }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || !('IntersectionObserver' in window) || reduce.matches) return;
    const items = root.querySelectorAll('.eng-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    items.forEach((item) => observer.observe(item));
    root.classList.add('eng-motion');
    const showAll = () => {
      if (reduce.matches) {
        root.classList.remove('eng-motion');
        observer.disconnect();
      }
    };
    reduce.addEventListener('change', showAll);
    return () => { observer.disconnect(); reduce.removeEventListener('change', showAll); };
  }, []);
  return <main ref={rootRef} className={className}>{children}</main>;
}
