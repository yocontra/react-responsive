const path = require('path')
const webpack = require('webpack')

const env = new webpack.EnvironmentPlugin({
  NODE_ENV: process.env.BUILD_MODE == 'umd-min' ? 'production' : 'development'
})
const uglify = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  parallel: true,
  cache: true
})
const uglifyLite = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  cache: true,
  parallel: true,
  compress: {
    dead_code: true,
    unused: true
  },
  mangle: false,
  output: {
    beautify: true
  }
})

const filename = process.env.BUILD_MODE === 'umd'
  ? 'react-responsive.js'
  : 'react-responsive.min.js'

const plugins = process.env.BUILD_MODE === 'umd-min'
  ? [ env, uglify ]
  : [ env, uglifyLite ]

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    sourceMapFilename: `${filename}.map`,
    libraryTarget: 'umd',
    library: 'MediaQuery'
  },
  devtool: 'source-map',
  externals: {
    react: {
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
  plugins,
  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules'
    ],
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: [ /\.ts$/, /\.tsx$/ ],
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: {
    process: false,
    setImmediate: false
  }
}
