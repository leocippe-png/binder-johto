# Binder Johto

La collezione Johto di Leo: 56 pagine da 9 tasche, carte e stampe, progressi in tempo reale, mancolista, «Controlla una carta», e i messaggi degli amici («Ce l'ho», suggerimenti).

Web app gratuita: sito su GitHub Pages, dati su Firebase (piano Spark, gratuito). Si installa sul telefono con «Aggiungi a schermata Home» e funziona anche senza rete.

## Chi fa cosa
- **Leo** accede con email e password («Sei Leo? Accedi») e vede tutto: spunte, mancoliste, prezzi, proposte degli amici. Può anche cambiare la carta di una tasca dall'app («Cambia carta» nella scheda della tasca, oppure «Cambia la carta» su un suggerimento ricevuto).
- **Gli amici** non devono accedere: vedono il binder e i progressi, segnano le carte che hanno e mandano suggerimenti a Leo.

## File
- `index.html` — l'app
- `collezione.js` — il contenuto di partenza del binder; i cambi fatti dall'app stanno in `binder/modifiche` e si sovrappongono a questo file
- `firebase-config.js` — configurazione del progetto Firebase e UID di Leo
- `adapter.js` — collegamento a Firebase
- `firestore.rules` — regole di sicurezza da incollare in Firestore → Regole
- `stato-iniziale.js` — spunte importate dalla prima versione (usate una volta)
- `sw.js`, `manifest.webmanifest`, `icons/` — installazione come app e uso offline

## Dati in Firestore
- `binder/state` — stato delle tasche e date di arrivo (leggibile da tutti, scrive solo Leo)
- `binder/modifiche` — carte cambiate da Leo, tasca per tasca, con la carta che c'era prima per poterla rimettere (leggibile da tutti, scrive solo Leo)
- `privato/wants` — priorità, prezzo massimo e note (solo Leo)
- `messaggi/*` — messaggi degli amici (li crea chiunque, li legge e gestisce solo Leo)
