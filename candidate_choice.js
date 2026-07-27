/* Candidate choice task (Part 2) external build. */
(function(){
  var CSS = "\n:root {\n  --color-background-primary: #ffffff;\n  --color-background-secondary: #f7f6f2;\n  --color-background-tertiary: #efede5;\n  --color-background-info: #E6F1FB;\n  --color-text-primary: #1a1a1a;\n  --color-text-secondary: #5f5e5a;\n  --color-text-tertiary: #888780;\n  --color-text-info: #185FA5;\n  --color-text-warning: #854F0B;\n  --color-border-tertiary: rgba(0,0,0,0.15);\n  --color-border-secondary: rgba(0,0,0,0.3);\n  --color-border-info: #378ADD;\n  --border-radius-md: 8px;\n  --border-radius-lg: 12px;\n  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;\n  --font-mono: 'SF Mono', Menlo, Consolas, monospace;\n  --light1-fill: #EF9F27; --light1-stroke: #BA7517; --light1-bg: #FAEEDA; --light1-text: #854F0B;\n  --light2-fill: #1D9E75; --light2-stroke: #0F6E56; --light2-bg: #E1F5EE; --light2-text: #085041;\n  --light3-fill: #7F77DD; --light3-stroke: #534AB7; --light3-bg: #EEEDFE; --light3-text: #3C3489;\n  --sound-fill: #185FA5; --sound-bg: #E6F1FB; --sound-text: #042C53;\n}\n* { box-sizing: border-box; }\n.pm-choice { font-family: var(--font-sans); max-width: 820px; margin: 0 auto; color: var(--color-text-primary); }\n\n/* chips (shared look with Part 1) */\n.mini-chip { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border: 0.5px solid var(--color-border-secondary); border-radius: 999px; font-size: 13px; vertical-align: middle; background: var(--color-background-primary); }\n.mini-chip.l1.state-on { background: var(--light1-bg); border-color: var(--light1-fill); color: var(--light1-text); }\n.mini-chip.l2.state-on { background: var(--light2-bg); border-color: var(--light2-fill); color: var(--light2-text); }\n.mini-chip.l3.state-on { background: var(--light3-bg); border-color: var(--light3-fill); color: var(--light3-text); }\n.mini-chip.state-off { background: var(--color-background-tertiary); color: var(--color-text-secondary); }\n.mini-chip.kind-sound.state-on { background: var(--sound-bg); border-color: var(--sound-fill); color: var(--sound-text); }\n.mini-bulb { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex-shrink: 0; }\n.mini-bulb.l1.on { background: var(--light1-fill); border: 1.5px solid var(--light1-stroke); }\n.mini-bulb.l2.on { background: var(--light2-fill); border: 1.5px solid var(--light2-stroke); }\n.mini-bulb.l3.on { background: var(--light3-fill); border: 1.5px solid var(--light3-stroke); }\n.mini-bulb.off { background: transparent; border: 1.5px solid currentColor; }\n\n/* recap */\n.recap { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px 16px; margin-bottom: 1.5rem; }\n.recap-head { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-tertiary); font-weight: 600; margin-bottom: 10px; }\n.recap-item { font-size: 13px; line-height: 1.5; padding: 6px 0; border-top: 0.5px solid var(--color-border-tertiary); display: flex; flex-wrap: wrap; align-items: center; gap: 5px; }\n.recap-item:first-of-type { border-top: none; }\n.recap-empty { font-size: 13px; color: var(--color-text-tertiary); font-style: italic; }\n.hist-among { color: var(--color-text-secondary); }\n.hist-arrow { color: var(--color-text-tertiary); margin: 0 3px; }\n.expr-conn { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); margin: 0 2px; }\n.pct-big { font-size: 14px; font-weight: 600; color: var(--color-text-primary); font-family: var(--font-mono); }\n.pct-none { color: var(--color-text-tertiary); }\n.spec-empty { color: var(--color-text-tertiary); font-style: italic; }\n\n/* choice arena */\n.cc-progress { font-size: 12px; color: var(--color-text-tertiary); font-family: var(--font-mono); margin-bottom: 6px; }\n.cc-instructions { font-size: 15px; color: var(--color-text-primary); margin-bottom: 16px; }\n.cc-arena { display: flex; align-items: stretch; justify-content: center; gap: 12px; flex-wrap: wrap; animation: ccIn 0.28s ease; }\n@keyframes ccIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }\n/* all three choices are equal-sized cards */\n.cc-card { display: flex; flex-direction: column; flex: 1 1 0; min-width: 150px; max-width: 300px; background: var(--color-background-primary); border: 2px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 16px; cursor: pointer; text-align: left; font-family: var(--font-sans); transition: border-color 0.12s, box-shadow 0.12s, transform 0.06s, opacity 0.2s; }\n.cc-card:hover { border-color: var(--color-border-info); box-shadow: 0 4px 16px rgba(0,0,0,0.10); }\n.cc-card:active { transform: translateY(1px); }\n.cc-card-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-secondary); margin-bottom: 12px; text-align: center; }\n.cc-attrs { display: flex; flex-direction: column; gap: 8px; align-items: center; }\n.cc-attr { display: flex; justify-content: center; }\n.cc-pick { margin-top: auto; padding-top: 14px; }\n.cc-pick span { display: block; font-size: 12px; font-weight: 600; color: var(--color-text-info); text-align: center; padding: 8px; border-radius: var(--border-radius-md); background: var(--color-background-info); transition: background 0.12s, color 0.12s; }\n/* the \"equal\" card */\n.cc-card-equal .cc-equal-body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--color-text-secondary); min-height: 60px; }\n.cc-equal-symbol { font-size: 34px; font-weight: 300; line-height: 1; color: var(--color-text-tertiary); }\n.cc-equal-text { font-size: 13px; }\n\n/* click feedback: selected card lights up, others fade, then it advances */\n.cc-arena.cc-locked .cc-card { cursor: default; }\n.cc-arena.cc-locked .cc-card:hover { box-shadow: none; }\n.cc-card.cc-dim { opacity: 0.3; border-color: var(--color-border-tertiary) !important; }\n.cc-card.cc-selected { border-color: var(--light2-fill); box-shadow: 0 0 0 4px var(--light2-bg); transform: translateY(-2px); }\n.cc-card.cc-selected .cc-pick span { background: var(--light2-fill); color: #fff; }\n.cc-card.cc-selected .cc-pick span::before { content: '\\2713\\00a0\\00a0'; }\n.cc-done { text-align: center; font-size: 16px; color: var(--light2-text); padding: 2rem; background: var(--light2-bg); border-radius: var(--border-radius-lg); }\n.cc-warn { font-size: 13px; color: var(--color-text-warning); font-style: italic; padding: 1rem; text-align: center; }\n";
  var HTML = "<div class=\"pm-choice\">\n  <div class=\"recap\" id=\"recap\"></div>\n  <div id=\"choice\"></div>\n</div>\n<textarea id=\"pm-choice-data\" aria-hidden=\"true\" tabindex=\"-1\" style=\"position:absolute; left:-9999px; top:0; width:1px; height:1px; opacity:0;\"></textarea>";
  function boot(){
    if (window["__pmBooted_pm_choice_root"]) return;            // mount only once, even if the script loads twice
    var root=document.getElementById("pm-choice-root");
    if(!root){return setTimeout(boot,40);}
    window["__pmBooted_pm_choice_root"]=true;
    var st=document.createElement("style"); st.textContent=CSS; (document.head||document.documentElement).appendChild(st);
    root.insertAdjacentHTML("beforeend",HTML);
    run();
  }
  function run(){

(function () {
  // ================= configuration =================
  // Provide via window.PM_CHOICE_CONFIG, a hidden <div id="pm-choice-config">JSON</div>,
  // a Qualtrics embedded field "pm_choice", or ?choice=JSON in the URL.
  const DEFAULTS = {
    nAttributes: null,          // falls back to Part 1's value if not set
    attributeLabels: null,      // falls back to Part 1's labels
    outcomeLabel: null, successWord: null, failWord: null,
    showRecap: true,
    randomizeOrder: false,      // shuffle trial order (seeded)
    randomizeSides: false,      // randomly swap which candidate is on the left (recorded)
    seed: 1,
    instructions: 'Which candidate do you think is more likely to be successful?',
    trials: []                  // [{ id, left, right }] — see notes at bottom of file
  };
  function mergeInto(dst, src) { if (src && typeof src === 'object') Object.assign(dst, src); return dst; }
  function readConfig() {
    let cfg = {};
    if (window.PM_CHOICE_CONFIG && typeof window.PM_CHOICE_CONFIG === 'object') mergeInto(cfg, window.PM_CHOICE_CONFIG);
    try { const el = document.getElementById('pm-choice-config'); if (el && el.textContent && el.textContent.trim()) mergeInto(cfg, JSON.parse(el.textContent.trim())); } catch (_) {}
    try { const p = new URLSearchParams(location.search); if (p.get('choice')) { try { mergeInto(cfg, JSON.parse(p.get('choice'))); } catch (_) {} } } catch (_) {}
    const c = Object.assign({}, DEFAULTS, cfg);
    if (!Array.isArray(c.trials)) c.trials = [];
    return c;
  }
  const CFG = readConfig();

  // Part 1's data can arrive two ways: piped forward from the query question into a
  // hidden <div id="pm-part1-data"> (reliable, survives across pages), or via
  // localStorage (same-browser fallback). Handle either JSON shape.
  function loadPart1() {
    var raw = null;
    try { var el = document.getElementById('pm-part1-data'); if (el && el.textContent && el.textContent.trim()) raw = el.textContent.trim(); } catch (_) {}
    if (!raw) { try { raw = localStorage.getItem('candidateExplorer.part1'); } catch (_) {} }
    if (!raw) return null;
    var d; try { d = JSON.parse(raw); } catch (_) { return null; }
    var t = d.treatment || {};
    return {
      participantId: d.participantId || null,
      results: d.results || [],
      nAttributes: d.nAttributes || t.nAttributes || null,
      attributeLabels: d.attributeLabels || null,
      outcomeLabel: d.outcomeLabel || t.outcomeLabel || null,
      successWord: d.successWord || t.successWord || null,
      failWord: d.failWord || t.failWord || null,
      relevantIndices: d.relevantIndices || t.relevantIndices || null,
      irrelevantRate: (d.irrelevantRate != null) ? d.irrelevantRate : ((t.irrelevantRate != null) ? t.irrelevantRate : null)
    };
  }
  const PART1 = loadPart1();

  // resolve attribute count / labels (Part 1 fills gaps)
  const N_ATTR = Math.max(1, (CFG.nAttributes || (PART1 && PART1.nAttributes) || 4) | 0);
  const ATTR_LABELS = CFG.attributeLabels || (PART1 && PART1.attributeLabels) || null;
  const OUTCOME_LABEL = CFG.outcomeLabel || (PART1 && PART1.outcomeLabel) || 'Outcome';
  const SUCCESS_WORD = CFG.successWord || (PART1 && PART1.successWord) || 'successful';
  const FAIL_WORD = CFG.failWord || (PART1 && PART1.failWord) || 'unsuccessful';

  function mulberry32(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = seed; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const rng = mulberry32(CFG.seed | 0);

  const PID = (function () { try { const p = new URLSearchParams(location.search); return p.get('pid') || p.get('participant') || p.get('id') || (PART1 && PART1.participantId) || ('anon-' + Math.random().toString(36).slice(2, 10)); } catch (_) { return 'anon-' + Math.random().toString(36).slice(2, 10); } })();

  // ================= vars + chip rendering (shared look with Part 1) =================
  const VARS = [];
  for (let n = 1; n <= N_ATTR; n++) VARS.push({ id: 'attr' + n, kind: 'attribute', n: n, label: (ATTR_LABELS && ATTR_LABELS[n - 1]) || ('Attribute ' + n) });
  VARS.push({ id: 'success', kind: 'outcome', label: OUTCOME_LABEL });
  function varById(id) { for (let i = 0; i < VARS.length; i++) if (VARS[i].id === id) return VARS[i]; return null; }
  function stateLabel(v, state) { const hi = state === 'on'; return v.kind === 'outcome' ? (hi ? SUCCESS_WORD : FAIL_WORD) : (hi ? 'high' : 'low'); }
  const OUTCOME_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  function valueChip(v, state) {
    if (!v) return '';
    if (v.kind === 'outcome') return '<span class="mini-chip kind-sound state-' + state + '">' + OUTCOME_SVG + stateLabel(v, state) + '</span>';
    return '<span class="mini-chip l' + v.n + ' state-' + state + '"><span class="mini-bulb l' + v.n + ' ' + state + '"></span>A' + v.n + ' ' + stateLabel(v, state) + '</span>';
  }
  function exprHTML(list) { return (list || []).map((e, i) => (i > 0 ? '<span class="expr-conn">' + (e.conn === 'or' ? 'or' : 'and') + '</span>' : '') + valueChip(varById(e.varId), e.state)).join(''); }

  // generate colour styles for attributes beyond the hard-coded 1–3
  (function ensureLightStyles() {
    const extra = VARS.filter(v => v.kind === 'attribute' && v.n > 3);
    if (!extra.length) return;
    let css = '';
    extra.forEach(v => {
      const hue = Math.round((v.n * 47) % 360);
      const fill = 'hsl(' + hue + ' 62% 52%)', stroke = 'hsl(' + hue + ' 62% 36%)', bg = 'hsl(' + hue + ' 62% 94%)', text = 'hsl(' + hue + ' 62% 28%)';
      const k = 'l' + v.n;
      css += '.mini-bulb.' + k + '.on{background:' + fill + ';border-color:' + stroke + ';}';
      css += '.mini-chip.' + k + '.state-on{background:' + bg + ';border-color:' + fill + ';color:' + text + ';}';
    });
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  })();

  // ================= Part 1 recap =================
  function renderRecap() {
    const host = document.getElementById('recap');
    if (!host) return;
    if (!CFG.showRecap) { host.style.display = 'none'; return; }
    const results = (PART1 && PART1.results) || [];
    if (!results.length) { host.innerHTML = '<div class="recap-head">Your previous searches:</div><div class="recap-empty">No earlier queries were found for this session.</div>'; return; }
    const rows = results.map(function (r) {
      const cond = (r.conditions && r.conditions.length) ? exprHTML(r.conditions) : '<span class="spec-empty">all candidates</span>';
      const pct = (r.percentage == null) ? '<span class="pct-none">—</span>' : '<span class="pct-big">' + Number(r.percentage).toFixed(1) + '%</span>';
      return '<div class="recap-item"><span class="hist-among">Among candidates with</span> ' + cond + ' <span class="hist-arrow">&rarr;</span> ' + pct + ' <span class="hist-among">are</span> ' + exprHTML(r.target) + '</div>';
    }).join('');
    host.innerHTML = '<div class="recap-head">Your previous searches:</div>' + rows;
  }

  // ================= trials =================
  function parseVal(x) { return (x === true || x === 1 || x === '1' || /^h/i.test(String(x))); } // "high"/1/true => high
  function toProfile(spec) {
    const arr = new Array(N_ATTR).fill(false);
    if (Array.isArray(spec)) spec.forEach(function (v, i) { if (i < N_ATTR) arr[i] = parseVal(v); });
    else if (spec && typeof spec === 'object') Object.keys(spec).forEach(function (k) { const i = parseInt(k, 10) - 1; if (i >= 0 && i < N_ATTR) arr[i] = parseVal(spec[k]); });
    return arr;
  }
  let trials = CFG.trials.map(function (t, idx) {
    return { id: (t.id != null ? String(t.id) : ('trial' + (idx + 1))), left: toProfile(t.left), right: toProfile(t.right), swapped: false };
  });
  if (CFG.randomizeOrder) { for (let i = trials.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const tmp = trials[i]; trials[i] = trials[j]; trials[j] = tmp; } }
  if (CFG.randomizeSides) trials.forEach(function (t) { if (rng() < 0.5) { const l = t.left; t.left = t.right; t.right = l; t.swapped = true; } });

  let current = 0;
  const choices = [];
  let trialStart = 0;

  // signal (once) that every trial is answered, so the survey can reveal its Next button
  window.PM_CHOICE_DONE = false;
  let completeSignaled = false;
  function signalComplete() {
    if (completeSignaled) return;
    completeSignaled = true;
    window.PM_CHOICE_DONE = true;
    try { document.dispatchEvent(new Event('pmChoiceComplete')); } catch (_) {}
  }

  function profileWords(profile) { const o = {}; for (let n = 1; n <= N_ATTR; n++) o[VARS[n - 1].label] = profile[n - 1] ? 'high' : 'low'; return o; }
  function candidateCardHTML(profile, side, label) {
    let chips = '';
    for (let n = 1; n <= N_ATTR; n++) chips += '<div class="cc-attr">' + valueChip(varById('attr' + n), profile[n - 1] ? 'on' : 'off') + '</div>';
    return '<button type="button" class="cc-card" data-choice="' + side + '"><div class="cc-card-title">' + label + '</div><div class="cc-attrs">' + chips + '</div><div class="cc-pick"><span>Choose this candidate</span></div></button>';
  }
  function equalCardHTML() {
    return '<button type="button" class="cc-card cc-card-equal" data-choice="equal"><div class="cc-card-title">Tie</div><div class="cc-equal-body"><span class="cc-equal-symbol">=</span><span class="cc-equal-text">Equally likely</span></div><div class="cc-pick"><span>They’re equal</span></div></button>';
  }
  let locked = false;
  function renderTrial() {
    const host = document.getElementById('choice');
    if (!host) return;
    if (!trials.length) { host.innerHTML = '<div class="cc-warn">No choice trials were configured.</div>'; signalComplete(); return; }
    if (current >= trials.length) { host.innerHTML = '<div class="cc-done">&#10003; All done &mdash; you can continue below.</div>'; save(); signalComplete(); return; }
    const t = trials[current];
    host.innerHTML =
      '<div class="cc-progress">Choice ' + (current + 1) + ' of ' + trials.length + '</div>' +
      (CFG.instructions ? '<div class="cc-instructions">' + CFG.instructions + '</div>' : '') +
      '<div class="cc-arena" id="cc-arena">' +
        candidateCardHTML(t.left, 'left', 'Candidate A') +
        equalCardHTML() +
        candidateCardHTML(t.right, 'right', 'Candidate B') +
      '</div>';
    const btns = host.querySelectorAll('[data-choice]');
    for (let i = 0; i < btns.length; i++) btns[i].addEventListener('click', function () { onChoose(this); });
    trialStart = Date.now();
  }
  function onChoose(btnEl) {
    if (locked) return;              // ignore extra clicks during the feedback pause
    locked = true;
    const which = btnEl.getAttribute('data-choice');
    const rt = Date.now() - trialStart;
    const arena = document.getElementById('cc-arena');
    if (arena) {
      arena.classList.add('cc-locked');
      const cards = arena.querySelectorAll('.cc-card');
      for (let i = 0; i < cards.length; i++) cards[i].classList.add(cards[i] === btnEl ? 'cc-selected' : 'cc-dim');
    }
    const t = trials[current];
    setTimeout(function () {
      choices.push({
        trialId: t.id,
        order: current + 1,
        choice: which,                         // 'left' | 'right' | 'equal'
        candidateA: profileWords(t.left),      // displayed left
        candidateB: profileWords(t.right),     // displayed right
        swappedFromConfig: t.swapped,
        rtMs: rt
      });
      save();
      current++;
      locked = false;
      renderTrial();
    }, 550);
  }

  // ================= data out =================
  function currentData() {
    return {
      participantId: PID,
      part: 'choice',
      treatment: {
        nAttributes: N_ATTR,
        relevantIndices: (PART1 && PART1.relevantIndices) || null,
        irrelevantRate: (PART1 && PART1.irrelevantRate != null) ? PART1.irrelevantRate : null
      },
      numTrials: trials.length,
      numAnswered: choices.length,
      choices: choices
    };
  }
  function save() {
    const json = JSON.stringify(currentData());
    const out = document.getElementById('pm-choice-data'); if (out) out.value = json;
    try { localStorage.setItem('candidateExplorer.choices', json); } catch (_) {}
    // Best-effort live push; authoritative save is in the question's addOnPageSubmit.
    try {
      const qe = window.Qualtrics && Qualtrics.SurveyEngine;
      if (qe && typeof qe.setJSEmbeddedData === 'function') qe.setJSEmbeddedData('candidateChoiceData', json);
    } catch (_) {}
    return json;
  }
  window.getCandidateChoiceData = function () { return save(); };

  // ================= init =================
  renderRecap();
  renderTrial();
  save();
})();

  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",boot);}else{boot();}
})();
