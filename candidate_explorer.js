/* Candidate outcome explorer (Part 1) — external build. Put <div id="pm-root"></div> in the question. */
(function(){
  var CSS = "\n:root {\n  --color-background-primary: #ffffff;\n  --color-background-secondary: #f7f6f2;\n  --color-background-tertiary: #efede5;\n  --color-background-info: #E6F1FB;\n  --color-text-primary: #1a1a1a;\n  --color-text-secondary: #5f5e5a;\n  --color-text-tertiary: #888780;\n  --color-text-info: #185FA5;\n  --color-text-warning: #854F0B;\n  --color-border-tertiary: rgba(0,0,0,0.15);\n  --color-border-secondary: rgba(0,0,0,0.3);\n  --color-border-info: #378ADD;\n  --border-radius-md: 8px;\n  --border-radius-lg: 12px;\n  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;\n  --font-mono: 'SF Mono', Menlo, Consolas, monospace;\n\n  --light1-fill: #EF9F27; --light1-stroke: #BA7517; --light1-bg: #FAEEDA; --light1-text: #854F0B; --light1-glow: #FAC775;\n  --light2-fill: #1D9E75; --light2-stroke: #0F6E56; --light2-bg: #E1F5EE; --light2-text: #085041; --light2-glow: #9FE1CB;\n  --light3-fill: #7F77DD; --light3-stroke: #534AB7; --light3-bg: #EEEDFE; --light3-text: #3C3489; --light3-glow: #CECBF6;\n  --sound-fill: #185FA5; --sound-bg: #E6F1FB; --sound-text: #042C53;\n}\nbody { font-family: var(--font-sans); max-width: 900px; margin: 2rem auto; padding: 0 1rem; color: var(--color-text-primary); background: #fafaf7; }\nh2 { font-size: 14px; font-weight: 500; color: var(--color-text-secondary); margin: 0 0 8px; display: flex; justify-content: space-between; align-items: baseline; }\nh2 .meta { font-size: 11px; color: var(--color-text-tertiary); font-weight: 400; }\n\n.database-box { height: 200px; overflow-y: auto; border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-md); background: var(--color-background-primary); margin-bottom: 1.5rem; }\n.database-box table { width: 100%; border-collapse: collapse; font-size: 12px; }\n.database-box thead { position: sticky; top: 0; background: var(--color-background-secondary); z-index: 1; }\n.database-box th { padding: 8px 6px; text-align: center; font-weight: 500; color: var(--color-text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 0.5px solid var(--color-border-tertiary); }\n.database-box td { padding: 5px 6px; text-align: center; border-bottom: 0.5px solid var(--color-border-tertiary); }\n.database-box td.machine-id { font-family: var(--font-mono); color: var(--color-text-tertiary); font-size: 11px; }\n.bulb-cell { display: inline-block; width: 11px; height: 11px; border-radius: 50%; vertical-align: middle; }\n.bulb-cell.l1.on { background: var(--light1-fill); border: 1.5px solid var(--light1-stroke); }\n.bulb-cell.l2.on { background: var(--light2-fill); border: 1.5px solid var(--light2-stroke); }\n.bulb-cell.l3.on { background: var(--light3-fill); border: 1.5px solid var(--light3-stroke); }\n.bulb-cell.off { background: transparent; border: 1.5px solid var(--color-text-tertiary); }\n.sound-yes { color: #0F6E56; font-weight: 500; }\n.sound-no { color: var(--color-text-tertiary); }\n\n.instructions { font-size: 13px; color: var(--color-text-secondary); margin-bottom: 1rem; line-height: 1.6; }\n.instructions strong { color: var(--color-text-primary); font-weight: 500; }\n\n/* control panel */\n.controls { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 16px 18px; margin-bottom: 1rem; }\n\n/* query builder */\n.qb-line { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 10px 0; border-top: 0.5px solid var(--color-border-tertiary); }\n.qb-line:first-child { border-top: none; padding-top: 2px; }\n.qb-text { font-size: 15px; color: var(--color-text-primary); }\n.qb-blank { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 6px; min-width: 90px; min-height: 26px; padding: 3px 6px; border-bottom: 1.5px dashed var(--color-border-secondary); }\n.qb-blank.empty::before { content: 'all candidates'; color: var(--color-text-tertiary); font-style: italic; font-size: 13px; }\n.hilo { font-size: 10px; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.03em; }\n.qb-blank.empty.target-empty::before { content: '— pick at least one —'; color: var(--color-text-warning); }\n.qb-chip { display: inline-flex; align-items: center; gap: 5px; }\n\n/* AND-group brackets */\n.qb-blank { row-gap: 8px; }\n.qb-group { display: inline-flex; align-items: center; gap: 7px; padding: 6px 9px; background: var(--color-background-primary); border: 1px solid var(--color-border-tertiary); border-radius: var(--border-radius-md); }\n.qb-group.solo { border-style: none; background: transparent; padding: 2px 0; }\n.qb-or-sep { display: inline-flex; align-items: center; margin: 0 3px; }\n\n/* click-to-toggle AND / OR connector pill */\n.qb-conn { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 3px 10px; border-radius: 999px; cursor: pointer; border: 0.5px solid var(--color-border-secondary); background: var(--color-background-primary); color: var(--color-text-secondary); font-family: var(--font-sans); vertical-align: middle; transition: background 0.1s, color 0.1s, border-color 0.1s; }\n.qb-conn:hover { border-color: var(--color-border-info); color: var(--color-text-info); }\n.qb-conn.or { background: var(--color-text-info); border-color: var(--color-text-info); color: #fff; }\n.qb-conn.ghost { opacity: 0.5; border-style: dashed; }\n\n.qb-trailer { display: inline-flex; align-items: center; gap: 7px; }\n.qb-ghost-chip { font-size: 11px; font-style: italic; color: var(--color-text-tertiary); border: 1px dashed var(--color-border-secondary); border-radius: 999px; padding: 3px 10px; opacity: 0.7; user-select: none; }\n.qb-add-wrap { position: relative; display: inline-block; }\n.qb-add-btn { font-size: 12px; font-weight: 500; padding: 5px 12px; background: var(--color-background-secondary); border: 0.5px solid var(--color-border-secondary); border-radius: 999px; cursor: pointer; color: var(--color-text-secondary); font-family: var(--font-sans); transition: background 0.12s, color 0.12s; }\n.qb-add-btn:hover:not(:disabled) { background: var(--color-text-info); color: #fff; border-color: var(--color-text-info); }\n.qb-add-btn.open { background: var(--color-text-info); color: #fff; border-color: var(--color-text-info); }\n.qb-add-btn:disabled { opacity: 0.35; cursor: not-allowed; }\n.qb-add-btn.mini { padding: 4px 11px; font-size: 15px; line-height: 1; font-weight: 600; }\n\n/* drop zones */\n.qb-zone-line { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 7px 0; }\n.qb-zone-line.big { padding-top: 2px; }\n.qb-text-lg { font-size: 17px; color: var(--color-text-primary); font-weight: 500; }\n.qb-zone { flex: 1; min-width: 220px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-height: 46px; padding: 8px 10px; background: var(--color-background-secondary); border: 1.5px dashed var(--color-border-secondary); border-radius: var(--border-radius-md); transition: background 0.12s, border-color 0.12s; }\n.qb-zone.drop-hover { border-color: var(--color-border-info); border-style: solid; background: var(--color-background-info); }\n.qb-zone .qb-blank { border-bottom: none; padding: 0; min-width: 0; min-height: 0; }\n.qb-zone .qb-chip { cursor: grab; }\n.qb-zone .qb-chip:active { cursor: grabbing; }\n.qb-zone .qb-add-wrap { margin-left: auto; }\n\n/* chip tray / palette */\n.qb-palette-wrap { margin-top: 14px; border-top: 0.5px solid var(--color-border-tertiary); padding-top: 12px; }\n.qb-palette-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); font-weight: 500; margin-bottom: 9px; }\n.qb-palette-label span { text-transform: none; letter-spacing: 0; font-weight: 400; }\n.qb-palette { display: flex; flex-wrap: wrap; gap: 10px; }\n.qb-pal-group { display: inline-flex; gap: 5px; padding: 5px; background: var(--color-background-secondary); border-radius: var(--border-radius-md); border: 0.5px solid var(--color-border-tertiary); }\n.pal-chip { cursor: grab; }\n.pal-chip:active { cursor: grabbing; }\n.qb-chip.dragging { opacity: 0.4; }\n.qb-palette.drop-remove { outline: 2px dashed var(--color-text-warning); outline-offset: 4px; border-radius: var(--border-radius-md); }\n\n.qb-menu { display: none; position: absolute; top: calc(100% + 5px); left: 0; z-index: 10; background: var(--color-background-primary); border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-lg); box-shadow: 0 8px 24px rgba(0,0,0,0.15); padding: 7px; width: 232px; }\n.qb-menu.open { display: block; }\n.qb-search { width: 100%; box-sizing: border-box; font-size: 13px; font-family: var(--font-sans); padding: 6px 9px; margin-bottom: 6px; border: 0.5px solid var(--color-border-tertiary); border-radius: 7px; outline: none; }\n.qb-search:focus { border-color: var(--color-border-info); box-shadow: 0 0 0 2px var(--color-background-info); }\n.qb-opt-list { max-height: 244px; overflow-y: auto; display: flex; flex-direction: column; gap: 1px; }\n.qb-opt { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 5px; border-radius: 7px; }\n.qb-opt:hover { background: var(--color-background-secondary); }\n.qb-opt-actions { display: inline-flex; gap: 4px; flex-shrink: 0; }\n.qb-state-btn { font-size: 11px; font-weight: 600; padding: 3px 11px; border-radius: 999px; cursor: pointer; border: 0.5px solid var(--color-border-secondary); background: var(--color-background-primary); color: var(--color-text-secondary); font-family: var(--font-sans); transition: background 0.1s, color 0.1s, border-color 0.1s; }\n.qb-state-btn.on:hover { background: var(--light2-bg); border-color: var(--light2-fill); color: var(--light2-text); }\n.qb-state-btn.off:hover { background: var(--color-background-tertiary); border-color: var(--color-border-secondary); color: var(--color-text-primary); }\n.qb-menu .menu-empty { font-size: 12px; color: var(--color-text-tertiary); font-style: italic; padding: 10px 8px; text-align: center; }\n.controls-header { font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); margin-bottom: 12px; display: grid; grid-template-columns: 120px 1fr; gap: 12px; }\n.controls-header .var-col { font-weight: 500; }\n.controls-header .action-col { font-weight: 500; }\n\n.var-row { display: grid; grid-template-columns: 120px 1fr; gap: 12px; align-items: center; padding: 8px 0; border-top: 0.5px solid var(--color-border-tertiary); }\n.var-row:first-of-type { border-top: none; padding-top: 4px; }\n\n.var-name { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--color-text-primary); }\n.var-name .var-bulb { width: 14px; height: 14px; border-radius: 50%; }\n.var-name .var-bulb.l1 { background: var(--light1-fill); border: 1.5px solid var(--light1-stroke); }\n.var-name .var-bulb.l2 { background: var(--light2-fill); border: 1.5px solid var(--light2-stroke); }\n.var-name .var-bulb.l3 { background: var(--light3-fill); border: 1.5px solid var(--light3-stroke); }\n.var-name .var-bulb.sound { background: var(--sound-fill); border: 1.5px solid var(--sound-text); }\n\n/* segmented action selector */\n.action-selector { display: flex; flex-wrap: wrap; gap: 2px; background: var(--color-background-secondary); border-radius: var(--border-radius-md); padding: 3px; border: 0.5px solid var(--color-border-tertiary); width: 100%; box-sizing: border-box; }\n.action-btn { flex: 1 1 auto; font-size: 12px; padding: 6px 10px; background: transparent; border: none; border-radius: 5px; cursor: pointer; color: var(--color-text-secondary); font-family: var(--font-sans); text-align: center; white-space: nowrap; transition: background 0.12s, color 0.12s; }\n.action-btn:hover { color: var(--color-text-primary); }\n.action-btn.active { background: var(--color-background-primary); color: var(--color-text-primary); font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }\n.action-btn .sub { display: inline-flex; align-items: center; gap: 4px; }\n.action-btn .mini-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }\n.action-btn .mini-dot.on.l1 { background: var(--light1-fill); border: 1.5px solid var(--light1-stroke); }\n.action-btn .mini-dot.on.l2 { background: var(--light2-fill); border: 1.5px solid var(--light2-stroke); }\n.action-btn .mini-dot.on.l3 { background: var(--light3-fill); border: 1.5px solid var(--light3-stroke); }\n.action-btn .mini-dot.on.sound { background: var(--sound-fill); border: 1.5px solid var(--sound-text); }\n.action-btn .mini-dot.off { background: transparent; border: 1.5px solid var(--color-text-tertiary); }\n\n/* result section */\n.result-section { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 16px 18px; margin-bottom: 1rem; }\n.result-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }\n.result-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); font-weight: 500; }\n.result-meta { font-size: 12px; color: var(--color-text-secondary); font-family: var(--font-mono); }\n.result-meta .dim { color: var(--color-text-tertiary); }\n\n.spec-line { font-size: 13px; color: var(--color-text-secondary); line-height: 1.9; margin-bottom: 12px; padding: 10px 12px; background: var(--color-background-secondary); border-radius: var(--border-radius-md); }\n.spec-line .spec-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); margin-right: 5px; font-weight: 500; }\n.spec-line .spec-empty { color: var(--color-text-tertiary); font-style: italic; }\n.spec-line .spec-row { display: block; }\n\n.mini-chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 7px; border: 0.5px solid var(--color-border-secondary); border-radius: 999px; font-size: 12px; vertical-align: middle; margin: 0 1px; background: var(--color-background-primary); }\n.mini-chip.l1.state-on { background: var(--light1-bg); border-color: var(--light1-fill); color: var(--light1-text); }\n.mini-chip.l2.state-on { background: var(--light2-bg); border-color: var(--light2-fill); color: var(--light2-text); }\n.mini-chip.l3.state-on { background: var(--light3-bg); border-color: var(--light3-fill); color: var(--light3-text); }\n.mini-chip.state-off { background: var(--color-background-tertiary); color: var(--color-text-secondary); }\n.mini-chip.kind-sound.state-on { background: var(--sound-bg); border-color: var(--sound-fill); color: var(--sound-text); }\n.mini-chip.kind-var.l1 { background: var(--light1-bg); border-color: var(--light1-fill); color: var(--light1-text); }\n.mini-chip.kind-var.l2 { background: var(--light2-bg); border-color: var(--light2-fill); color: var(--light2-text); }\n.mini-chip.kind-var.l3 { background: var(--light3-bg); border-color: var(--light3-fill); color: var(--light3-text); }\n.mini-chip.kind-var.sound { background: var(--sound-bg); border-color: var(--sound-fill); color: var(--sound-text); }\n.mini-bulb { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex-shrink: 0; }\n.mini-bulb.l1.on { background: var(--light1-fill); border: 1.5px solid var(--light1-stroke); }\n.mini-bulb.l2.on { background: var(--light2-fill); border: 1.5px solid var(--light2-stroke); }\n.mini-bulb.l3.on { background: var(--light3-fill); border: 1.5px solid var(--light3-stroke); }\n.mini-bulb.off { background: transparent; border: 1.5px solid currentColor; }\n\n/* result table */\n.result-table { width: 100%; border-collapse: collapse; font-size: 12px; background: var(--color-background-primary); border-radius: var(--border-radius-md); overflow: hidden; border: 0.5px solid var(--color-border-tertiary); }\n.result-table th, .result-table td { padding: 8px 12px; text-align: left; border-bottom: 0.5px solid var(--color-border-tertiary); }\n.result-table th { background: var(--color-background-secondary); font-weight: 500; color: var(--color-text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }\n.result-table tr:last-child td { border-bottom: none; }\n.result-table td.numeric { font-family: var(--font-mono); text-align: right; }\n.result-table td.cell-label { font-size: 12px; }\n.result-table td .pct-large { font-size: 14px; font-weight: 500; }\n.result-table td .pct-sub { color: var(--color-text-tertiary); font-size: 10px; margin-left: 4px; }\n.result-empty { font-size: 13px; color: var(--color-text-tertiary); font-style: italic; padding: 1.5rem; text-align: center; background: var(--color-background-secondary); border-radius: var(--border-radius-md); }\n.result-warning { font-size: 13px; color: var(--color-text-warning); font-style: italic; padding: 1.5rem; text-align: center; background: var(--color-background-secondary); border-radius: var(--border-radius-md); }\n\n/* actions */\n.actions-row { display: flex; gap: 10px; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; }\n.submit-btn { font-size: 14px; font-weight: 500; padding: 9px 18px; background: var(--color-text-info); color: white; border: none; border-radius: var(--border-radius-md); cursor: pointer; }\n.submit-btn:hover:not(:disabled) { opacity: 0.88; }\n.submit-btn:disabled { opacity: 0.35; cursor: not-allowed; }\n.ctrl-btn { font-size: 12px; padding: 7px 12px; background: transparent; border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); cursor: pointer; color: var(--color-text-secondary); }\n.ctrl-btn:hover { background: var(--color-background-secondary); }\n.summary-line { font-size: 12px; color: var(--color-text-tertiary); margin-left: auto; font-family: var(--font-mono); }\n\n/* history */\n.history-section { margin-top: 1.5rem; }\n.history-header { font-size: 13px; font-weight: 500; color: var(--color-text-secondary); margin-bottom: 10px; display: flex; justify-content: space-between; }\n.history-empty { font-size: 13px; color: var(--color-text-tertiary); font-style: italic; padding: 1rem; text-align: center; background: var(--color-background-secondary); border-radius: var(--border-radius-md); }\n.history-item { display: flex; align-items: center; gap: 8px; padding: 9px 12px; background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-md); margin-bottom: 7px; }\n.history-item.latest { border-color: var(--color-border-info); background: var(--color-background-info); }\n.history-item[draggable=\"true\"] { cursor: grab; }\n.history-item.dragging { opacity: 0.4; cursor: grabbing; }\n.history-item.drag-over { border-color: var(--color-border-info); box-shadow: 0 -2px 0 0 var(--color-border-info); }\n.drag-handle { cursor: grab; color: var(--color-text-tertiary); user-select: none; letter-spacing: -2px; flex-shrink: 0; }\n.history-num { font-size: 11px; color: var(--color-text-tertiary); font-family: var(--font-mono); flex-shrink: 0; }\n.hist-line { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; font-size: 13px; color: var(--color-text-primary); }\n.hist-among { color: var(--color-text-secondary); }\n.hist-arrow { color: var(--color-text-tertiary); margin: 0 3px; }\n.expr-conn { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-tertiary); margin: 0 2px; }\n.pct-big { font-size: 15px; font-weight: 600; color: var(--color-text-primary); font-family: var(--font-mono); }\n.pct-none { color: var(--color-text-warning); font-style: italic; }\n.spec-empty { color: var(--color-text-tertiary); font-style: italic; }\n";
  var HTML = "<h2>Candidate data</h2>\n<div class=\"database-box\">\n  <table id=\"database-table\">\n    <thead>\n      <tr id=\"database-head\"></tr>\n    </thead>\n    <tbody id=\"database-body\"></tbody>\n  </table>\n</div>\n\n<div class=\"instructions\">\n  Build a question by <strong>dragging chips</strong> from the tray into the blanks — or use the <strong>+</strong> button in each blank. Add more chips and click the <strong>and / or</strong> pill to combine them. To remove a chip, drag it back to the tray. Leave the first blank empty to look at all candidates. Then click <strong>Show result</strong> to add the answer below.\n</div>\n\n<div class=\"controls\">\n  <div class=\"qb-zone-line big\">\n    <span class=\"qb-text-lg\">Among candidates with</span>\n    <div class=\"qb-zone\" id=\"cond-zone\" data-zone=\"cond\">\n      <span class=\"qb-blank\" id=\"cond-blank\"></span>\n      <div class=\"qb-add-wrap\">\n        <button class=\"qb-add-btn mini\" id=\"cond-add-btn\" data-menu=\"cond-menu\" type=\"button\" title=\"add\">+</button>\n        <div class=\"qb-menu\" id=\"cond-menu\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"qb-zone-line\">\n    <span class=\"qb-text-lg\">I want to know what percentage are</span>\n    <div class=\"qb-zone\" id=\"target-zone\" data-zone=\"target\">\n      <span class=\"qb-blank\" id=\"target-blank\"></span>\n      <div class=\"qb-add-wrap\">\n        <button class=\"qb-add-btn mini\" id=\"target-add-btn\" data-menu=\"target-menu\" type=\"button\" title=\"add\">+</button>\n        <div class=\"qb-menu\" id=\"target-menu\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"qb-palette-wrap\">\n    <div class=\"qb-palette-label\">Chip tray <span>— attribute &amp; outcome chips; drag into a blank above</span></div>\n    <div class=\"qb-palette\" id=\"palette\"></div>\n  </div>\n</div>\n\n<div class=\"actions-row\">\n  <button class=\"submit-btn\" id=\"submit-btn\">Show result</button>\n  <button class=\"ctrl-btn\" id=\"reset-btn\">Reset</button>\n</div>\n\n<div class=\"history-section\">\n  <div class=\"history-header\">\n    <span>Saved results <span style=\"font-weight: 400; color: var(--color-text-tertiary);\">— drag to reorder</span></span>\n    <span style=\"font-size: 11px; color: var(--color-text-tertiary); font-weight: 400;\" id=\"history-count\"></span>\n  </div>\n  <div id=\"history-list\">\n    <div class=\"history-empty\">No results yet — set up a view above and click \"Show result\" to add it here.</div>\n  </div>\n</div>\n\n<!-- Hidden field mirroring the full interaction log as JSON. In Qualtrics, read\n     its value on page submit (or window.getProbabilityMachineData()) and store\n     it in an embedded-data field. -->\n<textarea id=\"pm-data\" name=\"pm-data\" aria-hidden=\"true\" tabindex=\"-1\" style=\"position:absolute; left:-9999px; top:0; width:1px; height:1px; opacity:0;\"></textarea>";
  var started=false;
  function boot(){ if(started)return; var root=document.getElementById("pm-root"); if(!root){return setTimeout(boot,40);} started=true; var st=document.createElement("style"); st.textContent=CSS; (document.head||document.documentElement).appendChild(st); root.insertAdjacentHTML("beforeend",HTML); run(); }
  function run(){

(function() {
  // ===== configuration (per-treatment, flexible) =====
  // Everything about the dataset can be overridden. Priority (highest first):
  //   1. window.PM_CONFIG            (recommended: inject via Qualtrics piped text)
  //   2. Qualtrics embedded data "pm_config"  (JSON string)
  //   3. URL query params            (?attributes=5&seed=7&config={...})
  //   4. DEFAULTS below
  const DEFAULTS = {
    nAttributes: 3,
    nCandidates: 1000,
    seed: 42,
    // -- Option A: specify the data directly by its joint distribution --
    // "joint" maps each profile (a string of 0/1 over the RELEVANT attributes,
    // in relevantIndices order) to [ P(profile & unsuccessful), P(profile & successful) ].
    // The values across all profiles should sum to 1. Any attributes not in
    // relevantIndices are generated independently of the outcome ("noise").
    joint: null,             // e.g. { "00":[0.230,0.181], "10":[0.100,0.028], "01":[0.272,0.109], "11":[0.011,0.069] }
    relevantIndices: null,   // which displayed attributes the joint governs; default [1..k]
    irrelevantRate: 0.5,     // P(high) for attributes not governed by the joint
    exact: true,             // allocate exact counts (N × p) so the sample matches the joint
    // -- Option B (fallback when joint is null): a logistic model --
    baseline: -0.5,                              // baseline log-odds of success
    mainEffects: { 1: 1.5, 2: 0.3, 3: -0.8 },    // effect of each attribute being "high"
    interactions: [ { a: 1, b: 2, coef: 1.8 } ], // attribute a × attribute b
    attributeRate: 0.5,                          // P(attribute = high)
    // -- labels --
    attributeLabels: null,                       // optional array of custom names
    outcomeLabel: 'Outcome',
    successWord: 'successful',
    failWord: 'unsuccessful',
    // -- logging --
    logMode: 'compact'    // 'compact' = only the queries participants build;
                          // 'full' = also the timestamped interaction stream
  };
  function readConfig() {
    let cfg = {};
    if (window.PM_CONFIG && typeof window.PM_CONFIG === 'object') cfg = Object.assign(cfg, window.PM_CONFIG);
    // A hidden element holding JSON piped from Qualtrics (e.g. <div id="pm-config">
    // ${e://Field/pm_config}</div>). Reading textContent decodes any &quot; entities,
    // so this is robust to how Qualtrics encodes piped text — and empty is harmless.
    try {
      const el = document.getElementById('pm-config');
      if (el && el.textContent && el.textContent.trim()) cfg = Object.assign(cfg, JSON.parse(el.textContent.trim()));
    } catch (_) {}
    try {
      if (window.Qualtrics && Qualtrics.SurveyEngine && typeof Qualtrics.SurveyEngine.getEmbeddedData === 'function') {
        const raw = Qualtrics.SurveyEngine.getEmbeddedData('pm_config');
        if (raw) cfg = Object.assign(cfg, JSON.parse(raw));
      }
    } catch (_) {}
    try {
      const p = new URLSearchParams(location.search);
      if (p.get('config')) { try { cfg = Object.assign(cfg, JSON.parse(p.get('config'))); } catch (_) {} }
      const ai = p.get('attributes') || p.get('nAttributes'); if (ai) cfg.nAttributes = parseInt(ai, 10);
      if (p.get('seed')) cfg.seed = parseInt(p.get('seed'), 10);
      if (p.get('candidates')) cfg.nCandidates = parseInt(p.get('candidates'), 10);
    } catch (_) {}
    const c = Object.assign({}, DEFAULTS, cfg);
    if (Array.isArray(c.mainEffects)) { const o = {}; c.mainEffects.forEach((v, i) => o[i + 1] = v); c.mainEffects = o; }
    if (c.interactions && !Array.isArray(c.interactions)) c.interactions = [c.interactions];
    c.nAttributes = Math.max(1, c.nAttributes | 0);
    c.nCandidates = Math.max(1, c.nCandidates | 0);
    return c;
  }
  const CFG = readConfig();

  // ===== data-generating process =====
  let N_ATTR = CFG.nAttributes;
  const N_CAND = CFG.nCandidates;

  function mulberry32(seed) {
    return function() {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = seed;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const rng = mulberry32(CFG.seed | 0);
  function logistic(x) { return 1 / (1 + Math.exp(-x)); }

  const database = [];
  let GEN = null;

  if (CFG.joint && typeof CFG.joint === 'object') {
    // ----- Option A: generate directly from the joint distribution -----
    const profiles = Object.keys(CFG.joint);
    const k = profiles[0].length;                       // number of relevant attributes
    let relIdx = Array.isArray(CFG.relevantIndices) ? CFG.relevantIndices.slice(0, k) : [];
    if (relIdx.length !== k) { relIdx = []; for (let n = 1; n <= k; n++) relIdx.push(n); }
    N_ATTR = Math.max(CFG.nAttributes, k, Math.max.apply(null, relIdx)); // total attributes shown

    // flatten the joint into 2^k × 2 cells and normalize to sum 1
    const cells = [];
    let total = 0;
    profiles.forEach(prof => {
      const pair = CFG.joint[prof];
      const p0 = +(Array.isArray(pair) ? pair[0] : pair.y0);
      const p1 = +(Array.isArray(pair) ? pair[1] : pair.y1);
      cells.push({ prof: prof, y: 0, p: p0 });
      cells.push({ prof: prof, y: 1, p: p1 });
      total += p0 + p1;
    });
    cells.forEach(c => c.p = c.p / (total || 1));

    // how many candidates in each cell
    let counts;
    if (CFG.exact !== false) {                           // exact allocation via largest remainder
      counts = cells.map(c => Math.floor(N_CAND * c.p));
      let rem = N_CAND - counts.reduce((a, b) => a + b, 0);
      const fr = cells.map((c, i) => ({ i: i, f: N_CAND * c.p - counts[i] })).sort((a, b) => b.f - a.f);
      for (let j = 0; j < rem; j++) counts[fr[j % fr.length].i]++;
    } else {                                             // random sampling from the joint
      counts = cells.map(() => 0);
      for (let i = 0; i < N_CAND; i++) {
        let u = rng(), acc = 0, pick = cells.length - 1;
        for (let c = 0; c < cells.length; c++) { acc += cells[c].p; if (u <= acc) { pick = c; break; } }
        counts[pick]++;
      }
    }

    // build candidates
    let id = 1;
    cells.forEach((c, ci) => {
      for (let r = 0; r < counts[ci]; r++) {
        const m = { id: id++ };
        relIdx.forEach((attrNum, bit) => { m['attr' + attrNum] = c.prof.charAt(bit) === '1'; });
        for (let n = 1; n <= N_ATTR; n++) { if (relIdx.indexOf(n) === -1) m['attr' + n] = rng() < CFG.irrelevantRate; }
        m.success = c.y === 1;
        database.push(m);
      }
    });
    // shuffle so cells aren't contiguous, then renumber ids
    for (let i = database.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const t = database[i]; database[i] = database[j]; database[j] = t; }
    database.forEach((m, i) => m.id = i + 1);
    GEN = { mode: 'joint', relevantIndices: relIdx, irrelevantRate: CFG.irrelevantRate, exact: CFG.exact !== false, joint: CFG.joint };

  } else {
    // ----- Option B: logistic model (default / fallback) -----
    for (let i = 0; i < N_CAND; i++) {
      const m = { id: i + 1 };
      let logit = CFG.baseline;
      for (let n = 1; n <= N_ATTR; n++) {            // draw order: attribute 1..N, then outcome
        const hi = rng() < CFG.attributeRate ? 1 : 0;
        m['attr' + n] = !!hi;
        logit += (CFG.mainEffects[n] || 0) * hi;
      }
      (CFG.interactions || []).forEach(ix => {
        logit += ix.coef * (m['attr' + ix.a] ? 1 : 0) * (m['attr' + ix.b] ? 1 : 0);
      });
      m.success = rng() < logistic(logit);
      database.push(m);
    }
    GEN = { mode: 'logistic', baseline: CFG.baseline, mainEffects: CFG.mainEffects, interactions: CFG.interactions, attributeRate: CFG.attributeRate };
  }

  // Display order for the database table — shuffled so rows aren't in machine-ID
  // order. Each machine's light/sound values stay together (correlations preserved);
  // only the order in which rows appear is randomized.
  const displayOrder = database.slice();
  for (let i = displayOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [displayOrder[i], displayOrder[j]] = [displayOrder[j], displayOrder[i]];
  }

  function renderDatabase() {
    const head = document.getElementById('database-head');
    const body = document.getElementById('database-body');

    const attrs = VARS.filter(v => v.kind === 'attribute');
    head.innerHTML = '<th style="width: 80px;">Candidate</th>'
      + attrs.map(v => '<th>' + v.label + '</th>').join('')
      + '<th>' + CFG.outcomeLabel + '</th>';

    body.innerHTML = displayOrder.map(m => '<tr>'
      + '<td class="machine-id">C' + m.id + '</td>'
      + attrs.map(v => '<td><span class="bulb-cell l' + v.n + ' ' + (m['attr' + v.n] ? 'on' : 'off') + '"></span> <span class="hilo">' + (m['attr' + v.n] ? 'high' : 'low') + '</span></td>').join('')
      + '<td class="' + (m.success ? 'sound-yes' : 'sound-no') + '">' + (m.success ? '✓ ' + CFG.successWord : CFG.failWord) + '</td>'
      + '</tr>').join('');
  }

  // ===== state =====
  const VARS = [];
  for (let n = 1; n <= N_ATTR; n++) VARS.push({ id: 'attr' + n, kind: 'attribute', n, label: (CFG.attributeLabels && CFG.attributeLabels[n - 1]) || ('Attribute ' + n) });
  VARS.push({ id: 'success', kind: 'outcome', label: CFG.outcomeLabel });
  function varById(id) { return VARS.find(v => v.id === id); }
  // display word for a variable's positive ('on') / negative ('off') value
  function stateLabel(v, state) {
    const hi = state === 'on';
    return v.kind === 'outcome' ? (hi ? CFG.successWord : CFG.failWord) : (hi ? 'high' : 'low');
  }

  // Colours are hard-coded in CSS for attributes 1–3; generate matching styles for
  // any extra attributes so 4+ look consistent without editing the stylesheet.
  function ensureLightStyles() {
    const extra = VARS.filter(v => v.kind === 'attribute' && v.n > 3);
    if (extra.length === 0) return;
    let css = '';
    extra.forEach(v => {
      const hue = Math.round((v.n * 47) % 360);
      const fill = 'hsl(' + hue + ' 62% 52%)';
      const stroke = 'hsl(' + hue + ' 62% 36%)';
      const bg = 'hsl(' + hue + ' 62% 94%)';
      const text = 'hsl(' + hue + ' 62% 28%)';
      const k = 'l' + v.n;
      css += '.bulb-cell.' + k + '.on{background:' + fill + ';border-color:' + stroke + ';}';
      css += '.mini-bulb.' + k + '.on{background:' + fill + ';border-color:' + stroke + ';}';
      css += '.mini-chip.' + k + '.state-on{background:' + bg + ';border-color:' + fill + ';color:' + text + ';}';
      css += '.mini-chip.kind-var.' + k + '{background:' + bg + ';border-color:' + fill + ';color:' + text + ';}';
    });
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
  // The query is two lists of { varId, state } picks (state = 'on' | 'off'):
  //   conditions — "among machines with ___"  (restricts which machines we look at)
  //   targets    — "percentage of machines that have ___"  (what we measure)
  let conditions = [];
  let targets = [];
  // history[0] = top of the list. New results are added to the top; users can
  // drag cards to reorder. queryCounter gives each result a stable #number.
  const history = [];
  let queryCounter = 0;

  // ===== data logging (for Qualtrics / research) =====
  // By default (logMode 'compact') the stored data is just the queries the
  // participant builds. Set logMode 'full' for the timestamped event stream too.
  // The data is exposed three ways: window.getProbabilityMachineData(), a hidden
  // <textarea id="pm-data"> kept in sync, and (inside a survey) a Qualtrics
  // embedded-data field named "probabilityMachineData".
  const SESSION_START = Date.now();
  const PARTICIPANT_ID = (function () {
    // pull ?pid= / ?participant= from the URL if present, else a random id
    try {
      const p = new URLSearchParams(location.search);
      return p.get('pid') || p.get('participant') || p.get('id') || ('anon-' + Math.random().toString(36).slice(2, 10));
    } catch (_) { return 'anon-' + Math.random().toString(36).slice(2, 10); }
  })();
  const eventLog = [];

  // human-readable expression, e.g. "(Attribute 1=high AND Attribute 2=high) OR Attribute 3=low"
  function exprString(list) {
    if (!list || list.length === 0) return '(any)';
    const groups = [];
    list.forEach((t, i) => {
      const v = varById(t.varId);
      const token = v.label + '=' + stateLabel(v, t.state);
      if (i === 0 || t.conn === 'or') groups.push([token]);
      else groups[groups.length - 1].push(token);
    });
    const parts = groups.map(g => g.length > 1 ? '(' + g.join(' AND ') + ')' : g[0]);
    return parts.join(' OR ');
  }
  function exprData(list) {
    return list.map(t => ({ varId: t.varId, value: stateLabel(varById(t.varId), t.state), state: t.state, conn: t.conn || null }));
  }

  // the queries the participant built (what they put in each blank)
  function resultsList() {
    return history.map(h => ({
      queryNum: h.queryNum,
      conditionsText: exprString(h.conditions),
      targetText: exprString(h.targets),
      conditions: exprData(h.conditions),
      target: exprData(h.targets),
      percentage: h.pct === null ? null : Number(h.pct.toFixed(2)),
      nMatchingConditions: h.n
    }));
  }

  function currentData() {
    // COMPACT (default): just the fields participants fill in — no timestamps,
    // no per-drag event stream. Keeps the stored value small.
    if (CFG.logMode !== 'full') {
      return {
        participantId: PARTICIPANT_ID,
        treatment: Object.assign(
          { seed: CFG.seed, nAttributes: N_ATTR, generation: GEN ? GEN.mode : 'logistic' },
          (GEN && GEN.mode === 'joint') ? { relevantIndices: GEN.relevantIndices, irrelevantRate: GEN.irrelevantRate } : {}
        ),
        numResults: history.length,
        results: resultsList()
      };
    }
    // FULL: everything, including the timestamped interaction stream.
    return {
      participantId: PARTICIPANT_ID,
      startedAt: new Date(SESSION_START).toISOString(),
      exportedAt: new Date().toISOString(),
      elapsedMs: Date.now() - SESSION_START,
      dataModel: Object.assign({
        nCandidates: N_CAND, seed: CFG.seed, nAttributes: N_ATTR,
        outcomeLabel: CFG.outcomeLabel, successWord: CFG.successWord, failWord: CFG.failWord
      }, GEN || {}),
      events: eventLog,
      savedResults: resultsList()
    };
  }

  function syncData() {
    const json = JSON.stringify(currentData());
    const out = document.getElementById('pm-data');
    if (out) out.value = json;
    // Best-effort live push to Qualtrics (only the static method, if present).
    // The authoritative save happens in the question's addOnPageSubmit via the
    // question-instance method this.setJSEmbeddedData — see the survey setup.
    try {
      const qe = window.Qualtrics && Qualtrics.SurveyEngine;
      if (qe && typeof qe.setJSEmbeddedData === 'function') qe.setJSEmbeddedData('probabilityMachineData', json);
    } catch (_) {}
    // Also stash the recap in the browser so a later page (the choice task) can
    // show what this participant found, regardless of embedded-data saving.
    try {
      localStorage.setItem('candidateExplorer.part1', JSON.stringify({
        participantId: PARTICIPANT_ID,
        results: resultsList(),
        nAttributes: N_ATTR,
        attributeLabels: VARS.filter(v => v.kind === 'attribute').map(v => v.label),
        outcomeLabel: CFG.outcomeLabel, successWord: CFG.successWord, failWord: CFG.failWord,
        relevantIndices: (GEN && GEN.mode === 'joint') ? GEN.relevantIndices : null,
        irrelevantRate: (GEN && GEN.mode === 'joint') ? GEN.irrelevantRate : null
      }));
    } catch (_) {}
    return json;
  }
  window.getProbabilityMachineData = () => syncData();

  function logEvent(type, detail) {
    eventLog.push(Object.assign({
      t: Date.now() - SESSION_START,
      iso: new Date().toISOString(),
      type: type
    }, detail || {}));
    syncData();
  }

  // ===== chip helpers =====
  const OUTCOME_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  function valueChip(v, state) {
    if (v.kind === 'outcome') {
      return '<span class="mini-chip kind-sound state-' + state + '">' + OUTCOME_SVG + stateLabel(v, state) + '</span>';
    }
    return '<span class="mini-chip l' + v.n + ' state-' + state + '"><span class="mini-bulb l' + v.n + ' ' + state + '"></span>A' + v.n + ' ' + stateLabel(v, state) + '</span>';
  }
  function variableChip(v) {
    if (v.kind === 'outcome') {
      return '<span class="mini-chip kind-var sound">' + OUTCOME_SVG + v.label + '</span>';
    }
    return '<span class="mini-chip kind-var l' + v.n + '"><span class="mini-bulb l' + v.n + ' on"></span>' + v.label + '</span>';
  }

  // ===== query builder =====
  // Each blank holds a list of terms { varId, state, conn }, where conn is the
  // connector BEFORE this term ('and' | 'or'); the first term has conn = null.
  // Expressions evaluate as OR-of-ANDs: split at 'or', AND within each group.
  const zoneList = { cond: () => conditions, target: () => targets };
  // prospective connector for the NEXT chip added to each blank
  let pending = { cond: 'and', target: 'and' };

  // add a chip to a blank, using that blank's prospective connector
  function addToZone(key, varId, state) {
    const list = zoneList[key]();
    const conn = list.length === 0 ? null : (pending[key] || 'and');
    list.push({ varId, state, conn });
    pending[key] = 'and'; // reset after use
  }
  function removeTerm(listArr, i) {
    listArr.splice(i, 1);
    if (listArr.length) listArr[0].conn = null; // first term never has a connector
  }

  // split a term list into AND-groups (new group starts at each 'or')
  function groupTerms(listArr) {
    const groups = [];
    listArr.forEach((t, i) => {
      if (i === 0 || t.conn === 'or') groups.push([i]);
      else groups[groups.length - 1].push(i);
    });
    return groups;
  }

  // a click-to-toggle AND / OR pill. Shows the current connector; click switches it.
  // ('next' = the prospective/ghost connector for the next added chip).
  function switchHTML(dataI, conn, ghost) {
    const isOr = conn === 'or';
    return '<button type="button" class="qb-conn' + (isOr ? ' or' : '') + (ghost ? ' ghost' : '') + '"'
      + ' data-i="' + dataI + '" title="click to switch to ' + (isOr ? 'AND' : 'OR') + '">'
      + (isOr ? 'or' : 'and') + '</button>';
  }

  function chipHTML(listArr, i, zoneKey) {
    const e = listArr[i];
    return '<span class="qb-chip" draggable="true" data-zone="' + zoneKey + '" data-i="' + i + '" title="drag to the tray to remove">'
      + valueChip(varById(e.varId), e.state) + '</span>';
  }

  function renderBlank(blankEl, listArr, zoneKey, emptyClass) {
    if (listArr.length === 0) {
      blankEl.className = 'qb-blank empty' + (emptyClass ? ' ' + emptyClass : '');
      blankEl.innerHTML = '';
      return;
    }
    blankEl.className = 'qb-blank';
    const groups = groupTerms(listArr);
    const soloGroup = groups.length === 1; // pure-AND query -> no visible bracket
    let html = '';
    groups.forEach((g, gi) => {
      if (gi > 0) {
        // OR boundary: the connector for this group's first term (its conn === 'or')
        html += '<span class="qb-or-sep">' + switchHTML(g[0], 'or', false) + '</span>';
      }
      html += '<span class="qb-group' + (soloGroup ? ' solo' : '') + '">';
      g.forEach((termIdx, p) => {
        if (p > 0) html += switchHTML(termIdx, 'and', false); // within-group AND switch
        html += chipHTML(listArr, termIdx, zoneKey);
      });
      html += '</span>';
    });
    // trailing ghost: signals you can add another chip, and pre-picks its connector
    html += '<span class="qb-trailer">' + switchHTML('next', pending[zoneKey], true)
      + '<span class="qb-ghost-chip">+ chip</span></span>';
    blankEl.innerHTML = html;

    // connector pills between existing terms flip that term's connector on click
    blankEl.querySelectorAll('.qb-conn:not(.ghost)').forEach(sw => {
      sw.addEventListener('click', () => {
        const i = Number(sw.dataset.i);
        const to = listArr[i].conn === 'or' ? 'and' : 'or';
        listArr[i].conn = to;
        logEvent('toggle_connector', { zone: zoneKey, index: i, to: to });
        renderAll();
      });
    });
    // ghost pill sets the connector the next added chip will use
    blankEl.querySelectorAll('.qb-conn.ghost').forEach(sw => {
      sw.addEventListener('click', () => {
        const to = pending[zoneKey] === 'or' ? 'and' : 'or';
        pending[zoneKey] = to;
        logEvent('toggle_pending', { zone: zoneKey, to: to });
        renderAll();
      });
    });
    blankEl.querySelectorAll('.qb-chip').forEach(chip => {
      chip.addEventListener('dragstart', e => {
        const i = Number(chip.dataset.i);
        const entry = listArr[i];
        dragData = { from: zoneKey, index: i, varId: entry.varId, state: entry.state };
        chip.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', entry.varId); } catch (_) {}
      });
      chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
    });
  }

  // draggable chip tray
  function renderPalette() {
    const pal = document.getElementById('palette');
    pal.innerHTML = VARS.map(v =>
      '<span class="qb-pal-group">'
      + ['on', 'off'].map(state =>
          '<span class="qb-chip pal-chip" draggable="true" data-var="' + v.id + '" data-state="' + state + '">'
          + valueChip(v, state) + '</span>'
        ).join('')
      + '</span>'
    ).join('');
    pal.querySelectorAll('.pal-chip').forEach(chip => {
      chip.addEventListener('dragstart', e => {
        dragData = { from: 'palette', index: null, varId: chip.dataset.var, state: chip.dataset.state };
        chip.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'copy';
        try { e.dataTransfer.setData('text/plain', chip.dataset.var); } catch (_) {}
      });
      chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
    });
  }

  // wire the drop zones + tray once (containers persist across re-renders)
  let dragData = null;
  function attachDnD() {
    ['cond-zone', 'target-zone'].forEach(id => {
      const zone = document.getElementById(id);
      const key = zone.dataset.zone;
      zone.addEventListener('dragover', e => { if (dragData) { e.preventDefault(); zone.classList.add('drop-hover'); } });
      zone.addEventListener('dragleave', e => { if (!zone.contains(e.relatedTarget)) zone.classList.remove('drop-hover'); });
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drop-hover');
        if (!dragData) return;
        if (dragData.from === 'palette') {
          addToZone(key, dragData.varId, dragData.state);
          const added = zoneList[key]().slice(-1)[0];
          logEvent('add_chip', { zone: key, varId: dragData.varId, state: dragData.state, value: stateLabel(varById(dragData.varId), dragData.state), conn: added.conn, via: 'drag' });
        } else if (dragData.from !== key) {
          removeTerm(zoneList[dragData.from](), dragData.index);
          addToZone(key, dragData.varId, dragData.state);
          logEvent('move_chip', { from: dragData.from, to: key, varId: dragData.varId, state: dragData.state, value: stateLabel(varById(dragData.varId), dragData.state) });
        }
        dragData = null;
        renderAll();
      });
    });
    const pal = document.getElementById('palette');
    pal.addEventListener('dragover', e => { if (dragData && dragData.from !== 'palette') { e.preventDefault(); pal.classList.add('drop-remove'); } });
    pal.addEventListener('dragleave', () => pal.classList.remove('drop-remove'));
    pal.addEventListener('drop', e => {
      e.preventDefault();
      pal.classList.remove('drop-remove');
      if (dragData && dragData.from !== 'palette') {
        logEvent('remove_chip', { zone: dragData.from, varId: dragData.varId, state: dragData.state, value: stateLabel(varById(dragData.varId), dragData.state) });
        removeTerm(zoneList[dragData.from](), dragData.index);
        dragData = null;
        renderAll();
      }
    });
  }

  function renderMenu(menuEl, zoneKey) {
    // every variable/state is always addable (repeats allowed for and/or logic)
    const searchHTML = VARS.length > 6
      ? '<input type="text" class="qb-search" placeholder="filter…">'
      : '';
    const rows = VARS.map(v =>
      '<div class="qb-opt" data-label="' + v.label.toLowerCase() + '">'
      + '<span class="qb-opt-label">' + variableChip(v) + '</span>'
      + '<span class="qb-opt-actions">'
      + '<button type="button" class="qb-state-btn on" data-var="' + v.id + '" data-state="on">' + stateLabel(v, 'on') + '</button>'
      + '<button type="button" class="qb-state-btn off" data-var="' + v.id + '" data-state="off">' + stateLabel(v, 'off') + '</button>'
      + '</span></div>'
    ).join('');
    menuEl.innerHTML = searchHTML + '<div class="qb-opt-list">' + rows + '</div>';

    menuEl.querySelectorAll('.qb-state-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        addToZone(zoneKey, btn.dataset.var, btn.dataset.state);
        const added = zoneList[zoneKey]().slice(-1)[0];
        logEvent('add_chip', { zone: zoneKey, varId: btn.dataset.var, state: btn.dataset.state, value: stateLabel(varById(btn.dataset.var), btn.dataset.state), conn: added.conn, via: 'menu' });
        closeMenus();
        renderAll();
      });
    });
    const search = menuEl.querySelector('.qb-search');
    if (search) {
      search.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        menuEl.querySelectorAll('.qb-opt').forEach(opt => {
          opt.style.display = opt.dataset.label.includes(q) ? '' : 'none';
        });
      });
    }
  }

  function closeMenus() {
    document.querySelectorAll('.qb-menu').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.qb-add-btn').forEach(b => b.classList.remove('open'));
  }
  function toggleMenu(id) {
    const menu = document.getElementById(id);
    const wasOpen = menu.classList.contains('open');
    closeMenus();
    if (!wasOpen) {
      menu.classList.add('open');
      const btn = document.querySelector('[data-menu="' + id + '"]');
      if (btn) btn.classList.add('open');
      const search = menu.querySelector('.qb-search');
      if (search) search.focus();
    }
  }

  function renderBuilder() {
    renderBlank(document.getElementById('target-blank'), targets, 'target', 'target-empty');
    renderBlank(document.getElementById('cond-blank'), conditions, 'cond', '');
    renderPalette();
    renderMenu(document.getElementById('cond-menu'), 'cond');
    renderMenu(document.getElementById('target-menu'), 'target');

    const condBtn = document.getElementById('cond-add-btn');
    const targBtn = document.getElementById('target-add-btn');
    condBtn.onclick = e => { e.stopPropagation(); toggleMenu('cond-menu'); };
    targBtn.onclick = e => { e.stopPropagation(); toggleMenu('target-menu'); };
  }

  // ===== computation =====
  function valOf(m, v) {
    return v.kind === 'outcome' ? m.success : m['attr' + v.n];
  }
  function matches(m, entry) {
    const on = !!valOf(m, varById(entry.varId));
    return entry.state === 'on' ? on : !on;
  }
  // OR-of-ANDs: split the term list at 'or' boundaries, AND within each group,
  // and OR the groups together. An empty list matches everything.
  function evalExpr(m, list) {
    if (list.length === 0) return true;
    let result = false, group = true;
    list.forEach((t, i) => {
      const ok = matches(m, t);
      if (i === 0) group = ok;
      else if (t.conn === 'or') { result = result || group; group = ok; }
      else group = group && ok;
    });
    return result || group;
  }
  function compute() {
    const filtered = database.filter(m => evalExpr(m, conditions));
    const n = filtered.length;
    const onN = filtered.filter(m => evalExpr(m, targets)).length;
    return { n, onN, pct: n === 0 ? null : (onN / n * 100) };
  }

  // ===== history =====
  function saveQuery() {
    if (targets.length === 0) return; // must measure at least one thing
    const result = compute();
    const entry = {
      queryNum: ++queryCounter,
      conditions: conditions.map(c => ({ ...c })),
      targets: targets.map(t => ({ ...t })),
      pct: result.pct,
      n: result.n,
    };
    history.unshift(entry);
    logEvent('show_result', {
      queryNum: entry.queryNum,
      conditionsText: exprString(entry.conditions),
      targetText: exprString(entry.targets),
      percentage: result.pct === null ? null : Number(result.pct.toFixed(2)),
      nMatchingConditions: result.n
    });
    // clear the query builder so it's ready for the next question
    conditions = [];
    targets = [];
    pending = { cond: 'and', target: 'and' };
    closeMenus();
    renderAll();
    renderHistory();
  }

  // render a term list as inline chips joined by their and/or connectors
  function exprHTML(list) {
    return list.map((e, i) =>
      (i > 0 ? '<span class="expr-conn">' + (e.conn === 'or' ? 'or' : 'and') + '</span>' : '')
      + valueChip(varById(e.varId), e.state)
    ).join('');
  }

  function renderHistory() {
    const list = document.getElementById('history-list');
    const countEl = document.getElementById('history-count');
    if (history.length === 0) {
      list.innerHTML = '<div class="history-empty">No results yet — build a question above and click "Show result" to add it here.</div>';
      countEl.textContent = '';
      return;
    }
    countEl.textContent = history.length + ' ' + (history.length === 1 ? 'result' : 'results');

    list.innerHTML = history.map((h, displayIdx) => {
      const isLatest = h.queryNum === queryCounter;
      const condHTML = h.conditions.length === 0
        ? '<span class="spec-empty">all candidates</span>'
        : exprHTML(h.conditions);
      const pctHTML = (h.n === 0)
        ? '<span class="pct-none">no candidates</span>'
        : '<span class="pct-big">' + h.pct.toFixed(1) + '%</span>';

      return '<div class="history-item ' + (isLatest ? 'latest' : '') + '" draggable="true" data-idx="' + displayIdx + '">'
        + '<span class="drag-handle" title="Drag to reorder">⠿</span>'
        + '<span class="history-num">#' + h.queryNum + '</span>'
        + '<span class="hist-line">'
        +   '<span class="hist-among">Among candidates with</span> ' + condHTML
        +   '<span class="hist-arrow">→</span>'
        +   pctHTML + ' <span class="hist-among">are</span> ' + exprHTML(h.targets)
        + '</span>'
        + '</div>';
    }).join('');

    attachHistoryDnD(list);
  }

  // ===== drag-and-drop reordering of saved queries =====
  let dragSrcIdx = null;
  function attachHistoryDnD(list) {
    list.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('dragstart', e => {
        dragSrcIdx = Number(item.dataset.idx);
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        // Firefox requires data to be set for drag to start.
        try { e.dataTransfer.setData('text/plain', String(dragSrcIdx)); } catch (_) {}
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        list.querySelectorAll('.history-item').forEach(i => i.classList.remove('drag-over'));
      });
      item.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });
      item.addEventListener('dragenter', () => {
        if (Number(item.dataset.idx) !== dragSrcIdx) item.classList.add('drag-over');
      });
      item.addEventListener('dragleave', () => {
        item.classList.remove('drag-over');
      });
      item.addEventListener('drop', e => {
        e.preventDefault();
        const targetIdx = Number(item.dataset.idx);
        if (dragSrcIdx === null || dragSrcIdx === targetIdx) return;
        const [moved] = history.splice(dragSrcIdx, 1);
        history.splice(targetIdx, 0, moved);
        logEvent('reorder_result', { queryNum: moved.queryNum, fromIndex: dragSrcIdx, toIndex: targetIdx });
        dragSrcIdx = null;
        renderHistory();
      });
    });
  }

  // ===== top-level render =====
  function updateSubmitState() {
    const btn = document.getElementById('submit-btn');
    const ok = targets.length > 0;
    btn.disabled = !ok;
    btn.title = ok ? '' : 'Add at least one chip to the "what percentage are" blank first';
  }

  function renderAll() {
    renderBuilder();
    updateSubmitState();
  }

  document.getElementById('submit-btn').addEventListener('click', saveQuery);
  document.getElementById('reset-btn').addEventListener('click', () => {
    logEvent('reset_builder', { hadConditions: conditions.length, hadTargets: targets.length });
    conditions = [];
    targets = [];
    pending = { cond: 'and', target: 'and' };
    closeMenus();
    renderAll();
  });
  // click outside an add-control closes any open menu
  document.addEventListener('click', e => {
    if (!e.target.closest('.qb-add-wrap')) closeMenus();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenus();
  });

  ensureLightStyles();
  attachDnD();
  renderDatabase();
  renderAll();
  renderHistory();
  logEvent('session_start', { participantId: PARTICIPANT_ID });
})();

  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",boot);}else{boot();}
})();
