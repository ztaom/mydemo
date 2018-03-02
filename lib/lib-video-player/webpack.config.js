var webpack = require('webpack');
var pkg = require('./package.json');
var path  =require('path');

module.exports = function(watch) {
  if (watch) {
    var name = 'video.debug';
  } else {
    var name = 'video';    
  }
  return {
    entry: pkg.main,
    output: {
      path: path.join(__dirname, 'publish'),
      filename: name + '.js',
      library: 'lib-video-player',
      libraryTarget: 'this'
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel' },
        { test: /\.css$/, loader: "style!css"}
      ]
    },
    watch: watch
    // postcss: function() {
    //   return [px2rem({remUnit: 75})];
    // }
  }
}
