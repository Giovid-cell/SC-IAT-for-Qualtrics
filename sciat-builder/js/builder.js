/* SC-IAT Builder — logica del form e generazione del codice */
(function () {
  'use strict';

  var D = window.SCIAT_DEFAULTS;
  var $ = function (id) { return document.getElementById(id); };
  var q = function (s) { return JSON.stringify(String(s)); }; // literal JS sicuro

  // Converte un textarea (una riga = uno stimolo) in array
  function lines(val) {
    return String(val).split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function commaList(val) {
    return String(val).split(/[\n,]/).map(function (s) { return s.trim(); }).filter(Boolean);
  }

  // ---- Popolamento iniziale del form dai default ----
  function fillForm() {
    $('repo').value = D.repo;
    $('configPath').value = D.configPath;
    $('enginePath').value = D.enginePath;
    $('engineCommit').value = D.engineCommit;
    $('imagesBaseUrl').value = D.imagesBaseUrl;

    ['category', 'attribute1', 'attribute2'].forEach(function (k) {
      var c = D[k];
      $(k + '_name').value = c.name;
      $(k + '_mediaType').value = c.mediaType;
      $(k + '_stimuli').value = c.stimuli.join('\n');
      $(k + '_repeated').value = c.repeatedStimuli.join('\n');
      $(k + '_color').value = c.color;
      $(k + '_fontSize').value = c.fontSize;
      $(k + '_titleFontSize').value = c.titleFontSize;
      $(k + '_titleHeight').value = c.titleHeight;
    });

    $('numBlocks').value = D.numBlocks;
    $('singleAttTrials').value = D.singleAttTrials;
    $('sharedAttTrials').value = D.sharedAttTrials;
    $('categoryTrials').value = D.categoryTrials;
    $('miniBlocks').value = D.miniBlocks;
    $('blockOrder').value = D.blockOrder;
    $('switchSideBlock').value = D.switchSideBlock;
    $('ITIDuration').value = D.ITIDuration;
    $('responseTimeout').value = D.responseTimeout;

    $('leftKey').value = D.leftKey;
    $('rightKey').value = D.rightKey;
    $('leftKeyText').value = D.leftKeyText;
    $('rightKeyText').value = D.rightKeyText;
    $('orText').value = D.orText;
    $('finalText').value = D.finalText;

    $('customizeInstructions').checked = D.customizeInstructions;
    $('instCategoryLeft').value = D.instTemplateCategoryLeft;
    $('instCategoryRight').value = D.instTemplateCategoryRight;
    $('instTransitionCtoI').value = D.instTemplateTransitionCtoI;
    $('instTransitionItoC').value = D.instTemplateTransitionItoC;
    toggleInstructions();
  }

  function toggleInstructions() {
    $('instructionsBox').style.display = $('customizeInstructions').checked ? 'block' : 'none';
  }

  // ---- Lettura del form ----
  function gather() {
    function cat(k) {
      return {
        name: $(k + '_name').value.trim(),
        mediaType: $(k + '_mediaType').value,
        stimuli: lines($(k + '_stimuli').value),
        repeatedStimuli: commaList($(k + '_repeated').value),
        color: $(k + '_color').value.trim(),
        fontSize: $(k + '_fontSize').value.trim(),
        titleFontSize: $(k + '_titleFontSize').value.trim(),
        titleHeight: Number($(k + '_titleHeight').value)
      };
    }
    return {
      repo: $('repo').value.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '').replace(/\/$/, ''),
      configPath: $('configPath').value.trim().replace(/^\//, ''),
      enginePath: $('enginePath').value.trim().replace(/^\//, ''),
      engineCommit: $('engineCommit').value.trim() || 'main',
      imagesBaseUrl: $('imagesBaseUrl').value.trim(),
      category: cat('category'),
      attribute1: cat('attribute1'),
      attribute2: cat('attribute2'),
      numBlocks: Number($('numBlocks').value),
      singleAttTrials: Number($('singleAttTrials').value),
      sharedAttTrials: Number($('sharedAttTrials').value),
      categoryTrials: Number($('categoryTrials').value),
      miniBlocks: Number($('miniBlocks').value),
      blockOrder: $('blockOrder').value,
      switchSideBlock: Number($('switchSideBlock').value),
      ITIDuration: Number($('ITIDuration').value),
      responseTimeout: Number($('responseTimeout').value),
      leftKey: $('leftKey').value.trim().toLowerCase(),
      rightKey: $('rightKey').value.trim().toLowerCase(),
      leftKeyText: $('leftKeyText').value,
      rightKeyText: $('rightKeyText').value,
      orText: $('orText').value,
      finalText: $('finalText').value,
      customizeInstructions: $('customizeInstructions').checked,
      instCategoryLeft: $('instCategoryLeft').value,
      instCategoryRight: $('instCategoryRight').value,
      instTransitionCtoI: $('instTransitionCtoI').value,
      instTransitionItoC: $('instTransitionItoC').value
    };
  }

  // ---- Validazione / avvisi onesti sui vincoli del motore ----
  function validate(v) {
    var w = [];
    ['category', 'attribute1', 'attribute2'].forEach(function (k) {
      var c = v[k];
      if (!c.name) w.push('"' + k + '": manca il nome.');
      if (c.stimuli.length === 0) w.push('"' + (c.name || k) + '": nessuno stimolo.');
      var notIn = c.repeatedStimuli.filter(function (r) { return c.stimuli.indexOf(r) === -1; });
      if (notIn.length) w.push('"' + c.name + '": ripetizioni non presenti tra gli stimoli (ignorate): ' + notIn.join(', '));
    });
    [['singleAttTrials', 'attributo singolo'], ['sharedAttTrials', 'attributo condiviso'], ['categoryTrials', 'categoria']].forEach(function (p) {
      if (!(v[p[0]] > 0)) w.push('Trial ' + p[1] + ': valore non valido (' + v[p[0]] + ').');
    });
    if (v.leftKey === v.rightKey) w.push('Tasto sinistro e destro coincidono ("' + v.leftKey + '").');
    if (!(v.leftKey && v.leftKey.length === 1)) w.push('Tasto sinistro deve essere un singolo carattere.');
    if (!(v.rightKey && v.rightKey.length === 1)) w.push('Tasto destro deve essere un singolo carattere.');
    if (!(v.responseTimeout >= 200)) w.push('Timeout di risposta troppo basso (' + v.responseTimeout + ' ms).');
    if (v.switchSideBlock > v.numBlocks) w.push('switchSideBlock (' + v.switchSideBlock + ') è maggiore del numero di blocchi (' + v.numBlocks + ').');
    if (!v.repo || v.repo.split('/').length !== 2) w.push('Repository non valido: usa il formato "utente/repo".');
    return w;
  }

  // ---- Generazione del modulo config ----
  function mediaArr(c) {
    var key = c.mediaType === 'image' ? 'image' : 'word';
    return '[ ' + c.stimuli.map(function (s) { return '{' + key + ': ' + q(s) + '}'; }).join(', ') + ' ]';
  }
  function repArr(c) {
    return '[' + c.repeatedStimuli.map(q).join(', ') + ']';
  }
  function catBlock(name, c) {
    return (
      '    ' + name + ' : {\n' +
      '      name : ' + q(c.name) + ',\n' +
      '      title : {\n' +
      '        media : {word : ' + q(c.name) + '},\n' +
      '        css : {color:' + q(c.color) + ",'font-size':" + q(c.titleFontSize) + '},\n' +
      '        height : ' + c.titleHeight + '\n' +
      '      },\n' +
      '      media : ' + mediaArr(c) + ',\n' +
      '      repeatedStimuli: ' + repArr(c) + ',\n' +
      '      css : {color:' + q(c.color) + ",'font-size':" + q(c.fontSize) + '}\n' +
      '    }'
    );
  }
  function trialsByBlock(v) {
    var b = [];
    for (var i = 0; i < v.numBlocks; i++) {
      b.push(
        '      { block : ' + (i + 1) + ', miniBlocks : ' + v.miniBlocks +
        ', singleAttTrials : ' + v.singleAttTrials +
        ', sharedAttTrials : ' + v.sharedAttTrials +
        ', categoryTrials : ' + v.categoryTrials + ', instHTML : \'\' }'
      );
    }
    return '[\n' + b.join(',\n') + '\n    ]';
  }

  function generateConfig(v, engineUrlOverride) {
    var engineUrl = engineUrlOverride || ('https://cdn.jsdelivr.net/gh/' + v.repo + '@' + v.engineCommit + '/' + v.enginePath);
    var parts = [];
    parts.push(catBlock('category', v.category));
    parts.push(catBlock('attribute1', v.attribute1));
    parts.push(catBlock('attribute2', v.attribute2));
    parts.push('    trialsByBlock : ' + trialsByBlock(v));
    parts.push('    blockOrder : ' + q(v.blockOrder));
    parts.push('    switchSideBlock : ' + v.switchSideBlock);
    parts.push('    ITIDuration : ' + v.ITIDuration);
    parts.push('    responseTimeout : ' + v.responseTimeout);
    parts.push('    leftKey : ' + q(v.leftKey));
    parts.push('    rightKey : ' + q(v.rightKey));
    parts.push('    leftKeyText : ' + q(v.leftKeyText));
    parts.push('    rightKeyText : ' + q(v.rightKeyText));
    parts.push('    orText : ' + q(v.orText));
    parts.push('    finalText : ' + q(v.finalText));
    if (v.customizeInstructions) {
      parts.push('    instTemplateCategoryLeft : ' + q(v.instCategoryLeft));
      parts.push('    instTemplateCategoryRight : ' + q(v.instCategoryRight));
      parts.push('    instTemplateTransitionCtoI : ' + q(v.instTransitionCtoI));
      parts.push('    instTemplateTransitionItoC : ' + q(v.instTransitionItoC));
    }
    parts.push('    base_url : { image : ' + q(v.imagesBaseUrl) + ' }');

    return (
      '// Generato da SC-IAT Builder — ' + new Date().toISOString().slice(0, 10) + '\n' +
      '// Committa questo file in: ' + v.configPath + '\n' +
      '// Motore pinnato: ' + engineUrl + '\n' +
      "define(['pipAPI', '" + engineUrl + "'], function(APIConstructor, stiatExtension){\n" +
      '  var API = new APIConstructor();\n' +
      '  return stiatExtension({\n' +
      parts.join(',\n') + '\n' +
      '  });\n' +
      '});\n'
    );
  }

  // ---- Generazione del wrapper Qualtrics (bootstrap loader, una tantum) ----
  function generateWrapper(v) {
    return (
      'Qualtrics.SurveyEngine.addOnload(function() {\n' +
      '    var qthis = this;\n' +
      '    var container = this.getQuestionContainer();\n' +
      "    container.querySelector('.Inner').style.display = 'none';\n" +
      '    this.hideNextButton();\n' +
      '\n' +
      "    var canvas = document.createElement('div');\n" +
      "    canvas.id = 'minnoCanvas';\n" +
      "    canvas.style.minHeight = '600px';\n" +
      '    container.appendChild(canvas);\n' +
      '\n' +
      '    // ===== BOOTSTRAP LOADER (stabile: NON modificare a ogni nuova versione) =====\n' +
      '    // Risolve l\'ultimo commit del file config e lo carica pinnato => immutabile, niente cache stantia.\n' +
      "    var REPO = " + q(v.repo) + ";\n" +
      "    var CONFIG_PATH = " + q(v.configPath) + ";\n" +
      "    var api = 'https://api.github.com/repos/' + REPO + '/commits?path=' + encodeURIComponent(CONFIG_PATH) + '&per_page=1';\n" +
      "    fetch(api, { headers: { 'Accept': 'application/vnd.github+json' } })\n" +
      '      .then(function(r){ return r.ok ? r.json() : []; })\n' +
      '      .then(function(commits){\n' +
      "        var sha = (commits && commits[0] && commits[0].sha) ? commits[0].sha : 'main';\n" +
      "        startMinno('https://cdn.jsdelivr.net/gh/' + REPO + '@' + sha + '/' + CONFIG_PATH);\n" +
      '      })\n' +
      "      .catch(function(){ startMinno('https://cdn.jsdelivr.net/gh/' + REPO + '@main/' + CONFIG_PATH); });\n" +
      '\n' +
      '    function startMinno(scriptUrl) {\n' +
      "        var scriptTag = document.createElement('script');\n" +
      "        scriptTag.src = 'https://cdn.jsdelivr.net/gh/minnojs/minno-quest@0.3/dist/pi-minno.js';\n" +
      '        scriptTag.onload = function() {\n' +
      '            window.minnoJS = window.minnoJS || {};\n' +
      '            window.minnoJS.logger = function(value) {\n' +
      "                var el = container.querySelector('textarea');\n" +
      '                if (el) el.value = value;\n' +
      '            };\n' +
      '            window.minnoJS.onEnd = function() {\n' +
      '                try {\n' +
      "                    var pipContainer = document.querySelector('#pipContainer');\n" +
      '                    if (pipContainer) pipContainer.remove();\n' +
      "                    var canvasEl = document.querySelector('#minnoCanvas');\n" +
      '                    if (canvasEl) canvasEl.remove();\n' +
      "                } catch (e) { console.warn('Cleanup error:', e); }\n" +
      '                setTimeout(function() { qthis.clickNextButton(); }, 300);\n' +
      '            };\n' +
      '            minnoJS(canvas, scriptUrl);\n' +
      '        };\n' +
      '        container.appendChild(scriptTag);\n' +
      '    }\n' +
      '\n' +
      '    // Failsafe: avanza comunque dopo 10 minuti\n' +
      '    setTimeout(function() { qthis.clickNextButton(); }, 600000);\n' +
      '});\n'
    );
  }

  // ---- Output ----
  function showWarnings(w) {
    var box = $('warnings');
    if (!w.length) {
      box.className = 'warn ok';
      box.innerHTML = '✓ Nessun problema rilevato.';
      return;
    }
    box.className = 'warn';
    box.innerHTML = '<b>⚠ Avvisi (' + w.length + '):</b><ul><li>' + w.map(function (s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    }).join('</li><li>') + '</li></ul>';
  }

  function generate() {
    var v = gather();
    showWarnings(validate(v));
    var configFileName = v.configPath.split('/').pop();
    $('configOut').value = generateConfig(v);
    $('wrapperOut').value = generateWrapper(v);
    $('steps').innerHTML =
      '<ol>' +
      '<li>Salva il box <b>"Modulo config"</b> come <code>' + configFileName + '</code> e mettilo nel percorso <code>' + v.configPath + '</code> del repo <code>' + v.repo + '</code> (bottone "Scarica config").</li>' +
      '<li>Committa e pusha: <code>git add ' + v.configPath + ' &amp;&amp; git commit -m "update sciat config" &amp;&amp; git push</code></li>' +
      '<li><b>Solo la prima volta:</b> incolla il box <b>"Wrapper Qualtrics"</b> nell\'editor JavaScript della domanda Qualtrics. Le volte successive NON serve ritoccarlo.</li>' +
      '<li>Il motore resta pinnato a <code>@' + v.engineCommit + '</code>. Cambialo solo quando aggiorni <code>' + v.enginePath + '</code>.</li>' +
      '</ol>';
    $('output').style.display = 'block';
    $('output').scrollIntoView({ behavior: 'smooth' });
  }

  function copy(id, btn) {
    var ta = $(id);
    ta.select();
    navigator.clipboard.writeText(ta.value).then(function () {
      var t = btn.textContent; btn.textContent = '✓ Copiato'; setTimeout(function () { btn.textContent = t; }, 1500);
    }).catch(function () { document.execCommand('copy'); });
  }
  function download(id, filename) {
    var blob = new Blob([$(id).value], { type: 'text/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // ===== ANTEPRIMA LIVE (esegue lo SC-IAT con MinnoJS, come in Qualtrics) =====
  var minnoLoaded = false;
  var previewBlobUrl = null;
  var previewEngineUrl = null;
  function loadMinno(cb) {
    if (minnoLoaded && window.minnoJS) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/gh/minnojs/minno-quest@0.3/dist/pi-minno.js';
    s.onload = function () { minnoLoaded = true; cb(); };
    s.onerror = function () { alert('Impossibile caricare MinnoJS dalla CDN. Serve la connessione internet.'); };
    document.head.appendChild(s);
  }
  function preview() {
    var v = gather();
    showWarnings(validate(v));
    // Anteprima: il motore viene costruito al volo dal sorgente incorporato (SCIAT_ENGINE_SOURCE),
    // così funziona subito, anche prima di pubblicarlo su GitHub. Fonte unica = js/engine-source.js.
    if (!window.SCIAT_ENGINE_SOURCE) { alert('Sorgente del motore non caricato (js/engine-source.js).'); return; }
    if (previewEngineUrl) URL.revokeObjectURL(previewEngineUrl);
    previewEngineUrl = URL.createObjectURL(new Blob([window.SCIAT_ENGINE_SOURCE], { type: 'text/javascript' }));
    var cfg = generateConfig(v, previewEngineUrl);
    if (previewBlobUrl) URL.revokeObjectURL(previewBlobUrl);
    previewBlobUrl = URL.createObjectURL(new Blob([cfg], { type: 'text/javascript' }));

    $('previewModal').style.display = 'flex';
    $('previewLog').value = '';
    $('previewStatus').textContent = 'Caricamento del task…';
    var canvas = $('previewCanvas');
    canvas.innerHTML = '';

    loadMinno(function () {
      window.minnoJS = window.minnoJS || {};
      window.minnoJS.logger = function (value) { $('previewLog').value = value; };
      window.minnoJS.onEnd = function () {
        $('previewStatus').textContent = '✓ Task completato — i dati raccolti sono nel riquadro qui sotto.';
      };
      try {
        $('previewStatus').textContent = 'Task in esecuzione — tasti ' + v.leftKey.toUpperCase() + ' / ' + v.rightKey.toUpperCase() + ' (anteprima col motore incorporato).';
        window.minnoJS(canvas, previewBlobUrl);
      } catch (e) {
        $('previewStatus').textContent = 'Errore nell\'avvio: ' + e.message;
      }
    });
  }
  function closePreview() {
    $('previewModal').style.display = 'none';
    $('previewCanvas').innerHTML = '';
    var pip = document.querySelector('#pipContainer'); if (pip) pip.remove();
    if (previewBlobUrl) { URL.revokeObjectURL(previewBlobUrl); previewBlobUrl = null; }
    if (previewEngineUrl) { URL.revokeObjectURL(previewEngineUrl); previewEngineUrl = null; }
  }

  // ===== PUBBLICAZIONE SU GITHUB (Contents API) =====
  function b64utf8(str) { return btoa(unescape(encodeURIComponent(str))); }
  function ghStatus(msg, kind) {
    var el = $('ghStatus');
    el.style.display = 'block';
    el.className = 'warn' + (kind === 'ok' ? ' ok' : '');
    el.innerHTML = msg;
  }
  // Commit di un file via Contents API (crea o aggiorna). Ritorna una Promise col JSON di risposta.
  function ghPut(repo, path, content, message, branch, token) {
    var apiBase = 'https://api.github.com/repos/' + repo + '/contents/' + path.split('/').map(encodeURIComponent).join('/');
    var headers = { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github+json' };
    return fetch(apiBase + '?ref=' + encodeURIComponent(branch), { headers: headers })
      .then(function (r) { return r.status === 200 ? r.json().then(function (j) { return j.sha; }) : null; })
      .then(function (sha) {
        var body = { message: message, content: b64utf8(content), branch: branch };
        if (sha) body.sha = sha;
        return fetch(apiBase, { method: 'PUT', headers: headers, body: JSON.stringify(body) });
      })
      .then(function (r) {
        return r.json().then(function (j) {
          if (!r.ok) throw new Error((j && j.message) || ('HTTP ' + r.status));
          return j;
        });
      });
  }

  function ghPrecheck(v) {
    if (!$('ghToken').value.trim()) { ghStatus('⚠ Inserisci un token GitHub con permesso di scrittura sui contenuti del repo.'); return false; }
    if (!v.repo || v.repo.split('/').length !== 2) { ghStatus('⚠ Repository non valido.'); return false; }
    return true;
  }

  function publishConfig() {
    var v = gather();
    showWarnings(validate(v));
    if (!ghPrecheck(v)) return;
    var token = $('ghToken').value.trim();
    var branch = $('ghBranch').value.trim() || 'main';
    var message = $('ghMessage').value.trim() || 'update sciat config';
    ghStatus('Pubblicazione del config in corso…');
    ghPut(v.repo, v.configPath, generateConfig(v), message, branch, token)
      .then(function (j) {
        var sha = j.commit && j.commit.sha;
        var jsdelivr = 'https://cdn.jsdelivr.net/gh/' + v.repo + '@' + sha + '/' + v.configPath;
        ghStatus('✓ Config pubblicato! Commit <code>' + (sha ? sha.slice(0, 7) : '?') + '</code>.<br>' +
          'jsDelivr (pinnato): <code>' + jsdelivr + '</code><br>' +
          'Il wrapper bootstrap in Qualtrics caricherà automaticamente questa versione al prossimo avvio.', 'ok');
      })
      .catch(function (e) { ghStatus('✗ Errore GitHub (config): ' + String(e.message || e) + '<br>Verifica token, permessi e percorso file.'); });
  }

  function publishEngine() {
    var v = gather();
    if (!ghPrecheck(v)) return;
    if (!window.SCIAT_ENGINE_SOURCE) { ghStatus('⚠ Sorgente del motore non disponibile (js/engine-source.js).'); return; }
    var token = $('ghToken').value.trim();
    var branch = $('ghBranch').value.trim() || 'main';
    ghStatus('Pubblicazione del motore (' + v.enginePath + ') in corso…');
    ghPut(v.repo, v.enginePath, window.SCIAT_ENGINE_SOURCE, 'update sciat engine', branch, token)
      .then(function (j) {
        var sha = j.commit && j.commit.sha;
        if (sha) $('engineCommit').value = sha; // auto-pin alla versione appena pubblicata
        ghStatus('✓ Motore pubblicato! Commit <code>' + (sha ? sha.slice(0, 7) : '?') + '</code>.<br>' +
          'Ho impostato automaticamente "Commit del motore" su questo commit: rigenera/ripubblica il config per pinnarlo.', 'ok');
      })
      .catch(function (e) { ghStatus('✗ Errore GitHub (motore): ' + String(e.message || e) + '<br>Verifica token, permessi e percorso file.'); });
  }

  // ---- Bind ----
  window.addEventListener('DOMContentLoaded', function () {
    fillForm();
    $('customizeInstructions').addEventListener('change', toggleInstructions);
    $('btnGenerate').addEventListener('click', generate);
    $('btnReset').addEventListener('click', function () { if (confirm('Ripristinare i valori di default?')) fillForm(); });
    $('copyConfig').addEventListener('click', function () { copy('configOut', this); });
    $('copyWrapper').addEventListener('click', function () { copy('wrapperOut', this); });
    $('dlConfig').addEventListener('click', function () {
      download('configOut', (gather().configPath.split('/').pop()) || 'config.js');
    });
    $('dlWrapper').addEventListener('click', function () { download('wrapperOut', 'qualtrics_wrapper.js'); });
    $('btnPreview').addEventListener('click', preview);
    $('previewClose').addEventListener('click', closePreview);
    $('btnPublish').addEventListener('click', publishConfig);
    $('btnPublishEngine').addEventListener('click', publishEngine);
  });
})();
