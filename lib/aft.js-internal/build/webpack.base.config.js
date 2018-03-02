var path = require('path');
var root = path.join(__dirname, '..', 'src', 'frameworks');
var babelConfig = require('./babel.json');

babelConfig.babelrc = false;

module.exports = {
    entry: {
        'aft-lite': path.join(root, 'lite.js'),
        aft: path.join(root, 'legacy.js')
    },
    output : {
        path: path.resolve(__dirname, '..', 'browser'),
        filename: '[name].js',
        library: 'AFT',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [
                path.resolve(__dirname, '..', 'node_modules')
            ],
            use: [{
                loader: 'babel-loader',
                options: babelConfig
            }]
        }]
    },
    externals : {
        "babel-runtime/core-js/map" : {
            commonjs: "babel-runtime/core-js/map",
            commonjs2: "babel-runtime/core-js/map",
            amd: "babel-runtime/core-js/map",
            root: "Map" // indicates global variable
        },
        "babel-runtime/core-js/set" : {
            commonjs: "babel-runtime/core-js/set",
            commonjs2: "babel-runtime/core-js/set",
            amd: "babel-runtime/core-js/set",
            root: "Set" // indicates global variable
        }
    }
};