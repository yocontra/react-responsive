const path = require('path')
const webpack = require('webpack')

const isMin = process.env.BUILD_MODE === 'umd-min'
const mode = isMin ? 'production' : 'development'
const env = new webpack.EnvironmentPlugin({
  NODE_ENV: mode
})

const filename = isMin
  ? './react-responsive.min.js'
  : './react-responsive.js'

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    filename,
    libraryTarget: 'umd',
    library: 'react-responsive'
  },
  devtool: 'source-map',
  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  },
  plugins: [ env ],
  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: [ /\.js$/, /\.jsx$/ ],
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: {
    process: false,
    setImmediate: false
  }
}
