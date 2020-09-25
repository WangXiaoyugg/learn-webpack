const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const TxtWebpackPlugin = require('./myPlugins/txt-webpack-plugin')
const FileWebpackPlugin = require('./myPlugins/file-webpack-plugin')



module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[hash:7].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 8081,
    hot: true,
    proxy: {
      "/api": {
        "target": "http://localhost:9000/"
      }
    },
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs/',
            limit: 1024 * 10,
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      }
    ]
  },
  resolveLoader: {
    modules: ['node_modules', './myLoaders']
  },
  devtool: 'source-map',
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: 'css/[name]-[chunkhash:7].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new TxtWebpackPlugin({
    //   name: '赵日天'
    // })
    new FileWebpackPlugin(),
  ]

}