const path = require('path');
const babelConfigClientDev = require('./babel.config').clientDev;
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const common = require('./webpack.config.client.common');

module.exports = merge(common, {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/client/client.jsx',
    ],
  },
  devtool: 'eval-source-map',
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    path: config.clientOutputPath,
    publicPath: `http://localhost:${config.webpack.devServerPort}/${config.webpack.publicPath}`,
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'assets'),
    publicPath: `http://localhost:${config.webpack.devServerPort}/${config.webpack.publicPath}`,
    port: config.webpack.devServerPort,
    hot: true,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]-[hash:base64:5]',
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfigClientDev,
        },
      }, {
        test: /(\.svg$|\.otf$|\.ttf$|\.png$|\.jpg$)/,
        use: {
          loader: 'file-loader',
        }
      }
    ],
  },
});
