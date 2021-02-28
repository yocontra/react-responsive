const path = require('path')
const webpack = require('webpack')
const conf = require('./webpack.config')

delete conf.externals
conf.entry = './samples/sandbox/src/index.tsx'
conf.output = {
  path: path.join(__dirname, 'serve'),
  filename: 'sample.js'
}
conf.devServer = {
  compress: true,
  hot: true,
  disableHostCheck: true
}
conf.plugins = [ ...conf.plugins, new webpack.HotModuleReplacementPlugin() ]
conf.cache = true
conf.devtool = 'inline-source-map'
const tsLoader = conf.module.rules.find((rule) => rule.loader === 'ts-loader')
tsLoader.options = {
  configFile: 'samples/sandbox/tsconfig.json'
}

module.exports = conf
