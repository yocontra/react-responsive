const path = require('path');
const webpack = require('webpack');

const mode = process.env.BUILD_MODE == 'umd-min' ? 'production' : 'development';

const env = new webpack.EnvironmentPlugin({
  NODE_ENV: mode,
});

const filename =
  process.env.BUILD_MODE === 'umd'
    ? 'react-responsive.js'
    : 'react-responsive.min.js';

const plugins = [
  env
];
const optimization =
  process.env.BUILD_MODE === 'umd-min'
    ? {}
    : {
        mangleExports: false,
        minimize: false,
      };

module.exports = {
  entry: './src/index.ts',
  mode: mode,
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    sourceMapFilename: `${filename}.map`,
    libraryTarget: 'umd',
    library: 'MediaQuery',
    globalObject: 'this',
  },
  optimization: optimization,
  devtool: 'source-map',
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
  plugins,
  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
