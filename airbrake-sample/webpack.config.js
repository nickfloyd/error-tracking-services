const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    publicPath: '',
    filename: 'index_bundle.js'
  },
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
      'process.env.REACT_APP_AIRBRAKE_PROJECT_ID': JSON.stringify(process.env.REACT_APP_AIRBRAKE_PROJECT_ID),
      'process.env.REACT_APP_AIRBRAKE_PROJECT_KEY': JSON.stringify(process.env.REACT_APP_AIRBRAKE_PROJECT_KEY),
    })
  ]
}