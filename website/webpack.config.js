"use strict";

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('./webpack/interpolate-html-plugin');

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    liveapi: "./src/liveapi/index.tsx"
  },
  output: {
    filename: "[name]/[name].js",
    path: __dirname + "/static/"
  },
  devServer: {
    //publicPath: '/cldr-engine/',
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
  plugins: []
};

const htmlConfig = {
  inject: true,
  filename: 'liveapi/index.html',
  template: 'src/liveapi.html',
  templateParameters: {},
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
};

module.exports = (env, argv) => {
  let publicUrl = '/cldr-engine/';
  let nodeEnv = 'production';

  if (argv.mode === 'development') {
    //config.devServer.publicPath = path.join('/');
    //config.devServer.contentBase = path.join(__dirname);
    publicUrl = '/static/';
    nodeEnv = argv.mode;
  }

  const pluginEnv = {
    PUBLIC_URL: publicUrl,
    NODE_ENV: nodeEnv
  };

  config.plugins = [
    new webpack.EnvironmentPlugin(pluginEnv),
    new HtmlWebpackPlugin(htmlConfig),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, pluginEnv),
  ];
  return config;
};
