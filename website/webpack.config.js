"use strict";

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    liveapi: "./liveapi/index.tsx"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/static/"
  },
  devServer: {
    publicPath: '/cldr-engine/',
    compress: true
  },
  performance: {
    hints: 'warning'
 },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    // wretch: 'wretch' // Not in cdnjs yet
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'liveapi.html',
      template: 'liveapi/liveapi.html',
      cache: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ]
};

module.exports = (env, argv) => {
  const cfg = {
    PUBLIC_URL: '/cldr-engine/'
  };
  if (argv.mode === 'development') {
    config.devServer.publicPath = path.join('/');
    config.devServer.contentBase = path.join(__dirname);
    cfg.PUBLIC_URL = '/static/';
  }
  config.plugins.unshift(new webpack.EnvironmentPlugin(cfg));
  return config;
};
