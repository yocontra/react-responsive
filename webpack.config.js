const path = require('path')
const webpack = require('webpack')

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
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    ...((process.env.BUILD_MODE == 'umd-min') ?
        [new webpack.optimize.UglifyJsPlugin()] : [])
  ],
  resolve: {
    extensions: [ '', '.js' ],
    root: path.resolve('src'),
    modulesDirectory: 'node_modules'
  },
  module: {
    loaders: [
      { test: [ /\.js$/, /\.jsx$/ ], loader: 'babel', exclude: /node_modules/ }
    ]
  }
}
