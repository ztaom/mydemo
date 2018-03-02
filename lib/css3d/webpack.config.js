// add page entry here!
var pages = {
	demo: 'demo',
	book: 'book',
	cube: 'cube',
	periodictable: 'periodictable',
	showcase: 'showcase'
};

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var BUILD_DIRNAME = !process.env.BUILDDIR ? 'dist'
  : path.resolve(ROOT_PATH, process.env.BUILDDIR);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var PAGE_PATH = path.resolve(ROOT_PATH, 'demo/');
var BUILD_PATH = path.resolve(ROOT_PATH, BUILD_DIRNAME);

process.env.BABEL_ENV = TARGET;

var exportConfig = null;

var pageEntries = {};

for(var name in pages){
	pageEntries[name] = path.resolve(PAGE_PATH, pages[name] + '.js');
}

var common = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^' + name + '$'));
  },

  entry: pageEntries,

  output: {
    path: BUILD_PATH,
    filename: '[name].bundle.js?'
  },

  resolve: {
    modulesDirectories: ['node_modules', './src', './demo'],
    extensions: ['', '.js'],
    alias: {}
  },
  module: {
    noParse: [],
    preLoaders: [
      {
        test: /\.css$/,
        loaders: ['csslint'],
        include: [APP_PATH, PAGE_PATH]
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: [APP_PATH, PAGE_PATH]
      },
      {
        test: /\.png|jpg|jpeg|gif|svg$/,
        loader: "url?name=img/[name].[ext]&limit=10000",
        include: [APP_PATH, PAGE_PATH]
      },
      {
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'},
      {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
			},
      {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file?name=fonts/[name].[ext]'
			},
			{
				test: /\.(glsl|frag|vert)$/,
				loader: 'raw',
				exclude: /node_modules/ 
			},
      {
				test: /\.(glsl|frag|vert)$/,
				loader: 'glslify',
				exclude: /node_modules/
			}
			/*,
      {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
			}
			*/
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  postcss: function () {
    return [ autoprefixer];
  }
};

// add entries for pages
function generatePageEntries() {
  for (var name in pages) {
    var htmlPlugin = new HtmlwebpackPlugin({
      title: name,
      filename: name + ".html",
			inject: 'body',
			template: 'demo/' + name + '.html',
      chunks: [name]
    });

    common.plugins.push(htmlPlugin);
  };
}

generatePageEntries();

if(TARGET === 'start' || !TARGET) {

  var config = merge(common, {
    devtool: 'eval-source-map',

    module: {
        loaders: [
          {
            test: /\.less$/,
            loader: 'style!css!postcss!less'
          },
          {
            test: /\.css$/,
            loaders: ['style', 'css', 'postcss'],
            // include: APP_PATH
          }
        ]
    },
    devServer: {
      port: 9999,
      // contentBase: './demo',
      historyApiFallback: true,
      host: "0.0.0.0",
      hot: true,
      inline: true,
      progress: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'DEBUG': JSON.stringify('true')
      }),
    ]
  });

  exportConfig = config;
}

if(TARGET === 'dist') {
  exportConfig = merge(common, {
    entry: {
      'index':  ['./src/index.js']
    },

    output: {
      path: BUILD_DIRNAME,
      filename: '[name].js',
      library: 'CSS3D',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
		externals: {
      // 'stats-js': 'Stats',
      // 'raf': 'raf'
    },
    module: {
      loaders: [
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract(
						// activate source maps via loader query
						'css!' +
						'postcss!'+
						'less'
					),
          include: [APP_PATH, PAGE_PATH]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
						'style',
						'css',
						'postcss'
					),
          include: [APP_PATH, PAGE_PATH]
        }
      ]
    },
    plugins: [
      new Clean([BUILD_DIRNAME]),
      new ExtractTextPlugin('[name].css', { allChunks: true }),

      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

module.exports = exportConfig
