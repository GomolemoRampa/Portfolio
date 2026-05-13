/* ═══════════════════════════════════════════════
   main.js — Behaviour Layer
   Portfolio: Gomolemo Rampa (v3)
   ═══════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────
   MODULE: Cursor Glow
   Tracks mouse position on desktop only.
   ────────────────────────────── */
const CursorGlow = (() => {
  const el = document.getElementById('cursorGlow');
  if (!el) return;

  document.addEventListener('mousemove', e => {
    el.style.left = `${e.clientX}px`;
    el.style.top  = `${e.clientY}px`;
  });
  document.addEventListener('mouseleave', () => { el.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { el.style.opacity = '1'; });
})();


/* ──────────────────────────────
   MODULE: Mobile Nav (Hamburger)
   Toggles the slide-in nav on tablet/mobile.
   Closes on outside click and on nav link tap.
   ────────────────────────────── */
const MobileNav = (() => {
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  const open  = () => { navLinks.classList.add('open');  toggle.classList.add('open');  document.body.style.overflow = 'hidden'; };
  const close = () => { navLinks.classList.remove('open'); toggle.classList.remove('open'); document.body.style.overflow = ''; };

  toggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? close() : open();
  });

  // Close when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target)) close();
  });

  // Close if resized back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) close();
  });
})();


/* ──────────────────────────────
   MODULE: Scroll Reveal
   Uses IntersectionObserver to fade-in
   elements with the class `.reveal`.
   ────────────────────────────── */
const ScrollReveal = (() => {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
})();


/* ──────────────────────────────
   MODULE: Hero Entrance Animation
   Staggers hero child elements into
   view on initial page load.
   ────────────────────────────── */
const HeroEntrance = (() => {
  const animate = () => {
    const heroEls = document.querySelectorAll('.hero-content > *');
    heroEls.forEach((el, i) => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(24px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity   = '1';
          el.style.transform = 'none';
        });
      });
    });
  };

  window.addEventListener('load', animate);
})();


/* ──────────────────────────────
   MODULE: Active Nav Highlight
   Colours the matching nav link mint
   as the user scrolls through sections.
   ────────────────────────────── */
const ActiveNav = (() => {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const OFFSET = 100;

  const update = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - OFFSET) current = s.id;
    });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--mint)' : '';
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();