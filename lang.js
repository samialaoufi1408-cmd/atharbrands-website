/* ATHAR — Arabic / English language switcher.
   Adds a nav toggle; flips the page EN <-> AR (RTL + Arabic font).
   Arabic per text = the panel override (site_content key + "__ar") if set,
   else the default in CMS_CONFIG.texts[].ar. Choice saved in localStorage. */
(function () {
  "use strict";
  var cfg = window.CMS_CONFIG || { texts: [] };

  /* extras not managed by the panel (nav, inline links, footer headings, label) */
  var EXTRAS = [
    { s: '.nav-links a[href="#philosophy"]', ar: "فلسفتنا" },
    { s: '.nav-links a[href="#services"]', ar: "خدماتنا" },
    { s: '.nav-links a[href="#work"]', ar: "الأعمال" },
    { s: '.nav-links a[href="#journal"]', ar: "المجلة" },
    { s: '.nav-links a[href="#contact"]:not(.nav-cta)', ar: "تواصل" },
    { s: ".nav-cta .txt", ar: "تواصل معنا" },
    { s: ".hero-actions .link-underline", ar: 'فلسفتنا <span class="arr">←</span>' },
    { s: ".journal .link-underline", ar: 'كل المقالات <span class="arr">←</span>' },
    { s: ".foot-col:nth-of-type(2) h4", ar: "تصفّح" },
    { s: ".foot-col:nth-of-type(3) h4", ar: "تواصل" },
    { s: ".form .field:nth-of-type(1) label", ar: "الاسم · Name" },
  ];

  function entries() {
    var list = EXTRAS.slice();
    (cfg.texts || []).forEach(function (t) {
      if (t.ar) list.push({ s: t.s, k: t.k, def: t.ar });
    });
    return list;
  }
  function arFor(e) {
    var db = window.__ATHAR_CONTENT;
    if (e.k && db) {
      var v = db[e.k + "__ar"];
      if (v != null && v !== "") return v;
    }
    return e.def != null ? e.def : e.ar;
  }

  var orig = {};
  function q(s) { try { return document.querySelector(s); } catch (e) { return null; } }
  function applyAR() {
    entries().forEach(function (e) {
      var el = q(e.s);
      if (!el) return;
      if (!(e.s in orig)) orig[e.s] = el.innerHTML;
      var t = arFor(e);
      if (t != null) el.innerHTML = t;
    });
  }
  function applyEN() {
    entries().forEach(function (e) {
      if (!(e.s in orig)) return;
      var el = q(e.s);
      if (el) el.innerHTML = orig[e.s];
    });
  }

  var current = "en";
  function setLang(lang) {
    current = lang === "ar" ? "ar" : "en";
    var html = document.documentElement;
    if (current === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      applyAR();
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      applyEN();
    }
    try { localStorage.setItem("athar_lang", current); } catch (e) {}
    if (btn) btn.textContent = current === "ar" ? "EN" : "ع";
  }

  var css = document.createElement("style");
  css.textContent =
    "html[dir='rtl'] body{font-family:'Tajawal',sans-serif}" +
    "html[dir='rtl'] *{letter-spacing:normal !important}" +
    "html[dir='rtl'] .nav-links a,html[dir='rtl'] .eyebrow,html[dir='rtl'] .btn,html[dir='rtl'] .nav-cta,html[dir='rtl'] label,html[dir='rtl'] .svc-num,html[dir='rtl'] .foot-col h4,html[dir='rtl'] .work-cat{font-family:'Tajawal',sans-serif}" +
    "html[dir='rtl'] h1,html[dir='rtl'] h2,html[dir='rtl'] h3,html[dir='rtl'] .hero-title,html[dir='rtl'] .hero-title span,html[dir='rtl'] .statement-quote,html[dir='rtl'] .svc-name,html[dir='rtl'] .work-name,html[dir='rtl'] .jrn-body h3,html[dir='rtl'] .proc-step h3,html[dir='rtl'] .impact-item .num,html[dir='rtl'] .svc-num{font-family:'Tajawal',sans-serif !important}" +
    "html[dir='rtl'] .hero-sub,html[dir='rtl'] .lede,html[dir='rtl'] .svc-desc,html[dir='rtl'] .proc-step p,html[dir='rtl'] .meta{font-family:'Tajawal',sans-serif}" +
    /* ---- mobile (<=720) layout fixes — apply in both languages ---- */
    "@media (max-width:720px){" +
      /* hero: fit content height, no empty bottom space */
      ".hero{min-height:auto !important;padding-top:6rem !important;padding-bottom:3.5rem !important;display:block !important}" +
      ".hero-grid{grid-template-columns:1fr !important;gap:1.2rem !important;padding-inline:1.4rem !important}" +
      ".hero-copy{position:relative;z-index:3}" +
      ".hero-title{font-size:clamp(2.6rem,12vw,4rem) !important;line-height:1.05 !important;margin-top:.4rem}" +
      ".hero-ar{margin-top:.9rem !important;font-size:1.1rem !important}" +
      ".hero-sub{font-size:.98rem !important;line-height:1.7 !important;margin-top:1.1rem !important}" +
      ".hero-actions{flex-wrap:wrap;gap:.9rem !important;margin-top:1.6rem !important}" +
      ".hero-actions .btn{font-size:.72rem !important;padding:.85rem 1.4rem !important;letter-spacing:.22em !important}" +
      ".hero-actions .link-underline{font-size:.72rem !important;letter-spacing:.22em !important}" +
      /* seal: subtle full-bleed background watermark */
      ".hero-seal{opacity:.10 !important}" +
      ".hero-seal svg{width:90vw !important;max-width:420px}" +
      /* hide scroll cue on mobile (cluttered) + horizon ridge keeps */
      ".scroll-cue{display:none !important}" +
      /* statement: tighter top/bottom and no negative pull into hero */
      ".statement{padding-block:3.5rem !important}" +
      ".statement-quote{font-size:1.5rem !important;line-height:1.45 !important}" +
      ".statement-ar{font-size:.95rem !important;margin-top:1rem !important}" +
      /* nav mobile-menu: cleaner spacing */
      ".nav-links{gap:1.8rem !important}" +
      ".lang-btn{margin-top:1rem}" +
    "}" +
    /* Arabic-only mobile tweaks: stack three title words inline */
    "@media (max-width:720px){" +
      "html[dir='rtl'] .hero-title{font-size:clamp(2.4rem,10vw,3.4rem) !important;line-height:1.15 !important;text-align:right}" +
      "html[dir='rtl'] .hero-title br{display:none}" +
      "html[dir='rtl'] .hero-title .l1,html[dir='rtl'] .hero-title .l2,html[dir='rtl'] .hero-title .l3{display:inline;margin:0 .12em}" +
      "html[dir='rtl'] .hero-ar{font-size:1.05rem !important;letter-spacing:.04em}" +
      "html[dir='rtl'] .hero-sub{font-size:.95rem !important;line-height:1.85 !important}" +
    "}" +
    ".lang-btn{background:none;border:1px solid rgba(212,175,122,.5);color:#D4AF7A;font-family:'Jost',sans-serif;font-size:.72rem;letter-spacing:.12em;width:34px;height:30px;cursor:pointer;padding:0;transition:.25s;flex:none}" +
    ".lang-btn:hover{background:#D4AF7A;color:#0F1113}";
  document.head.appendChild(css);

  var btn = document.createElement("button");
  btn.className = "lang-btn";
  btn.setAttribute("aria-label", "Switch language / تبديل اللغة");
  btn.addEventListener("click", function () { setLang(current === "ar" ? "en" : "ar"); });
  var navLinks = document.querySelector(".nav-links");
  if (navLinks) navLinks.appendChild(btn);

  var saved = "en";
  try { saved = localStorage.getItem("athar_lang") || "en"; } catch (e) {}
  setLang(saved);

  /* re-assert after the CMS loads (picks up custom Arabic from window.__ATHAR_CONTENT) */
  document.addEventListener("athar:contentloaded", function () {
    if (current === "ar") applyAR();
  });
})();
