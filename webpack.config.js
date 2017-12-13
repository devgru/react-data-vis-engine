const path = require('path');

const fs = require('fs');
const node_modules = fs.readdirSync('node_modules');

const externals = {};
node_modules.forEach(module => externals[module] = module);
externals.react = 'react';
externals['PropTypes'] = 'prop-types';

module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',

  output: {
    path: path.join(__dirname),
    filename: 'dist.js',
    libraryTarget: 'umd',
    library: 'ReactChartEngine'
  },

  plugins: [],

  externals,

  resolve: {
    extensions: [
      '', '.js', '.jsx'
    ]
  },

  module: {
    loaders: [
      {
        test: /(\.js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  }
};
