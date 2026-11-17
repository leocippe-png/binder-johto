// Binder Johto · collegamento a Firebase
// L'app è nata dentro Claude e chiede le sue funzioni con claude.use("db"), claude.use("user")…
// Qui le stesse richieste vengono servite da Firebase (piano gratuito), così l'app funziona ovunque.
(function(){
  "use strict";
  var cfg = window.FIREBASE_CONFIG, OWNER = window.OWNER_UID;
  if (!cfg || !cfg.apiKey || !window.firebase) { window.claude = { use: async function(){ return null; } }; return; }
  firebase.initializeApp(cfg);
  var auth = firebase.auth(), fs = firebase.firestore(), FP = firebase.firestore.FieldPath;
  try { fs.enablePersistence({ synchronizeTabs: true }).catch(function(){}); } catch (e) {}
  var authReady = new Promise(function(res){ var un = auth.onAuthStateChanged(function(u){ un(); res(u); }); });
  var isLeo = function(u){ return !!(u && !u.isAnonymous && OWNER && u.uid === OWNER); };

  function err(e){ // stessi codici di errore che l'app già gestisce
    var c = e && e.code || "";
    if (c === "not-found") return { code: "invalid_argument", message: e.message };
    if (c === "permission-denied") return { code: "forbidden", message: e.message };
    if (c === "unavailable") return { code: "unavailable", message: e.message };
    return { code: c || "upstream_error", message: e && e.message };
  }
  function snap(s){ return { exists: s.exists, metadata: { fromCache: s.metadata.fromCache }, data: function(){ return s.data(); } }; }
  // update({slots:{"2-0":2}}) cambia solo le chiavi indicate, come faceva il database di Claude
  function fields(d){ var a = []; Object.keys(d).forEach(function(k){ var v = d[k];
    if (v && typeof v === "object" && !Array.isArray(v)) Object.keys(v).forEach(function(s){ a.push(new FP(k, s), v[s]); });
    else a.push(new FP(k), v); }); return a; }
  function docRef(path){
    if (path === "privato/proposte") return proposte();
    var r = fs.doc(path);
    return {
      onSnapshot: function(cb, onErr){ return r.onSnapshot({ includeMetadataChanges: true }, function(s){ cb(snap(s)); }, function(e){ onErr && onErr(err(e)); }); },
      get: function(){ return r.get().then(snap); },
      set: function(d){ return r.set(d).catch(function(e){ throw err(e); }); },
      update: function(d){ var a = fields(d); return r.update.apply(r, a).catch(function(e){ throw err(e); }); }
    };
  }
  // le «Proposte degli amici» sono i messaggi che gli amici mandano dall'app
  function proposte(){
    var col = fs.collection("messaggi");
    var write = function(d){ var b = fs.batch(); Object.keys(d.items || {}).forEach(function(id){ b.set(col.doc(id), d.items[id], { merge: true }); }); return b.commit().catch(function(e){ throw err(e); }); };
    return {
      onSnapshot: function(cb, onErr){ return col.onSnapshot({ includeMetadataChanges: true }, function(qs){ var items = {}; qs.forEach(function(d){ items[d.id] = d.data(); });
        cb({ exists: true, metadata: { fromCache: qs.metadata.fromCache }, data: function(){ return { items: items }; } }); }, function(e){ onErr && onErr(err(e)); }); },
      set: write, update: write
    };
  }
  var db = { doc: docRef };
  var user = {
    isOwner: async function(){ return isLeo(await authReady); },
    canEdit: async function(){ return isLeo(await authReady); },
    can: async function(){ return isLeo(await authReady); },
    id: async function(){ var u = await authReady; return u ? u.uid : null; }
  };
  window.claude = { use: async function(name){ if (name === "db") return db; if (name === "user") return user; return null; } };

  // messaggi degli amici: niente account, accesso anonimo solo al momento dell'invio
  async function send(text){
    var u = auth.currentUser;
    if (!u) u = (await auth.signInAnonymously()).user;
    var tags = []; text.replace(/#johto\s+(\d{1,2}-\d|offerta|idea)/gi, function(m, t){ tags.push(t.toLowerCase()); return m; });
    var kind = "commento", slot = null, slots = null;
    if (tags.indexOf("offerta") >= 0) { kind = "offerta"; slots = tags.filter(function(t){ return /^\d/.test(t); }); }
    else if (tags.length) { kind = "suggerimento"; slot = /^\d/.test(tags[0]) ? tags[0] : null; }
    var f = text.match(/— da (.+)/);
    var doc = { kind: kind, slot: slot, slots: slots, from: f ? f[1].trim().slice(0, 40) : "Amico", text: text.slice(0, 1500), ts: Date.now(), status: "nuova", fonte: "app", uid: u.uid };
    var w = fs.collection("messaggi").add(doc);
    // senza rete il messaggio resta in coda e parte da solo appena si torna online
    return Promise.race([w.then(function(){ return "inviato"; }), new Promise(function(r){ setTimeout(function(){ r("in coda"); }, 6000); })]);
  }
  window.APP = {
    send: send,
    login: function(email, pw){ return auth.signInWithEmailAndPassword(email, pw); },
    logout: function(){ return auth.signOut(); },
    isLeo: async function(){ await authReady; return isLeo(auth.currentUser); }
  };
})();
