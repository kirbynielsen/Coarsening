/* Search recap widget. */
(function(){
  var CSS = "\n:root {\n  --color-background-primary: #ffffff;\n  --color-background-secondary: #f7f6f2;\n  --color-background-tertiary: #efede5;\n  --color-text-primary: #1a1a1a;\n  --color-text-secondary: #5f5e5a;\n  --color-text-tertiary: #888780;\n  --color-text-info: #185FA5;\n  --color-border-tertiary: rgba(0,0,0,0.15);\n  --color-border-secondary: rgba(0,0,0,0.3);\n  --border-radius-md: 8px;\n  --border-radius-lg: 12px;\n  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;\n  --font-mono: 'SF Mono', Menlo, Consolas, monospace;\n  --light1-fill: #B8740F; --light1-stroke: #B8740F; --light1-bg: #F7EEDD; --light1-text: #6B4308; --light1-glow: #B8740F;\n  --light2-fill: #0F6E56; --light2-stroke: #0F6E56; --light2-bg: #E1F1EC; --light2-text: #084736; --light2-glow: #0F6E56;\n  --light3-fill: #534AB7; --light3-stroke: #534AB7; --light3-bg: #ECEAF8; --light3-text: #352E7A; --light3-glow: #534AB7;\n  --light4-fill: #B0357C; --light4-stroke: #B0357C; --light4-bg: #F7E4EF; --light4-text: #6E1F4C; --light4-glow: #B0357C;\n  --sound-fill: #185FA5; --sound-bg: #E6F1FB; --sound-text: #042C53;\n}\n* { box-sizing: border-box; }\n.pm-recap { font-family: var(--font-sans); max-width: 820px; margin: 0 auto; color: var(--color-text-primary); }\n.mini-chip { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border: 1px solid var(--color-border-secondary); border-radius: 999px; box-sizing: border-box; font-size: 13px; vertical-align: middle; background: var(--color-background-primary); }\n.mini-chip.state-off { background: var(--color-background-tertiary); color: var(--color-text-secondary); }\n.mini-bulb { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex-shrink: 0; }\n.mini-bulb.off { background: transparent; border: 1.5px solid currentColor; }\n.mini-bulb.l1.on { background: var(--light1-stroke); border: 2px solid var(--light1-stroke); }\n.mini-bulb.l1.off { background: #fff; border: 2px solid var(--light1-stroke); }\n.mini-chip.l1.state-on { background: var(--light1-bg); border: 3px solid var(--light1-stroke); padding: 1px 8px; color: var(--color-text-primary); }\n.mini-chip.l1.state-off { background: #fff; border: 1px solid var(--light1-stroke); padding: 3px 10px; color: var(--color-text-primary); }\n.mini-chip.kind-var.l1 { background: var(--light1-bg); border-color: var(--light1-stroke); color: var(--light1-text); }\n.mini-bulb.l2.on { background: var(--light2-stroke); border: 2px solid var(--light2-stroke); }\n.mini-bulb.l2.off { background: #fff; border: 2px solid var(--light2-stroke); }\n.mini-chip.l2.state-on { background: var(--light2-bg); border: 3px solid var(--light2-stroke); padding: 1px 8px; color: var(--color-text-primary); }\n.mini-chip.l2.state-off { background: #fff; border: 1px solid var(--light2-stroke); padding: 3px 10px; color: var(--color-text-primary); }\n.mini-chip.kind-var.l2 { background: var(--light2-bg); border-color: var(--light2-stroke); color: var(--light2-text); }\n.mini-bulb.l3.on { background: var(--light3-stroke); border: 2px solid var(--light3-stroke); }\n.mini-bulb.l3.off { background: #fff; border: 2px solid var(--light3-stroke); }\n.mini-chip.l3.state-on { background: var(--light3-bg); border: 3px solid var(--light3-stroke); padding: 1px 8px; color: var(--color-text-primary); }\n.mini-chip.l3.state-off { background: #fff; border: 1px solid var(--light3-stroke); padding: 3px 10px; color: var(--color-text-primary); }\n.mini-chip.kind-var.l3 { background: var(--light3-bg); border-color: var(--light3-stroke); color: var(--light3-text); }\n.mini-bulb.l4.on { background: var(--light4-stroke); border: 2px solid var(--light4-stroke); }\n.mini-bulb.l4.off { background: #fff; border: 2px solid var(--light4-stroke); }\n.mini-chip.l4.state-on { background: var(--light4-bg); border: 3px solid var(--light4-stroke); padding: 1px 8px; color: var(--color-text-primary); }\n.mini-chip.l4.state-off { background: #fff; border: 1px solid var(--light4-stroke); padding: 3px 10px; color: var(--color-text-primary); }\n.mini-chip.kind-var.l4 { background: var(--light4-bg); border-color: var(--light4-stroke); color: var(--light4-text); }\n.mini-chip .hilo { font-size: 10px; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.03em; }\n.mini-bulb { width: 11px; height: 11px; box-sizing: border-box; }\n.bulb-cell { box-sizing: border-box; }\n.recap { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px 16px; margin-bottom: 1rem; }\n.recap-head { font-size: 15px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 10px; }\n.recap-item { font-size: 13px; line-height: 1.5; padding: 6px 0; border-top: 0.5px solid var(--color-border-tertiary); display: flex; flex-wrap: wrap; align-items: center; gap: 5px; }\n.recap-item:first-of-type { border-top: none; }\n.recap-empty { font-size: 13px; color: var(--color-text-tertiary); font-style: italic; }\n.hist-among { color: var(--color-text-secondary); }\n.hist-arrow { color: var(--color-text-tertiary); margin: 0 3px; }\n.expr-conn { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); margin: 0 2px; }\n.pct-big { font-size: 14px; font-weight: 600; color: var(--color-text-primary); font-family: var(--font-mono); }\n.pct-none { color: var(--color-text-tertiary); }\n.pct-impossible { color: var(--color-text-info); font-weight: 600; }\n.spec-empty { color: var(--color-text-tertiary); font-style: italic; }\n\n.mini-chip.kind-sound.state-on { background: #fff; border: 1px solid #3d3c38; color: var(--color-text-primary); }\n.mini-chip.kind-sound.state-off { background: #fff; border: 1px solid var(--color-border-secondary); color: var(--color-text-tertiary); }\n.mini-chip.kind-var.sound { background: #fff; border-color: #3d3c38; color: var(--color-text-primary); }\n/* notes pad (optional free text; travels with the saved statistics) */\n.notes-pad { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px 16px; margin: 1.25rem 0 1rem; }\n.notes-head { font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); font-weight: 500; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }\n.notes-head .opt { text-transform: none; letter-spacing: 0; font-weight: 400; font-style: italic; }\n.notes-area { width: 100%; box-sizing: border-box; min-height: 84px; font-family: var(--font-sans); font-size: 13.5px; line-height: 1.5; padding: 10px 12px; border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); resize: vertical; color: var(--color-text-primary); background: #fff; }\n.notes-area:focus { outline: none; border-color: var(--color-border-info); box-shadow: 0 0 0 2px var(--color-background-info); }\n.notes-read { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px 16px; margin-bottom: 1.25rem; }\n.notes-read .notes-body { font-size: 13.5px; line-height: 1.6; white-space: pre-wrap; color: var(--color-text-primary); }\n.notes-read .notes-head { margin-bottom: 6px; }\n/* chips and connector pills never shrink or wrap internally; a long request wraps chip-by-chip */\n.mini-chip, .qb-conn, .qb-chip, .qb-ghost-chip, .expr-conn, .qb-state-btn { white-space: nowrap; flex-shrink: 0; }\n.mini-chip .hilo { white-space: nowrap; }\n.qb-group { flex-wrap: wrap; }\n";
  var HTML = "<div class=\"pm-recap\">\n  <div class=\"recap\" id=\"recap\"></div>\n</div>";
  function boot(){ var root=document.getElementById("pm-recap-root"); if(!root){return setTimeout(boot,40);} if(root.getAttribute("data-pm-booted")){return;} root.setAttribute("data-pm-booted","1"); var ph=root.querySelectorAll(".pm-loading"); for(var i=0;i<ph.length;i++){ph[i].parentNode.removeChild(ph[i]);} var st=document.createElement("style"); st.textContent=CSS; (document.head||document.documentElement).appendChild(st); root.insertAdjacentHTML("beforeend",HTML); run(); }
  function run(){

(function () {
  // ===== decoder for the compact Part 1 record (schema v2; see candidate_explorer.js compactData) =====
  // Expands the shorthand back into the long format the rest of this script expects
  // (treatment / results / deletedResults / notes / events with the same field names as before).
  function pmDecodePart1(d) {
    if (!d || d.v !== 2) return d;                                   // old long format: pass through
    var tr = d.tr || {}, k = tr.k | 0, lo = tr.lo || [], vf = tr.vf || [];
    var words = d.w || ['Outcome', 'successful', 'unsuccessful'];
    function label(n) { return (d.al && d.al[n - 1]) || ('Attribute ' + ((lo[n - 1] | 0) + 1)); }
    function word(n, s) { var flip = (vf[n - 1] === 1 || vf[n - 1] === '1'); return ((s === 1) !== flip) ? 'high' : 'low'; }
    function term(t) {
      var n = t[0], s = t[1], c = t[2];
      var conn = c === 'o' ? 'or' : (c === 'a' ? 'and' : null);
      if (n === 0) return { varId: 'success', displayedAs: words[0], value: s === 1 ? words[1] : words[2], state: s === 1 ? 'on' : 'off', conn: conn };
      return { varId: 'attr' + n, displayedAs: label(n), value: word(n, s), state: s === 1 ? 'on' : 'off', internalHigh: s === 1, conn: conn };
    }
    function text(list) {
      if (!list || !list.length) return '(any)';
      var groups = [];
      list.forEach(function (t, i) { var tok = t.displayedAs + '=' + t.value; if (i === 0 || t.conn === 'or') groups.push([tok]); else groups[groups.length - 1].push(tok); });
      return groups.map(function (g) { return g.length > 1 ? '(' + g.join(' AND ') + ')' : g[0]; }).join(' OR ');
    }
    function query(q, deleted) {
      var conds = q[1].map(term), tgt = q[2].map(term);
      var o = { queryNum: q[0], conditionsText: text(conds), targetText: text(tgt), conditions: conds, target: tgt, percentage: q[3], nMatchingConditions: q[4], impossibleCondition: q[5] === 1 };
      if (deleted) o.deletedAtMs = q[6];
      return o;
    }
    var results = (d.r || []).map(function (q) { return query(q, false); });
    var deleted = (d.x || []).map(function (q) { return query(q, true); });
    var byNum = {}; results.concat(deleted).forEach(function (r) { byNum[r.queryNum] = r; });
    var Z = { c: 'cond', t: 'target' }, C = { a: 'and', o: 'or' };
    var NAMES = { ss: 'session_start', ac: 'add_chip', mc: 'move_chip', rc: 'remove_chip', tc: 'toggle_connector', tp: 'toggle_pending', sr: 'show_result', dr: 'delete_result', rr: 'reorder_result', sc: 'scroll', ne: 'notes_edit', rb: 'reset_builder', ws: 'empty_warning_shown', wb: 'empty_warning_back', wp: 'empty_warning_proceed', qs: 'quiz_submit' };
    function vid(a) { return a === 0 ? 'success' : 'attr' + a; }
    function val(a, s) { return a === 0 ? (s === 1 ? words[1] : words[2]) : word(a, s); }
    function event(e) {
      var type = NAMES[e[1]] || e[1], o = { t: e[0], type: type }, q;
      switch (type) {
        case 'session_start': o.participantId = d.id; o.model = tr.m; o.distribution = tr.d; o.labelOrder = lo; o.valueFlip = vf; break;
        case 'add_chip': o.zone = Z[e[2]] || e[2]; o.varId = vid(e[3]); o.state = e[4] === 1 ? 'on' : 'off'; o.value = val(e[3], e[4]); o.conn = C[e[5]] || null; o.via = e[6] === 'd' ? 'drag' : 'menu'; break;
        case 'move_chip': o.from = Z[e[2]] || e[2]; o.to = Z[e[3]] || e[3]; o.varId = vid(e[4]); o.state = e[5] === 1 ? 'on' : 'off'; o.value = val(e[4], e[5]); break;
        case 'remove_chip': o.zone = Z[e[2]] || e[2]; o.varId = vid(e[3]); o.state = e[4] === 1 ? 'on' : 'off'; o.value = val(e[3], e[4]); break;
        case 'toggle_connector': o.zone = Z[e[2]] || e[2]; o.index = e[3]; o.to = C[e[4]] || e[4]; break;
        case 'toggle_pending': o.zone = Z[e[2]] || e[2]; o.to = C[e[3]] || e[3]; break;
        case 'show_result': q = byNum[e[2]]; o.queryNum = e[2]; o.conditionsText = q ? q.conditionsText : null; o.targetText = q ? q.targetText : null; o.percentage = e[3]; o.nMatchingConditions = e[4]; break;
        case 'delete_result': q = byNum[e[2]]; o.queryNum = e[2]; o.conditionsText = q ? q.conditionsText : null; o.targetText = q ? q.targetText : null; o.percentage = e[3]; break;
        case 'reorder_result': o.queryNum = e[2]; o.fromIndex = e[3]; o.toIndex = e[4]; break;
        case 'scroll': o.row = e[2]; o.maxRow = e[3]; break;
        case 'notes_edit': o.chars = e[2]; break;
        case 'reset_builder': o.hadConditions = e[2]; o.hadTargets = e[3]; break;
        case 'empty_warning_shown': case 'empty_warning_back': case 'empty_warning_proceed': o.numResults = e[2]; break;
        case 'quiz_submit': o.attempt = e[2]; o.correct = e[3] === 1; break;
        default: if (e[2] && typeof e[2] === 'object') { for (var key in e[2]) o[key] = e[2][key]; }
      }
      return o;
    }
    var treatment = { model: tr.m, distribution: tr.d, nAttributes: k, nCandidates: tr.nc, seed: tr.s, labelOrder: lo, displayOrder: tr.do, valueFlip: vf, generation: tr.g };
    if (tr.ri !== undefined) treatment.relevantIndices = tr.ri;
    if (tr.ok !== undefined) treatment.piIrrelevanceOK = tr.ok;
    if (tr.ir !== undefined) treatment.irrelevantRate = tr.ir;
    var sc = d.sc || [], no = d.no || ['', 0, 0, null], ew = d.ew || [0, 0, 0];
    var out = {
      schemaVersion: 2, participantId: d.id, treatment: treatment, numResults: d.nr, results: results, deletedResults: deleted,
      datasetScroll: { scrollEvents: sc[0], maxRowReached: sc[1], rowsTotal: sc[2], maxFraction: sc[3], maxScrollTopPx: sc[4], firstScrollMs: sc[5] },
      emptyWarning: { shown: ew[0], wentBack: ew[1], proceeded: ew[2] === 1 },
      notes: { text: no[0], chars: no[1], edits: no[2], lastEditedMs: no[3] },
      events: (d.e || []).map(event),
      eventsTruncated: d.et === 1, notesTruncated: d.nt === 1
    };
    if (d.et === 1) out.numEventsDropped = d.ne;
    if (d.w) { out.outcomeLabel = words[0]; out.successWord = words[1]; out.failWord = words[2]; }
    if (d.al) out.attributeLabels = d.al;
    return out;
  }
  function loadPart1() {
    var raw = null;
    try { var el = document.getElementById('pm-part1-data'); if (el && el.textContent && el.textContent.trim()) raw = el.textContent.trim(); } catch (_) {}
    if (!raw) return null;                       // no localStorage fallback (see candidate_choice.js)
    var d; try { d = pmDecodePart1(JSON.parse(raw)); } catch (_) { return null; }
    var t = d.treatment || {};
    return {
      results: d.results || [],
      notes: d.notes || null,
      labelOrder: d.labelOrder || t.labelOrder || null,
      valueFlip: (d.valueFlip != null) ? d.valueFlip : ((t.valueFlip != null) ? t.valueFlip : null),
      nAttributes: d.nAttributes || t.nAttributes || null,
      attributeLabels: d.attributeLabels || null,
      outcomeLabel: d.outcomeLabel || t.outcomeLabel || 'Outcome',
      successWord: d.successWord || t.successWord || 'successful',
      failWord: d.failWord || t.failWord || 'unsuccessful'
    };
  }
  var PART1 = loadPart1();
  // If the choice page's data is piped in too (<div id="pm-part2-data">), show the
  // statistics in the order the participant left them there (recapOrder), so the list
  // matches what they arranged during the Main Task.
  (function applyPart2Order() {
    if (!PART1 || !PART1.results || !PART1.results.length) return;
    var el = document.getElementById('pm-part2-data'), d2 = null;
    try { if (el && el.textContent && el.textContent.trim()) d2 = JSON.parse(el.textContent.trim()); } catch (_) { d2 = null; }
    var ord = d2 ? (Array.isArray(d2.recapOrder) ? d2.recapOrder : d2.ro) : null;   // long (recapOrder) or compact v2 (ro) Part 2 record
    var order = Array.isArray(ord) ? ord.map(Number) : null;
    if (!order || !order.length) return;
    var byNum = {}; PART1.results.forEach(function (r) { byNum[r.queryNum] = r; });
    var sorted = [], seen = {};
    order.forEach(function (n) { if (byNum[n] && !seen[n]) { sorted.push(byNum[n]); seen[n] = true; } });
    PART1.results.forEach(function (r) { if (!seen[r.queryNum]) sorted.push(r); });   // anything not in the order list keeps its place at the end
    PART1.results = sorted;
  })();
  var N_ATTR = Math.max(1, ((PART1 && PART1.nAttributes) || 2) | 0);
  var ATTR_LABELS = (PART1 && PART1.attributeLabels) || null;
  var OUTCOME_LABEL = (PART1 && PART1.outcomeLabel) || 'Outcome';
  var SUCCESS = (PART1 && PART1.successWord) || 'successful';
  var FAIL = (PART1 && PART1.failWord) || 'unsuccessful';

  // sigma from Part 1: LABEL_ORDER[n-1] = zero-based display position of internal attribute n.
  // Labels and colours follow the display position so chips look exactly as they did in Part 1.
  var LABEL_ORDER = (function () {
    var lo = (PART1 && Array.isArray(PART1.labelOrder)) ? PART1.labelOrder.map(Number) : null;
    var valid = lo && lo.length === N_ATTR && lo.slice().sort(function (a, b) { return a - b; }).every(function (v, i) { return v === i; });
    if (!valid) { lo = []; for (var i = 0; i < N_ATTR; i++) lo.push(i); }
    return lo;
  })();
  // per-attribute value-label flips from Part 1, indexed by INTERNAL attribute (display-only)
  var VALUE_FLIP = (function () {
    var f = PART1 ? PART1.valueFlip : null, out = [];
    for (var i = 0; i < N_ATTR; i++) { var b = Array.isArray(f) ? f[i] : f; out.push((b === 1 || b === '1') ? 1 : 0); }
    return out;
  })();
  function flipped(v) { return v.kind === 'attribute' && VALUE_FLIP[v.n - 1] === 1; }
  function dispState(v, state) { return flipped(v) ? (state === 'on' ? 'off' : 'on') : state; }
  var VARS = [];
  for (var n = 1; n <= N_ATTR; n++) {
    var pos = LABEL_ORDER[n - 1] + 1;
    VARS.push({ id: 'attr' + n, kind: 'attribute', n: n, pos: pos, label: (ATTR_LABELS && ATTR_LABELS[n - 1]) || ('Attribute ' + pos) });
  }
  VARS.push({ id: 'success', kind: 'outcome', label: OUTCOME_LABEL });
  function varById(id) { for (var i = 0; i < VARS.length; i++) if (VARS[i].id === id) return VARS[i]; return null; }
  function stateLabel(v, state) { var hi = state === 'on'; return v.kind === 'outcome' ? (hi ? SUCCESS : FAIL) : (dispState(v, state) === 'on' ? 'high' : 'low'); }
  var OUTCOME_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  function valueChip(v, state) {
    if (!v) return '';
    if (v.kind === 'outcome') return '<span class="mini-chip kind-sound state-' + state + '">' + (state === 'on' ? OUTCOME_SVG : '') + stateLabel(v, state) + '</span>';
    var ds = dispState(v, state);
    return '<span class="mini-chip l' + v.pos + ' state-' + ds + '"><span class="mini-bulb l' + v.pos + ' ' + ds + '"></span>A' + v.pos + ' <span class="hilo">' + stateLabel(v, state) + '</span></span>';
  }
  function exprHTML(list) { return (list || []).map(function (e, i) { return (i > 0 ? '<span class="expr-conn">' + (e.conn === 'or' ? 'or' : 'and') + '</span>' : '') + valueChip(varById(e.varId), e.state); }).join(''); }

  (function ensureLightStyles() {
    var extra = VARS.filter(function (v) { return v.kind === 'attribute' && v.pos > 4; });
    if (!extra.length) return;
    var css = '';
    extra.forEach(function (v) {
      var hue = Math.round((v.pos * 47) % 360);
      var fill = 'hsl(' + hue + ' 62% 52%)', stroke = 'hsl(' + hue + ' 62% 36%)', bg = 'hsl(' + hue + ' 62% 94%)', text = 'hsl(' + hue + ' 62% 28%)';
      var k = 'l' + v.pos;
      css += '.mini-bulb.' + k + '.on{background:' + stroke + ';border-color:' + text + ';}';
      css += '.mini-chip.' + k + '.state-on{background:#fff;border:3px solid ' + stroke + ';padding:1px 8px;}';
      var glow = 'hsl(' + hue + ' 62% 80%)', pale = 'hsl(' + hue + ' 62% 97%)', dot = 'hsl(' + hue + ' 62% 94%)';
      css += '.mini-bulb.' + k + '.off{background:#fff;border-color:' + stroke + ';}';
      css += '.mini-chip.' + k + '.state-off{background:#fff;border:1px solid ' + stroke + ';padding:3px 10px;}';
    });
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  })();

  function notesHTML(notes) {
    var text = notes && typeof notes.text === 'string' ? notes.text.trim() : '';
    if (!text) return '';
    var esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return '<div class="notes-read"><div class="notes-head"><span>Your notes</span></div><div class="notes-body">' + esc + '</div></div>';
  }
  // notes are shown unless the root carries data-notes="off" (used on the second advice page)
  function showNotes() { var r = document.getElementById('pm-recap-root'); return !(r && r.getAttribute('data-notes') === 'off'); }
  function render() {
    var host = document.getElementById('recap');
    if (!host) return;
    var results = (PART1 && PART1.results) || [];
    if (!results.length) {
      host.innerHTML = (showNotes() ? notesHTML(PART1 && PART1.notes) : '') + '<div class="recap-head">The statistics you requested</div><div class="recap-empty">No earlier searches were found.</div>';
      return;
    }
    var rows = results.map(function (r) {
      var cond = (r.conditions && r.conditions.length) ? exprHTML(r.conditions) : '';
      var answer;
      if (r.impossibleCondition) {
        answer = '<span class="pct-impossible">impossible &mdash; no candidate can be both high and low on the same attribute</span>';
      } else {
        var pct = (r.percentage == null) ? '<span class="pct-none">&mdash;</span>' : '<span class="pct-big">' + Number(r.percentage).toFixed(1) + '%</span>';
        answer = pct + ' <span class="hist-among">are</span> ' + exprHTML(r.target);
      }
      return '<div class="recap-item"><span class="hist-among">Among all candidates</span> ' + (cond ? '<span class="hist-among">with</span> ' + cond + ' ' : '') + '<span class="hist-arrow">&rarr;</span> ' + answer + '</div>';
    }).join('');
    host.innerHTML = (showNotes() ? notesHTML(PART1 && PART1.notes) : '') + '<div class="recap-head">The statistics you requested</div>' + rows;
  }
  render();
})();

  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",boot);}else{boot();}
})();
