export default function register () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${process.env.PUBLIC_PATH}/sw.js`)
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
