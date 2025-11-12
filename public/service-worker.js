const CACHE_NAME = 'lovable-app-v1';
const RUNTIME_CACHE = 'lovable-runtime-v1';
const IMAGE_CACHE = 'lovable-images-v1';

// Essential files to cache immediately
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Service Worker: Caching core files');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activating...');
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => !currentCaches.includes(cacheName))
          .map((cacheName) => {
            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => {
      console.log('✅ Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful response
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cached page
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Handle image requests - cache first strategy
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('📷 Serving cached image:', request.url);
          return cachedResponse;
        }
        
        return fetch(request)
          .then((response) => {
            // Don't cache failed responses
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Clone and cache the image
            const responseClone = response.clone();
            caches.open(IMAGE_CACHE).then((cache) => {
              cache.put(request, responseClone);
              console.log('💾 Cached new image:', request.url);
            });
            
            return response;
          })
          .catch(() => {
            console.log('❌ Image fetch failed:', request.url);
            // Return placeholder or empty response
            return new Response('', {
              status: 404,
              statusText: 'Image not available offline'
            });
          });
      })
    );
    return;
  }

  // Handle CSS, JS, and other assets - network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('📦 Serving from cache:', request.url);
            return cachedResponse;
          }
          console.log('❌ Not in cache:', request.url);
          return new Response('Resource not available offline', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});

// Handle messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('⏭️ Service Worker: Skipping waiting...');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('🗑️ Service Worker: Clearing all caches...');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// Background sync (optional - for future features)
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('📡 Syncing data...');
  // Add your background sync logic here
  // For example: sync quiz results, update photos, etc.
}

// Push notifications (optional - for future features)
self.addEventListener('push', (event) => {
  console.log('📬 Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Love Notification 💝';
  const options = {
    body: data.body || 'You have a new message!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

console.log('💝 Lovable Service Worker loaded successfully!');