#!/usr/bin/env node
/* Сборка отчёта в статические страницы.
 *
 *   node src/build-site.js
 *
 * На выходе index.html (русская) и en/index.html (английская) в корне.
 * Весь текст отчёта попадает в HTML на этапе сборки, поэтому страница читается
 * и при полностью отключённом JavaScript. Скрипт добавляет только фильтры,
 * переключатель темы и отметки собственного прогона.
 */
const fs = require("fs");
const path = require("path");

const SRC = __dirname;                     // исходники лежат рядом со сборщиком
const OUT = path.join(__dirname, "..");    // готовые страницы — в корне репозитория

const { AREAS, TECHS, I18N } = require(path.join(SRC, "i18n.js"));
global.window = {};
require(path.join(SRC, "defects.js"));
require(path.join(SRC, "cases.js"));
const D = global.window.DEFECTS;
const C = global.window.CASES;

const CSS = fs.readFileSync(path.join(SRC, "styles.css"), "utf8");
const APP = fs.readFileSync(path.join(SRC, "app.js"), "utf8");

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const attr = s => esc(s).replace(/\n/g, " ");

const NAVS = [["scope","s_scope"],["tech","s_tech"],["defects","s_def"],["suite","s_suite"],["matrix","s_matrix"],["auto","s_auto"]];
const PRI = ["P0","P1","P2","P3"];
const bugById = id => D.find(b => b.id === id);
const areaName  = (k, L) => (AREAS.find(a => a.k === k) || {})[L] || k;
const areaShort = (k, L) => (AREAS.find(a => a.k === k) || {})[L === "ru" ? "rs" : "es"] || k;

const nCrit = D.filter(b => b.sev === "crit").length;
const nMajor = D.filter(b => b.sev === "major").length;
const nMinor = D.filter(b => b.sev === "minor").length;
const nExec = C.filter(c => c.s !== "todo").length;
const nOk = C.filter(c => c.s === "ok").length;

