const path = require('path');
const conf = require('./webpack.config');
delete conf.externals;
conf.entry = ['./samples/sandbox/src/index.jsx', 'webpack-dev-server/client?http://0.0.0.0:3333', 'webpack/hot/only-dev-server'];
conf.output = {
  path: path.join(__dirname, 'serve'),
  filename: 'sample.js'
};
conf.cache = true;
conf.debug = true;
conf.devtool = 'source-map';

module.exports = conf;
