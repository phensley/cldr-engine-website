"use strict";

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    liveapi: "./liveapi/index.tsx"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/static/"
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
    new webpack.EnvironmentPlugin({
      PUBLIC_URL: '/cldr-engine/'
    }),
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
