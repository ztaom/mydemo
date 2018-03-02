var webpackConfig = require('./webpack.base.config.js');
webpackConfig.output.filename = '[name].min.js';
module.exports = webpackConfig;