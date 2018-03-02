var path = require('path');
var root = path.join(__dirname, '..', 'src', 'frameworks');
var babelConfig = require('./babel.json');

babelConfig.babelrc = false;

module.exports = {
    entry: {
        polyfill: path.join(root, 'polyfill.js')
    },
    output : {
        path: path.resolve(__dirname, '..', 'browser'),
        filename: '[name].min.js'
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
    }
};