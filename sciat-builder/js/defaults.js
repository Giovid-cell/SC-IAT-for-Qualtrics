/* SC-IAT Builder — valori di default
 * Derivati dalla versione definitiva anna_tosato (anna_sciat_ext.js / anna_sciat_qualtrics.js).
 * Tutto ciò che è qui dentro è sovrascrivibile dal modulo config generato,
 * grazie a _.extend(piCurrent, _.defaults(options, stiatObj)) nel motore (riga ~196).
 */
window.SCIAT_DEFAULTS = {
  // --- Repository / hosting (per costruire gli URL jsDelivr) ---
  repo: 'Giovid-cell/SC-IAT-for-Qualtrics',
  configPath: 'configs/my_sciat.js',
  enginePath: 'sciat_engine.js', // motore generalizzato (conteggi/stimoli arbitrari, tasti/timeout sovrascrivibili)
  engineCommit: 'main', // consigliato: pinnare a un commit specifico (immutabile)
  imagesBaseUrl: 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@main/images/',

  // --- Categoria + attributi ---
  category: {
    name: 'Paziente',
    mediaType: 'word',
    stimuli: ['Anna', 'Tosato', 'Anna Tosato', 'A.T.', 'Tosato Anna'],
    repeatedStimuli: ['Anna Tosato', 'Tosato Anna'],
    color: '#31b404',
    fontSize: '3em',
    titleFontSize: '2em',
    titleHeight: 7
  },
  attribute1: {
    name: 'Sostenere',
    mediaType: 'word',
    stimuli: ['aiutare', 'assistere', 'soccorrere', 'sostenere', 'appoggiare'],
    repeatedStimuli: ['aiutare', 'sostenere'],
    color: '#31b404',
    fontSize: '3em',
    titleFontSize: '2em',
    titleHeight: 7
  },
  attribute2: {
    name: 'Ignorare',
    mediaType: 'word',
    stimuli: ['ostacolare', 'trascurare', 'ignorare', 'dimenticare', 'tralasciare'],
    repeatedStimuli: ['ostacolare', 'tralasciare'],
    color: '#31b404',
    fontSize: '3em',
    titleFontSize: '2em',
    titleHeight: 7
  },

  // --- Blocchi & tempi ---
  numBlocks: 4,
  singleAttTrials: 10,
  sharedAttTrials: 7,
  categoryTrials: 7,
  miniBlocks: 1,
  blockOrder: 'random',     // random | startLeft | startRight
  switchSideBlock: 3,
  ITIDuration: 250,
  responseTimeout: 1500,    // ms: tempo massimo di risposta

  // --- Tasti & testi ---
  leftKey: 'w',
  rightKey: 'p',
  leftKeyText: 'Prema il tasto "W" per',
  rightKeyText: 'Prema il tasto "P" per',
  orText: 'o',
  finalText: 'Ha completato questo compito<br/><br/>Premi la BARRA SPAZIATRICE per continuare.',

  // --- Istruzioni (HTML completo, override avanzato) ---
  customizeInstructions: false,
  instTemplateCategoryLeft:
    '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
    '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
    '<div style="font-size:16px; max-width:750px; line-height:1.25; margin:90px auto 0 auto; text-align:left;">' +
    '<p style="margin-bottom:6px;">Le chiediamo di partecipare ad un esperimento.</p>' +
    '<p style="margin-bottom:6px;">Disponga l\'indice o il medio sul tasto <b>"W"</b> e sul tasto <b>"P"</b>.</p>' +
    '<p style="margin-bottom:6px;">Al centro dello schermo compariranno stimoli appartenenti alle categorie visualizzate in alto, a destra e a sinistra.</p>' +
    '<p style="margin-bottom:6px;">Se lo stimolo appartiene a UNA delle DUE categorie a <b>SINISTRA</b>, prema <b>"W"</b>;<br>' +
    'se appartiene alla categoria a <b>DESTRA</b>, prema <b>"P"</b>.</p>' +
    '<p style="margin-bottom:6px;">Esempi di stimoli per "<font color="#31b404">thecategory</font>": Anna, Anna Tosato, A.T.</p>' +
    '<p style="margin-bottom:6px;">Ogni stimolo appartiene a una sola categoria. Se la risposta è corretta, una <font color="#00b300"><b>O</b></font> verde apparirà sullo schermo.</p>' +
    '<p style="margin-bottom:6px;">Se commette un errore, o la risposta è troppo lenta, una <font color="#ff0000"><b>X</b></font> apparirà sullo schermo.</p>' +
    '<p style="margin-bottom:6px;">Risponda <b>il più velocemente possibile</b> cercando di non commettere errori.</p>' +
    '<p>Quando è pronto/a, prema la <b>barra spaziatrice</b> per cominciare.</p>' +
    '</div></div></div>',
  instTemplateCategoryRight:
    '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
    '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
    '<div style="font-size:16px; max-width:750px; line-height:1.25; margin:90px auto 0 auto; text-align:left;">' +
    '<p style="margin-bottom:6px;">Le chiediamo di partecipare ad un esperimento.</p>' +
    '<p style="margin-bottom:6px;">Disponga l\'indice o il medio sul tasto <b>"W"</b> e sul tasto <b>"P"</b>.</p>' +
    '<p style="margin-bottom:6px;">Al centro dello schermo compariranno stimoli appartenenti alle categorie visualizzate in alto, a destra e a sinistra.</p>' +
    '<p style="margin-bottom:6px;">Se lo stimolo appartiene alla categoria a <b>SINISTRA</b>, prema <b>"W"</b>;<br>' +
    'se appartiene a UNA delle DUE categorie a <b>DESTRA</b>, prema <b>"P"</b>.</p>' +
    '<p style="margin-bottom:6px;">Esempi di stimoli per "<font color="#31b404">thecategory</font>": Anna, Anna Tosato, A.T.</p>' +
    '<p style="margin-bottom:6px;">Ogni stimolo appartiene a una sola categoria. Se la risposta è corretta, una <font color="#00b300"><b>O</b></font> verde apparirà sullo schermo.</p>' +
    '<p style="margin-bottom:6px;">Se commette un errore, o la risposta è troppo lenta, una <font color="#ff0000"><b>X</b></font> apparirà sullo schermo.</p>' +
    '<p style="margin-bottom:6px;">Risponda <b>il più velocemente possibile</b> cercando di non commettere errori.</p>' +
    '<p>Quando è pronto/a, prema la <b>barra spaziatrice</b> per cominciare.</p>' +
    '</div></div></div>',
  instTemplateTransitionCtoI:
    '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
    '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
    '<div style="width:80%; max-width:700px; font-size:16px; line-height:1.1em; text-align:left;">' +
    '<p style="margin-bottom:6px;">Adesso le categorie appariranno in una nuova configurazione.</p>' +
    '<p style="margin-bottom:6px;">Prema <b>"W"</b> se lo stimolo appartiene alla categoria di <b>SINISTRA</b>.</p>' +
    '<p style="margin-bottom:6px;">Prema <b>"P"</b> se lo stimolo appartiene ad <b>UNA delle DUE categorie</b> a <b>DESTRA</b>.</p>' +
    '<p style="margin-bottom:6px;">Ogni stimolo appartiene esclusivamente ad <b>UNA delle TRE categorie</b>.</p>' +
    '<p style="margin-top:12px;">Quando è pronto/a, prema la <b>BARRA SPAZIATRICE</b> per continuare.</p>' +
    '</div></div></div>',
  instTemplateTransitionItoC:
    '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
    '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
    '<div style="width:80%; max-width:700px; font-size:16px; line-height:1.1em; text-align:left;">' +
    '<p style="margin-bottom:6px;">Adesso le categorie appariranno in una nuova configurazione.</p>' +
    '<p style="margin-bottom:6px;">Prema <b>"W"</b> se lo stimolo appartiene ad <b>UNA delle DUE categorie</b> di <b>SINISTRA</b>.</p>' +
    '<p style="margin-bottom:6px;">Prema <b>"P"</b> se lo stimolo appartiene alla categoria a <b>DESTRA</b>.</p>' +
    '<p style="margin-bottom:6px;">Ogni stimolo appartiene esclusivamente ad <b>UNA delle TRE categorie</b>.</p>' +
    '<p style="margin-top:12px;">Quando è pronto/a, prema la <b>BARRA SPAZIATRICE</b> per continuare.</p>' +
    '</div></div></div>'
};
