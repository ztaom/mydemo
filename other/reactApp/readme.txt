

js 压缩 https://github.com/mishoo/UglifyJS2#usage

nam install -g uglify-js
然后在web pack中加入
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
]