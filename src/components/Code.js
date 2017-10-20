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
        <div>
          <pre>
            <code className="hljs javascript" dangerouslySetInnerHTML={{ __html: this.state.code }} />
          </pre>
        </div>

        <div>
          <p>Modules:</p>
          <pre>$ npm i -D {this.state.modules.join(' ')}</pre>
        </div>

        {this.state.babelConfig && (
          <div>
            <p>Babel config (.babelrc):</p>
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
