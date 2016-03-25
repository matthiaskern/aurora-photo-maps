'use strict';
var webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

// PATHS
var PATHS = {
  app: __dirname + '/src',
  out: __dirname + '/dist'
};

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.app + "/index.html",
  inject: 'body'
})

module.exports = {
  context: PATHS.app,
  modulesDirectories: [
    'node_modules'
  ],
  entry: {
    app: ['webpack/hot/dev-server', path.resolve(PATHS.app, 'index.js')]
  },
  output: {
    path: PATHS.out,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.js$/,
      loader: 'ng-annotate!babel?presets[]=es2015',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    HTMLWebpackPluginConfig
  ],

};
