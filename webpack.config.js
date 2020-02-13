'use strict'

const path = require('path')

module.exports = {
  mode: "production",
  // エントリポイントのファイル
  entry: [
    './src/js/index.js',
  ],
  output: {
    // 出力先のディレクトリ
    path: path.resolve(__dirname, './dest/js'),
    // 出力ファイル名
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue'], // import './hoge.vue' の代わりに import './hoge' と書けるように
  },
  externals: [
    {
      jquery: 'jQuery'
    }
  ],
  module: {
    rules: [
      {
        test: /\.vue$/, // .vueで終わるファイル
        exclude: /node_modules/,
        loader: 'vue-loader', // vue-loaderを使う
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // css-loader → style-loaderの順で通す
      },
      {
        test: /\.(eot|svg|woff|ttf|gif)$/,
        loader: 'url-loader'
      }, // テーマを読むときだけ必要
    ]
  }
}
