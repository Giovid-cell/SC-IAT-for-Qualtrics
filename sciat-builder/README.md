# SC-IAT Builder

App locale (HTML statico) per generare la configurazione MinnoJS di uno SC-IAT da incorporare in Qualtrics, senza scrivere codice a mano.

## Come si usa
1. Apri **`index.html`** con un doppio click (qualsiasi browser).
2. Compila i parametri (categoria, attributi, stimoli, blocchi, tempi, tasti, testi).
3. **▶ Anteprima live** → esegue lo SC-IAT nel browser (motore costruito al volo dal sorgente
   incorporato), così verifichi tutto prima di esportare. I dati raccolti dal logger compaiono in un
   riquadro (formato CSV).
4. Premi **Genera codice**. Ottieni due box:
   - **Modulo config** → da salvare e committare nel tuo repo (es. `configs/my_sciat.js`).
   - **Wrapper Qualtrics** → da incollare nell'editor JavaScript della domanda Qualtrics **una sola volta**.
5. **Pubblica su GitHub** (opzionale, con un token): committi direttamente dal browser via API,
   senza usare git a mano.
   - **Pubblica config** → ogni volta che cambi i parametri.
   - **Pubblica motore** → la prima volta (e quando aggiorni il motore). Dopo la pubblicazione il
     campo "Commit del motore" viene pinnato automaticamente al nuovo commit: ripubblica il config
     per fissarlo.

### Token GitHub
Serve un *fine-grained token* con permesso **Contents: Read and write** sul repo. Resta solo in
pagina (non viene salvato).

## Pattern "bootstrap loader"
Il wrapper Qualtrics è **stabile**: non lo reincolli a ogni modifica. Al runtime interroga la
GitHub API per trovare l'**ultimo commit** del file config e lo carica via jsDelivr pinnato a quel
commit (URL immutabile → niente cache stantia). Quindi il ciclo di lavoro diventa:

1. Modifica i parametri nell'app → **Genera** → **Scarica config**.
2. Committa il file nel repo e fai `git push`.
3. Fine. Qualtrics carica automaticamente la nuova versione al successivo avvio del questionario.

> Caveat: la GitHub API non autenticata consente 60 richieste/ora **per IP**. Per i partecipanti
> (1 chiamata a testa) è più che sufficiente.

## Motore generalizzato (`sciat_engine.js`)
Il builder usa un motore generalizzato (derivato da `anna_tosato/anna_sciat_ext.js`), in cui:
- `makeControlledTrials` gestisce conteggi di trial e numeri di stimoli **arbitrari** (ogni stimolo
  appare `floor(count/n)` volte; il resto va ai `repeatedStimuli`, poi agli altri in ordine).
  Retro-compatibile: 10 trial / 5 stimoli → 2× ciascuno; 7 / 5 → 1× + 2 ripetizioni.
- **tasti** (`leftKey`/`rightKey`) e **timeout di risposta** (`responseTimeout`) sono sovrascrivibili
  dalla config.

Il motore canonico è `SC-IAT-for-Qualtrics/sciat_engine.js`. L'app ne tiene una copia incorporata
in `js/engine-source.js` (usata sia per l'anteprima sia per il bottone "Pubblica motore"), così la
fonte è unica. Pubblicalo sul repo dall'app ("Pubblica motore") oppure con `git push`.

Se modifichi il motore canonico, **rigenera** il sorgente incorporato:
```bash
node -e "const fs=require('fs');fs.writeFileSync('sciat-builder/js/engine-source.js','window.SCIAT_ENGINE_SOURCE='+JSON.stringify(fs.readFileSync('SC-IAT-for-Qualtrics/sciat_engine.js','utf8'))+';')"
```

## File
- `index.html` — interfaccia
- `js/defaults.js` — valori di default (dalla versione `anna_tosato`)
- `js/builder.js` — lettura form, generazione codice, anteprima, pubblicazione GitHub
- `js/engine-source.js` — sorgente del motore incorporato (auto-generato; per anteprima + pubblicazione)
