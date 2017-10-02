const path = require('path')
const webpack = require('webpack')

const plugins = [new webpack.EnvironmentPlugin({
  NODE_ENV: process.env.BUILD_MODE == 'umd-min' ? 'production' : 'development'
})]

module.exports = {
  entry: './src/index.js',
  output: {
    filename: (process.env.BUILD_MODE == 'umd') ? './dist/react-responsive.js' :
              './dist/react-responsive.min.js',
    sourceMapFilename: './dist/react-responsive.js.map',
    libraryTarget: 'umd',
    library: 'MediaQuery'
  },
  devtool: 'source-map',
  externals: {
    'react': 'umd react',
    'react-dom': 'umd react-dom'
  },
  plugins: process.env.BUILD_MODE == 'umd-min' ? [
    ...plugins,
    new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          parellel: true
    })
  ] : plugins,
  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      { test: [ /\.js$/, /\.jsx$/ ], use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  node: {
    process: false,
    setImmediate: false
  }
}
