const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const externals = {};
externals.react = 'react';
externals.PropTypes = 'prop-types';

module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',

  output: {
    path: `${path.join(__dirname)}`,
    filename: 'dist.js',
    libraryTarget: 'umd',
    library: 'ReactChartEngine',
  },

  plugins: [/* new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    // Host that will be used in `server` mode to start HTTP server.
    analyzerHost: '127.0.0.1',
    // Port that will be used in `server` mode to start HTTP server.
    analyzerPort: 8888,
  }) */],

  externals,

  resolve: {
    extensions: [
      '', '.js', '.jsx',
    ],
  },

  module: {
    loaders: [
      {
        test: /(\.js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2', 'react'],
        },
      },
    ],
  },
};
