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
    css: boolean,
    sass: boolean
  }
}
