const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // entry files 브라우저 환경에서 실행되는 파일들
  entry: ['@babel/polyfill', './src/assets/js/main.js'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    // 트랜스파일링된 소스 코드는 public에 저장된다.
    path: path.resolve(__dirname, 'public'),
    filename: 'assets/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/assets/js')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};