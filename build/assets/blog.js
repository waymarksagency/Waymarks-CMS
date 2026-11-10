(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  /* In-page links: draw every section first so the jump lands exactly on target */
  var cvOff = function () { document.documentElement.classList.add("cv-off"); };
  if (location.hash.length > 1) cvOff();
  document.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest('a[href^="#"]'); if (a && a.hash.length > 1) cvOff(); }, true);
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function track(ev, data) { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, data || {})); } catch (e) {} }

  /* 1. Hero artwork tilts toward the pointer, with a moving glare */
  var tilt = $(".tilt");
  if (tilt && fine && !reduce) {
    var raf = 0, px = 0, py = 0;
    var apply = function () {
      raf = 0;
      var r = tilt.getBoundingClientRect();
      var x = (px - r.left) / r.width, y = (py - r.top) / r.height;
      tilt.style.setProperty("--ry", ((x - 0.5) * 10).toFixed(2) + "deg");
      tilt.style.setProperty("--rx", ((0.5 - y) * 8).toFixed(2) + "deg");
      tilt.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
      tilt.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
    };
    tilt.addEventListener("pointerenter", function () { tilt.classList.add("is-live"); tilt.style.setProperty("--go", "1"); });
    tilt.addEventListener("pointermove", function (e) { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(apply); });
    tilt.addEventListener("pointerleave", function () {
      tilt.classList.remove("is-live");
      ["--rx", "--ry"].forEach(function (p) { tilt.style.setProperty(p, "0deg"); });
      tilt.style.setProperty("--go", "0");
    });
  }

  /* 2. Touchpoint cards: a soft light follows the pointer */
  var touch = $(".touch");
  if (touch && fine) {
    touch.addEventListener("pointermove", function (e) {
      var li = e.target.closest("li"); if (!li) return;
      var r = li.getBoundingClientRect();
      li.style.setProperty("--mx", (e.clientX - r.left) + "px");
      li.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
    touch.addEventListener("pointerleave", function () {
      $$("li", touch).forEach(function (li) { li.style.setProperty("--mx", "-200px"); li.style.setProperty("--my", "-200px"); });
    }, true);
  }

  /* 3. Process timeline lights up step by step as you scroll */
  var proc = $(".steps");
  if (proc) {
    var steps = $$(".step", proc), bar = $(".track", proc), ticking = 0, live = false;
    var update = function () {
      ticking = 0;
      var r = proc.getBoundingClientRect(), vh = window.innerHeight;
      var vertical = getComputedStyle($("ol", proc)).gridTemplateColumns.split(" ").length === 1;
      // progress: 0 when the steps enter the lower part of the screen, 1 when they reach the upper third
      var start = vh * 0.85, end = vertical ? vh * 0.35 - r.height * 0.6 : vh * 0.4;
      var p = reduce ? 1 : Math.max(0, Math.min(1, (start - r.top) / (start - end)));
      bar.style.setProperty("--p", p.toFixed(3));
      steps.forEach(function (s, i) { s.classList.toggle("is-on", p > 0.02 && p >= (i / (steps.length - 1)) * 0.98); });
    };
    var onScroll = function () { if (live && !ticking) ticking = requestAnimationFrame(update); };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { live = en[0].isIntersecting; if (live) update(); }, { rootMargin: "200px 0px" }).observe(proc);
    } else { live = true; requestAnimationFrame(update); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* 4. Recent work opens in a lightbox with prev/next and arrow keys */
  var dlg = $(".lb"), items = $$(".work-btn");
  if (dlg && items.length && typeof dlg.showModal === "function") {
    var img = $("img", dlg), cap = $(".lb-cap", dlg), idx = 0;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var b = items[idx], src = $("img", b);
      img.src = b.dataset.full; img.alt = src.alt;
      cap.innerHTML = ""; var t = document.createElement("b"); t.textContent = b.dataset.name;
      var s = document.createElement("span"); s.textContent = b.dataset.tag; cap.append(t, s);
    };
    items.forEach(function (b, i) {
      b.addEventListener("click", function () { show(i); dlg.showModal(); track("work_open", { project: b.dataset.name }); });
    });
    $(".lb-prev", dlg).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", dlg).addEventListener("click", function () { show(idx + 1); });
    $(".lb-close", dlg).addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); show(idx + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); show(idx - 1); }
    });
    var sx = 0;
    dlg.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); }, { passive: true });
  }

  /* 5. FAQ accordion: one open at a time, smooth height */
  var qas = $$(".qa");
  qas.forEach(function (qa) {
    var btn = $(".qa-btn", qa), panel = $(".qa-a", qa);
    btn.addEventListener("click", function () {
      var open = !qa.classList.contains("is-open");
      qas.forEach(function (o) {
        o.classList.remove("is-open"); $(".qa-btn", o).setAttribute("aria-expanded", "false"); $(".qa-a", o).setAttribute("inert", "");
      });
      if (open) { qa.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); panel.removeAttribute("inert"); track("faq_open", { question: btn.textContent.trim() }); }
    });
  });

  /* 6. Service cards: light and image follow the pointer */
  if (fine && !reduce) {
    $$(".svc").forEach(function (card) {
      var media = $(".svc-media", card), raf = 0, ex = 0, ey = 0;
      var paint = function () {
        raf = 0; var r = media.getBoundingClientRect();
        var x = (ex - r.left) / r.width, y = (ey - r.top) / r.height;
        media.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        media.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        media.style.setProperty("--px", ((0.5 - x) * 14).toFixed(1) + "px");
        media.style.setProperty("--py", ((0.5 - y) * 10).toFixed(1) + "px");
      };
      card.addEventListener("pointerenter", function () { card.classList.add("is-live"); });
      card.addEventListener("pointermove", function (e) { ex = e.clientX; ey = e.clientY; if (!raf) raf = requestAnimationFrame(paint); });
      card.addEventListener("pointerleave", function () { card.classList.remove("is-live"); media.style.setProperty("--px", "0px"); media.style.setProperty("--py", "0px"); });
    });
  }

  /* 7. CTA: glow follows the pointer, brand-kit pieces drift, main button is magnetic */
  var cta = $(".cta-card");
  if (cta && fine && !reduce) {
    var kits = $$(".kit", cta), mag = $(".magnet", cta), craf = 0, cx = 0, cy = 0;
    var move = function () {
      craf = 0; var r = cta.getBoundingClientRect();
      var x = (cx - r.left) / r.width, y = (cy - r.top) / r.height;
      cta.style.setProperty("--cx", (x * 100).toFixed(1) + "%");
      cta.style.setProperty("--cy", (y * 100).toFixed(1) + "%");
      kits.forEach(function (k, i) { var d = (i % 2 ? -1 : 1) * (10 + i * 4);
        k.style.setProperty("--kx", ((x - 0.5) * d).toFixed(1) + "px"); k.style.setProperty("--ky", ((y - 0.5) * d).toFixed(1) + "px"); });
      if (mag) { var b = mag.getBoundingClientRect(), dx = cx - (b.left + b.width / 2), dy = cy - (b.top + b.height / 2);
        var near = Math.abs(dx) < b.width && Math.abs(dy) < b.height * 1.6;
        mag.classList.toggle("is-live", near);
        mag.style.setProperty("--tx", near ? (dx * 0.25).toFixed(1) + "px" : "0px");
        mag.style.setProperty("--ty", near ? (dy * 0.35).toFixed(1) + "px" : "0px"); }
    };
    cta.addEventListener("pointermove", function (e) { cx = e.clientX; cy = e.clientY; if (!craf) craf = requestAnimationFrame(move); });
    cta.addEventListener("pointerleave", function () {
      kits.forEach(function (k) { k.style.setProperty("--kx", "0px"); k.style.setProperty("--ky", "0px"); });
      if (mag) { mag.classList.remove("is-live"); mag.style.setProperty("--tx", "0px"); mag.style.setProperty("--ty", "0px"); }
    });
  }

  /* 8. Copy email */
  $$(".copy").forEach(function (b) {
    var label = $("span", b);
    b.addEventListener("click", function () {
      var done = function () { b.classList.add("is-done"); label.textContent = "Copied"; track("email_copy", { location: "final_cta" });
        setTimeout(function () { b.classList.remove("is-done"); label.textContent = "Copy"; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(b.dataset.copy).then(done, function () { window.location.href = "mailto:" + b.dataset.copy; });
      else window.location.href = "mailto:" + b.dataset.copy;
    });
  });

  /* 9. Hero annotation chips drift with the pointer */
  var art = $(".hero-art"), notes = $$(".note");
  if (art && notes.length && fine && !reduce) {
    art.addEventListener("pointermove", function (e) {
      var r = art.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      notes.forEach(function (n, i) { var d = 14 + i * 6; n.style.setProperty("--nx", (-x * d).toFixed(1) + "px"); n.style.setProperty("--ny", (-y * d).toFixed(1) + "px"); });
    });
    art.addEventListener("pointerleave", function () { notes.forEach(function (n) { n.style.setProperty("--nx", "0px"); n.style.setProperty("--ny", "0px"); }); });
  }

  /* 10. "Before we design" questions open to show how we answer them */
  var asks = $$(".ask");
  asks.forEach(function (a) {
    var b = $(".ask-btn", a), panel = $(".ask-a", a);
    b.addEventListener("click", function () {
      var open = !a.classList.contains("is-open");
      a.classList.toggle("is-open", open); b.setAttribute("aria-expanded", String(open));
      if (open) panel.removeAttribute("inert"); else panel.setAttribute("inert", "");
      if (open) track("question_open", { question: b.textContent.trim() });
    });
  });

  /* 11. Deliverables tick one by one when the list scrolls into view (touch screens) */
  if (!fine && "IntersectionObserver" in window) $$(".dlv.ticks").forEach(function (dlv) {
    new IntersectionObserver(function (en, ob) {
      if (!en[0].isIntersecting) return; ob.disconnect();
      $$("li", dlv).forEach(function (li, i) { setTimeout(function () { li.classList.add("is-on"); }, reduce ? 0 : 120 * i); });
    }, { threshold: 0.3 }).observe(dlv);
  });

  /* 12. Design <-> Code window: hovering a block lights its code, and the reverse */
  var dc = $(".dc");
  if (dc) {
    var hot = function (k) {
      $$("[data-k]", dc).forEach(function (el) { el.classList.toggle("is-hot", el.dataset.k === k); });
    };
    dc.addEventListener("pointerover", function (e) { var t = e.target.closest("[data-k]"); hot(t ? t.dataset.k : null); });
    dc.addEventListener("pointerleave", function () { hot(null); });
    $$("[data-k]", dc).forEach(function (el) { el.addEventListener("click", function () { hot(el.dataset.k); }); });
    $$(".dc-tabs button", dc).forEach(function (b) {
      b.addEventListener("click", function () {
        dc.dataset.view = b.dataset.view;
        $$(".dc-tabs button", dc).forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
        track("design_code_toggle", { view: b.dataset.view });
      });
    });
  }

  /* 13. Benefit cards: soft light follows the pointer */
  if (fine) $$(".ben li").forEach(function (li) {
    li.addEventListener("pointermove", function (e) { var r = li.getBoundingClientRect(); li.style.setProperty("--mx", (e.clientX - r.left) + "px"); li.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    li.addEventListener("pointerleave", function () { li.style.setProperty("--mx", "-300px"); li.style.setProperty("--my", "-300px"); });
  });

  /* 14. Growth clarity checklist: tick what you already know, the ring fills */
  var chk = $(".chk");
  if (chk) {
    var btns = $$("button", chk), ring = $(".ring"), num = $(".ring b"), msg = $(".meter strong");
    var paint = function () {
      var n = btns.filter(function (b) { return b.getAttribute("aria-pressed") === "true"; }).length, t = btns.length;
      ring.style.setProperty("--v", (n / t).toFixed(3)); num.textContent = n + "/" + t;
      msg.textContent = n === 0 ? "Where do you stand?" : n < 4 ? "A good start" : n < t ? "Nearly there" : "Clear on everything";
    };
    btns.forEach(function (b) { b.addEventListener("click", function () { b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")); paint(); }); });
    paint();
  }

  /* 15. Connected channels chart: each channel switched on lifts the shared curve */
  var chan = $(".chan");
  if (chan) {
    var cb = $$(".chips button", chan), line = $(".line", chan), area = $(".area", chan), dot = $(".dot", chan), cnt = $(".chan-count", chan);
    var W = 600, H = 190, N = 48;
    var curve = function (k) {
      var pts = [];
      for (var i = 0; i < N; i++) { var x = i / (N - 1); var y = 0.12 + x * 0.18 + Math.pow(x, 2.2) * 0.09 * k; pts.push([x * W, H - Math.min(y, 0.96) * H]); }
      return pts;
    };
    var path = function (pts) {
      return "M" + pts.map(function (q) { return q[0].toFixed(1) + " " + q[1].toFixed(1); }).join(" L");
    };
    var draw = function () {
      var k = cb.filter(function (b) { return b.getAttribute("aria-pressed") === "true"; }).length;
      var pts = curve(k), d = path(pts);
      line.setAttribute("d", d); area.setAttribute("d", d + " L" + W + " " + H + " L0 " + H + " Z");
      dot.setAttribute("cx", pts[N - 1][0]); dot.setAttribute("cy", pts[N - 1][1]);
      cnt.textContent = k + (k === 1 ? " channel connected" : " channels connected");
    };
    $(".solo", chan).setAttribute("d", path(curve(0)));
    cb.forEach(function (b) { b.addEventListener("click", function () { b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")); draw(); track("channel_toggle", { channel: b.textContent.trim() }); }); });
    draw();
  }

  /* 16. Hero handoff board: steps open to show owner and next step; progress fills once */
  var hb = $(".hb");
  if (hb) {
    var steps2 = $$(".hb-step", hb);
    steps2.forEach(function (st) {
      var b = $(".hb-btn", st), more = $(".hb-more", st);
      b.addEventListener("click", function () {
        var open = !st.classList.contains("is-open");
        steps2.forEach(function (o) { o.classList.remove("is-open"); $(".hb-btn", o).setAttribute("aria-expanded", "false"); $(".hb-more", o).setAttribute("inert", ""); });
        if (open) { st.classList.add("is-open"); b.setAttribute("aria-expanded", "true"); more.removeAttribute("inert"); }
      });
    });
    requestAnimationFrame(function () { setTimeout(function () { $$(".hb-bar i", hb).forEach(function (i) { i.style.setProperty("--w", i.dataset.w); }); }, reduce ? 0 : 350); });
  }

  /* 17. 14+ counts up once when it comes into view */
  var big = $(".big b");
  if (big && !reduce && "IntersectionObserver" in window) {
    var target = parseInt(big.dataset.n, 10);
    new IntersectionObserver(function (en, ob) {
      if (!en[0].isIntersecting) return; ob.disconnect();
      var t0 = performance.now();
      (function tick(t) { var k = Math.min(1, (t - t0) / 1100); big.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + "+"; if (k < 1) requestAnimationFrame(tick); })(t0);
    }, { threshold: 0.6 }).observe(big);
  }

  /* 18. Help cards: soft light follows the pointer */
  if (fine) $$(".hlp li").forEach(function (li) {
    li.addEventListener("pointermove", function (e) { var r = li.getBoundingClientRect(); li.style.setProperty("--mx", (e.clientX - r.left) + "px"); li.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    li.addEventListener("pointerleave", function () { li.style.setProperty("--mx", "-300px"); li.style.setProperty("--my", "-300px"); });
  });

  /* 19. Automation console: run a test and watch each rule fire */
  var rc = $(".rc");
  if (rc) {
    var run = $(".rc-run button", rc), log = $(".rc-log", rc), rules = $$(".rule", rc);
    run.addEventListener("click", function () {
      run.disabled = true; log.className = "rc-log"; rules.forEach(function (r) { r.classList.remove("is-run", "is-done"); });
      var step = reduce ? 0 : 700;
      rules.forEach(function (r, i) {
        setTimeout(function () { r.classList.add("is-run"); log.textContent = r.dataset.log; }, step * i * 2);
        setTimeout(function () { r.classList.add("is-done"); r.classList.remove("is-run"); }, step * (i * 2 + 1));
      });
      setTimeout(function () { log.textContent = "Test passed. Both rules ran without anyone touching them."; log.className = "rc-log ok"; run.disabled = false; run.lastChild.textContent = " Run again"; track("automation_test"); }, step * rules.length * 2);
    });
  }

  /* 20. Process cards light up in order as the row scrolls in */
  var pcs = $(".pcs");
  if (pcs && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en, ob) {
      if (!en[0].isIntersecting) return; ob.disconnect();
      $$(".pc", pcs).forEach(function (c, i) { setTimeout(function () { c.classList.add("is-on"); }, reduce ? 0 : 260 * i); });
    }, { threshold: 0.35 }).observe(pcs);
  } else if (pcs) { $$(".pc", pcs).forEach(function (c) { c.classList.add("is-on"); }); }

  /* 21. Blog: search, topic filter, sort, show more, shareable #topic links */
  var list = $(".agrid");
  if (list) {
    var cards = $$(".acard", list), q = $("#blog-q"), fb = $$(".filt button"), sortSel = $("#sort"), status = $(".status"), moreBtn = $(".more button"), empty = $(".empty", list);
    var PAGE = 6, shown = PAGE, topic = "all", term = "";
    cards.forEach(function (c) { c._h = $("h3", c).textContent; c._p = $("p", c).textContent; c._t = (c.dataset.tags + " " + c._h + " " + c._p).toLowerCase(); });
    var esc = function (s) { return s.replace(/[&<>]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch]; }); };
    var mark = function (text) {
      if (!term) return esc(text);
      var i = text.toLowerCase().indexOf(term); if (i < 0) return esc(text);
      return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + term.length)) + "</mark>" + esc(text.slice(i + term.length));
    };
    var apply = function () {
      var key = sortSel ? sortSel.value : "new";
      cards.sort(function (a, b) {
        if (key === "read") return a.dataset.read - b.dataset.read;
        return key === "old" ? a.dataset.date.localeCompare(b.dataset.date) : b.dataset.date.localeCompare(a.dataset.date);
      }).forEach(function (c) { list.insertBefore(c, empty); });
      var hits = cards.filter(function (c) { return (topic === "all" || (" " + c.dataset.tags + " ").indexOf(" " + topic + " ") > -1) && (!term || c._t.indexOf(term) > -1); });
      cards.forEach(function (c) { c.hidden = true; });
      hits.forEach(function (c, i) { c.hidden = i >= shown; $("h3", c).innerHTML = mark(c._h); $("p", c).innerHTML = mark(c._p); });
      empty.hidden = hits.length > 0;
      moreBtn.parentNode.hidden = hits.length <= shown;
      var label = topic === "all" ? "" : " in " + fb.filter(function (b) { return b.dataset.topic === topic; })[0].dataset.name;
      status.innerHTML = "";
      var t = document.createElement("span");
      t.textContent = hits.length + (hits.length === 1 ? " article" : " articles") + label + (term ? ' matching "' + q.value.trim() + '"' : "");
      status.appendChild(t);
      if (topic !== "all" || term) { var r = document.createElement("button"); r.type = "button"; r.textContent = "Clear filters"; r.addEventListener("click", reset); status.appendChild(r); }
    };
    var setTopic = function (t, push) {
      topic = t; shown = PAGE;
      fb.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.topic === t)); });
      if (push) { try { history.replaceState(null, "", t === "all" ? location.pathname : "#topic-" + t); } catch (e) {} }
      apply();
    };
    var reset = function () { q.value = ""; term = ""; setTopic("all", true); q.focus(); };
    fb.forEach(function (b) { b.addEventListener("click", function () { setTopic(b.dataset.topic, true); track("blog_filter", { topic: b.dataset.topic }); }); });
    var tmr = 0;
    q.addEventListener("input", function () { clearTimeout(tmr); tmr = setTimeout(function () { term = q.value.trim().toLowerCase(); shown = PAGE; apply(); }, 120); });
    q.form.addEventListener("submit", function (e) {
      e.preventDefault(); term = q.value.trim().toLowerCase(); shown = PAGE; apply();
      document.documentElement.classList.add("cv-off");
      $("#articles").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      if (term) track("search", { search_term: term });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
    });
    if (sortSel) sortSel.addEventListener("change", apply);
    moreBtn.addEventListener("click", function () { shown += PAGE; apply(); });
    $$("[data-filter]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation(); setTopic(a.dataset.filter, true);
        document.documentElement.classList.add("cv-off");
        $("#articles").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      });
    });
    var fromHash = function () { var m = location.hash.match(/^#topic-([a-z-]+)$/); if (m && fb.some(function (b) { return b.dataset.topic === m[1]; })) { setTopic(m[1], false); return true; } return false; };
    if (!fromHash()) apply();
    window.addEventListener("hashchange", fromHash);
  }

  /* 22. Blog newsletter */
  var nl = $(".nl form");
  if (nl) {
    var em = $("input[type=email]", nl), msg = $(".nl-msg"), sb = $("button", nl), lbl = sb.innerHTML;
    nl.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = em.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { em.setAttribute("aria-invalid", "true"); msg.className = "nl-msg err"; msg.textContent = "Enter a valid email, like name@company.com."; em.focus(); return; }
      em.removeAttribute("aria-invalid"); sb.disabled = true; sb.textContent = "Subscribing…";
      fetch("/api/subscribe.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: v, website: $(".hp", nl).value }) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok && d.ok, d: d }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error(res.d.error || "Could not subscribe right now. Try again in a minute.");
          em.value = ""; msg.className = "nl-msg ok";
          msg.textContent = res.d.status === "already" ? "You're already on the list. Thanks!" : "You're subscribed. New articles will land in your inbox.";
          track("generate_lead", { form: "blog_newsletter" });
        })
        .catch(function (err) { msg.className = "nl-msg err"; msg.textContent = err.message; })
        .then(function () { sb.disabled = false; sb.innerHTML = lbl; });
    });
  }

  /* CTA clicks */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-track]");
    if (a) track(a.dataset.track, { location: a.dataset.loc || "" });
  });
})();
