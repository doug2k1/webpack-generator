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
      <div className="container">
        <header>
          <h1 className="title">Webpack</h1>
          <h2 className="subtitle">Config Generator</h2>
          <p className="description">
            Set the options on the left to generate a webpack config on the right.<br />
            Use it as a starting point for your project, or to just learn how different
            options reflect on the configuration.
          </p>
        </header>

        <div className="row">
          <div className="col">
            <Form data={this.state.formData} onChange={this.handleFormChange} />
          </div>
          <div className="col">
            <Code data={this.state.formData} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
