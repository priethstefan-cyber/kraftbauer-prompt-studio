// Minimaler Service Worker – macht die App installierbar.
// Kein Offline-Cache: die App braucht sowieso Internet für die Prompt-Erzeugung.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
