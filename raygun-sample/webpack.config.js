const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

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
      'process.env.REACT_APP_RAYGUN_API_KEY': JSON.stringify(process.env.REACT_APP_RAYGUN_API_KEY),
    }),
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: true,
      },
      componentsOptions: {
        AutoIncreaseVersion: {
          runInWatchMode: false // it will increase version with every single build!
        }
      }
    })
  ]
}