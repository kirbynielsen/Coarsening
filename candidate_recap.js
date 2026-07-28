/* Search recap widget. */
(function(){
  var CSS = "\n:root {\n  --color-background-primary: #ffffff;\n  --color-background-secondary: #f7f6f2;\n  --color-background-tertiary: #efede5;\n  --color-text-primary: #1a1a1a;\n  --color-text-secondary: #5f5e5a;\n  --color-text-tertiary: #888780;\n  --color-text-info: #185FA5;\n  --color-border-tertiary: rgba(0,0,0,0.15);\n  --color-border-secondary: rgba(0,0,0,0.3);\n  --border-radius-md: 8px;\n  --border-radius-lg: 12px;\n  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;\n  --font-mono: 'SF Mono', Menlo, Consolas, monospace;\n  --light1-fill: #EF9F27; --light1-stroke: #BA7517; --light1-bg: #FAEEDA; --light1-text: #854F0B;\n  --light2-fill: #1D9E75; --light2-stroke: #0F6E56; --light2-bg: #E1F5EE; --light2-text: #085041;\n  --light3-fill: #7F77DD; --light3-stroke: #534AB7; --light3-bg: #EEEDFE; --light3-text: #3C3489;\n  --sound-fill: #185FA5; --sound-bg: #E6F1FB; --sound-text: #042C53;\n}\n* { box-sizing: border-box; }\n.pm-recap { font-family: var(--font-sans); max-width: 820px; margin: 0 auto; color: var(--color-text-primary); }\n.mini-chip { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border: 0.5px solid var(--color-border-secondary); border-radius: 999px; font-size: 13px; vertical-align: middle; background: var(--color-background-primary); }\n.mini-chip.l1.state-on { background: var(--light1-bg); border-color: var(--light1-fill); color: var(--light1-text); }\n.mini-chip.l2.state-on { background: var(--light2-bg); border-color: var(--light2-fill); color: var(--light2-text); }\n.mini-chip.l3.state-on { background: var(--light3-bg); border-color: var(--light3-fill); color: var(--light3-text); }\n.mini-chip.state-off { background: var(--color-background-tertiary); color: var(--color-text-secondary); }\n.mini-chip.kind-sound.state-on { background: var(--sound-bg); border-color: var(--sound-fill); color: var(--sound-text); }\n.mini-bulb { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex-shrink: 0; }\n.mini-bulb.l1.on { background: var(--light1-fill); border: 1.5px solid var(--light1-stroke); }\n.mini-bulb.l2.on { background: var(--light2-fill); border: 1.5px solid var(--light2-stroke); }\n.mini-bulb.l3.on { background: var(--light3-fill); border: 1.5px solid var(--light3-stroke); }\n.mini-bulb.off { background: transparent; border: 1.5px solid currentColor; }\n.recap { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px 16px; margin-bottom: 1rem; }\n.recap-head { font-size: 15px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 10px; }\n.recap-item { font-size: 13px; line-height: 1.5; padding: 6px 0; border-top: 0.5px solid var(--color-border-tertiary); display: flex; flex-wrap: wrap; align-items: center; gap: 5px; }\n.recap-item:first-of-type { border-top: none; }\n.recap-empty { font-size: 13px; color: var(--color-text-tertiary); font-style: italic; }\n.hist-among { color: var(--color-text-secondary); }\n.hist-arrow { color: var(--color-text-tertiary); margin: 0 3px; }\n.expr-conn { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); margin: 0 2px; }\n.pct-big { font-size: 14px; font-weight: 600; color: var(--color-text-primary); font-family: var(--font-mono); }\n.pct-none { color: var(--color-text-tertiary); }\n.pct-impossible { color: var(--color-text-info); font-weight: 600; }\n.spec-empty { color: var(--color-text-tertiary); font-style: italic; }\n";
  var HTML = "<div class=\"pm-recap\">\n  <div class=\"recap\" id=\"recap\"></div>\n</div>";
  function boot(){ if(window["__pmBooted_pm_recap_root"])return; var root=document.getElementById("pm-recap-root"); if(!root){return setTimeout(boot,40);} window["__pmBooted_pm_recap_root"]=true; var st=document.createElement("style"); st.textContent=CSS; (document.head||document.documentElement).appendChild(st); root.insertAdjacentHTML("beforeend",HTML); run(); }
  function run(){

(function () {
  function loadPart1() {
    var raw = null;
    try { var el = document.getElementById('pm-part1-data'); if (el && el.textContent && el.textContent.trim()) raw = el.textContent.trim(); } catch (_) {}
    if (!raw) { try { raw = localStorage.getItem('candidateExplorer.part1'); } catch (_) {} }
    if (!raw) return null;
    var d; try { d = JSON.parse(raw); } catch (_) { return null; }
    var t = d.treatment || {};
    return {
      results: d.results || [],
      nAttributes: d.nAttributes || t.nAttributes || null,
      attributeLabels: d.attributeLabels || null,
      outcomeLabel: d.outcomeLabel || t.outcomeLabel || 'Outcome',
      successWord: d.successWord || t.successWord || 'successful',
      failWord: d.failWord || t.failWord || 'unsuccessful'
    };
  }
  var PART1 = loadPart1();
  var N_ATTR = Math.max(1, ((PART1 && PART1.nAttributes) || 2) | 0);
  var ATTR_LABELS = (PART1 && PART1.attributeLabels) || null;
  var OUTCOME_LABEL = (PART1 && PART1.outcomeLabel) || 'Outcome';
  var SUCCESS = (PART1 && PART1.successWord) || 'successful';
  var FAIL = (PART1 && PART1.failWord) || 'unsuccessful';

  var VARS = [];
  for (var n = 1; n <= N_ATTR; n++) VARS.push({ id: 'attr' + n, kind: 'attribute', n: n, label: (ATTR_LABELS && ATTR_LABELS[n - 1]) || ('Attribute ' + n) });
  VARS.push({ id: 'success', kind: 'outcome', label: OUTCOME_LABEL });
  function varById(id) { for (var i = 0; i < VARS.length; i++) if (VARS[i].id === id) return VARS[i]; return null; }
  function stateLabel(v, state) { var hi = state === 'on'; return v.kind === 'outcome' ? (hi ? SUCCESS : FAIL) : (hi ? 'high' : 'low'); }
  var OUTCOME_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  function valueChip(v, state) {
    if (!v) return '';
    if (v.kind === 'outcome') return '<span class="mini-chip kind-sound state-' + state + '">' + OUTCOME_SVG + stateLabel(v, state) + '</span>';
    return '<span class="mini-chip l' + v.n + ' state-' + state + '"><span class="mini-bulb l' + v.n + ' ' + state + '"></span>A' + v.n + ' ' + stateLabel(v, state) + '</span>';
  }
  function exprHTML(list) { return (list || []).map(function (e, i) { return (i > 0 ? '<span class="expr-conn">' + (e.conn === 'or' ? 'or' : 'and') + '</span>' : '') + valueChip(varById(e.varId), e.state); }).join(''); }

  (function ensureLightStyles() {
    var extra = VARS.filter(function (v) { return v.kind === 'attribute' && v.n > 3; });
    if (!extra.length) return;
    var css = '';
    extra.forEach(function (v) {
      var hue = Math.round((v.n * 47) % 360);
      var fill = 'hsl(' + hue + ' 62% 52%)', stroke = 'hsl(' + hue + ' 62% 36%)', bg = 'hsl(' + hue + ' 62% 94%)', text = 'hsl(' + hue + ' 62% 28%)';
      var k = 'l' + v.n;
      css += '.mini-bulb.' + k + '.on{background:' + fill + ';border-color:' + stroke + ';}';
      css += '.mini-chip.' + k + '.state-on{background:' + bg + ';border-color:' + fill + ';color:' + text + ';}';
    });
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  })();

  function render() {
    var host = document.getElementById('recap');
    if (!host) return;
    var results = (PART1 && PART1.results) || [];
    if (!results.length) {
      host.innerHTML = '<div class="recap-head">Your previous searches:</div><div class="recap-empty">No earlier searches were found.</div>';
      return;
    }
    var rows = results.map(function (r) {
      var cond = (r.conditions && r.conditions.length) ? exprHTML(r.conditions) : '<span class="spec-empty">all candidates</span>';
      var answer;
      if (r.impossibleCondition) {
        answer = '<span class="pct-impossible">impossible &mdash; no candidate can be both high and low on the same attribute</span>';
      } else {
        var pct = (r.percentage == null) ? '<span class="pct-none">&mdash;</span>' : '<span class="pct-big">' + Number(r.percentage).toFixed(1) + '%</span>';
        answer = pct + ' <span class="hist-among">are</span> ' + exprHTML(r.target);
      }
      return '<div class="recap-item"><span class="hist-among">Among candidates with</span> ' + cond + ' <span class="hist-arrow">&rarr;</span> ' + answer + '</div>';
    }).join('');
    host.innerHTML = '<div class="recap-head">Your previous searches:</div>' + rows;
  }
  render();
})();

  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",boot);}else{boot();}
})();
