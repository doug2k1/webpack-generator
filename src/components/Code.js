// @flow
/* eslint react/no-danger: "off" */
import React from 'react'
import { js_beautify as beautify } from 'js-beautify/js/lib/beautify'
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
        <section>
          <h3 className="section-title">Webpack config</h3>
          <p className="section-subtitle">webpack.config.js</p>
          <div>
            <pre>
              <code className="hljs javascript" dangerouslySetInnerHTML={{ __html: this.state.code }} />
            </pre>
          </div>
        </section>

        <section>
          <div className="modules">
            <h3 className="section-title">Modules</h3>
            <p className="section-subtitle">Install with npm</p>
            <p
              dangerouslySetInnerHTML={{
                __html: this.state.modules.map(mod => (
                  `<a href="https://www.npmjs.com/package/${mod}" target="_blank" rel="noopener noreferrer">${mod}</a>`
                )).join(', ')
              }}
            />
            <pre>
              <code className="hljs">npm i -D {this.state.modules.join(' ')}</code>
            </pre>
          </div>
        </section>

        {this.state.babelConfig && (
          <section>
            <h3 className="section-title">Babel config</h3>
            <p className="section-subtitle">.babelrc</p>
            <pre>
              <code className="hljs">{this.state.babelConfig}</code>
            </pre>
          </section>
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
  const rules = []

  if (data.loaders.es6) {
    rules.push({
      test: `/\\.js$/`,
      use: `'babel-loader'`
    })
  }

  if (data.loaders.style === 'css') {
    rules.push({
      test: `/\\.css$/`,
      use: data.plugins.extract
        ? `ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})`
        : `['style-loader', 'css-loader']`
    })
  } else if (data.loaders.style === 'sass') {
    rules.push({
      test: `/\\.scss$/`,
      use: data.plugins.extract
        ? `ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})`
        : `['style-loader', 'css-loader', 'sass-loader']`
    })
  }

  const plugins = []

  if (data.plugins.extract) {
    plugins.push({
      importer: `const ExtractTextPlugin = require('extract-text-webpack-plugin');`,
      init: `new ExtractTextPlugin('${data.plugins.extractFile}')`
    })
  }

  let code = `const path = require('path');
    ${plugins.map(plugin => `${plugin.importer}\n`).join('')}
    module.exports = {
    entry: '${data.entry}',
    
    output: {
      path: path.resolve('${data.output.path}'),
      filename: '${data.output.filename}'
    }`

  if (rules.length > 0) {
    code += `,

      module: {
        rules: [${rules.map(rule => `{ test: ${rule.test}, use: ${rule.use} }`).join(',\n\n')}]
      }`
  }

  if (plugins.length > 0) {
    code += `,

      plugins: [
        ${plugins.map(plugin => plugin.init).join(',\n')}
      ]`
  }

  code += `};`

  code = beautify(code, {
    indent_size: 2
  })

  return hljs.highlight('javascript', code).value
}

const modulesFromData = (data) => {
  const modules = {
    webpack: true,
    'babel-core': data.loaders.es6,
    'babel-loader': data.loaders.es6,
    'babel-preset-env': data.loaders.es6,
    'babel-preset-react': data.loaders.react,
    'css-loader': data.loaders.style !== null,
    'style-loader': data.loaders.style !== null,
    'node-sass': data.loaders.style === 'sass',
    'sass-loader': data.loaders.style === 'sass',
    'extract-text-webpack-plugin': data.plugins.extract
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
  "presets": [ "${usingPresets.join('", "')}" ]
}`
  }

  return null
}
