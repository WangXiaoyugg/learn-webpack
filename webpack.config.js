const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // entry: {
  //   index: './src/index.js',
  //   login: './src/login.js'
  // },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[chunkhash:7].js'
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
          // miniCssExtractPlugin.loader, 
          // 'css-loader', 
          // 'postcss-loader', 
          // 'less-loader'
          'kkb-style-loader',
          'kkb-css-loader',
          'kkb-less-loader',
        ]
      },
      {
        test: /\.js$/,
        use: [
          'replace-loader',
          {
            loader: 'replace-loader-async',
            options: {
              name: '赵日天'
            }
          }
        ]
      }
    ]
  },
  resolveLoader: {
    modules: ['node_modules', './myLoaders']
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // chunks: ['index'],
    }),
    // new htmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'login.html',
    //   chunks: ['login'],
    // }),
    new CleanWebpackPlugin(),
    // new miniCssExtractPlugin({
    //   filename: 'css/[name]-[chunkhash:7].css',
    // })
  ]

}