(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var cvOff = function () { document.documentElement.classList.add("cv-off"); };
  if (location.hash.length > 1) cvOff();
  document.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest('a[href^="#"]'); if (a && a.hash.length > 1) cvOff(); }, true);
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function track(ev, data) { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, data || {})); } catch (e) {} }
  var slug = document.body.dataset.slug || location.pathname;

  /* Header height, so sticky parts sit just under the fixed site header */
  var hdr = $("#wm-header");
  var setHH = function () { if (hdr && hdr.offsetHeight) document.documentElement.style.setProperty("--hh", hdr.offsetHeight + "px"); };
  setHH(); window.addEventListener("load", setHH); window.addEventListener("resize", setHH);

  /* 1. Reading rail: contents fill as you read; mobile bar shows the current section */
  var prose = $(".prose"), heads = prose ? $$("h2[id]", prose) : [];
  var links = $$(".toc a"), fills = $$(".toc .fill"), pcts = $$("[data-pct]"), now = $(".mbar-btn span"), mbar = $(".mbar");
  var marks = [25, 50, 75, 100], hit = {};
  if (prose) {
    var ticking = 0;
    var update = function () {
      ticking = 0;
      var r = prose.getBoundingClientRect(), vh = window.innerHeight, line = vh * 0.3;
      var p = Math.max(0, Math.min(1, (line - r.top) / Math.max(1, r.height - vh * 0.5)));
      var cur = -1;
      for (var i = 0; i < heads.length; i++) if (heads[i].getBoundingClientRect().top <= line + 4) cur = i;
      // rail fill (pixels): reaches each dot as its section starts, then moves through the section
      fills.forEach(function (f) {
        var toc = f.parentNode, ls = $$("a", toc), H = toc.clientHeight, dots = ls.map(function (l) { return l.offsetTop + 13; });
        var px = 0;
        if (cur < 0) {
          var t0 = heads.length ? heads[0].getBoundingClientRect().top : r.bottom;
          px = dots.length ? dots[0] * Math.max(0, Math.min(1, (line - r.top) / Math.max(1, t0 - r.top))) : 0;
        } else {
          var a = heads[cur].getBoundingClientRect().top, b = cur + 1 < heads.length ? heads[cur + 1].getBoundingClientRect().top : r.bottom - vh * 0.2;
          var within = Math.max(0, Math.min(1, (line - a) / Math.max(1, b - a)));
          var d0 = dots[cur], d1 = cur + 1 < dots.length ? dots[cur + 1] : H - 4;
          px = d0 + (d1 - d0) * within;
        }
        f.style.height = Math.max(0, px - 4).toFixed(1) + "px";
      });
      if (mbar) mbar.style.setProperty("--p", p.toFixed(4));
      var pc = Math.round(p * 100) + "%";
      pcts.forEach(function (el) { el.textContent = pc; });
      links.forEach(function (l) {
        var i = +l.dataset.i;
        l.classList.toggle("is-now", i === cur);
        l.classList.toggle("is-read", i < cur);
        if (i === cur) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
      });
      if (now) now.textContent = cur >= 0 ? heads[cur].textContent : "In this article";
      marks.forEach(function (m) { if (!hit[m] && p * 100 >= m - 0.5) { hit[m] = 1; track("article_progress", { percent: m, article: slug }); } });
    };
    var onScroll = function () { if (!ticking) ticking = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }
  if (mbar) {
    var mb = $(".mbar-btn", mbar);
    var setOpen = function (o) { if (o) mbar.setAttribute("data-open", ""); else mbar.removeAttribute("data-open"); mb.setAttribute("aria-expanded", o ? "true" : "false"); };
    mb.addEventListener("click", function () { setOpen(!mbar.hasAttribute("data-open")); });
    $$(".toc a", mbar).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && mbar.hasAttribute("data-open")) { setOpen(false); mb.focus(); } });
  }
  links.forEach(function (a) { a.addEventListener("click", function () { track("toc_click", { section: a.textContent }); }); });

  /* 2. Share: native share sheet on phones, copy link everywhere */
  $$("[data-share]").forEach(function (b) {
    b.addEventListener("click", function () {
      var url = location.origin + location.pathname, title = document.title;
      var mark = function () { b.classList.add("is-done"); var l = b.getAttribute("aria-label"); b.setAttribute("aria-label", "Link copied"); setTimeout(function () { b.classList.remove("is-done"); b.setAttribute("aria-label", l); }, 1800); };
      if (b.dataset.share === "native" && navigator.share && !fine) { navigator.share({ title: title, url: url }).then(function () { track("share", { method: "native", article: slug }); }, function () {}); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { mark(); track("share", { method: "copy", article: slug }); });
    });
  });
  $$(".share a").forEach(function (a) { a.addEventListener("click", function () { track("share", { method: a.dataset.net, article: slug }); }); });

  /* 3. Code blocks: copy button */
  $$(".code-copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var code = $("code", b.closest(".code")).textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1600); });
    });
  });

  /* 4. FAQ accordion: one open at a time */
  var qas = $$(".qa");
  qas.forEach(function (qa) {
    var btn = $(".qa-btn", qa), panel = $(".qa-a", qa);
    btn.addEventListener("click", function () {
      var open = !qa.classList.contains("is-open");
      qas.forEach(function (o) { o.classList.remove("is-open"); $(".qa-btn", o).setAttribute("aria-expanded", "false"); $(".qa-a", o).setAttribute("inert", ""); });
      if (open) { qa.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); panel.removeAttribute("inert"); track("faq_open", { question: btn.textContent.trim() }); }
    });
  });

  /* 5. "Was this useful?" */
  var useful = $(".useful");
  if (useful) {
    $$("button", useful).forEach(function (b) {
      b.addEventListener("click", function () {
        var yes = b.dataset.v === "yes", t = $(".thanks", useful);
        useful.setAttribute("data-done", "");
        t.innerHTML = yes ? "Thanks. Glad it helped. Share it with someone who is working on the same problem."
          : 'Thanks for telling us. What were you looking for? <a href="mailto:hello@waymarks.agency?subject=' + encodeURIComponent("Feedback: " + document.title) + '">Email us your question</a> and we will answer it.';
        t.hidden = false; t.setAttribute("tabindex", "-1"); t.focus();
        track("article_feedback", { useful: yes ? "yes" : "no", article: slug });
      });
    });
  }

  /* 6. Final CTA: glow, drifting kit pieces, magnetic button */
  var cta = $(".cta-card");
  if (cta && fine && !reduce) {
    var kits = $$(".kit", cta), mag = $(".magnet", cta), craf = 0, cx = 0, cy = 0;
    var move = function () {
      craf = 0; var r = cta.getBoundingClientRect(), x = (cx - r.left) / r.width, y = (cy - r.top) / r.height;
      cta.style.setProperty("--cx", (x * 100).toFixed(1) + "%"); cta.style.setProperty("--cy", (y * 100).toFixed(1) + "%");
      kits.forEach(function (k, i) { var d = (i % 2 ? -1 : 1) * (10 + i * 4); k.style.setProperty("--kx", ((x - 0.5) * d).toFixed(1) + "px"); k.style.setProperty("--ky", ((y - 0.5) * d).toFixed(1) + "px"); });
      if (mag) { var b = mag.getBoundingClientRect(), dx = cx - (b.left + b.width / 2), dy = cy - (b.top + b.height / 2), near = Math.abs(dx) < b.width && Math.abs(dy) < b.height * 1.6;
        mag.classList.toggle("is-live", near); mag.style.setProperty("--tx", near ? (dx * 0.25).toFixed(1) + "px" : "0px"); mag.style.setProperty("--ty", near ? (dy * 0.35).toFixed(1) + "px" : "0px"); }
    };
    cta.addEventListener("pointermove", function (e) { cx = e.clientX; cy = e.clientY; if (!craf) craf = requestAnimationFrame(move); });
    cta.addEventListener("pointerleave", function () { kits.forEach(function (k) { k.style.setProperty("--kx", "0px"); k.style.setProperty("--ky", "0px"); }); if (mag) { mag.classList.remove("is-live"); mag.style.setProperty("--tx", "0px"); mag.style.setProperty("--ty", "0px"); } });
  }

  /* 7. Copy email */
  $$(".copy").forEach(function (b) {
    var label = $("span", b);
    b.addEventListener("click", function () {
      var done = function () { b.classList.add("is-done"); label.textContent = "Copied"; track("email_copy", { location: "final_cta" }); setTimeout(function () { b.classList.remove("is-done"); label.textContent = "Copy"; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(b.dataset.copy).then(done, function () { location.href = "mailto:" + b.dataset.copy; });
      else location.href = "mailto:" + b.dataset.copy;
    });
  });

  document.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest("[data-track]"); if (a) track(a.dataset.track, { location: a.dataset.loc || "", article: slug }); });
})();
