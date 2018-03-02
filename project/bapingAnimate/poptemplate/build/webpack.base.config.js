var webpack = require('webpack');
var path = require('path');

var root = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        index: [
            path.join(root, 'src', 'index.js')
        ]
    },
    output : {
        path: path.join(root, 'app', 'dist'),
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: [
                path.join(root, 'src')
            ]
        },{
            test: /\.css$/,
            loader: 'style!css?importLoaders=1!postcss?sourceMap=inline',
            include: [
                path.join(root, 'src')
            ]
        }, {
            test: /\.json$/,
            loader: 'json',
            include: [
                path.join(root, 'src'),
                path.join(root, 'assets')
            ]
        }]
    },
    postcss: function (webpack) {
        return [
            require("postcss-cssnext")(),
            require('postcss-px2rem')({remUnit: 75})
        ]
    },
    plugins: []
}