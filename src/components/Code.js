// @flow
import * as React from 'react'
// import only highlight.js core and javascript language for smaller bundle size
import hljs from 'highlight.js/lib/highlight'
import hljsJS from 'highlight.js/lib/languages/javascript'
import type { ConfigData } from '../types/ConfigData.type'
import '../../node_modules/highlight.js/styles/github.css'

hljs.registerLanguage('javascript', hljsJS)

type Props = {
  data: ConfigData
}

type State = {
  code: string,
  modules: string[],
  babelConfig: ?string
}

class Code extends React.Component<Props, State> {
  state = stateFromProps(this.props)

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.data !== this.props.data) {
      this.setState(stateFromProps(nextProps))
    }
  }

  render () {
    return (
      <div>
        <h2 className="title">Webpack config</h2>
        <p className="subtitle">webpack.config.js</p>
        <div>
          <pre>
            <code className="hljs javascript" dangerouslySetInnerHTML={{ __html: this.state.code }} />
          </pre>
        </div>

        <div>
          <h2 className="title">Modules</h2>
          <p className="subtitle">Install with npm</p>
          <p
            dangerouslySetInnerHTML={{
              __html: this.state.modules.map(mod => (
                `<a href="https://www.npmjs.com/package/${mod}" target="_blank">${mod}</a>`
              )).join(', ')
            }}
          />
          <pre>
            <code>$ npm i -D {this.state.modules.join(' ')}</code>
          </pre>
        </div>

        {this.state.babelConfig && (
          <div>
            <h2 className="title">Babel config</h2>
            <p className="subtitle">.babelrc</p>
            <pre>
              <code className="hljs javascript" dangerouslySetInnerHTML={{ __html: this.state.babelConfig }} />
            </pre>
          </div>
        )}
      </div>
    )
  }
}

export default Code

// helpers

const stateFromProps = props => ({
  code: codeFromData(props.data),
  modules: modulesFromData(props.data),
  babelConfig: babelConfigFromData(props.data)
})

const codeFromData = (data) => {
  let code = `const path = require('path');
 
module.exports = {
  entry: '${data.entry}',
  
  output: {
    path: path.resolve('${data.output.path}'),
    filename: '${data.output.filename}'
  }`
  if (data.loaders.es6) {
    code += `,

  module: {
    rules: [
      {
        test: /\\.js$/,
        loader: 'babel-loader'
      }
    ]
  }`
  }

  code += `
};

`

  return hljs.highlight('javascript', code).value
}

const modulesFromData = (data) => {
  const modules = {
    webpack: true,
    'babel-core': data.loaders.es6,
    'babel-loader': data.loaders.es6,
    'babel-preset-env': data.loaders.es6,
    'babel-preset-react': data.loaders.react
  }

  return Object.keys(modules)
    .filter(key => modules[key])
}

const babelConfigFromData = (data) => {
  const presets = {
    env: data.loaders.es6,
    react: data.loaders.react
  }
  const usingPresets = Object.keys(presets)
    .filter(key => presets[key])

  if (usingPresets.length > 0) {
    return `{
  "presets": [
    "${usingPresets.join('", "')}"
  ]
}
  
`
  }

  return null
}
