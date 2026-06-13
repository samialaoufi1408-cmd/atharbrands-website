/* ATHAR — Control Panel logic (Supabase Auth + content/work/journal CRUD). */
(function () {
  "use strict";
  var cfg = window.CMS_CONFIG;
  var sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- toast ---------- */
  var toastEl = $("#toast"), toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }
  function setMsg(sel, text, ok) {
    var el = $(sel);
    el.textContent = text || "";
    el.className = "msg " + (ok ? "ok" : "err");
  }

  /* ---------- auth ---------- */
  function showLogin() { $("#login").style.display = "grid"; $("#editor").style.display = "none"; }
  function enterEditor() {
    $("#login").style.display = "none";
    $("#editor").style.display = "block";
    loadTexts(); loadWork(); loadJournal();
  }
  sb.auth.getSession().then(function (r) {
    if (r.data && r.data.session) enterEditor(); else showLogin();
  });
  $("#login-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    setMsg("#login-msg", "جارٍ الدخول…", true);
    var r = await sb.auth.signInWithPassword({ email: $("#email").value.trim(), password: $("#password").value });
    if (r.error) { setMsg("#login-msg", "تعذّر الدخول: " + r.error.message, false); return; }
    setMsg("#login-msg", "", true);
    enterEditor();
  });
  $("#signout").addEventListener("click", async function () { await sb.auth.signOut(); showLogin(); });

  /* ---------- tabs ---------- */
  document.querySelectorAll(".tab").forEach(function (t) {
    t.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
      document.querySelectorAll(".panel").forEach(function (x) { x.classList.remove("active"); });
      t.classList.add("active");
      $("#panel-" + t.getAttribute("data-tab")).classList.add("active");
    });
  });

  /* ---------- texts ---------- */
  async function loadTexts() {
    var box = $("#texts-fields");
    var defaults = {};
    try {
      var html = await fetch("/ATHAR.html", { cache: "no-store" }).then(function (r) { return r.text(); });
      var doc = new DOMParser().parseFromString(html, "text/html");
      (cfg.texts || []).forEach(function (t) {
        var el = doc.querySelector(t.s);
        defaults[t.k] = el ? el.innerHTML.trim() : "";
      });
    } catch (e) { /* defaults stay empty */ }

    var overrides = {};
    try {
      var res = await sb.from("site_content").select("key,value");
      if (res.error) throw res.error;
      (res.data || []).forEach(function (r) { overrides[r.key] = r.value; });
    } catch (e) {
      box.innerHTML = '<p class="msg err">تعذّر تحميل المحتوى — تأكّد من تشغيل أوامر SQL في Supabase. (' + e.message + ")</p>";
      return;
    }

    var groups = {}, order = [];
    (cfg.texts || []).forEach(function (t) {
      if (!groups[t.g]) { groups[t.g] = []; order.push(t.g); }
      groups[t.g].push(t);
    });
    function esc(v) {
      return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function escAttr(v) { return esc(v).replace(/"/g, "&quot;"); }
    var SIZES = ["", "0.7rem", "0.8rem", "0.9rem", "1rem", "1.1rem", "1.25rem", "1.4rem", "1.6rem", "1.8rem", "2rem", "2.5rem", "3rem", "3.5rem", "4rem", "5rem", "6rem"];
    function sizeSelect(k) {
      var cur = overrides[k + "__size"] != null ? overrides[k + "__size"] : "";
      var o = SIZES.map(function (s) {
        return '<option value="' + s + '"' + (s === cur ? " selected" : "") + ">" + (s === "" ? "افتراضي" : s) + "</option>";
      }).join("");
      return '<div style="margin-top:.4rem;display:flex;align-items:center;gap:.5rem">' +
        '<span style="font-size:.62rem;letter-spacing:.12em;color:#7A6955;text-transform:uppercase">حجم الخط</span>' +
        '<select data-size-key="' + k + '__size" style="background:#15181b;border:1px solid rgba(242,239,230,.12);color:#F2EFE6;padding:.3rem .5rem;font-size:.8rem;font-family:Jost,sans-serif">' + o + "</select></div>";
    }
    function extraRow(v) {
      return '<div class="extra-row" style="display:flex;gap:.5rem;margin-bottom:.5rem">' +
        '<input class="extra-input" value="' + escAttr(v) + '" placeholder="نص الخانة (مثلاً: سجل تجاري 1010xxxxxx)" style="flex:1"/>' +
        '<button type="button" class="btn danger del-extra">×</button></div>';
    }
    var html = "";
    order.forEach(function (g) {
      html += '<div class="group"><h3>' + g + "</h3>";
      groups[g].forEach(function (t) {
        var rows = t.m ? 3 : 1;
        var enVal = overrides[t.k] != null ? overrides[t.k] : (defaults[t.k] || "");
        html += '<div class="field"><label>' + t.l + " · English</label>";
        html += '<textarea data-key="' + t.k + '" rows="' + rows + '">' + esc(enVal) + "</textarea>";
        if (t.ar !== undefined) {
          var arVal = overrides[t.k + "__ar"] != null ? overrides[t.k + "__ar"] : t.ar;
          html +=
            '<div style="margin-top:.45rem"><span style="font-size:.64rem;letter-spacing:.14em;color:#D4AF7A;text-transform:uppercase">العربية · Arabic</span>' +
            '<textarea dir="rtl" data-key="' + (t.k + "__ar") + '" rows="' + rows + '">' + esc(arVal) + "</textarea></div>";
        }
        html += sizeSelect(t.k);
        html += "</div>";
      });
      html += "</div>";
    });

    /* extra footer lines (add your own — CR, VAT, address…) */
    var exLines = [];
    try { if (overrides["footer_extra_lines"]) exLines = JSON.parse(overrides["footer_extra_lines"]) || []; } catch (e) {}
    html += '<div class="group"><h3>خانات الفوتر الإضافية · Extra footer lines</h3>';
    html += '<p class="hint">أضف أسطرًا تظهر في الفوتر (سجل تجاري، رقم ضريبي، عنوان…). يُحفظ مع زر «حفظ النصوص».</p>';
    html += '<div id="extra-lines">' + exLines.map(extraRow).join("") + "</div>";
    html += '<button type="button" class="btn" id="add-extra-line" style="margin-top:.4rem">+ أضف خانة</button>';
    html += "</div>";

    box.innerHTML = html;

    var addBtn = document.getElementById("add-extra-line");
    var exBox = document.getElementById("extra-lines");
    if (addBtn) addBtn.addEventListener("click", function () {
      var d = document.createElement("div");
      d.className = "extra-row";
      d.style.cssText = "display:flex;gap:.5rem;margin-bottom:.5rem";
      d.innerHTML = '<input class="extra-input" placeholder="نص الخانة" style="flex:1"/><button type="button" class="btn danger del-extra">×</button>';
      exBox.appendChild(d);
    });
    if (exBox) exBox.addEventListener("click", function (e) {
      if (e.target.classList.contains("del-extra")) e.target.closest(".extra-row").remove();
    });
  }
  async function saveTexts() {
    var rows = [];
    document.querySelectorAll("#texts-fields textarea").forEach(function (ta) {
      rows.push({ key: ta.getAttribute("data-key"), value: ta.value });
    });
    document.querySelectorAll("#texts-fields select[data-size-key]").forEach(function (s) {
      rows.push({ key: s.getAttribute("data-size-key"), value: s.value });
    });
    var extra = [];
    document.querySelectorAll("#extra-lines .extra-input").forEach(function (inp) {
      if (inp.value.trim()) extra.push(inp.value.trim());
    });
    rows.push({ key: "footer_extra_lines", value: JSON.stringify(extra) });
    var res = await sb.from("site_content").upsert(rows, { onConflict: "key" });
    if (res.error) { toast("خطأ في الحفظ: " + res.error.message); return; }
    toast("تم حفظ النصوص ✓ — حدّث الصفحة الرئيسية لرؤيتها");
  }
  $("#save-texts").addEventListener("click", saveTexts);

  /* ---------- image upload ---------- */
  async function uploadImage(file) {
    var safe = file.name.replace(/[^\w.\-]+/g, "_");
    var path = "u/" + Date.now() + "_" + safe;
    var up = await sb.storage.from(cfg.STORAGE_BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
    if (up.error) throw up.error;
    return sb.storage.from(cfg.STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
  }

  /* ---------- work ---------- */
  async function loadWork() {
    var list = $("#work-list");
    var res = await sb.from("work_items").select("*").order("created_at", { ascending: false });
    if (res.error) { list.innerHTML = '<p class="msg err">' + res.error.message + "</p>"; return; }
    if (!res.data.length) { list.innerHTML = '<p class="hint">لا توجد أعمال مضافة بعد.</p>'; return; }
    list.innerHTML = res.data.map(function (w) {
      var img = w.image_url ? '<img src="' + w.image_url + '"/>' : '<img alt=""/>';
      return '<div class="card-row">' + img +
        '<div class="meta"><b>' + (w.title || "") + "</b><small>" + (w.category || "") + " · " + (w.year || "") + "</small></div>" +
        '<button class="btn danger" data-del-work="' + w.id + '">حذف</button></div>';
    }).join("");
    list.querySelectorAll("[data-del-work]").forEach(function (b) {
      b.addEventListener("click", function () { delItem("work_items", b.getAttribute("data-del-work"), loadWork); });
    });
  }
  $("#add-work").addEventListener("click", async function () {
    var title = $("#w-title").value.trim();
    if (!title) { setMsg("#work-msg", "العنوان مطلوب", false); return; }
    setMsg("#work-msg", "جارٍ الإضافة…", true);
    try {
      var url = null, f = $("#w-img").files[0];
      if (f) url = await uploadImage(f);
      var res = await sb.from("work_items").insert({
        title: title, title_ar: $("#w-title-ar").value.trim(), category: $("#w-cat").value.trim(),
        year: $("#w-year").value.trim(), image_url: url,
      });
      if (res.error) throw res.error;
      setMsg("#work-msg", "", true);
      ["#w-title", "#w-title-ar", "#w-cat", "#w-year", "#w-img"].forEach(function (s) { $(s).value = ""; });
      toast("تمت إضافة العمل ✓"); loadWork();
    } catch (e) { setMsg("#work-msg", "خطأ: " + e.message, false); }
  });

  /* ---------- journal ---------- */
  async function loadJournal() {
    var list = $("#journal-list");
    var res = await sb.from("journal_items").select("*").order("created_at", { ascending: false });
    if (res.error) { list.innerHTML = '<p class="msg err">' + res.error.message + "</p>"; return; }
    if (!res.data.length) { list.innerHTML = '<p class="hint">لا توجد مقالات مضافة بعد.</p>'; return; }
    list.innerHTML = res.data.map(function (j) {
      var img = j.image_url ? '<img src="' + j.image_url + '"/>' : '<img alt=""/>';
      return '<div class="card-row">' + img +
        '<div class="meta"><b>' + (j.title || "") + "</b><small>" + (j.tag || "") + " · " + (j.date_label || "") + "</small></div>" +
        '<button class="btn danger" data-del-jrn="' + j.id + '">حذف</button></div>';
    }).join("");
    list.querySelectorAll("[data-del-jrn]").forEach(function (b) {
      b.addEventListener("click", function () { delItem("journal_items", b.getAttribute("data-del-jrn"), loadJournal); });
    });
  }
  $("#add-journal").addEventListener("click", async function () {
    var title = $("#j-title").value.trim();
    if (!title) { setMsg("#journal-msg", "العنوان مطلوب", false); return; }
    setMsg("#journal-msg", "جارٍ الإضافة…", true);
    try {
      var url = null, f = $("#j-img").files[0];
      if (f) url = await uploadImage(f);
      var res = await sb.from("journal_items").insert({
        title: title, tag: $("#j-tag").value.trim(), date_label: $("#j-date").value.trim(),
        excerpt: $("#j-excerpt").value.trim(), image_url: url,
      });
      if (res.error) throw res.error;
      setMsg("#journal-msg", "", true);
      ["#j-title", "#j-tag", "#j-date", "#j-excerpt", "#j-img"].forEach(function (s) { $(s).value = ""; });
      toast("تمت إضافة المقال ✓"); loadJournal();
    } catch (e) { setMsg("#journal-msg", "خطأ: " + e.message, false); }
  });

  async function delItem(table, id, reload) {
    if (!confirm("حذف هذا العنصر نهائيًا؟")) return;
    var res = await sb.from(table).delete().eq("id", id);
    if (res.error) { toast("خطأ في الحذف: " + res.error.message); return; }
    toast("تم الحذف"); reload();
  }
})();
