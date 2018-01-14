const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const nodeModules = fs.readdirSync('node_modules');

const externals = {};
nodeModules.forEach((module) => {
  externals[module] = module;
});
externals.react = 'react';
externals.PropTypes = 'prop-types';

module.exports = {
  context: path.join(__dirname),
  entry: './src/lib/index.js',

  output: {
    path: path.join(__dirname),
    filename: 'dist.js',
    libraryTarget: 'umd',
    library: 'ReactChartEngine',
  },

  plugins: [
    new UglifyJsPlugin(),
    /* new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
    }) */
  ],

  externals,

  resolve: {
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src/lib/'),
    ],
    extensions: ['.jsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
};
