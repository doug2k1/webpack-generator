// @flow
import React from 'react'
import { merge } from 'lodash'
import Form from './Form'
import Code from './Code'
import type { ConfigData } from '../types/ConfigData.type'
import '../scss/index.scss'

type State = {
  formData: ConfigData
}

class App extends React.Component<{}, State> {
  state = {
    formData: {
      entry: './src/index.js',
      output: {
        path: 'dist',
        filename: 'bundle.js'
      },
      loaders: {
        es6: false,
        react: false,
        style: null
      },
      plugins: {
        extract: false,
        extractFile: '/css/styles.css'
      }
    }
  }

  handleFormChange = (data: ConfigData) => {
    this.setState(prevState => ({ formData: merge({}, prevState.formData, data) }))
  }

  render () {
    return (
      <div>
        <header>
          <div className="container">
            <h1 className="title">Webpack Config Generator</h1>
            <p className="description">
              Use it as a starting point for your project, or to just learn how different
              options reflect on the configuration.
            </p>
          </div>
        </header>

        <main>
          <div className="container row">
            <div className="col">
              <Form data={this.state.formData} onChange={this.handleFormChange} />
            </div>
            <div className="col">
              <Code data={this.state.formData} />
            </div>
          </div>
        </main>

        <footer>
          <div className="container">
            <p>
              <strong>Webpack Config Generator</strong> by Douglas Matoso (
              <a href="https://twitter.com/doug2k1" target="_blank" rel="noopener noreferrer">@doug2k1</a>)
            </p>
            <p>
              Source-code on <a href="https://github.com/doug2k1/webpack-generator" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
        </footer>
      </div>
    )
  }
}

export default App
