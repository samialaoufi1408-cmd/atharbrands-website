/* ============================================================
   ATHAR — interactions + procedural brand marks
   ============================================================ */
(function(){
  'use strict';

  /* ---- The Seal of Impact (procedural SVG) ----------------- */
  function ray(cx, cy, ri, ro, ang){
    const r = ang*Math.PI/180;
    const x1 = cx + ri*Math.cos(r), y1 = cy + ri*Math.sin(r);
    const x2 = cx + ro*Math.cos(r), y2 = cy + ro*Math.sin(r);
    return `${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }

  function buildSeal(withRays){
    const cx = 120, cy = 150;
    let rays = '', rays2 = '';
    if (withRays){
      // OUTER ring — 96 teeth, rotates clockwise
      const TEETH = 96;
      for (let i = 0; i < TEETH; i++){
        const a = i * 360 / TEETH;
        const major = (i % 8 === 0);
        const ro = 86;
        const ri = 60;                       // outer band
        const op = major ? 0.95 : 0.7;
        const w  = major ? 1.2 : 0.8;
        const p = ray(cx, cy, ri, ro, a).split(' ');
        rays += `<line x1="${p[0].split(',')[0]}" y1="${p[0].split(',')[1]}" x2="${p[1].split(',')[0]}" y2="${p[1].split(',')[1]}" stroke="url(#sg)" stroke-width="${w}" opacity="${op}"/>`;
      }
      // INNER ring — 72 teeth, offset by half a step, rotates counter-clockwise
      const TEETH_IN = 72;
      for (let i = 0; i < TEETH_IN; i++){
        const a = i * 360 / TEETH_IN + (180 / TEETH_IN);   // interleave between outer teeth
        const major = (i % 6 === 0);
        const ro = 56;                       // inner band
        const ri = 38;
        const op = major ? 0.9 : 0.6;
        const w  = major ? 1.1 : 0.75;
        const p = ray(cx, cy, ri, ro, a).split(' ');
        rays2 += `<line x1="${p[0].split(',')[0]}" y1="${p[0].split(',')[1]}" x2="${p[1].split(',')[0]}" y2="${p[1].split(',')[1]}" stroke="url(#sg)" stroke-width="${w}" opacity="${op}"/>`;
      }
    }
    const burstScale = withRays ? '' : 'scale(0.86)';
    return `
    <svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ATHAR seal">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#E6C998"/>
          <stop offset="0.5" stop-color="#D4AF7A"/>
          <stop offset="1" stop-color="#B8945E"/>
        </linearGradient>
      </defs>
      <g transform="${burstScale}" transform-origin="120 150">
        ${withRays ? `<g class="seal-rays">${rays}</g><g class="seal-rays-2">${rays2}</g>` : ''}
        <!-- vertical spear -->
        <line x1="120" y1="52" x2="120" y2="248" stroke="url(#sg)" stroke-width="2.2"/>
        <!-- top finial -->
        <path d="M120 8 L127.5 32 L120 54 L112.5 32 Z" fill="url(#sg)"/>
        <!-- bottom finial -->
        <path d="M120 292 L127.5 268 L120 246 L112.5 268 Z" fill="url(#sg)"/>
        <!-- central eclipse ring (rotates clockwise) -->
        <g class="seal-core">
          <circle cx="120" cy="150" r="31" fill="none" stroke="url(#sg)" stroke-width="8.5"/>
          <circle cx="120" cy="150" r="31" fill="none" stroke="#0F1113" stroke-width="2.2" opacity="0.5"/>
          <!-- crescent notches -->
          <rect x="116" y="115" width="8" height="5" fill="#0F1113"/>
          <rect x="116" y="180" width="8" height="5" fill="#0F1113"/>
        </g>
        <!-- side dots -->
        <circle cx="24" cy="150" r="3.6" fill="url(#sg)"/>
        <circle cx="216" cy="150" r="3.6" fill="url(#sg)"/>
        <circle cx="40" cy="150" r="2" fill="url(#sg)" opacity="0.7"/>
        <circle cx="200" cy="150" r="2" fill="url(#sg)" opacity="0.7"/>
      </g>
    </svg>`;
  }

  /* ---- small process icons --------------------------------- */
  const icons = {
    listen: `<svg viewBox="0 0 48 48" fill="none" stroke="#D4AF7A" stroke-width="1.2"><circle cx="24" cy="24" r="4"/><path d="M24 14a10 10 0 0 1 0 20" opacity=".8"/><path d="M24 8a16 16 0 0 1 0 32" opacity=".5"/><path d="M24 14a10 10 0 0 0 0 20" opacity=".8"/><path d="M24 8a16 16 0 0 0 0 32" opacity=".5"/></svg>`,
    distill: `<svg viewBox="0 0 48 48" fill="none" stroke="#D4AF7A" stroke-width="1.2"><path d="M14 10h20l-7 12v9l-6 4v-13z"/><circle cx="24" cy="40" r="2.4" fill="#D4AF7A" stroke="none"/></svg>`,
    craft: `<svg viewBox="0 0 48 48" fill="none" stroke="#D4AF7A" stroke-width="1.2"><path d="M24 6l3 15 15 3-15 3-3 15-3-15-15-3 15-3z"/><circle cx="24" cy="24" r="3"/></svg>`,
    endure: `<svg viewBox="0 0 48 48" fill="none" stroke="#D4AF7A" stroke-width="1.2"><circle cx="24" cy="24" r="9"/><path d="M24 6v9M24 33v9" opacity=".8"/><circle cx="9" cy="24" r="1.8" fill="#D4AF7A" stroke="none"/><circle cx="39" cy="24" r="1.8" fill="#D4AF7A" stroke="none"/></svg>`
  };

  /* ---- inject marks ---------------------------------------- */
  document.querySelectorAll('[data-seal="full"]').forEach(el => el.innerHTML = buildSeal(true));
  document.querySelectorAll('[data-seal="mono"]').forEach(el => el.innerHTML = buildSeal(false));
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icons[el.getAttribute('data-icon')] || ''; });

  /* ---- nav scroll + mobile menu ---------------------------- */
  const nav = document.querySelector('.nav');
  const links = document.querySelector('.nav-links');
  const toggle = document.querySelector('.nav-toggle');
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive:true }); onScroll();
  toggle && toggle.addEventListener('click', () => {
    links.classList.toggle('open'); nav.classList.toggle('open');
  });
  links && links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); nav.classList.remove('open');
  }));

  /* ---- reveal on scroll ------------------------------------ */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---- impact counters ------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = parseFloat(el.getAttribute('data-count'));
      const dur = 1600, t0 = performance.now();
      function tick(now){
        const p = Math.min((now - t0)/dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold:0.5 });
  counters.forEach(el => cio.observe(el));

  /* ---- hero parallax (subtle) ------------------------------ */
  const seal = document.querySelector('.hero-seal');
  const glow = document.querySelector('.hero-glow');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches){
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (seal) seal.style.transform = `translateY(${y*0.12}px)`;
      if (glow) glow.style.transform = `translateY(calc(-50% + ${y*0.06}px))`;
    }, { passive:true });
  }

  /* ---- contact form ---------------------------------------- */
  const form = document.querySelector('.form');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.querySelector('.txt').textContent = 'Message Sent';
    btn.style.borderColor = 'var(--gold)';
    form.querySelectorAll('input,textarea').forEach(f => f.value = '');
    setTimeout(() => { btn.querySelector('.txt').textContent = 'Send Enquiry'; }, 3200);
  });

  /* ---- lightbox (click work image → full natural size) ----- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = lb && lb.querySelector('.lightbox-close');
  function openLightbox(src){
    if (!lb) return;
    lbImg.src = src;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    if (!lb) return;
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.removeAttribute('src'); }, 300);
  }
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => openLightbox(el.getAttribute('data-lightbox')));
  });
  lb && lb.addEventListener('click', closeLightbox);
  lbClose && lbClose.addEventListener('click', closeLightbox);
  // don't close when scrolling/clicking the image itself
  lbImg && lbImg.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* expose helpers so the CMS layer can reuse the exact seal + lightbox on added cards */
  window.ATHAR = { buildSeal: buildSeal, openLightbox: openLightbox };

})();
