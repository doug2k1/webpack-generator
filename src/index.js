import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import swRegister from './serviceWorkerUtils'

ReactDOM.render(<App />, document.getElementById('app'))
swRegister()
