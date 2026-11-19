// Binder Johto · funziona anche senza rete (in fiera): tiene una copia dell'app sul telefono.
const CACHE = "johto-v17", IMG = "johto-img";
const SHELL = ["./", "index.html", "collezione.js", "arte.js", "viaggio.html", "adapter.js", "firebase-config.js", "stato-iniziale.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== IMG).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  // dati del database: sempre in rete, li gestisce Firebase
  if (/googleapis\.com$/.test(url.hostname) && !/fonts\.googleapis\.com/.test(url.hostname)) return;
  // pagine e file dell'app: prima la rete (così gli aggiornamenti arrivano), poi la copia salvata
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); return r; }).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  // immagini delle carte (TCGdex): una volta viste restano sul telefono, anche senza rete
  if (url.hostname === "assets.tcgdex.net") {
    e.respondWith(caches.open(IMG).then(k => k.match(req).then(r => r || fetch(req).then(n => { if (n.ok) k.put(req, n.clone()); return n; }))));
    return;
  }
  // librerie e font: dalla copia salvata se c'è
  if (/gstatic\.com$|fonts\.googleapis\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => { const c = n.clone(); caches.open(CACHE).then(k => k.put(req, c)); return n; })));
  }
});
