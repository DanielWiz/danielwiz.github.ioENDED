var cacheName = 'PerrisCache';
var filesToCache = [
    '/',
    '/js/carusel.js',
    '/js/menu.js',
    '/js/service-worker.js',
    '/cliente/app/app.js',
    '/index.html',
    '/adopcion.html',
    '/login.html',
    '/perros_detalles.html',
    '/registro.html',
    '/styles/adopcion.css',
    '/styles/carusel.css',
    '/styles/detalles.css',
    '/styles/footer.css',
    '/styles/login.css',
    '/styles/menu.css',
    '/styles/registro.css',
    '/styles/tablas.css',
    '/img/perro1.jpg',
    '/img/perro2.jpg',
    '/img/perro3.jpg',
    '/img/pg1.jpg',
    '/img/pg2.jpg',
    '/img/pg3.jpg',
    '/img/pg4.jpg',
    '/img/logo.png',
    '/img/favicon.ico',   
  ];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });
  
  