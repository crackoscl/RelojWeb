const CACHE_NAME = 'reloj-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/main.js',
  '/manifest.json',
  // Asegúrate de incluir aquí las rutas de tus imágenes si es necesario
  'partes/fondopro.png',
  'partes/horap.png',
  'partes/minutop.png',
  'partes/segundop.png',
  'partes/dialderecho.png',
  'partes/dializq.png',
  'partes/diaLuna.png'
];

// Instalar y guardar en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Servir desde caché o red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});