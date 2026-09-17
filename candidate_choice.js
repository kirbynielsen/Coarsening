/* Candidate choice task (Part 2) external build. */
(function(){
  var CSS = "\n:root {\n  --color-background-primary: #ffffff;\n  --color-background-secondary: #f7f6f2;\n  --color-background-tertiary: #efede5;\n  --color-background-info: #E6F1FB;\n  --color-text-primary: #1a1a1a;\n  --color-text-secondary: #5f5e5a;\n  --color-text-tertiary: #888780;\n  --color-text-info: #185FA5;\n  --color-text-warning: #854F0B;\n  --color-border-tertiary: rgba(0,0,0,0.15);\n  --color-border-secondary: rgba(0,0,0,0.3);\n  --color-border-info: #378ADD;\n  --border-radius-md: 8px;\n  --border-radius-lg: 12px;\n  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;\n  --font-mono: 'SF Mono', Menlo, Consolas, monospace;\n  --light1-fill: #B8740F; --light1-stroke: #B8740F; --light1-bg: #F7EEDD; --light1-text: #6B4308; --light1-glow: #B8740F;\n  --light2-fill: #0F6E56; --light2-stroke: #0F6E56; --light2-bg: #E1F1EC; --light2-text: #084736; --light2-glow: #0F6E56;\n  --light3-fill: #534AB7; --light3-stroke: #534AB7; --light3-bg: #ECEAF8; --light3-text: #352E7A; --light3-glow: #534AB7;\n  --light4-fill: #B0357C; --light4-stroke: #B0357C; --light4-bg: #F7E4EF; --light4-text: #6E1F4C; --light4-glow: #B0357C;\n  --sound-fill: #185FA5; --sound-bg: #E6F1FB; --sound-text: #042C53;\n}\n* { box-sizing: border-box; }\n.pm-choice { font-family: var(--font-sans); max-width: 820px; margin: 0 auto; color: var(--color-text-primary); }\n\n/* chips (shared look with Part 1) */\n.mini-chip { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border: 1px solid var(--color-border-secondary); border-radius: 999px; box-sizing: border-box; font-size: 13px; vertical-align: middle; background: var(--color-background-primary); }\n.mini-chip.state-off { background: var(--color-background-tertiary); color: var(--color-text-secondary); }\n.mini-bulb { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex-shrink: 0; }\n.mini-bulb.off { background: transparent; border: 1.5px solid currentColor; }\n.mini-bulb.l1.on { background: var(--light1-stroke); border: 2px solid var(--light1-stroke); }\n.mini-bulb.l1.off { background: #fff; border: 2px solid var(--light1-stroke); }\n.mini-chip.l1.state-on { background: var(--light1-bg); border: 3px solid var(--light1-stroke); padding: 1px 8px; color: var(--color-text-primary); }\n.mini-chip.l1.state-off { background: #fff; border: 1px solid var(--light1-stroke); padding: 3px 10px; color: var(--color-text-primary); }\n.mini-chip.kind-var.l1 { background: var(--light1-bg); border-color: var(--light1-stroke); color: var(--light1-text); }\n.mini-bulb.l2.on { background: var(--light2-stroke); border: 2px solid var(--light2-stroke); }\n.mini-bulb.l2.off { background: #fff; border: 2px solid var(--light2-stroke); }\n.mini-chip.l2.state-on { background: var(--light2-bg); border: 3px solid var(--light2-stroke); padding: 1px 8px; color: var(--color-text-primary); }\n.mini-chip.l2.state-off { background: #fff; border: 1px solid var(--light2-stroke); padding: 3px 10px; color: var(--color-text-primary); }\n.mini-chip.kind-var.l2 { background: var(--light2-bg); border-color: var(--light2-stroke); color: var(--light2-text); }\n.mini-bulb.l3.on { background: var(--light3-stroke); border: 2px solid var(--light3-stroke); }\n.mini-bulb.l3.off { background: #fff; border: 2px solid var(--light3-stroke); }\n.mini-chip.l3.state-on { background: var(--light3-bg); border: 3px solid var(--light3-stroke); padding: 1px 8px; color: var(--color-text-primary); }\n.mini-chip.l3.state-off { background: #fff; border: 1px solid var(--light3-stroke); padding: 3px 10px; color: var(--color-text-primary); }\n.mini-chip.kind-var.l3 { background: var(--light3-bg); border-color: var(--light3-stroke); color: var(--light3-text); }\n.mini-bulb.l4.on { background: var(--light4-stroke); border: 2px solid var(--light4-stroke); }\n.mini-bulb.l4.off { background: #fff; border: 2px solid var(--light4-stroke); }\n.mini-chip.l4.state-on { background: var(--light4-bg); border: 3px solid var(--light4-stroke); padding: 1px 8px; color: var(--color-text-primary); }\n.mini-chip.l4.state-off { background: #fff; border: 1px solid var(--light4-stroke); padding: 3px 10px; color: var(--color-text-primary); }\n.mini-chip.kind-var.l4 { background: var(--light4-bg); border-color: var(--light4-stroke); color: var(--light4-text); }\n.mini-chip .hilo { font-size: 10px; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.03em; }\n.mini-bulb { width: 11px; height: 11px; box-sizing: border-box; }\n.bulb-cell { box-sizing: border-box; }\n\n/* recap */\n.recap { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px 16px; margin-bottom: 1.5rem; }\n.recap-head { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-tertiary); font-weight: 600; margin-bottom: 10px; }\n.recap-item { font-size: 13px; line-height: 1.5; padding: 6px 0; border-top: 0.5px solid var(--color-border-tertiary); display: flex; flex-wrap: wrap; align-items: center; gap: 5px; }\n.recap-item:first-of-type { border-top: none; }\n.recap-empty { font-size: 13px; color: var(--color-text-tertiary); font-style: italic; }\n.hist-among { color: var(--color-text-secondary); }\n.hist-arrow { color: var(--color-text-tertiary); margin: 0 3px; }\n.expr-conn { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); margin: 0 2px; }\n.pct-big { font-size: 14px; font-weight: 600; color: var(--color-text-primary); font-family: var(--font-mono); }\n.pct-none { color: var(--color-text-tertiary); }\n.pct-impossible { color: var(--color-text-info); font-weight: 600; }\n.spec-empty { color: var(--color-text-tertiary); font-style: italic; }\n\n/* choice arena */\n.cc-progress { font-size: 12px; color: var(--color-text-tertiary); font-family: var(--font-mono); margin-bottom: 6px; }\n.cc-instructions { font-size: 15px; color: var(--color-text-primary); margin-bottom: 16px; }\n.cc-arena { display: flex; align-items: stretch; justify-content: center; gap: 12px; flex-wrap: wrap; animation: ccIn 0.28s ease; }\n@keyframes ccIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }\n/* all three choices are equal-sized cards */\n.cc-card { display: flex; flex-direction: column; flex: 1 1 0; min-width: 150px; max-width: 300px; background: var(--color-background-primary); border: 2px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 16px; cursor: pointer; text-align: left; font-family: var(--font-sans); transition: border-color 0.12s, box-shadow 0.12s, transform 0.06s, opacity 0.2s; }\n.cc-card:hover { border-color: var(--color-border-info); box-shadow: 0 4px 16px rgba(0,0,0,0.10); }\n.cc-card:active { transform: translateY(1px); }\n.cc-card-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-secondary); margin-bottom: 12px; text-align: center; }\n.cc-attrs { display: flex; flex-direction: column; gap: 8px; align-items: center; }\n.cc-attr { display: flex; justify-content: center; }\n.cc-pick { margin-top: auto; padding-top: 14px; }\n.cc-pick span { display: block; font-size: 12px; font-weight: 600; color: var(--color-text-info); text-align: center; padding: 8px; border-radius: var(--border-radius-md); background: var(--color-background-info); transition: background 0.12s, color 0.12s; }\n/* the \"equal\" card */\n.cc-card-equal .cc-equal-body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--color-text-secondary); min-height: 60px; }\n.cc-equal-symbol { font-size: 34px; font-weight: 300; line-height: 1; color: var(--color-text-tertiary); }\n.cc-equal-text { font-size: 13px; }\n\n/* click feedback: selected card lights up, others fade, then it advances */\n.cc-arena.cc-locked .cc-card { cursor: default; }\n.cc-arena.cc-locked .cc-card:hover { box-shadow: none; }\n.cc-card.cc-dim { opacity: 0.3; border-color: var(--color-border-tertiary) !important; }\n.cc-card.cc-selected { border-color: var(--light2-fill); box-shadow: 0 0 0 4px var(--light2-bg); transform: translateY(-2px); }\n.cc-card.cc-selected .cc-pick span { background: var(--light2-fill); color: #fff; }\n.cc-card.cc-selected .cc-pick span::before { content: '\\2713\\00a0\\00a0'; }\n.cc-done { text-align: center; font-size: 16px; color: var(--light2-text); padding: 2rem; background: var(--light2-bg); border-radius: var(--border-radius-lg); }\n.cc-warn { font-size: 13px; color: var(--color-text-warning); font-style: italic; padding: 1rem; text-align: center; }\n\n.mini-chip.kind-sound.state-on { background: #fff; border: 1px solid #3d3c38; color: var(--color-text-primary); }\n.mini-chip.kind-sound.state-off { background: #fff; border: 1px solid var(--color-border-secondary); color: var(--color-text-tertiary); }\n.mini-chip.kind-var.sound { background: #fff; border-color: #3d3c38; color: var(--color-text-primary); }\n.recap-item[draggable=\"true\"] { cursor: grab; }\n.recap-item.dragging { opacity: 0.4; cursor: grabbing; }\n.recap-item.drag-over { box-shadow: 0 -2px 0 0 var(--color-border-info); }\n.drag-handle { cursor: grab; color: var(--color-text-tertiary); user-select: none; letter-spacing: -2px; margin-right: 4px; }\n.recap-hint { font-weight: 400; text-transform: none; letter-spacing: 0; color: var(--color-text-tertiary); }\n/* notes pad (optional free text; travels with the saved statistics) */\n.notes-pad { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px 16px; margin: 1.25rem 0 1rem; }\n.notes-head { font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); font-weight: 500; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }\n.notes-head .opt { text-transform: none; letter-spacing: 0; font-weight: 400; font-style: italic; }\n.notes-area { width: 100%; box-sizing: border-box; min-height: 84px; font-family: var(--font-sans); font-size: 13.5px; line-height: 1.5; padding: 10px 12px; border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); resize: vertical; color: var(--color-text-primary); background: #fff; }\n.notes-area:focus { outline: none; border-color: var(--color-border-info); box-shadow: 0 0 0 2px var(--color-background-info); }\n.notes-read { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px 16px; margin-bottom: 1.25rem; }\n.notes-read .notes-body { font-size: 13.5px; line-height: 1.6; white-space: pre-wrap; color: var(--color-text-primary); }\n.notes-read .notes-head { margin-bottom: 6px; }";
  var HTML = "<div class=\"pm-choice\">\n  <div class=\"recap\" id=\"recap\"></div>\n  <div id=\"choice\"></div>\n</div>\n<textarea id=\"pm-choice-data\" aria-hidden=\"true\" tabindex=\"-1\" style=\"position:absolute; left:-9999px; top:0; width:1px; height:1px; opacity:0;\"></textarea>";
  function boot(){ var root=document.getElementById("pm-choice-root"); if(!root){return setTimeout(boot,40);} if(root.getAttribute("data-pm-booted")){return;} root.setAttribute("data-pm-booted","1"); var ph=root.querySelectorAll(".pm-loading"); for(var i=0;i<ph.length;i++){ph[i].parentNode.removeChild(ph[i]);} var st=document.createElement("style"); st.textContent=CSS; (document.head||document.documentElement).appendChild(st); root.insertAdjacentHTML("beforeend",HTML); run(); }
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
    // -- trial generation (experiment.pdf, Section 5) --
    // Every distinct pair of relevant profiles (HH, HL, LH, LL -> 6 pairs) is shown
    // `repetitions` times. Irrelevant attributes are held at the constant c for both
    // candidates in every trial; c is drawn per participant unless given.
    relevantIndices: [1, 2],    // internal attributes that vary across candidates
    repetitions: 7,             // 6 pairs x 7 = 42 choices
    controls: 3,                // control rounds: both candidates identical (3 distinct relevant profiles, drawn at random); mixed into the sequence
    constant: null,             // c: 0/1 per attribute NOT in relevantIndices, in ascending attribute order; null = random per participant
    randomizeOrder: true,       // shuffle the 42 trials per participant
    randomizeSides: true,       // left/right drawn independently for every trial
    seed: null,                 // null = fresh randomness per participant; set an integer only for testing
    showTie: true,              // offer the "equally likely" option
    labelOrder: null,           // sigma; falls back to Part 1's (display-only, see explorer)
    instructions: 'Which candidate do you think is more likely to be successful?',
    trials: []                  // optional explicit override [{ id, left, right }] — bypasses the generator
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
  var PART1_STATUS = 'missing';
  function loadPart1() {
    var raw = null;
    try { var el = document.getElementById('pm-part1-data'); if (el && el.textContent && el.textContent.trim()) raw = el.textContent.trim(); } catch (_) {}
    // No localStorage fallback: inside the survey Part 1 must come from the pipe, so a
    // failed pipe is recorded (part1Loaded: false) instead of masked by stale data.
    if (!raw) { PART1_STATUS = 'missing'; return null; }
    var d; try { d = JSON.parse(raw); } catch (_) { PART1_STATUS = 'unparseable'; return null; }
    PART1_STATUS = 'ok';
    var t = d.treatment || {};
    return {
      participantId: d.participantId || null,
      results: d.results || [],
      notes: d.notes || null,
      model: d.model || t.model || null,
      distribution: d.distribution || t.distribution || null,
      labelOrder: d.labelOrder || t.labelOrder || null,
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
  const rng = (CFG.seed === null || CFG.seed === undefined) ? Math.random : mulberry32(CFG.seed | 0);

  const PID = (function () { try { const p = new URLSearchParams(location.search); return p.get('pid') || p.get('participant') || p.get('id') || (PART1 && PART1.participantId) || ('anon-' + Math.random().toString(36).slice(2, 10)); } catch (_) { return 'anon-' + Math.random().toString(36).slice(2, 10); } })();

  // ================= vars + chip rendering (shared look with Part 1) =================
  // sigma: LABEL_ORDER[n-1] = zero-based display position of internal attribute n (same as Part 1)
  const LABEL_ORDER = (function () {
    let lo = CFG.labelOrder || (PART1 && PART1.labelOrder) || null;
    if (Array.isArray(lo)) lo = lo.map(Number);
    const valid = lo && lo.length === N_ATTR && lo.slice().sort((a, b) => a - b).every((v, i) => v === i);
    if (!valid) { lo = []; for (let i = 0; i < N_ATTR; i++) lo.push(i); }
    return lo;
  })();
  const DISPLAY_ORDER = []; LABEL_ORDER.forEach((pos, i) => { DISPLAY_ORDER[pos] = i + 1; });
  const VARS = [];
  for (let n = 1; n <= N_ATTR; n++) {
    const pos = LABEL_ORDER[n - 1] + 1;
    VARS.push({ id: 'attr' + n, kind: 'attribute', n: n, pos: pos, label: (ATTR_LABELS && ATTR_LABELS[n - 1]) || ('Attribute ' + pos) });
  }
  VARS.push({ id: 'success', kind: 'outcome', label: OUTCOME_LABEL });
  const ATTRS_DISPLAY = VARS.filter(v => v.kind === 'attribute').sort((a, b) => a.pos - b.pos);
  function varById(id) { for (let i = 0; i < VARS.length; i++) if (VARS[i].id === id) return VARS[i]; return null; }
  function stateLabel(v, state) { const hi = state === 'on'; return v.kind === 'outcome' ? (hi ? SUCCESS_WORD : FAIL_WORD) : (hi ? 'high' : 'low'); }
  const OUTCOME_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  function valueChip(v, state) {
    if (!v) return '';
    if (v.kind === 'outcome') return '<span class="mini-chip kind-sound state-' + state + '">' + (state === 'on' ? OUTCOME_SVG : '') + stateLabel(v, state) + '</span>';
    return '<span class="mini-chip l' + v.pos + ' state-' + state + '"><span class="mini-bulb l' + v.pos + ' ' + state + '"></span>A' + v.pos + ' <span class="hilo">' + stateLabel(v, state) + '</span></span>';
  }
  function exprHTML(list) { return (list || []).map((e, i) => (i > 0 ? '<span class="expr-conn">' + (e.conn === 'or' ? 'or' : 'and') + '</span>' : '') + valueChip(varById(e.varId), e.state)).join(''); }

  // generate colour styles for attributes beyond the hard-coded 1–3
  (function ensureLightStyles() {
    const extra = VARS.filter(v => v.kind === 'attribute' && v.pos > 4);
    if (!extra.length) return;
    let css = '';
    extra.forEach(v => {
      const hue = Math.round((v.pos * 47) % 360);
      const fill = 'hsl(' + hue + ' 62% 52%)', stroke = 'hsl(' + hue + ' 62% 36%)', bg = 'hsl(' + hue + ' 62% 94%)', text = 'hsl(' + hue + ' 62% 28%)';
      const k = 'l' + v.pos;
      css += '.mini-bulb.' + k + '.on{background:' + stroke + ';border-color:' + text + ';}';
      css += '.mini-chip.' + k + '.state-on{background:#fff;border:3px solid ' + stroke + ';padding:1px 8px;}';
      const glow = 'hsl(' + hue + ' 62% 80%)', pale = 'hsl(' + hue + ' 62% 97%)', dot = 'hsl(' + hue + ' 62% 94%)';
      css += '.mini-bulb.' + k + '.off{background:#fff;border-color:' + stroke + ';}';
      css += '.mini-chip.' + k + '.state-off{background:#fff;border:1px solid ' + stroke + ';padding:3px 10px;}';
    });
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  })();

  // ================= Part 1 recap =================
  // ================= Part 1 recap (drag to reorder; order and moves are logged) =================
  const recapMoves = [];
  function notesHTML(notes) {
    var text = notes && typeof notes.text === 'string' ? notes.text.trim() : '';
    if (!text) return '';
    var esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return '<div class="notes-read"><div class="notes-head"><span>Your notes</span></div><div class="notes-body">' + esc + '</div></div>';
  }
  function renderRecap() {
    const host = document.getElementById('recap');
    if (!host) return;
    if (!CFG.showRecap) { host.style.display = 'none'; return; }
    const results = (PART1 && PART1.results) || [];
    if (!results.length) { host.innerHTML = notesHTML(PART1 && PART1.notes) + '<div class="recap-head">The statistics you requested</div><div class="recap-empty">No earlier queries were found for this session.</div>'; return; }
    const rows = results.map(function (r, i) {
      const cond = (r.conditions && r.conditions.length) ? exprHTML(r.conditions) : '';
      var answer;
      if (r.impossibleCondition) {
        answer = '<span class="pct-impossible">impossible &mdash; no candidate can be both high and low on the same attribute</span>';
      } else {
        const pct = (r.percentage == null) ? '<span class="pct-none">&mdash;</span>' : '<span class="pct-big">' + Number(r.percentage).toFixed(1) + '%</span>';
        answer = pct + ' <span class="hist-among">are</span> ' + exprHTML(r.target);
      }
      return '<div class="recap-item" draggable="true" data-idx="' + i + '" title="Drag to reorder"><span class="drag-handle">&#10303;</span><span class="hist-among">Among all candidates</span> ' + (cond ? '<span class="hist-among">with</span> ' + cond + ' ' : '') + '<span class="hist-arrow">&rarr;</span> ' + answer + '</div>';
    }).join('');
    host.innerHTML = notesHTML(PART1 && PART1.notes) + '<div class="recap-head">The statistics you requested <span class="recap-hint">&mdash; drag to reorder</span></div>' + rows;
    let src = null;
    host.querySelectorAll('.recap-item').forEach(function (item) {
      item.addEventListener('dragstart', function (e) { src = Number(item.dataset.idx); item.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', String(src)); } catch (_) {} });
      item.addEventListener('dragend', function () { item.classList.remove('dragging'); host.querySelectorAll('.recap-item').forEach(function (i) { i.classList.remove('drag-over'); }); });
      item.addEventListener('dragover', function (e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
      item.addEventListener('dragenter', function () { if (Number(item.dataset.idx) !== src) item.classList.add('drag-over'); });
      item.addEventListener('dragleave', function () { item.classList.remove('drag-over'); });
      item.addEventListener('drop', function (e) {
        e.preventDefault();
        const dst = Number(item.dataset.idx);
        if (src === null || src === dst) return;
        const moved = results.splice(src, 1)[0];
        results.splice(dst, 0, moved);
        recapMoves.push({ queryNum: moved.queryNum, fromIndex: src, toIndex: dst, duringTrial: current + 1, t: Date.now() - T0 });
        src = null;
        renderRecap();
        save();
      });
    });
  }

  // ================= trials =================
  function parseVal(x) { return (x === true || x === 1 || x === '1' || /^h/i.test(String(x))); } // "high"/1/true => high
  function toProfile(spec) {
    const arr = new Array(N_ATTR).fill(false);
    if (Array.isArray(spec)) spec.forEach(function (v, i) { if (i < N_ATTR) arr[i] = parseVal(v); });
    else if (spec && typeof spec === 'object') Object.keys(spec).forEach(function (k) { const i = parseInt(k, 10) - 1; if (i >= 0 && i < N_ATTR) arr[i] = parseVal(spec[k]); });
    return arr;
  }
  // ----- generator: every distinct pair of relevant profiles, `repetitions` times -----
  // Relevant profile keys use the internal order of relevantIndices, e.g. "10" = x1 high, x2 low.
  const REL = (Array.isArray(CFG.relevantIndices) ? CFG.relevantIndices : [1, 2]).map(Number).filter(function (i) { return i >= 1 && i <= N_ATTR; });
  const IRREL = []; for (let n = 1; n <= N_ATTR; n++) if (REL.indexOf(n) === -1) IRREL.push(n);
  // c: the constant value of each irrelevant attribute (in ascending internal order); drawn per participant
  const CONST = (function () {
    let c = Array.isArray(CFG.constant) ? CFG.constant.map(function (v) { return parseVal(v) ? 1 : 0; }) : null;
    if (!c || c.length !== IRREL.length) c = IRREL.map(function () { return rng() < 0.5 ? 1 : 0; });
    return c;
  })();
  function fullProfile(relKey) {           // relevant key -> internal 0/1 array of length N_ATTR
    const arr = new Array(N_ATTR).fill(false);
    REL.forEach(function (n, b) { arr[n - 1] = relKey.charAt(b) === '1'; });
    IRREL.forEach(function (n, b) { arr[n - 1] = CONST[b] === 1; });
    return arr;
  }
  function relKeys() {                     // all 2^|REL| relevant profiles, "11","10","01","00"
    const out = []; const m = 1 << REL.length;
    for (let v = m - 1; v >= 0; v--) { let s = ''; for (let b = REL.length - 1; b >= 0; b--) s += ((v >> b) & 1) ? '1' : '0'; out.push(s); }
    return out;
  }
  function hl(key) { return key.replace(/1/g, 'H').replace(/0/g, 'L'); }
  const CONTROL_KEYS = [];
  function generateTrials() {
    const keys = relKeys(); const out = []; const reps = Math.max(1, CFG.repetitions | 0);
    for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) {
      const pairId = hl(keys[i]) + '-' + hl(keys[j]);
      for (let r = 1; r <= reps; r++) out.push({ id: pairId + '#' + r, pairId: pairId, rep: r, a: keys[i], b: keys[j], left: fullProfile(keys[i]), right: fullProfile(keys[j]), swapped: false, control: false });
    }
    // control rounds: identical candidates; distinct profiles drawn at random (irrelevant attributes = c, as everywhere)
    const nCtrl = Math.max(0, Math.min(keys.length, CFG.controls | 0));
    const pool = keys.slice();
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
    for (let c = 0; c < nCtrl; c++) {
      const k = pool[c]; CONTROL_KEYS.push(k);
      out.push({ id: 'CTRL-' + hl(k), pairId: 'CTRL-' + hl(k), rep: 1, a: k, b: k, left: fullProfile(k), right: fullProfile(k), swapped: false, control: true });
    }
    return out;
  }
  let trials = CFG.trials.length
    ? CFG.trials.map(function (t, idx) { return { id: (t.id != null ? String(t.id) : ('trial' + (idx + 1))), pairId: null, rep: null, a: null, b: null, left: toProfile(t.left), right: toProfile(t.right), swapped: false }; })
    : generateTrials();
  if (CFG.randomizeOrder) { for (let i = trials.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const tmp = trials[i]; trials[i] = trials[j]; trials[j] = tmp; } }
  if (CFG.randomizeSides) trials.forEach(function (t) { if (rng() < 0.5) { const l = t.left; t.left = t.right; t.right = l; t.swapped = true; } });

  const T0 = Date.now();
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

  // displayed words keyed by the label the participant saw (in display order)
  function profileWords(profile) { const o = {}; ATTRS_DISPLAY.forEach(function (v) { o[v.label] = profile[v.n - 1] ? 'high' : 'low'; }); return o; }
  // internal 0/1 vector, index = internal attribute - 1
  function profileBits(profile) { return profile.map(function (b) { return b ? 1 : 0; }); }
  function candidateCardHTML(profile, side, label) {
    let chips = '';
    ATTRS_DISPLAY.forEach(function (v) { chips += '<div class="cc-attr">' + valueChip(v, profile[v.n - 1] ? 'on' : 'off') + '</div>'; });
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
        (CFG.showTie === false ? '' : equalCardHTML()) +
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
      // which relevant profile was chosen (internal key, e.g. "10"), or 'equal'
      const chosenKey = which === 'equal' ? 'equal' : (which === 'left' ? (t.swapped ? t.b : t.a) : (t.swapped ? t.a : t.b));
      choices.push({
        trialId: t.id,
        pairId: t.pairId,                      // e.g. "HH-HL" (relevant attributes, internal order); "CTRL-HL" for a control round
        control: t.control === true,           // both candidates identical
        rep: t.rep,                            // 1..repetitions
        order: current + 1,                    // position in this participant's sequence
        choice: which,                         // 'left' | 'right' | 'equal'
        chosen: chosenKey,                     // relevant profile chosen (internal), or 'equal'
        leftInternal: profileBits(t.left),     // full internal 0/1 vector shown on the left
        rightInternal: profileBits(t.right),
        candidateA: profileWords(t.left),      // as displayed (labels under sigma), left
        candidateB: profileWords(t.right),     // as displayed, right
        swapped: t.swapped,                    // true = pair's first profile was shown on the right
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
        model: (PART1 && PART1.model) || null,
        distribution: (PART1 && PART1.distribution) || null,
        nAttributes: N_ATTR,
        labelOrder: LABEL_ORDER,               // sigma (display positions of internal attributes)
        displayOrder: DISPLAY_ORDER,           // internal attribute shown in each position
        relevantIndices: REL,
        irrelevantIndices: IRREL,
        constant: CONST,                       // c, aligned with irrelevantIndices
        repetitions: CFG.trials.length ? null : (CFG.repetitions | 0),
        controls: CFG.trials.length ? 0 : CONTROL_KEYS.length,
        controlProfiles: CONTROL_KEYS.slice(),   // relevant keys used for the identical-candidate rounds
        randomizeOrder: !!CFG.randomizeOrder, randomizeSides: !!CFG.randomizeSides, showTie: CFG.showTie !== false
      },
      part1Loaded: PART1_STATUS === 'ok',      // false = the Part 1 pipe was empty or unparseable (see part1Status)
      part1Status: PART1_STATUS,
      recapOrder: ((PART1 && PART1.results) || []).map(function (r) { return r.queryNum; }),
      recapMoves: recapMoves,
      numTrials: trials.length,
      numAnswered: choices.length,
      choices: choices
    };
  }
  function save() {
    const json = JSON.stringify(currentData()).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');   // HTML-safe (this text is piped into a <div> on the advice page)
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
