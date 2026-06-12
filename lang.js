/* ATHAR — Arabic / English language switcher.
   Adds a toggle to the nav; flips the whole page EN <-> AR (RTL + Arabic font).
   English = the site's authored content; Arabic = the map below. Choice saved
   in localStorage. Re-asserts after the CMS loads so overrides don't clash. */
(function () {
  "use strict";

  /* selector -> Arabic innerHTML. (EN is whatever the page/CMS already shows.) */
  var AR = [
    /* nav */
    { s: '.nav-links a[href="#philosophy"]', ar: "فلسفتنا" },
    { s: '.nav-links a[href="#services"]', ar: "خدماتنا" },
    { s: '.nav-links a[href="#work"]', ar: "الأعمال" },
    { s: '.nav-links a[href="#journal"]', ar: "المجلة" },
    { s: '.nav-links a[href="#contact"]:not(.nav-cta)', ar: "تواصل" },
    { s: ".nav-cta .txt", ar: "تواصل معنا" },

    /* hero */
    { s: ".hero-copy .eyebrow", ar: "ختم الأثر · The Seal of Impact" },
    { s: ".hero-title .l1", ar: "إرثٌ" },
    { s: ".hero-title .l2", ar: "في كل" },
    { s: ".hero-title .l3", ar: "أثر" },
    { s: ".hero-ar", ar: "Legacy in Every Impact" },
    { s: ".hero-sub", ar: "أثر بيت خبرة لبناء العلامات التجارية، مكرّسٌ للقيمة التي نصنعها والإرث الذي يبقى — هوياتٌ تُصاغ لتُذكر لأجيال." },
    { s: ".hero-actions .btn .txt", ar: "اكتشف المزيد" },
    { s: ".hero-actions .link-underline", ar: 'فلسفتنا <span class="arr">←</span>' },

    /* statement */
    { s: ".statement-quote", ar: "أثرٌ هو الانطباع الذي نتركه — <em>القيمة</em> التي نصنعها، و<em>الإرث</em> الذي يدوم." },

    /* philosophy */
    { s: ".about-copy .eyebrow", ar: "فلسفتنا · Our Philosophy" },
    { s: ".about-copy h2", ar: "استوديو مبنيٌّ حول <em>الأثر الذي يبقى</em>." },
    { s: ".about-copy .lede", ar: "نؤمن أن العلامة ليست شعارًا، بل إرثًا. كل شكلٍ نرسمه، وكل كلمةٍ نختارها، نقيسها بسؤالٍ واحد — هل سيبقى لها معنى بعد جيلٍ من الآن؟" },
    { s: ".about-copy p:nth-of-type(2)", ar: "نعمل بالذهبي الشامبين والعاجي والفحمي، ونمارس ضبط النفس انضباطًا. ما نحذفه لا يقلّ أهميةً عمّا نُبقيه. والنتيجة هويةٌ بثقل الختم المطبوع في الشمع." },

    /* services */
    { s: ".services .eyebrow", ar: "خدماتنا · What We Do" },
    { s: ".services .sect-head .title", ar: "حرفة الهوية <em>التي تدوم</em>" },
    { s: ".services .meta", ar: "خمسة تخصّصات، ومعيارٌ واحد — عملٌ يُصنع ليتجاوز اللحظة التي صُنع لأجلها." },
    { s: ".svc-list .svc-row:nth-of-type(1) .svc-name", ar: "الهوية البصرية والأنظمة" },
    { s: ".svc-list .svc-row:nth-of-type(1) .svc-ar", ar: "Brand Identity & Systems" },
    { s: ".svc-list .svc-row:nth-of-type(1) .svc-desc", ar: "علاماتٌ وألوانٌ وأنظمة طباعةٍ، والأختام التي تربطها في صوتٍ واحد." },
    { s: ".svc-list .svc-row:nth-of-type(2) .svc-name", ar: "الاستراتيجية والتموضع" },
    { s: ".svc-list .svc-row:nth-of-type(2) .svc-ar", ar: "Strategy & Positioning" },
    { s: ".svc-list .svc-row:nth-of-type(2) .svc-desc", ar: "إيجاد الحقيقة التي تستعدّ العلامة للدفاع عنها لعقود — ثم صقلها." },
    { s: ".svc-list .svc-row:nth-of-type(3) .svc-name", ar: "التسمية والهوية اللفظية" },
    { s: ".svc-list .svc-row:nth-of-type(3) .svc-ar", ar: "Naming & Verbal Identity" },
    { s: ".svc-list .svc-row:nth-of-type(3) .svc-desc", ar: "أسماءٌ وعباراتٌ ونبرة صوتٍ تُقرأ بالعربية والإنجليزية سواء." },
    { s: ".svc-list .svc-row:nth-of-type(4) .svc-name", ar: "التجربة والمكان" },
    { s: ".svc-list .svc-row:nth-of-type(4) .svc-ar", ar: "Spatial & Experience" },
    { s: ".svc-list .svc-row:nth-of-type(4) .svc-desc", ar: "واجهاتٌ ولافتاتٌ وتغليف، حيث تصبح العلامة شيئًا تلمسه." },
    { s: ".svc-list .svc-row:nth-of-type(5) .svc-name", ar: "رعاية الإرث" },
    { s: ".svc-list .svc-row:nth-of-type(5) .svc-ar", ar: "Legacy Stewardship" },
    { s: ".svc-list .svc-row:nth-of-type(5) .svc-desc", ar: "حراسةٌ عبر الزمن — أدلّةٌ وحوكمةٌ وانضباطٌ يُبقيها نقية." },

    /* work */
    { s: ".work .eyebrow", ar: "أعمال تصورية · Conceptual Work" },
    { s: ".work .sect-head .title", ar: "علاماتٌ <em>تتجاوز</em> الأسواق" },
    { s: ".work .meta", ar: "أعمالٌ مختارة — مشاريع أقل، كلٌّ منها محمولٌ إلى الختم." },

    /* process */
    { s: ".process .eyebrow", ar: "منهجنا · How We Work" },
    { s: ".process .sect-head .title", ar: "من الإصغاء إلى <em>الإرث</em>" },
    { s: ".process .meta", ar: "تسلسلٌ متأنٍّ. لا خطوة تُستعجل، وكل خطوةٍ تُعاش." },
    { s: ".proc-grid .proc-step:nth-of-type(1) h3", ar: "الإصغاء" },
    { s: ".proc-grid .proc-step:nth-of-type(1) .ar", ar: "Listen" },
    { s: ".proc-grid .proc-step:nth-of-type(1) p", ar: "نبدأ بالصمت — نستوعب تاريخ العلامة وطموحها وحقائقها غير المنطوقة." },
    { s: ".proc-grid .proc-step:nth-of-type(2) h3", ar: "التقطير" },
    { s: ".proc-grid .proc-step:nth-of-type(2) .ar", ar: "Distill" },
    { s: ".proc-grid .proc-step:nth-of-type(2) p", ar: "يُختزل كل شيءٍ إلى فكرةٍ واحدةٍ تستحقّ الدفاع عنها — الجوهر تحت الضجيج." },
    { s: ".proc-grid .proc-step:nth-of-type(3) h3", ar: "الصناعة" },
    { s: ".proc-grid .proc-step:nth-of-type(3) .ar", ar: "Craft" },
    { s: ".proc-grid .proc-step:nth-of-type(3) p", ar: "يُرسم الشكل والكلمة والخامة باليد حتى تبدو العلامة حتمية." },
    { s: ".proc-grid .proc-step:nth-of-type(4) h3", ar: "البقاء" },
    { s: ".proc-grid .proc-step:nth-of-type(4) .ar", ar: "Endure" },
    { s: ".proc-grid .proc-step:nth-of-type(4) p", ar: "نُسلّم نظامًا يكبر بكرامةٍ ويتجاوز كل موضةٍ عابرة." },

    /* impact */
    { s: ".impact-grid .impact-item:nth-of-type(1) .lbl", ar: "عامًا من الإتقان" },
    { s: ".impact-grid .impact-item:nth-of-type(1) .ar", ar: "Years of Practice" },
    { s: ".impact-grid .impact-item:nth-of-type(2) .lbl", ar: "إرثٌ تمّ تشكيله" },
    { s: ".impact-grid .impact-item:nth-of-type(2) .ar", ar: "Legacies Shaped" },
    { s: ".impact-grid .impact-item:nth-of-type(3) .lbl", ar: "دولةً حول العالم" },
    { s: ".impact-grid .impact-item:nth-of-type(3) .ar", ar: "Countries Reached" },

    /* journal */
    { s: ".journal .eyebrow", ar: "المجلة · The Journal" },
    { s: ".journal .sect-head .title", ar: "ملاحظاتٌ عن <em>الديمومة</em>" },
    { s: ".journal .link-underline", ar: 'كل المقالات <span class="arr">←</span>' },

    /* contact */
    { s: ".contact .eyebrow", ar: "لنبدأ أثرًا · Begin a Legacy" },
    { s: ".contact-lead h2", ar: "لنصنع ما <em>يبقى</em>." },
    { s: ".contact-lead .lede", ar: "حدّثنا عن الإرث الذي تنوي تركه. نقبل عددًا محدودًا من الشراكات كل عام." },
    { s: ".contact-detail .cd-item:nth-of-type(1) .v", ar: "الرياض · دبي" },
    { s: ".form .field:nth-of-type(1) label", ar: "الاسم · Name" },

    /* footer */
    { s: ".footer-brand p", ar: "ختم الأثر — بيت خبرةٍ لبناء العلامات، يصنع القيمة التي نخلقها والإرث الذي يدوم." },
    { s: ".foot-col:nth-of-type(2) h4", ar: "تصفّح" },
    { s: ".foot-col:nth-of-type(3) h4", ar: "تواصل" },
    { s: ".footer-bottom small:first-child", ar: "© 2026 استوديو أثر. جميع الحقوق محفوظة." },
  ];

  var orig = {};
  function q(s) { try { return document.querySelector(s); } catch (e) { return null; } }

  function applyAR() {
    AR.forEach(function (t) {
      var el = q(t.s);
      if (!el) return;
      if (!(t.s in orig)) orig[t.s] = el.innerHTML;
      el.innerHTML = t.ar;
    });
  }
  function applyEN() {
    AR.forEach(function (t) {
      if (!(t.s in orig)) return;
      var el = q(t.s);
      if (el) el.innerHTML = orig[t.s];
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

  /* inject RTL + Arabic-font styles + toggle styling */
  var css = document.createElement("style");
  css.textContent =
    "html[dir='rtl'] body{font-family:'Tajawal',sans-serif}" +
    "html[dir='rtl'] h1,html[dir='rtl'] h2,html[dir='rtl'] h3,html[dir='rtl'] .hero-title,html[dir='rtl'] .hero-title span,html[dir='rtl'] .statement-quote,html[dir='rtl'] .svc-name,html[dir='rtl'] .work-name,html[dir='rtl'] .jrn-body h3,html[dir='rtl'] .proc-step h3,html[dir='rtl'] .impact-item .num,html[dir='rtl'] .svc-num{font-family:'Tajawal',sans-serif !important}" +
    "html[dir='rtl'] .hero-sub,html[dir='rtl'] .lede,html[dir='rtl'] .svc-desc,html[dir='rtl'] .proc-step p,html[dir='rtl'] .meta{font-family:'Tajawal',sans-serif}" +
    ".lang-btn{background:none;border:1px solid rgba(212,175,122,.5);color:#D4AF7A;font-family:'Jost',sans-serif;font-size:.72rem;letter-spacing:.12em;width:34px;height:30px;cursor:pointer;padding:0;transition:.25s;flex:none}" +
    ".lang-btn:hover{background:#D4AF7A;color:#0F1113}";
  document.head.appendChild(css);

  /* toggle button into the nav */
  var btn = document.createElement("button");
  btn.className = "lang-btn";
  btn.setAttribute("aria-label", "Switch language / تبديل اللغة");
  btn.addEventListener("click", function () { setLang(current === "ar" ? "en" : "ar"); });
  var navLinks = document.querySelector(".nav-links");
  if (navLinks) navLinks.appendChild(btn);

  /* initial language */
  var saved = "en";
  try { saved = localStorage.getItem("athar_lang") || "en"; } catch (e) {}
  setLang(saved);

  /* re-assert after the CMS applies its overrides (so they don't clash in AR) */
  document.addEventListener("athar:contentloaded", function () {
    if (current === "ar") applyAR();
  });
})();
