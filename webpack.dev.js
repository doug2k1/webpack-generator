const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PUBLIC_PATH: JSON.stringify('')
      }
    })
  ]
})
