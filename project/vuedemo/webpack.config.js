const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var devServer = require("webpack-dev-server");

module.exports = {
  entry: {
    index: './src/main.js'
  },

  output: {
  	path: path.resolve(__dirname, 'dist'),
  	filename: '[name].js?[hash]'
  },

  module:{
    rules: [
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   options: {
      //   }
      // },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            'less': 'vue-style-loader!css-loader!less-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },

      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         attrs: ['img:src', 'link:href']
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.html$/,
        loader: "html-loader?attrs=img:src img:data-src",
        query: {
            minimize: false
        }
      },

      // {
      //   test: /\.(less|css)$/,
      //   use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      // },
      {
          test: /\.(less|css)$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use:[
                  'css-loader','postcss-loader','less-loader'
              ]
          })
      },

      {
        test: /favicon\.png$/,

        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },

      // {
      //   test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      //   exclude: /favicon\.png$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 1
      //       }
      //     }
      //   ]
      // }
      {
        test: /\.(png|gif|jpg|jpeg)$/,
         loader: 'url-loader',
         query: {
             /*
              *  limit=10000 ： 10kb
              *  图片大小小于10kb 采用内联的形式，否则输出图片
              * */
             limit: 10000,
             // name: '[name].[ext]'
             name: 'img/[name].[ext]'
         }

     },


    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
      chunks:['','index']
    }),
    new ExtractTextPlugin("[name].css?[hash:8]"),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],

  devServer: {
    port: 5480,
    hot: true,
    historyApiFallback: true
  },

  performance: {
    hints: false
  }

}