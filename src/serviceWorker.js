const path = process.env.NODE_ENV === 'production' ? '/webpack-generator' : ''
const CACHE_NAME = 'webpack-generator-v2'
const urlsToCache = [
  `${path}/`,
  `${path}/bundle.js`,
  `${path}/styles.css`
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlsToCache)
    }))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then((response) => {
      // cache hit: return the cached response
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((fetchedResponse) => {
          // check if valid response
          if (!fetchedResponse || fetchedResponse.status !== 200 || fetchedResponse.type !== 'basic') {
            return fetchedResponse
          }

          // cache the response
          const responseToCache = fetchedResponse.clone()
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })

          return fetchedResponse
        })
    }))
})
