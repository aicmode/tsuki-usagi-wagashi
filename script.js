/* ═══════════════════════════════════════════════════════════════
   月兎和菓子 — script.js
   ═══════════════════════════════════════════════════════════════ */

/* ── Reduced-motion guard ── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Header: scroll-solidify ──────────────────────────────────── */
(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile navigation toggle ─────────────────────────────────── */
(function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close nav when a link is clicked */
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Hero parallax (subtle cinematic scroll depth) ────────────── */
(function initParallax() {
  if (prefersReducedMotion) return;

  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  const onScroll = () => {
    const scrollY = window.scrollY;
    /* Move background slightly slower than scroll for depth */
    heroBg.style.transform = `translateY(${scrollY * 0.28}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── Scroll-reveal (IntersectionObserver) ─────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* ── Ambient particles ────────────────────────────────────────── */
(function initParticles() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('particles');
  if (!container) return;

  /* Small number of particles — controlled, not overwhelming */
  const COUNT = 18;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1.5;          /* 1.5–4.5 px */
    const left = Math.random() * 100;               /* 0–100 vw */
    const dur  = Math.random() * 14 + 18;           /* 18–32 s */
    const del  = Math.random() * -20;               /* stagger start */
    const tx   = (Math.random() - 0.5) * 80 + 'px';/* drift left/right */

    p.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${left}%;
      bottom: -6px;
      --dur:  ${dur}s;
      --del:  ${del}s;
      --tx:   ${tx};
    `;
    container.appendChild(p);
  }
})();

/* ── Smooth anchor scrolling (with header offset) ─────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const headerH = document.getElementById('site-header')?.offsetHeight ?? 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
})();
