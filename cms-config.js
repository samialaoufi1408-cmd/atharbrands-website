/* ATHAR CMS — shared config (Supabase public keys + editable-text map).
   The anon key is PUBLIC by design; Row-Level-Security protects writes.
   NEVER put the service_role key here. */
window.CMS_CONFIG = {
  SUPABASE_URL: "https://wsoomnkzaoglnqjagosc.supabase.co",
  SUPABASE_ANON_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb29tbmt6YW9nbG5xamFnb3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODUxMDIsImV4cCI6MjA5NTk2MTEwMn0.J1XJQ8NGvZjnUMX2RZs2lVYHYrQCqUI38i6e39UYsdw",
  STORAGE_BUCKET: "work-images",

  /* Every editable text block: key → CSS selector (innerHTML is replaced).
     <em>..</em> = gold emphasis, <br/> = line break — keep those if present. */
  texts: [
    { g: "Hero", k: "hero_eyebrow", s: ".hero-copy .eyebrow", l: "Eyebrow" },
    { g: "Hero", k: "hero_title_1", s: ".hero-title .l1", l: "Title line 1" },
    { g: "Hero", k: "hero_title_2", s: ".hero-title .l2", l: "Title line 2" },
    { g: "Hero", k: "hero_title_3", s: ".hero-title .l3", l: "Title line 3 (gold)" },
    { g: "Hero", k: "hero_ar", s: ".hero-ar", l: "Arabic line" },
    { g: "Hero", k: "hero_sub", s: ".hero-sub", l: "Sub paragraph", m: 1 },
    { g: "Hero", k: "hero_btn", s: ".hero-actions .btn .txt", l: "Button label" },

    { g: "Statement", k: "stmt_quote", s: ".statement-quote", l: "Quote", m: 1 },
    { g: "Statement", k: "stmt_ar", s: ".statement-ar", l: "Arabic line", m: 1 },

    { g: "Philosophy", k: "phil_eyebrow", s: ".about-copy .eyebrow", l: "Eyebrow" },
    { g: "Philosophy", k: "phil_title", s: ".about-copy h2", l: "Title", m: 1 },
    { g: "Philosophy", k: "phil_p1", s: ".about-copy .lede", l: "Paragraph 1", m: 1 },
    { g: "Philosophy", k: "phil_p2", s: ".about-copy p:nth-of-type(2)", l: "Paragraph 2", m: 1 },
    { g: "Philosophy", k: "phil_sign", s: ".about-sign span:last-child", l: "Signature (Arabic)" },

    { g: "Services", k: "svc_eyebrow", s: ".services .eyebrow", l: "Eyebrow" },
    { g: "Services", k: "svc_title", s: ".services .sect-head .title", l: "Title", m: 1 },
    { g: "Services", k: "svc_meta", s: ".services .meta", l: "Meta", m: 1 },
    { g: "Services", k: "svc1_name", s: ".svc-list .svc-row:nth-of-type(1) .svc-name", l: "1 · Name" },
    { g: "Services", k: "svc1_ar", s: ".svc-list .svc-row:nth-of-type(1) .svc-ar", l: "1 · Arabic" },
    { g: "Services", k: "svc1_desc", s: ".svc-list .svc-row:nth-of-type(1) .svc-desc", l: "1 · Description", m: 1 },
    { g: "Services", k: "svc2_name", s: ".svc-list .svc-row:nth-of-type(2) .svc-name", l: "2 · Name" },
    { g: "Services", k: "svc2_ar", s: ".svc-list .svc-row:nth-of-type(2) .svc-ar", l: "2 · Arabic" },
    { g: "Services", k: "svc2_desc", s: ".svc-list .svc-row:nth-of-type(2) .svc-desc", l: "2 · Description", m: 1 },
    { g: "Services", k: "svc3_name", s: ".svc-list .svc-row:nth-of-type(3) .svc-name", l: "3 · Name" },
    { g: "Services", k: "svc3_ar", s: ".svc-list .svc-row:nth-of-type(3) .svc-ar", l: "3 · Arabic" },
    { g: "Services", k: "svc3_desc", s: ".svc-list .svc-row:nth-of-type(3) .svc-desc", l: "3 · Description", m: 1 },
    { g: "Services", k: "svc4_name", s: ".svc-list .svc-row:nth-of-type(4) .svc-name", l: "4 · Name" },
    { g: "Services", k: "svc4_ar", s: ".svc-list .svc-row:nth-of-type(4) .svc-ar", l: "4 · Arabic" },
    { g: "Services", k: "svc4_desc", s: ".svc-list .svc-row:nth-of-type(4) .svc-desc", l: "4 · Description", m: 1 },
    { g: "Services", k: "svc5_name", s: ".svc-list .svc-row:nth-of-type(5) .svc-name", l: "5 · Name" },
    { g: "Services", k: "svc5_ar", s: ".svc-list .svc-row:nth-of-type(5) .svc-ar", l: "5 · Arabic" },
    { g: "Services", k: "svc5_desc", s: ".svc-list .svc-row:nth-of-type(5) .svc-desc", l: "5 · Description", m: 1 },

    { g: "Work", k: "work_eyebrow", s: ".work .eyebrow", l: "Eyebrow" },
    { g: "Work", k: "work_title", s: ".work .sect-head .title", l: "Title", m: 1 },
    { g: "Work", k: "work_meta", s: ".work .meta", l: "Meta", m: 1 },

    { g: "Process", k: "proc_eyebrow", s: ".process .eyebrow", l: "Eyebrow" },
    { g: "Process", k: "proc_title", s: ".process .sect-head .title", l: "Title", m: 1 },
    { g: "Process", k: "proc_meta", s: ".process .meta", l: "Meta", m: 1 },
    { g: "Process", k: "proc1_h", s: ".proc-grid .proc-step:nth-of-type(1) h3", l: "1 · Title" },
    { g: "Process", k: "proc1_ar", s: ".proc-grid .proc-step:nth-of-type(1) .ar", l: "1 · Arabic" },
    { g: "Process", k: "proc1_p", s: ".proc-grid .proc-step:nth-of-type(1) p", l: "1 · Text", m: 1 },
    { g: "Process", k: "proc2_h", s: ".proc-grid .proc-step:nth-of-type(2) h3", l: "2 · Title" },
    { g: "Process", k: "proc2_ar", s: ".proc-grid .proc-step:nth-of-type(2) .ar", l: "2 · Arabic" },
    { g: "Process", k: "proc2_p", s: ".proc-grid .proc-step:nth-of-type(2) p", l: "2 · Text", m: 1 },
    { g: "Process", k: "proc3_h", s: ".proc-grid .proc-step:nth-of-type(3) h3", l: "3 · Title" },
    { g: "Process", k: "proc3_ar", s: ".proc-grid .proc-step:nth-of-type(3) .ar", l: "3 · Arabic" },
    { g: "Process", k: "proc3_p", s: ".proc-grid .proc-step:nth-of-type(3) p", l: "3 · Text", m: 1 },
    { g: "Process", k: "proc4_h", s: ".proc-grid .proc-step:nth-of-type(4) h3", l: "4 · Title" },
    { g: "Process", k: "proc4_ar", s: ".proc-grid .proc-step:nth-of-type(4) .ar", l: "4 · Arabic" },
    { g: "Process", k: "proc4_p", s: ".proc-grid .proc-step:nth-of-type(4) p", l: "4 · Text", m: 1 },

    { g: "Impact", k: "imp1_lbl", s: ".impact-grid .impact-item:nth-of-type(1) .lbl", l: "1 · Label" },
    { g: "Impact", k: "imp1_ar", s: ".impact-grid .impact-item:nth-of-type(1) .ar", l: "1 · Arabic" },
    { g: "Impact", k: "imp2_lbl", s: ".impact-grid .impact-item:nth-of-type(2) .lbl", l: "2 · Label" },
    { g: "Impact", k: "imp2_ar", s: ".impact-grid .impact-item:nth-of-type(2) .ar", l: "2 · Arabic" },
    { g: "Impact", k: "imp3_lbl", s: ".impact-grid .impact-item:nth-of-type(3) .lbl", l: "3 · Label" },
    { g: "Impact", k: "imp3_ar", s: ".impact-grid .impact-item:nth-of-type(3) .ar", l: "3 · Arabic" },

    { g: "Journal", k: "jrn_eyebrow", s: ".journal .eyebrow", l: "Eyebrow" },
    { g: "Journal", k: "jrn_title", s: ".journal .sect-head .title", l: "Title", m: 1 },

    { g: "Contact", k: "con_eyebrow", s: ".contact .eyebrow", l: "Eyebrow" },
    { g: "Contact", k: "con_title", s: ".contact-lead h2", l: "Title", m: 1 },
    { g: "Contact", k: "con_ar", s: ".contact-ar", l: "Arabic line" },
    { g: "Contact", k: "con_lede", s: ".contact-lead .lede", l: "Paragraph", m: 1 },
    { g: "Contact", k: "con_studio", s: ".contact-detail .cd-item:nth-of-type(1) .v", l: "Studio" },
    { g: "Contact", k: "con_email", s: ".contact-detail .cd-item:nth-of-type(2) .v", l: "Email" },
    { g: "Contact", k: "con_phone", s: ".contact-detail .cd-item:nth-of-type(3) .v", l: "Telephone" },

    { g: "Footer", k: "foot_desc", s: ".footer-brand p", l: "Description", m: 1 },
    { g: "Footer", k: "foot_copy", s: ".footer-bottom small:first-child", l: "Copyright" },
    { g: "Footer", k: "foot_ar", s: ".footer-bottom .ar", l: "Arabic line" },
    { g: "Footer", k: "foot_en", s: ".footer-bottom small:last-child", l: "Tagline (EN)" },
  ],
};