function page(L) {
  const t = I18N[L];
  const other = L === "ru" ? "en" : "ru";
  const otherHref = L === "ru" ? "en/index.html" : "../index.html";
  const selfHref = "index.html";

  /* ── рельс ── */
  const navLinks = NAVS.map(([id, key]) => {
    const n = id === "tech" ? Object.keys(TECHS).length
            : id === "defects" ? D.length
            : id === "suite" ? C.length : "";
    return `<a href="#${id}">${esc(t[key])}${n !== "" ? `<span class="n">${n}</span>` : ""}</a>`;
  }).join("");

  const pills = (items, group) => items.map(i =>
    `<button class="pill" type="button" data-group="${group}" data-k="${attr(i.v)}" aria-pressed="false">${esc(i.l)}</button>`).join("");

  const rail = `<nav class="rail" aria-label="${attr(t.nav)}">
  <details class="railtools" id="railtools" open>
    <summary><span>${esc(t.tools)}</span><span class="caret" aria-hidden="true">▾</span></summary>
    <div class="rail-block">
      <span class="eyebrow">${esc(t.nav)}</span>
      <div class="rail-nav">${navLinks}</div>
    </div>
    <div class="rail-block js-only" hidden>
      <span class="eyebrow">${esc(t.run)}</span>
      <div class="progress-wrap">
        <div class="progress-bar" id="pbar"><span></span><span></span><span></span></div>
        <div class="progress-legend" id="plegend"></div>
      </div>
    </div>
    <div class="rail-block filters js-only" hidden>
      <span class="eyebrow">${esc(t.filters)}</span>
      <input class="search" id="q" type="search" placeholder="${attr(t.search)}" aria-label="${attr(t.search)}">
      <div class="fgroup"><span>${esc(t.fpri)}</span><div class="pills">${pills(PRI.map(p => ({v:p,l:p})), "pri")}</div></div>
      <div class="fgroup"><span>${esc(t.fstat)}</span><div class="pills">${pills([["bug",t.stFull.bug],["ok",t.stFull.ok],["todo",t.stFull.todo]].map(([v,l]) => ({v,l})), "status")}</div></div>
      <div class="fgroup"><span>${esc(t.farea)}</span><div class="pills">${pills(AREAS.filter(a => C.some(c => c.a === a.k)).map(a => ({v:a.k,l:areaShort(a.k,L)})), "area")}</div></div>
    </div>
  </details>
</nav>`;

  /* ── шапка ── */
  const lede = esc(t.lede[0])
    + `<strong>${C.length} ${esc(t.lede[1].replace("%TC% ",""))}</strong>`
    + esc(t.lede[2])
    + `<strong>${D.length} ${esc(t.lede[3].replace("%DEF% ",""))}</strong>`
    + esc(t.lede[4]);

  const meta = t.meta.map(([k, v]) =>
    `<div><dt>${esc(k)}</dt><dd${k === "Точка входа" || k === "Entry point" ? ' class="mono"' : ""}>${esc(v)}</dd></div>`).join("");

  const nums = { tc: C.length, exec: nExec, crit: nCrit, major: nMajor, minor: nMinor, ok: nOk };
  const cls  = { tc: "acc", exec: "acc", crit: "crit", major: "major", minor: "minor", ok: "pass" };
  const verdict = t.vcells.map(([k, lab]) =>
    `<div class="vcell c-${cls[k]}"><span class="num">${nums[k]}</span><span class="lab">${esc(lab)}</span></div>`).join("");

  const tldrLines = t.tldrLines.map(([h, d]) =>
    `<div class="tldr-line"><span class="dot"></span><div><b>${esc(h)}</b> ${esc(d)}</div></div>`).join("");

  const header = `<div class="switches">
  <div class="seg" role="group" aria-label="Language">
    <a href="${L === "ru" ? selfHref : "../index.html"}"${L === "ru" ? ' aria-current="page"' : ""}>RU</a>
    <a href="${L === "en" ? selfHref : "en/index.html"}"${L === "en" ? ' aria-current="page"' : ""}>EN</a>
  </div>
  <div class="seg js-only" id="theme-seg" role="group" aria-label="Theme" hidden></div>
</div>
<header class="top">
  <div class="title-row">
    <div style="display:flex;flex-direction:column;gap:8px">
      <span class="eyebrow">${esc(t.src)}</span>
      <h1>${esc(t.h1)}</h1>
    </div>
  </div>
  <p class="lede">${lede}</p>
  <dl class="meta-grid">${meta}</dl>
  <div class="tldr">
    <div class="tldr-head"><h2>${esc(t.tldrH)}</h2><span>${esc(t.tldrSub)}</span></div>
    <div class="tldr-body">
      <p style="font-size:14.5px;color:var(--muted);max-width:74ch">${esc(t.tldrIntro)}</p>
      <div class="tldr-lines">${tldrLines}</div>
    </div>
    <div class="verdict">${verdict}</div>
  </div>
</header>`;

  /* ── разделы ── */
  const scope = `<section id="scope">
  <div class="sec-head"><h2>${esc(t.s_scope)}</h2></div>
  <div class="prose">${t.scope.map(p => `<p>${esc(p)}</p>`).join("")}</div>
</section>`;

  const techRows = Object.entries(TECHS).map(([k, v]) => {
    const [name, desc] = v[L];
    return `<tr><td class="id">${k}</td><td style="font-weight:500;color:var(--ink)">${esc(name)}</td><td style="max-width:62ch">${esc(desc)}</td><td class="num">${C.filter(c => c.t === k).length}</td></tr>`;
  }).join("");

  const tech = `<section id="tech">
  <div class="sec-head"><h2>${esc(t.s_tech)}</h2><span class="count">${Object.keys(TECHS).length} ${esc(t.techWord)}</span></div>
  <div class="prose" style="margin-bottom:18px"><p>${esc(t.techIntro)}</p></div>
  <div class="tablewrap"><table><thead><tr>${t.techHead.map((h, i) => `<th${i === 3 ? ' style="text-align:right"' : ""}>${esc(h)}</th>`).join("")}</tr></thead><tbody>${techRows}</tbody></table></div>
</section>`;

  const defects = D.map(b => {
    const X = b[L];
    const cases = C.filter(c => c.b === b.id).map(c => c.id);
    return `<details class="defect sev-${b.sev}" id="${b.id}">
  <summary>
    <span class="did">${b.id}</span>
    <span class="dtitle">${esc(X.t)}</span>
    <span class="dmeta"><span class="chip ${b.sev}">${esc(t.sevN[b.sev])}</span><span class="chip plain">${esc(areaShort(b.area, L))}</span></span>
  </summary>
  <div class="dbody">
    ${X.d ? `<div class="dfield"><span>${esc(t.dDesc)}</span><div>${esc(X.d)}</div></div>` : ""}
    <div class="dfield"><span>${esc(t.dSteps)}</span><ol>${X.s.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div>
    <div class="dfield res actual"><span>${esc(t.dAct)}</span><div>${esc(X.a)}</div></div>
    <div class="dfield res expected"><span>${esc(t.dExp)}</span><div>${esc(X.e)}</div></div>
    <div class="dfield"><span>${esc(t.dFix)}</span><div>${esc(X.f)}</div></div>
    <div class="dfield"><span>${esc(t.dCode)}</span><div class="codelist">${b.c.map(x => `<span>${esc(x)}</span>`).join("")}</div></div>
    ${cases.length ? `<div class="dfield"><span>${esc(t.dCases)}</span><div class="mono" style="color:var(--muted)">${cases.join(" · ")}</div></div>` : ""}
  </div>
</details>`;
  }).join("");

  const defectsSec = `<section id="defects">
  <div class="sec-head"><h2>${esc(t.s_def)}</h2><span class="count">${esc(t.countDef(D.length, nCrit, nMajor, nMinor))}</span></div>
  <div class="note" style="margin-bottom:16px">${esc(t.defNote)}</div>
  <div class="defects">${defects}</div>
</section>`;

  const caseHTML = c => {
    const X = c[L];
    const klass = c.s === "bug" ? "is-bug" : c.s === "ok" ? "is-ok" : "";
    const chip = c.s === "bug" ? `<span class="chip crit">${esc(t.stN.bug)}</span>`
               : c.s === "ok" ? `<span class="chip pass">${esc(t.stN.ok)}</span>`
               : `<span class="chip plain">${esc(t.stN.todo)}</span>`;
    const bug = c.b ? bugById(c.b) : null;
    const hay = [c.id, X.n, X.pre, X.st.join(" "), X.e, X.r || "", c.b || "", c.t].join(" ").toLowerCase();
    return `<details class="case ${klass}" id="${c.id}" data-p="${c.p}" data-s="${c.s}" data-a="${c.a}" data-hay="${attr(hay)}">
  <summary>
    <span class="cid">${c.id}</span>
    <span class="ctitle">${esc(X.n)}</span>
    <span class="cmeta"><span class="chip plain">${c.p}</span><span class="chip plain">${c.t}</span>${chip}<span class="rundot js-only" data-for="${c.id}" hidden></span></span>
  </summary>
  <div class="cbody">
    <div class="cfield"><span>${esc(t.cPre)}</span><div>${esc(X.pre)}</div></div>
    <div class="cfield"><span>${esc(t.cSteps)}</span><ol>${X.st.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
    <div class="cfield"><span>${esc(t.cExp)}</span><div>${esc(X.e)}</div></div>
    ${X.r ? `<div class="cfield ${c.s === "bug" ? "act" : ""}"><span>${esc(t.cAct)}</span><div>${esc(X.r)}</div></div>` : ""}
    ${bug ? `<div class="cfield"><span>${esc(t.cDef)}</span><div><a href="#${bug.id}" class="mono">${bug.id}</a> — ${esc(bug[L].t)}</div></div>` : ""}
    <div class="runbar js-only" data-run="${c.id}" hidden>
      <span>${esc(t.run)}</span>
      <button class="runbtn" type="button" data-v="pass" aria-pressed="false">${esc(t.pass)}</button>
      <button class="runbtn" type="button" data-v="fail" aria-pressed="false">${esc(t.fail)}</button>
      <button class="runbtn" type="button" data-v="block" aria-pressed="false">${esc(t.block)}</button>
    </div>
  </div>
</details>`;
  };

  const groups = AREAS.map(a => ({ a, list: C.filter(c => c.a === a.k) })).filter(g => g.list.length)
    .map(g => {
      const bugs = g.list.filter(c => c.s === "bug").length;
      return `<div class="areagroup" data-area="${g.a.k}">
  <div class="areahead"><h3>${esc(areaName(g.a.k, L))}</h3><span class="n">${g.list.length} ${esc(t.casesWord)}${bugs ? ` · ${bugs} ${esc(t.withBug)}` : ""}</span></div>
  ${g.list.map(caseHTML).join("")}
</div>`;
    }).join("");

  const suite = `<section id="suite">
  <div class="sec-head"><h2>${esc(t.s_suite)}</h2><span class="count">${esc(t.countSuite(C.length, nExec))}</span></div>
  <div class="note" style="margin-bottom:18px">${esc(t.suiteNote)}</div>
  <div class="cases">${groups}</div>
  <div class="empty" id="case-empty" hidden>${esc(t.emptyMsg)}</div>
</section>`;

  const matrixRows = AREAS.map(a => {
    const cs = C.filter(c => c.a === a.k);
    if (!cs.length) return "";
    const techs = [...new Set(cs.map(c => c.t))];
    const ids = [...new Set(cs.filter(c => c.b).map(c => c.b))];
    const crit = ids.filter(id => (bugById(id) || {}).sev === "crit").length;
    return `<tr><td style="font-weight:500;color:var(--ink)">${esc(areaName(a.k, L))}</td>
    <td class="mono" style="color:var(--muted)">${techs.join(" ")}</td>
    <td class="num">${cs.length}</td><td class="num">${ids.length}</td>
    <td class="num" style="color:${crit ? "var(--crit)" : "var(--faint)"}">${crit || "—"}</td></tr>`;
  }).join("");

  const matrix = `<section id="matrix">
  <div class="sec-head"><h2>${esc(t.s_matrix)}</h2></div>
  <div class="prose" style="margin-bottom:16px"><p>${esc(t.matrixIntro)}</p></div>
  <div class="tablewrap"><table><thead><tr>${t.matrixHead.map((h, i) => `<th${i > 1 ? ' style="text-align:right"' : ""}>${esc(h)}</th>`).join("")}</tr></thead><tbody>${matrixRows}</tbody></table></div>
</section>`;

  const auto = `<section id="auto">
  <div class="sec-head"><h2>${esc(t.s_auto)}</h2></div>
  <div class="cols2">${t.auto.map(([h, items]) =>
    `<div class="card"><h3>${esc(h)}</h3><ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
</section>`;

  const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%90%9E%3C/text%3E%3C/svg%3E";
  const desc = L === "ru"
    ? "163 тест-кейса и 78 задокументированных дефектов тестового задания Wiregate."
    : "163 test cases and 78 documented defects from the Wiregate test assignment.";

  return `<!doctype html>
<html lang="${L}" data-ui="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="${attr(desc)}">
<meta property="og:title" content="${attr(t.h1)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:type" content="website">
<link rel="icon" href="${favicon}">
<link rel="alternate" hreflang="${other}" href="${otherHref}">
<title>${esc(t.h1)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap">
<style>
html{color-scheme:light dark}
body{margin:0}
img{max-width:100%}
[hidden]{display:none!important}
${CSS}
</style>
</head>
<body>
<div class="shell">
${rail}
<main>
${header}
${scope}
${tech}
${defectsSec}
${suite}
${matrix}
${auto}
<footer>${esc(t.footer)}</footer>
</main>
</div>
<script>
${APP}
</script>
</body>
</html>
`;
}

fs.mkdirSync(path.join(OUT, "en"), { recursive: true });
const ru = page("ru"), en = page("en");
fs.writeFileSync(path.join(OUT, "index.html"), ru);
fs.writeFileSync(path.join(OUT, "en", "index.html"), en);
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

const kb = s => Math.round(Buffer.byteLength(s, "utf8") / 1024);
console.log(`index.html        ${kb(ru)} КБ  ${D.length} дефектов, ${C.length} кейсов, русский`);
console.log(`en/index.html     ${kb(en)} КБ  то же, английский`);
console.log("Весь текст в разметке: страница читается без JavaScript.");
