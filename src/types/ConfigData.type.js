// @flow
export type ConfigData = {
  entry: string,
  output: {
    path: string,
    filename: string
  },
  loaders: {
    es6: boolean,
    react: boolean,
    style: null | 'css' | 'sass'
  },
  plugins: {
    extract: boolean,
    extractFile: string
  }
}
