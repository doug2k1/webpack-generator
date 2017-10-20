// @flow
import * as React from 'react'
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
        react: false
      }
    }
  }

  handleFormChange = (data: ConfigData) => {
    this.setState({
      formData: data
    })
  }

  render () {
    return (
      <div className="container">
        <h1 className="title">Webpack</h1>
        <div className="columns">
          <div className="column">
            <Form data={this.state.formData} onChange={this.handleFormChange} />
          </div>
          <div className="column">
            <Code data={this.state.formData} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
