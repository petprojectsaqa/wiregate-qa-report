/* Прогрессивное улучшение уже отрисованной страницы.
   Если этот скрипт не выполнится, отчёт всё равно читается целиком:
   пропадут только фильтры, переключатель темы и отметки прогона. */
(function () {
  "use strict";

  var LANG = document.documentElement.lang === "en" ? "en" : "ru";
  var S = {
    ru: { legend: ["прошли", "упали", "блокированы", "ждут"], light: "Светлая тема", dark: "Тёмная тема" },
    en: { legend: ["passed", "failed", "blocked", "pending"], light: "Light theme", dark: "Dark theme" }
  }[LANG];

  /* показываем всё, что имеет смысл только со скриптом */
  var jsOnly = document.querySelectorAll(".js-only");
  for (var i = 0; i < jsOnly.length; i++) jsOnly[i].hidden = false;

  var cases = [].slice.call(document.querySelectorAll(".case"));
  var groups = [].slice.call(document.querySelectorAll(".areagroup"));

  function store(key, value) {
    try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); }
    catch (e) { return null; }
  }

  /* ── тема ── */
  var SUN = '<svg viewBox="0 0 20 20" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="10" r="3.6" fill="currentColor" stroke="none"/><path d="M10 1.6v2M10 16.4v2M1.6 10h2M16.4 10h2M4.1 4.1l1.4 1.4M14.5 14.5l1.4 1.4M15.9 4.1l-1.4 1.4M5.5 14.5l-1.4 1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 20 20" width="13" height="13" aria-hidden="true"><path d="M16.3 12.6A7.1 7.1 0 0 1 7.4 3.7a7.1 7.1 0 1 0 8.9 8.9z" fill="currentColor"/></svg>';

  var themeSeg = document.getElementById("theme-seg");
  var theme = store("wg-theme") || document.documentElement.getAttribute("data-ui") || "light";

  function applyTheme() {
    document.documentElement.setAttribute("data-ui", theme);
    var bs = themeSeg ? themeSeg.querySelectorAll("button") : [];
    for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", String(bs[i].getAttribute("data-v") === theme));
  }
  if (themeSeg) {
    themeSeg.innerHTML =
      '<button type="button" data-v="light" title="' + S.light + '" aria-label="' + S.light + '" style="display:flex;align-items:center">' + SUN + "</button>" +
      '<button type="button" data-v="dark" title="' + S.dark + '" aria-label="' + S.dark + '" style="display:flex;align-items:center">' + MOON + "</button>";
    themeSeg.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button") : null;
      if (!b) return;
      theme = b.getAttribute("data-v");
      store("wg-theme", theme);
      applyTheme();
    });
  }
  applyTheme();

  /* ── свой прогон ── */
  var run = {};
  try { run = JSON.parse(store("wg-run") || "{}") || {}; } catch (e) { run = {}; }

  function saveRun() { store("wg-run", JSON.stringify(run)); }

  function syncCase(id) {
    var bar = document.querySelector('[data-run="' + id + '"]');
    if (bar) {
      var bs = bar.querySelectorAll(".runbtn");
      for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", String(run[id] === bs[i].getAttribute("data-v")));
    }
    var dot = document.querySelector('.rundot[data-for="' + id + '"]');
    if (dot) { if (run[id]) dot.setAttribute("data-v", run[id]); else dot.removeAttribute("data-v"); }
  }

  var pbar = document.getElementById("pbar");
  var plegend = document.getElementById("plegend");

  function renderProgress() {
    if (!pbar || !plegend) return;
    var total = cases.length, p = 0, f = 0, b = 0;
    for (var i = 0; i < cases.length; i++) {
      var v = run[cases[i].id];
      if (v === "pass") p++; else if (v === "fail") f++; else if (v === "block") b++;
    }
    var seg = pbar.children;
    seg[0].style.cssText = "width:" + (p / total * 100) + "%;background:var(--pass)";
    seg[1].style.cssText = "width:" + (f / total * 100) + "%;background:var(--crit)";
    seg[2].style.cssText = "width:" + (b / total * 100) + "%;background:var(--major)";
    plegend.innerHTML =
      "<span><b>" + p + "</b> " + S.legend[0] + "</span>" +
      "<span><b>" + f + "</b> " + S.legend[1] + "</span>" +
      "<span><b>" + b + "</b> " + S.legend[2] + "</span>" +
      "<span><b>" + (total - p - f - b) + "</b> " + S.legend[3] + "</span>";
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".runbtn") : null;
    if (!btn) return;
    e.preventDefault();
    var bar = btn.closest("[data-run]");
    if (!bar) return;
    var id = bar.getAttribute("data-run"), v = btn.getAttribute("data-v");
    if (run[id] === v) delete run[id]; else run[id] = v;
    saveRun(); syncCase(id); renderProgress();
  });

  for (var k = 0; k < cases.length; k++) syncCase(cases[k].id);
  renderProgress();

  /* ── фильтры ── */
  var state = { q: "", pri: {}, status: {}, area: {} };
  var anyOn = function (o) { for (var x in o) if (o[x]) return true; return false; };

  function apply() {
    var shown = 0;
    for (var i = 0; i < cases.length; i++) {
      var c = cases[i], ok = true;
      if (anyOn(state.pri) && !state.pri[c.getAttribute("data-p")]) ok = false;
      if (ok && anyOn(state.status) && !state.status[c.getAttribute("data-s")]) ok = false;
      if (ok && anyOn(state.area) && !state.area[c.getAttribute("data-a")]) ok = false;
      if (ok && state.q && c.getAttribute("data-hay").indexOf(state.q) === -1) ok = false;
      c.hidden = !ok;
      if (ok) shown++;
    }
    for (var g = 0; g < groups.length; g++) {
      var list = groups[g].querySelectorAll(".case"), vis = false;
      for (var j = 0; j < list.length; j++) if (!list[j].hidden) { vis = true; break; }
      groups[g].hidden = !vis;
    }
    var empty = document.getElementById("case-empty");
    if (empty) empty.hidden = shown > 0;
  }

  var pills = document.querySelectorAll(".pill");
  for (var pi = 0; pi < pills.length; pi++) {
    pills[pi].addEventListener("click", function () {
      var g = this.getAttribute("data-group"), k = this.getAttribute("data-k");
      state[g][k] = !state[g][k];
      this.setAttribute("aria-pressed", String(!!state[g][k]));
      apply();
    });
  }

  var q = document.getElementById("q");
  if (q) q.addEventListener("input", function () { state.q = this.value.trim().toLowerCase(); apply(); });

})();
