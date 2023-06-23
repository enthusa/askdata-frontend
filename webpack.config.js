const path = require('path');
const webpack = require('webpack');
const env = require('./env');

// 定义源码和构建结果的路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const HUI_PATH = path.resolve(ROOT_PATH, 'node_modules/hui-vue/src');

const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    askdata: '@/admin.js'
  },
  output: {
    path: DIST_PATH,
    filename: '[name].js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      use: {
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [SRC_PATH, HUI_PATH]
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      type: 'asset/inline'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      type: 'asset/inline'
    }, {
      test: /\.(md|txt|snippets)$/,
      type: 'asset/source'
    }]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': SRC_PATH
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      '/api/*': {
        secure: false,
        changeOrigin: true,
        target: 'https://askdata.inscode.cc'
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({ 'process.env': env }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Nebula',
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ]
};
