const path = process.env.NODE_ENV === 'production' ? '/webpack-generator' : ''

export default function register () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${path}/sw.js`)
        .then((registration) => {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope)
        }).catch((err) => {
          // registration failed :(
          console.error('ServiceWorker registration failed: ', err)
        })
    })
  }
}
