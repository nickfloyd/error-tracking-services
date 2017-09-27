const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const SentryPlugin = require('webpack-sentry-plugin');
const PackageJson = require('./package.json');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true, // important for performance
        },
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          'react-svg-loader',
        ],
      },
      {
        test: /\.(png|jpg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SENTRY_RAVEN_ENDPOINT': JSON.stringify(process.env.REACT_APP_SENTRY_RAVEN_ENDPOINT),
    }),
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: true,
      },
      componentsOptions: {
        AutoIncreaseVersion: {
          runInWatchMode: false // it will increase version with every single build!
        },
      }
    }),
    new SentryPlugin({
      // Sentry options are required
      organization: process.env.REACT_APP_SENTRY_ORG,
      project: process.env.REACT_APP_SENTRY_PROJECT,
      apiKey: process.env.REACT_APP_SENTRY_API_KEY,
      
      include: /bundle.js/,
      suppressConflictError: true,
      // Release version name/hash is required
      release: function(hash) {
        return PackageJson.version + hash; // webpack build hash
      }
    })
  ]
}