var dataCacheName = 'iplschedule-pwa';
var cacheName = 'iplschedule-pwa';
var filesToCache = [
    '/',
    "./images",
    "./images/icons",
    "./images/icons/pillayar.jpg",
    "./images/icons/ipl.png",
    "./index.html",
    "./manifest.json",
    "./images/icons/icon-128x128.png",
    "./images/icons/icon-144x144.png",
    "./images/icons/icon-152x152.png",
    "./images/icons/icon-192x192.png",
    "./images/icons/icon-256x256.png",
    "./images/schedule1.jpg",
    "./images/schedule2.jpg",
    "./scripts",
    "./scripts/app.js",
    "./service-worker.js",
    "./styles",
    "./styles/style.css"
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});