export default function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${process.env.PUBLIC_PATH}/sw.js`)
      /* .then(registration => {
          // Registration was successful
        })
        .catch(err => {
          // registration failed :(
        }) */
    })
  }
}
