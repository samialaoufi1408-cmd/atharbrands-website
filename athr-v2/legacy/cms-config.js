/* ATHAR CMS — shared config (Supabase public keys + editable-text map).
   The anon key is PUBLIC by design; Row-Level-Security protects writes.
   NEVER put the service_role key here. */
window.CMS_CONFIG = {
  SUPABASE_URL: "https://wsoomnkzaoglnqjagosc.supabase.co",
  SUPABASE_ANON_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb29tbmt6YW9nbG5xamFnb3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODUxMDIsImV4cCI6MjA5NTk2MTEwMn0.J1XJQ8NGvZjnUMX2RZs2lVYHYrQCqUI38i6e39UYsdw",
  STORAGE_BUCKET: "work-images",

  /* Every editable text block. innerHTML is replaced.
     k = English key (site_content), k+"__ar" = Arabic key. s = selector.
     ar = default Arabic shown in AR mode (editable in the panel → key+"__ar").
     <em>..</em> = gold emphasis, <br/> = line break. */
  texts: [
    { g: "Hero", k: "hero_eyebrow", s: ".hero-copy .eyebrow", l: "Eyebrow", ar: "ختم الأثر · The Seal of Impact" },
    { g: "Hero", k: "hero_title_1", s: ".hero-title .l1", l: "Title line 1", ar: "إرثٌ" },
    { g: "Hero", k: "hero_title_2", s: ".hero-title .l2", l: "Title line 2", ar: "في كل" },
    { g: "Hero", k: "hero_title_3", s: ".hero-title .l3", l: "Title line 3 (gold)", ar: "أثر" },
    { g: "Hero", k: "hero_ar", s: ".hero-ar", l: "Accent line", ar: "Legacy in Every Impact" },
    { g: "Hero", k: "hero_sub", s: ".hero-sub", l: "Sub paragraph", m: 1, ar: "أثر بيت خبرة لبناء العلامات التجارية، مكرّسٌ للقيمة التي نصنعها والإرث الذي يبقى — هوياتٌ تُصاغ لتُذكر لأجيال." },
    { g: "Hero", k: "hero_btn", s: ".hero-actions .btn .txt", l: "Button label", ar: "اكتشف المزيد" },

    { g: "Statement", k: "stmt_quote", s: ".statement-quote", l: "Quote", m: 1, ar: "أثرٌ هو الانطباع الذي نتركه — <em>القيمة</em> التي نصنعها، و<em>الإرث</em> الذي يدوم." },
    { g: "Statement", k: "stmt_ar", s: ".statement-ar", l: "Second line", m: 1 },

    { g: "Philosophy", k: "phil_eyebrow", s: ".about-copy .eyebrow", l: "Eyebrow", ar: "فلسفتنا · Our Philosophy" },
    { g: "Philosophy", k: "phil_title", s: ".about-copy h2", l: "Title", m: 1, ar: "استوديو مبنيٌّ حول <em>الأثر الذي يبقى</em>." },
    { g: "Philosophy", k: "phil_p1", s: ".about-copy .lede", l: "Paragraph 1", m: 1, ar: "نؤمن أن العلامة ليست شعارًا، بل إرثًا. كل شكلٍ نرسمه، وكل كلمةٍ نختارها، نقيسها بسؤالٍ واحد — هل سيبقى لها معنى بعد جيلٍ من الآن؟" },
    { g: "Philosophy", k: "phil_p2", s: ".about-copy p:nth-of-type(2)", l: "Paragraph 2", m: 1, ar: "نعمل بالذهبي الشامبين والعاجي والفحمي، ونمارس ضبط النفس انضباطًا. ما نحذفه لا يقلّ أهميةً عمّا نُبقيه. والنتيجة هويةٌ بثقل الختم المطبوع في الشمع." },
    { g: "Philosophy", k: "phil_sign", s: ".about-sign span:last-child", l: "Signature (Arabic)" },

    { g: "Services", k: "svc_eyebrow", s: ".services .eyebrow", l: "Eyebrow", ar: "خدماتنا · What We Do" },
    { g: "Services", k: "svc_title", s: ".services .sect-head .title", l: "Title", m: 1, ar: "حرفة الهوية <em>التي تدوم</em>" },
    { g: "Services", k: "svc_meta", s: ".services .meta", l: "Meta", m: 1, ar: "خمسة تخصّصات، ومعيارٌ واحد — عملٌ يُصنع ليتجاوز اللحظة التي صُنع لأجلها." },
    { g: "Services", k: "svc1_name", s: ".svc-list .svc-row:nth-of-type(1) .svc-name", l: "1 · Name", ar: "الهوية البصرية والأنظمة" },
    { g: "Services", k: "svc1_ar", s: ".svc-list .svc-row:nth-of-type(1) .svc-ar", l: "1 · Arabic", ar: "Brand Identity & Systems" },
    { g: "Services", k: "svc1_desc", s: ".svc-list .svc-row:nth-of-type(1) .svc-desc", l: "1 · Description", m: 1, ar: "علاماتٌ وألوانٌ وأنظمة طباعةٍ، والأختام التي تربطها في صوتٍ واحد." },
    { g: "Services", k: "svc2_name", s: ".svc-list .svc-row:nth-of-type(2) .svc-name", l: "2 · Name", ar: "الاستراتيجية والتموضع" },
    { g: "Services", k: "svc2_ar", s: ".svc-list .svc-row:nth-of-type(2) .svc-ar", l: "2 · Arabic", ar: "Strategy & Positioning" },
    { g: "Services", k: "svc2_desc", s: ".svc-list .svc-row:nth-of-type(2) .svc-desc", l: "2 · Description", m: 1, ar: "إيجاد الحقيقة التي تستعدّ العلامة للدفاع عنها لعقود — ثم صقلها." },
    { g: "Services", k: "svc3_name", s: ".svc-list .svc-row:nth-of-type(3) .svc-name", l: "3 · Name", ar: "التسمية والهوية اللفظية" },
    { g: "Services", k: "svc3_ar", s: ".svc-list .svc-row:nth-of-type(3) .svc-ar", l: "3 · Arabic", ar: "Naming & Verbal Identity" },
    { g: "Services", k: "svc3_desc", s: ".svc-list .svc-row:nth-of-type(3) .svc-desc", l: "3 · Description", m: 1, ar: "أسماءٌ وعباراتٌ ونبرة صوتٍ تُقرأ بالعربية والإنجليزية سواء." },
    { g: "Services", k: "svc4_name", s: ".svc-list .svc-row:nth-of-type(4) .svc-name", l: "4 · Name", ar: "التجربة والمكان" },
    { g: "Services", k: "svc4_ar", s: ".svc-list .svc-row:nth-of-type(4) .svc-ar", l: "4 · Arabic", ar: "Spatial & Experience" },
    { g: "Services", k: "svc4_desc", s: ".svc-list .svc-row:nth-of-type(4) .svc-desc", l: "4 · Description", m: 1, ar: "واجهاتٌ ولافتاتٌ وتغليف، حيث تصبح العلامة شيئًا تلمسه." },
    { g: "Services", k: "svc5_name", s: ".svc-list .svc-row:nth-of-type(5) .svc-name", l: "5 · Name", ar: "رعاية الإرث" },
    { g: "Services", k: "svc5_ar", s: ".svc-list .svc-row:nth-of-type(5) .svc-ar", l: "5 · Arabic", ar: "Legacy Stewardship" },
    { g: "Services", k: "svc5_desc", s: ".svc-list .svc-row:nth-of-type(5) .svc-desc", l: "5 · Description", m: 1, ar: "حراسةٌ عبر الزمن — أدلّةٌ وحوكمةٌ وانضباطٌ يُبقيها نقية." },

    { g: "Work", k: "work_eyebrow", s: ".work .eyebrow", l: "Eyebrow", ar: "أعمال تصورية · Conceptual Work" },
    { g: "Work", k: "work_title", s: ".work .sect-head .title", l: "Title", m: 1, ar: "علاماتٌ <em>تتجاوز</em> الأسواق" },
    { g: "Work", k: "work_meta", s: ".work .meta", l: "Meta", m: 1, ar: "أعمالٌ مختارة — مشاريع أقل، كلٌّ منها محمولٌ إلى الختم." },

    { g: "Process", k: "proc_eyebrow", s: ".process .eyebrow", l: "Eyebrow", ar: "منهجنا · How We Work" },
    { g: "Process", k: "proc_title", s: ".process .sect-head .title", l: "Title", m: 1, ar: "من الإصغاء إلى <em>الإرث</em>" },
    { g: "Process", k: "proc_meta", s: ".process .meta", l: "Meta", m: 1, ar: "تسلسلٌ متأنٍّ. لا خطوة تُستعجل، وكل خطوةٍ تُعاش." },
    { g: "Process", k: "proc1_h", s: ".proc-grid .proc-step:nth-of-type(1) h3", l: "1 · Title", ar: "الإصغاء" },
    { g: "Process", k: "proc1_ar", s: ".proc-grid .proc-step:nth-of-type(1) .ar", l: "1 · Arabic", ar: "Listen" },
    { g: "Process", k: "proc1_p", s: ".proc-grid .proc-step:nth-of-type(1) p", l: "1 · Text", m: 1, ar: "نبدأ بالصمت — نستوعب تاريخ العلامة وطموحها وحقائقها غير المنطوقة." },
    { g: "Process", k: "proc2_h", s: ".proc-grid .proc-step:nth-of-type(2) h3", l: "2 · Title", ar: "التقطير" },
    { g: "Process", k: "proc2_ar", s: ".proc-grid .proc-step:nth-of-type(2) .ar", l: "2 · Arabic", ar: "Distill" },
    { g: "Process", k: "proc2_p", s: ".proc-grid .proc-step:nth-of-type(2) p", l: "2 · Text", m: 1, ar: "يُختزل كل شيءٍ إلى فكرةٍ واحدةٍ تستحقّ الدفاع عنها — الجوهر تحت الضجيج." },
    { g: "Process", k: "proc3_h", s: ".proc-grid .proc-step:nth-of-type(3) h3", l: "3 · Title", ar: "الصناعة" },
    { g: "Process", k: "proc3_ar", s: ".proc-grid .proc-step:nth-of-type(3) .ar", l: "3 · Arabic", ar: "Craft" },
    { g: "Process", k: "proc3_p", s: ".proc-grid .proc-step:nth-of-type(3) p", l: "3 · Text", m: 1, ar: "يُرسم الشكل والكلمة والخامة باليد حتى تبدو العلامة حتمية." },
    { g: "Process", k: "proc4_h", s: ".proc-grid .proc-step:nth-of-type(4) h3", l: "4 · Title", ar: "البقاء" },
    { g: "Process", k: "proc4_ar", s: ".proc-grid .proc-step:nth-of-type(4) .ar", l: "4 · Arabic", ar: "Endure" },
    { g: "Process", k: "proc4_p", s: ".proc-grid .proc-step:nth-of-type(4) p", l: "4 · Text", m: 1, ar: "نُسلّم نظامًا يكبر بكرامةٍ ويتجاوز كل موضةٍ عابرة." },

    { g: "Impact", k: "imp1_lbl", s: ".impact-grid .impact-item:nth-of-type(1) .lbl", l: "1 · Label", ar: "عامًا من الإتقان" },
    { g: "Impact", k: "imp1_ar", s: ".impact-grid .impact-item:nth-of-type(1) .ar", l: "1 · Arabic", ar: "Years of Practice" },
    { g: "Impact", k: "imp2_lbl", s: ".impact-grid .impact-item:nth-of-type(2) .lbl", l: "2 · Label", ar: "إرثٌ تمّ تشكيله" },
    { g: "Impact", k: "imp2_ar", s: ".impact-grid .impact-item:nth-of-type(2) .ar", l: "2 · Arabic", ar: "Legacies Shaped" },
    { g: "Impact", k: "imp3_lbl", s: ".impact-grid .impact-item:nth-of-type(3) .lbl", l: "3 · Label", ar: "دولةً حول العالم" },
    { g: "Impact", k: "imp3_ar", s: ".impact-grid .impact-item:nth-of-type(3) .ar", l: "3 · Arabic", ar: "Countries Reached" },

    { g: "Journal", k: "jrn_eyebrow", s: ".journal .eyebrow", l: "Eyebrow", ar: "المجلة · The Journal" },
    { g: "Journal", k: "jrn_title", s: ".journal .sect-head .title", l: "Title", m: 1, ar: "ملاحظاتٌ عن <em>الديمومة</em>" },

    { g: "Contact", k: "con_eyebrow", s: ".contact .eyebrow", l: "Eyebrow", ar: "لنبدأ أثرًا · Begin a Legacy" },
    { g: "Contact", k: "con_title", s: ".contact-lead h2", l: "Title", m: 1, ar: "لنصنع ما <em>يبقى</em>." },
    { g: "Contact", k: "con_ar", s: ".contact-ar", l: "Accent line" },
    { g: "Contact", k: "con_lede", s: ".contact-lead .lede", l: "Paragraph", m: 1, ar: "حدّثنا عن الإرث الذي تنوي تركه. نقبل عددًا محدودًا من الشراكات كل عام." },
    { g: "Contact", k: "con_studio", s: ".contact-detail .cd-item:nth-of-type(1) .v", l: "Studio", ar: "الرياض · دبي" },
    { g: "Contact", k: "con_email", s: ".contact-detail .cd-item:nth-of-type(2) .v", l: "Email" },
    { g: "Contact", k: "con_phone", s: ".contact-detail .cd-item:nth-of-type(3) .v", l: "Telephone" },

    { g: "Footer", k: "foot_desc", s: ".footer-brand p", l: "Description", m: 1, ar: "ختم الأثر — بيت خبرةٍ لبناء العلامات، يصنع القيمة التي نخلقها والإرث الذي يدوم." },
    { g: "Footer", k: "foot_copy", s: ".footer-bottom small:first-child", l: "Copyright", ar: "© 2026 استوديو أثر. جميع الحقوق محفوظة." },
    { g: "Footer", k: "foot_ar", s: ".footer-bottom .ar", l: "Arabic line" },
    { g: "Footer", k: "foot_en", s: ".footer-bottom small:last-child", l: "Tagline (EN)" },
    { g: "Footer", k: "foot_permit", s: ".freelance-permit", l: "شهادة عمل حر · Legal line", m: 1 },
  ],
};
