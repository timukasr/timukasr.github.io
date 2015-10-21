importScripts('/cache-polyfill.js');

self.addEventListener('install', function(event) {
	// pre cache a load of stuff:
	event.waitUntil(
		caches.open('monkey-app').then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/main.css',
				'/assets/monkey.gif'
			]).then(function() {
				return self.skipWaiting();
			});
		})
	)
});

self.addEventListener('activate', function(event) {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});