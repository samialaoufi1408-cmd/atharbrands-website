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
    var html = "";
    order.forEach(function (g) {
      html += '<div class="group"><h3>' + g + "</h3>";
      groups[g].forEach(function (t) {
        var val = overrides[t.k] != null ? overrides[t.k] : (defaults[t.k] || "");
        var v = String(val).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        html += '<div class="field"><label>' + t.l + "</label><textarea data-key=\"" + t.k + '" rows="' + (t.m ? 3 : 1) + '">' + v + "</textarea></div>";
      });
      html += "</div>";
    });
    box.innerHTML = html;
  }
  async function saveTexts() {
    var rows = [];
    document.querySelectorAll("#texts-fields textarea").forEach(function (ta) {
      rows.push({ key: ta.getAttribute("data-key"), value: ta.value });
    });
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
