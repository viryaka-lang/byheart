/* ByHeart service worker — offline-first app shell.
   To ship an update: change the VERSION string and redeploy. */
const VERSION = "byheart-v2";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png"
];

// Cache a response only if it's usable: never store a 404/500 as the offline copy.
// Cross-origin font files come back "opaque" (status unreadable), which is expected.
function stash(key, res){
  if(res && (res.ok || res.type === "opaque")){
    const copy = res.clone();
    caches.open(VERSION).then(c => c.put(key, copy));
  }
  return res;
}

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Navigations: network first (so updates arrive), cached shell as offline fallback
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => res.ok ? stash("./index.html", res) : res)
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Google Fonts: cache first, fetch and store when missing (works offline after first load)
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => stash(req, res))));
    return;
  }

  // Same-origin assets: cache first, network fallback
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => stash(req, res))));
  }
});
