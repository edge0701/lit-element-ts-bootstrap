const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './app/src/entry.ts'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'minify-lit-html-loader',
            options: {
              htmlMinifier: {
                customAttrCollapse: /events/,
                ignoreCustomFragments: [
                  /<\s/,
                  /<=/
                ]
              }
            }
          },
          {
            loader: 'ts-loader'
          },
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    //new OfflinePlugin(),
    
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs'),
        to: 'node_modules/@webcomponents/webcomponentsjs'
      }
    ]),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/src/index.html'),
      inject: false,
      //config: appConfig
    }),
  ],
  devServer: {
    compress: true,
    host: '127.0.0.1',
    port: 10000,
    open: false,
    // noInfo: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    disableHostCheck: true
  },
  devtool: 'source-map'
};


