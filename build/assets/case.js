(function () {
  "use strict";
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function track(ev, data) { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, data || {})); } catch (e) {} }

  /* Gallery lightbox: arrows, swipe, Escape */
  var dlg = $(".lbx"), items = $$(".gal button");
  if (dlg && items.length && typeof dlg.showModal === "function") {
    var im = $("img", dlg), cap = $(".lbx-cap", dlg), idx = 0;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var b = items[idx], src = $("img", b);
      im.src = b.dataset.full; im.alt = src.alt;
      cap.textContent = (idx + 1) + " of " + items.length + (b.dataset.cap ? ": " + b.dataset.cap : "");
    };
    items.forEach(function (b, i) { b.addEventListener("click", function () { show(i); dlg.showModal(); track("case_image_open", { index: i + 1 }); }); });
    $(".lbx-prev", dlg).addEventListener("click", function () { show(idx - 1); });
    $(".lbx-next", dlg).addEventListener("click", function () { show(idx + 1); });
    $(".lbx-close", dlg).addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); show(idx + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); show(idx - 1); }
    });
    var sx = 0;
    dlg.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); }, { passive: true });
  }

  /* Case studies index: filter by industry */
  var bar = $(".ci-bar");
  if (bar) {
    var cards = $$(".ccard"), btns = $$("button", bar), status = $(".ci-status");
    var apply = function (key, name) {
      var shown = 0;
      cards.forEach(function (c) { var on = key === "all" || c.dataset.ind === key; c.hidden = !on; if (on) shown++; });
      btns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.ind === key ? "true" : "false"); });
      status.textContent = key === "all" ? "" : "Showing " + shown + " " + name + " case " + (shown === 1 ? "study" : "studies") + ".";
      track("case_filter", { industry: name });
    };
    btns.forEach(function (b) { b.addEventListener("click", function () { apply(b.dataset.ind, b.dataset.name); }); });
  }
})();
