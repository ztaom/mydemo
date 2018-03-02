const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const glob = require('glob');
const config = require('../build_config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const env = config[config.build_type].env;

let plugins = [
    new webpack.DefinePlugin({
        'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
        filename: false == true ? utils.assetsPath('css/[name].css') : utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
        cssProcessorOptions: {
            safe: true
        }
    })
];

const files = glob.sync('*.html', {cwd: path.resolve(__dirname, '../src')});

for (let i = 0, item; i < files.length; i++){
    item = files[i];
    plugins.push(
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: `../build/${item}`,
            template: `src/${item}`,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            excludeChunks: files.join(',').replace(`${item}`, '').replace(',,', ',').replace(/\.html/g, '').split(','),
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
            // 
        })
    );
    // 
}

plugins = plugins.concat([
    // 
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        // any required modules inside node_modules are extracted to vendor
        minChunks: (module) => (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf( path.join(__dirname, '../node_modules') ) === 0
            )
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
    }),
    // 
    // copy custom static assets
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../src/static'),
            to: config[config.build_type].assetsSubDirectory,
            ignore: ['.*']
        }
    ])
]);

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        // css less scss stylus
        rules: utils.styleLoaders({
            sourceMap: config[config.build_type].productionSourceMap,
            extract: true
        })
    },
    devtool: config[config.build_type].productionSourceMap ? '#source-map' : false,
    output: {
        path: config[config.build_type].assetsRoot,
        filename: false == true ? utils.assetsPath('js/[name].js') : utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: false == true ? utils.assetsPath('js/[id].js') : utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins
});

if (config[config.build_type].productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                `\\.(${config[config.build_type].productionGzipExtensions.join('|')})$`
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config[config.build_type].bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

webpackConfig.plugins.push({
    "apply": (compiler) => {
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) => {
                htmlPluginData.html += `<!-- ${process.env.BUILD_GIT_BRANCH} - ${new Date().toString()} -->`;
                callback(null, htmlPluginData);
            });
        });
    }
});

// 解决build出错但webpack exit code不是0的问题
webpackConfig.plugins.push({
    "apply": (compiler) => {
        compiler.plugin('done', (stats) => {
            if (stats.compilation.errors.length > 0) {
                throw new Error(stats.compilation.errors.map((err) => err.message || err));
                // process.exit(1);
            }
        });
    }
});

module.exports = webpackConfig;
