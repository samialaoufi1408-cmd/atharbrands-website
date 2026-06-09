/* ATHAR CMS — public content loader.
   Runs after main.js. Reads content from Supabase and (1) applies text
   overrides, (2) appends Work + Journal cards. Fails silently if the backend
   isn't reachable/configured, so the static defaults always remain. */
(function () {
  "use strict";
  var cfg = window.CMS_CONFIG;
  if (!cfg || !window.supabase || !window.supabase.createClient) return;

  var sb;
  try {
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  } catch (e) {
    return;
  }

  function esc(s) {
    return (s == null ? "" : String(s))
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* 1) editable text overrides */
  sb.from("site_content")
    .select("key,value")
    .then(function (res) {
      if (res.error || !res.data) return;
      var map = {};
      res.data.forEach(function (r) {
        map[r.key] = r.value;
      });
      (cfg.texts || []).forEach(function (t) {
        var v = map[t.k];
        if (v == null || v === "") return;
        var el = document.querySelector(t.s);
        if (el) el.innerHTML = v;
      });
    })
    .catch(function () {});

  /* 2) Work items — appended in the AURA OUD pattern (image + lightbox) */
  sb.from("work_items")
    .select("*")
    .order("created_at", { ascending: true })
    .then(function (res) {
      if (res.error || !res.data || !res.data.length) return;
      var grid = document.querySelector(".work-grid");
      if (!grid) return;
      grid.innerHTML = ""; // grid is now fully managed from the panel — replaces the design defaults
      res.data.forEach(function (w) {
        var art = document.createElement("article");
        art.className = "work-card";
        var img = w.image_url
          ? '<img class="work-img" src="' + esc(w.image_url) + '" alt="' + esc(w.title) + '"/>'
          : '<span class="ph-tag">Image · صورة</span>' +
            (window.ATHAR && window.ATHAR.buildSeal
              ? '<span class="wm">' + window.ATHAR.buildSeal(false) + "</span>"
              : "");
        art.innerHTML =
          '<div class="work-thumb">' +
          img +
          '<div class="work-overlay"><span class="work-cat">' +
          esc(w.category || "") +
          "</span>" +
          '<div class="work-meta"><div class="work-name">' +
          esc(w.title || "") +
          '<span class="ar-sub">' +
          esc(w.title_ar || "") +
          "</span></div>" +
          '<span class="work-year">' +
          esc(w.year || "") +
          "</span></div></div></div>";
        if (w.image_url) {
          art.setAttribute("data-lightbox", w.image_url);
          art.addEventListener("click", function () {
            openLightbox(w.image_url);
          });
        }
        grid.appendChild(art);
      });
    })
    .catch(function () {});

  /* 3) Journal items */
  sb.from("journal_items")
    .select("*")
    .order("created_at", { ascending: true })
    .then(function (res) {
      if (res.error || !res.data || !res.data.length) return;
      var grid = document.querySelector(".jrn-grid");
      if (!grid) return;
      grid.innerHTML = ""; // grid is now fully managed from the panel — replaces the design defaults
      res.data.forEach(function (j) {
        var art = document.createElement("article");
        art.className = "jrn-card";
        var thumb;
        if (j.image_url) {
          thumb =
            '<img src="' +
            esc(j.image_url) +
            '" alt="' +
            esc(j.title) +
            '" style="width:100%;height:100%;object-fit:cover;display:block"/>';
        } else if (window.ATHAR && window.ATHAR.buildSeal) {
          thumb = '<span class="wm">' + window.ATHAR.buildSeal(false) + "</span>";
        } else {
          thumb = "";
        }
        art.innerHTML =
          '<div class="jrn-thumb">' +
          thumb +
          "</div>" +
          '<div class="jrn-body"><div class="jrn-tags"><span>' +
          esc(j.tag || "") +
          '</span><span class="date">' +
          esc(j.date_label || "") +
          "</span></div><h3>" +
          esc(j.title || "") +
          "</h3><p>" +
          esc(j.excerpt || "") +
          "</p></div>";
        grid.appendChild(art);
      });
    })
    .catch(function () {});

  /* reuse main.js's lightbox if exposed; else open #lightbox directly */
  function openLightbox(src) {
    if (window.ATHAR && window.ATHAR.openLightbox) {
      window.ATHAR.openLightbox(src);
      return;
    }
    var lb = document.getElementById("lightbox");
    var im = document.getElementById("lightbox-img");
    if (!lb || !im) return;
    im.src = src;
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
})();
