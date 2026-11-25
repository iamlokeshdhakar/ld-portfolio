'use client';

import { useEffect, useRef, useState } from 'react';
import { scrollProgress } from '../lib/motion.mjs';
import PortfolioSections from './portfolio-sections';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Notes', href: '#notes' },
  { label: 'GitHub', href: '#github' },
];

export default function PortfolioHero() {
  const storyRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkScene, setDarkScene] = useState(false);

  useEffect(() => {
    const story = storyRef.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastDark = false;

    const update = () => {
      frame = 0;
      if (!story) return;
      const distance = story.offsetHeight - window.innerHeight;
      const storyRect = story.getBoundingClientRect();
      const progress = scrollProgress(-storyRect.top, distance);
      story.style.setProperty('--progress', String(progress));
      const onDarkSection = [...document.querySelectorAll('[data-header-theme="light"]')].some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 45 && rect.bottom > 45;
      });
      const nextDark = onDarkSection || (storyRect.bottom > 45 && progress > 0.45);
      if (nextDark !== lastDark) {
        lastDark = nextDark;
        setDarkScene(nextDark);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    frame = window.requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    media.addEventListener('change', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      media.removeEventListener('change', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    elements.forEach((element) => observer.observe(element));
    document.documentElement.classList.add('motion-ready');
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${darkScene ? 'site-header--light' : ''}`}>
        <a href="#top" className="brand" aria-label="Lokesh Dhakar, back to top">ld<span>.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#top">Home</a>
          {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="contact-button" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span>
        </button>
        <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" hidden={!menuOpen} data-lenis-prevent>
          <p>Find your way</p>
          <a href="#top" onClick={() => setMenuOpen(false)}>Home <span>01</span></a>
          {links.map((link, index) => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label} <span>0{index + 2}</span></a>)}
          <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <span>↗</span></a>
        </nav>
      </header>

      <main id="main">
        <section id="top" ref={storyRef} className="hero-story" aria-labelledby="hero-title">
          <div id="introduction" className="introduction-anchor" aria-hidden="true"></div>
          <div className="hero-sticky">
            <div className="hero-opening">
              <p className="hero-eyebrow">A little curiosity. A lot of possibility.</p>
              <div className="name-wrap">
                <h1 id="hero-title">Lokesh<span className="name-dot">.</span></h1>
                <p className="surname">Dhakar <span> / </span> Full-stack engineer</p>
              </div>
              <div className="hero-bottom">
                <p>Thoughtful products.<br />Built from the ground up.</p>
                <p className="hero-location">Product thinking <span>×</span> Engineering <span>×</span> AI</p>
                <a className="scroll-link" href="#introduction" aria-label="Scroll to introduction"><span>Scroll to explore</span><span className="circle-arrow" aria-hidden="true">↓</span></a>
              </div>
              <div className="chapter"><span>01</span><i></i><span>The introduction</span></div>
            </div>
            <div className="reveal-panel" aria-hidden="true">
              <div className="reveal-grain"></div>
              <p className="reveal-kicker">PRODUCT THINKING / ENGINEERING / AI</p>
              <p className="reveal-title">Ideas into<br /><em>impact.</em></p>
              <p className="reveal-copy">From the first sketch to the systems behind it.<br />I build products made to move forward.</p>
              <div className="reveal-bottom"><span>01 <i></i> The introduction</span><span>LOKESH DHAKAR / FULL-STACK ENGINEER</span></div>
            </div>
          </div>
          <div className="sr-only">I’m Lokesh Dhakar, a product-focused founding and full-stack engineer. I build products from the first idea to the systems behind them, working across engineering and applied AI.</div>
        </section>
        <PortfolioSections />
      </main>
    </>
  );
}
