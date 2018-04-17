const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const appConfig = require('./app/config/commonjs');

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
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    //new OfflinePlugin(),
    
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
      /*{
        from: path.resolve(__dirname, 'app/assets'),
        to: 'assets'
      }*/
    ]),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/src/index.html'),
      inject: false,
      //config: appConfig
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '127.0.0.1',
    port: 9000,
    open: true,
    // noInfo: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    disableHostCheck: true
  },
  devtool: 'source-map'
};


