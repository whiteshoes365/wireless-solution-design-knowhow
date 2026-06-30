/* ============ 무선모듈 HW 지식 베이스 — 렌더러/라우터/검색 ============ */
(function () {
  "use strict";
  const KB = window.KB_CONTENT;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---- index for search ---- */
  const index = []; // {chapId, chapTitle, secId, secTitle, text}
  KB.chapters.forEach(ch => ch.sections.forEach(sec => {
    const text = blocksToText(sec.blocks);
    index.push({ chapId: ch.id, chapTitle: ch.title, secId: sec.id, secTitle: sec.title, text });
  }));

  function blocksToText(blocks) {
    return (blocks || []).map(b => {
      switch (b.t) {
        case "p": case "h": return strip(b.html || b.text || "");
        case "list": case "check": return (b.items || []).map(strip).join(" ");
        case "note": return strip((b.title || "") + " " + (b.html || ""));
        case "fig": return strip(b.caption || "");
        case "table": return [(b.head || []).join(" "), ...(b.rows || []).map(r => r.join(" "))].join(" ");
        case "kv": return (b.rows || []).map(r => r.join(" ")).join(" ");
        default: return "";
      }
    }).join(" ");
  }
  function strip(h) { const d = el("div", null, h); return d.textContent || ""; }
  function esc(s) { return (s || "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }

  /* ---- block renderer ---- */
  function renderBlock(b) {
    switch (b.t) {
      case "p": return el("p", "blk blk-p", b.html);
      case "h": return el("h4", "blk-h", esc(b.text));
      case "list": {
        const ul = el(b.ordered ? "ol" : "ul", "blk blk-list");
        (b.items || []).forEach(i => ul.appendChild(el("li", null, i)));
        return ul;
      }
      case "check": {
        const ul = el("ul", "blk checklist");
        (b.items || []).forEach(i => ul.appendChild(el("li", null, i)));
        return ul;
      }
      case "table": {
        const wrap = el("div", "blk tbl-wrap");
        const t = el("table", "blk-table");
        if (b.head) {
          const thead = el("thead"); const tr = el("tr");
          b.head.forEach(h => tr.appendChild(el("th", null, esc(h))));
          thead.appendChild(tr); t.appendChild(thead);
        }
        const tb = el("tbody");
        (b.rows || []).forEach(r => {
          const tr = el("tr");
          r.forEach(c => tr.appendChild(el("td", null, c)));
          tb.appendChild(tr);
        });
        t.appendChild(tb); wrap.appendChild(t); return wrap;
      }
      case "kv": {
        const wrap = el("div", "blk kv-wrap");
        const t = el("table", "blk-kv"); const tb = el("tbody");
        (b.rows || []).forEach(([k, v]) => {
          const tr = el("tr");
          tr.appendChild(el("td", null, esc(k)));
          tr.appendChild(el("td", null, v));
          tb.appendChild(tr);
        });
        t.appendChild(tb); wrap.appendChild(t); return wrap;
      }
      case "note": {
        const icons = { tip: "💡", warn: "⚠️", why: "❓왜?", info: "ℹ️" };
        const kind = b.kind || "info";
        const n = el("div", "note " + kind);
        const label = (icons[kind] || "ℹ️") + " " + (b.title || "");
        n.appendChild(el("div", "note-title", esc(label)));
        n.appendChild(el("div", "note-body", b.html));
        return n;
      }
      case "fig": {
        const f = el("figure", "blk blk-fig");
        const box = el("div", "fig-box", b.svg);
        f.appendChild(box);
        if (b.caption) f.appendChild(el("figcaption", null, b.caption));
        return f;
      }
      case "autocheck": return renderAutoCheck();
      default: return el("div");
    }
  }

  /* ---- auto-aggregated master checklist (from all `check` blocks) ---- */
  function renderAutoCheck() {
    const wrap = el("div", "blk autocheck");
    let total = 0;
    KB.chapters.forEach(ch => {
      const items = [];
      ch.sections.forEach(sec => {
        (sec.blocks || []).forEach(b => {
          if (b.t === "check") (b.items || []).forEach(i => items.push({ i, secId: sec.id, secTitle: sec.title }));
        });
      });
      if (!items.length) return;
      total += items.length;
      const grp = el("div", "ac-grp");
      grp.appendChild(el("div", "ac-grp-h",
        `<span>${ch.icon || ""} ${esc(ch.title)}</span><span class="ac-cnt">${items.length}</span>`));
      const ul = el("ul", "checklist ac-list");
      items.forEach(({ i, secId, secTitle }) => {
        const li = el("li", null, i + ` <a class="ac-src" href="#${secId}" title="${esc(secTitle)}">↗</a>`);
        ul.appendChild(li);
      });
      grp.appendChild(ul);
      wrap.appendChild(grp);
    });
    const cap = el("div", "ac-total", `총 ${total}개 점검 항목 · 단계별로 빠짐없이 확인하세요`);
    wrap.insertBefore(cap, wrap.firstChild);
    return wrap;
  }

  /* ---- sidebar ---- */
  function buildSidebar() {
    const nav = $("#nav");
    nav.innerHTML = "";
    KB.chapters.forEach(ch => {
      const wrap = el("div", "nav-chapter");
      wrap.dataset.chap = ch.id;
      const btn = el("button", null,
        `<span>${ch.icon || ""}</span><span>${esc(ch.title)}</span><span class="chev">▾</span>`);
      btn.addEventListener("click", () => wrap.classList.toggle("collapsed"));
      wrap.appendChild(btn);
      const secWrap = el("div", "nav-sections");
      ch.sections.forEach(sec => {
        const a = el("a", null, esc(sec.title));
        a.href = "#" + sec.id;
        a.dataset.sec = sec.id;
        secWrap.appendChild(a);
      });
      wrap.appendChild(secWrap);
      nav.appendChild(wrap);
    });
  }

  /* ---- render a chapter page ---- */
  function renderChapter(chapId, focusSecId) {
    const ch = KB.chapters.find(c => c.id === chapId) || KB.chapters[0];
    const main = $("#main");
    main.innerHTML = "";
    const head = el("div", "page-head");
    head.appendChild(el("div", "crumb", esc(KB.meta.title)));
    head.appendChild(el("h2", null, (ch.icon ? ch.icon + " " : "") + esc(ch.title)));
    main.appendChild(head);

    ch.sections.forEach(sec => {
      const s = el("section", "section");
      s.id = sec.id;
      const h3 = el("h3", null, esc(sec.title) +
        ` <a class="anchor" href="#${sec.id}" title="이 섹션 링크 복사">#</a>`);
      h3.querySelector(".anchor").addEventListener("click", e => {
        e.preventDefault();
        copySectionLink(sec.id, e.currentTarget);
      });
      s.appendChild(h3);
      (sec.blocks || []).forEach(b => s.appendChild(renderBlock(b)));
      main.appendChild(s);
    });

    main.appendChild(buildChapterNav(chapId));

    const f = el("div", "footer",
      `${esc(KB.meta.title)} · v${KB.meta.version} · 최종 업데이트 ${KB.meta.updated}<br>` +
      `콘텐츠는 <code>assets/data/content.js</code>에서 계층적으로 관리·확장됩니다.`);
    main.appendChild(f);

    setActiveNav(chapId, focusSecId);
    if (focusSecId) {
      const t = document.getElementById(focusSecId);
      if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      main.scrollTop = 0; window.scrollTo(0, 0);
    }
    closeDrawer();
  }

  /* ---- chapter prev/next navigation ---- */
  function buildChapterNav(chapId) {
    const idx = KB.chapters.findIndex(c => c.id === chapId);
    const prev = KB.chapters[idx - 1];
    const next = KB.chapters[idx + 1];
    const nav = el("nav", "chap-nav");
    const mk = (ch, dir) => {
      if (!ch) { nav.appendChild(el("span", "chap-nav-spacer")); return; }
      const a = el("a", "chap-nav-btn " + dir,
        `<span class="cn-dir">${dir === "prev" ? "← 이전" : "다음 →"}</span>` +
        `<span class="cn-ttl">${ch.icon || ""} ${esc(ch.title)}</span>`);
      a.href = "#" + ch.id;
      nav.appendChild(a);
    };
    mk(prev, "prev"); mk(next, "next");
    return nav;
  }

  /* ---- copy section deep-link ---- */
  function copySectionLink(secId, btn) {
    const url = location.origin + location.pathname + "#" + secId;
    const done = () => {
      const old = btn.textContent; btn.textContent = "✓";
      btn.classList.add("copied");
      setTimeout(() => { btn.textContent = old; btn.classList.remove("copied"); }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(() => { location.hash = secId; });
    } else { location.hash = secId; }
  }

  function setActiveNav(chapId, secId) {
    document.querySelectorAll(".nav-chapter").forEach(w => {
      const on = w.dataset.chap === chapId;
      w.classList.toggle("collapsed", !on);
    });
    document.querySelectorAll(".nav-sections a").forEach(a => {
      a.classList.toggle("active", a.dataset.sec === (secId || ""));
    });
  }

  /* ---- routing via hash (section id) ---- */
  function findChapterOfSection(secId) {
    for (const ch of KB.chapters)
      if (ch.sections.some(s => s.id === secId)) return ch.id;
    return null;
  }
  function route() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!hash) { renderChapter(KB.chapters[0].id); return; }
    const chapId = findChapterOfSection(hash);
    if (chapId) renderChapter(chapId, hash);
    else if (KB.chapters.some(c => c.id === hash)) renderChapter(hash);
    else renderChapter(KB.chapters[0].id);
  }

  /* ---- scroll-spy: highlight section in view ---- */
  function setupScrollSpy() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          document.querySelectorAll(".nav-sections a").forEach(a =>
            a.classList.toggle("active", a.dataset.sec === id));
        }
      });
    }, { rootMargin: "-10% 0px -75% 0px", threshold: 0 });
    document.querySelectorAll(".section").forEach(s => obs.observe(s));
    window.__kbObserver = obs;
  }

  /* ---- search ---- */
  function runSearch(q) {
    q = q.trim().toLowerCase();
    const main = $("#main");
    if (!q) { route(); return; }
    const terms = q.split(/\s+/).filter(Boolean);
    const hits = index.map(item => {
      const hay = (item.secTitle + " " + item.chapTitle + " " + item.text).toLowerCase();
      let score = 0;
      terms.forEach(t => {
        if (item.secTitle.toLowerCase().includes(t)) score += 5;
        const m = hay.split(t).length - 1; score += m;
      });
      return { item, score };
    }).filter(h => h.score > 0).sort((a, b) => b.score - a.score).slice(0, 30);

    main.innerHTML = "";
    const head = el("div", "page-head");
    head.appendChild(el("div", "crumb", "검색"));
    head.appendChild(el("h2", null, `🔍 "${esc(q)}" — ${hits.length}건`));
    main.appendChild(head);

    if (!hits.length) {
      main.appendChild(el("div", "search-empty", "일치하는 내용이 없습니다."));
      return;
    }
    hits.forEach(({ item }) => {
      const s = el("section", "section");
      const a = el("a", null, "");
      a.href = "#" + item.secId;
      a.style.textDecoration = "none";
      const h3 = el("h3", null, highlight(item.secTitle, terms));
      h3.style.cursor = "pointer";
      h3.addEventListener("click", () => { location.hash = item.secId; });
      s.appendChild(el("div", "crumb", esc(item.chapTitle)));
      s.appendChild(h3);
      s.appendChild(el("p", "blk-p", snippet(item.text, terms)));
      main.appendChild(s);
    });
  }
  function highlight(text, terms) {
    let t = esc(text);
    terms.forEach(term => {
      if (!term) return;
      const re = new RegExp("(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      t = t.replace(re, "<mark>$1</mark>");
    });
    return t;
  }
  function snippet(text, terms) {
    const lower = text.toLowerCase();
    let pos = -1;
    for (const t of terms) { const p = lower.indexOf(t); if (p >= 0) { pos = p; break; } }
    if (pos < 0) pos = 0;
    const start = Math.max(0, pos - 60);
    const seg = (start > 0 ? "…" : "") + text.slice(start, start + 200) + "…";
    return highlight(seg, terms);
  }

  /* ---- theme ---- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("kb-theme", t); } catch (e) {}
    const btn = $("#themeBtn");
    if (btn) btn.textContent = t === "light" ? "🌙 다크" : "☀️ 라이트";
  }

  /* ---- drawer (mobile) ---- */
  function openDrawer() { $("#sidebar").classList.add("open"); $("#backdrop").classList.add("show"); }
  function closeDrawer() { $("#sidebar").classList.remove("open"); $("#backdrop").classList.remove("show"); }

  /* ---- print: render whole site, then trigger print dialog ---- */
  function printAll() {
    const main = $("#main");
    main.innerHTML = "";
    const head = el("div", "page-head");
    head.appendChild(el("h2", null, esc(KB.meta.title)));
    head.appendChild(el("div", "crumb", esc(KB.meta.subtitle) +
      ` · v${KB.meta.version} · ${KB.meta.updated}`));
    main.appendChild(head);
    KB.chapters.forEach(ch => {
      main.appendChild(el("h2", "print-chap", (ch.icon ? ch.icon + " " : "") + esc(ch.title)));
      ch.sections.forEach(sec => {
        const s = el("section", "section");
        s.id = sec.id;
        s.appendChild(el("h3", null, esc(sec.title)));
        (sec.blocks || []).forEach(b => s.appendChild(renderBlock(b)));
        main.appendChild(s);
      });
    });
    window.scrollTo(0, 0);
    document.body.classList.add("printing");
    setTimeout(() => {
      window.print();
      document.body.classList.remove("printing");
    }, 300);
  }

  /* ---- init ---- */
  function init() {
    $("#brandTitle").textContent = KB.meta.title;
    $("#brandSub").textContent = KB.meta.subtitle;
    $("#brandVer").textContent = "v" + KB.meta.version + " · " + KB.meta.updated;
    $("#topTitle").textContent = KB.meta.title;
    document.title = KB.meta.title;

    buildSidebar();

    let theme = "dark";
    try { theme = localStorage.getItem("kb-theme") || "dark"; } catch (e) {}
    applyTheme(theme);

    const search = $("#search");
    let timer;
    search.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => runSearch(search.value), 150);
    });
    search.addEventListener("keydown", e => {
      if (e.key === "Escape") { search.value = ""; route(); }
    });

    $("#themeBtn").addEventListener("click", () =>
      applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light"));
    $("#expandBtn").addEventListener("click", () => {
      const collapse = !document.querySelector(".nav-chapter.collapsed");
      document.querySelectorAll(".nav-chapter").forEach(w => w.classList.toggle("collapsed", collapse));
    });
    $("#menuBtn").addEventListener("click", openDrawer);
    $("#backdrop").addEventListener("click", closeDrawer);
    const pb = $("#printBtn"); if (pb) pb.addEventListener("click", printAll);

    window.addEventListener("hashchange", () => {
      if (search.value) search.value = "";
      route();
      setTimeout(setupScrollSpy, 50);
    });

    route();
    setTimeout(setupScrollSpy, 50);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
