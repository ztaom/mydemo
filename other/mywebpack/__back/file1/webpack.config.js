var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LessPluginCleanCSS = require('less-plugin-clean-css');
var htmlMinifier = require("html-minifier");

module.exports = {
    entry: [
    	'webpack/hot/dev-server',
    	'webpack-dev-server/client?http://localhost:8080',////npm run dev
    	 path.resolve(__dirname, 'app/js/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js',
        publicPath: "/build" 
    },
    module: {
    	loaders: [
	    	{ test: /\.js$/, exclude: /(node_modules|bower_components)/,loaders: ['react-hot', 'babel'] },
	    	{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }, 
	    	{ test: /\.less$/, loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!' + 'less?sourceMap'
            )},

	    	//小于50kb就转换成dataUrl
            {test:/\.(png|jpg|jpeg|gif)$/,loader: "url-loader?limit=8192&name=img/[name].[ext]"}
	    ]
	},
	resolve: {
	    root: path.join(__dirname, '..', 'app'),
	    extensions: ['', '.js', '.jsx', '.json', '.css', '.styl', '.png', '.jpg', '.jpeg', '.gif', '.svg']
	},

    plugins: [
        new ExtractTextPlugin("./css/app.css")
    ],

    //less解析后压缩
    lessLoader: {
	    lessPlugins: [
	      new LessPluginCleanCSS({advanced: true})
	    ]
	}
};

// webpack.config.js
/*
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // The standard entry point and output config
    entry: {
    	//'webpack/hot/dev-server',
    	//'webpack-dev-server/client?http://localhost:8080',////npm run dev
        appjs: "./app/js",
        appcss: "./app/css/style.css"
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    module: {
        loaders: [
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
        ]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("./build/css/my.css")
    ]
}*/