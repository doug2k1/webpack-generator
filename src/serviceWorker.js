/* eslint-env serviceworker */
/* eslint function-paren-newline: "off" */
/* eslint no-restricted-globals: "off" */

const CACHE_NAME = 'webpack-generator-v8'
const urlsToCache = [
  `${process.env.PUBLIC_PATH}/`,
  `${process.env.PUBLIC_PATH}/bundle.js`,
  `${process.env.PUBLIC_PATH}/styles.css`,
  `${process.env.PUBLIC_PATH}/manifest.json`,
  `${process.env.PUBLIC_PATH}/android-chrome-512x512.png`,
  `${process.env.PUBLIC_PATH}/android-chrome-192x192.png`,
  `${process.env.PUBLIC_PATH}/apple-touch-icon.png`
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
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

self.addEventListener('activate', (event) => {
  const cacheWhiteList = [CACHE_NAME]

  event.waitUntil(caches.keys()
    .then(cacheNames => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheWhiteList.indexOf(cacheName) === -1) {
          return caches.delete(cacheName)
        }

        return null
      })
    ))
  )
})
