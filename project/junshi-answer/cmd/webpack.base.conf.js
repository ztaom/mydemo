const path = require('path');
const glob = require('glob');
const utils = require('./utils');
const config = require('../build_config');
const exists = require('fs').existsSync;

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

const entry = {};
const files = glob.sync('*.html', {cwd: path.join(__dirname, '../src')});

for (let i = 0, item; i < files.length; i++) {
    item = files[i].replace(/\.html/, '');
    if(exists(path.resolve(`./src/${item}.js`))){
        entry[item] = `./src/${item}.js`;
    } else {
        entry[item] = `./src/${item}/index.js`;
    }
}

module.exports = {
    entry,
    output: {
        path: config[config.build_type].assetsRoot,
        filename: '[name].js',
        publicPath: config[config.build_type].assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            // 
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                exclude: [resolve('src/static')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            // 
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: utils.cssLoaders({
                        sourceMap: config[config.build_type].cssSourceMap,
                        extract: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing'
                    })
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                exclude: [resolve('src/static')]
            },
            {
                test: /\.jade$/,
                loader: 'jade-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    removeComments: true
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: false == true ? utils.assetsPath('img/[name].[ext]') : utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: false == true ? utils.assetsPath('fonts/[name].[ext]') : utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};
