const base = require('./rollup.config.base.js');
const uglify = require('rollup-plugin-uglify');

module.exports = {
    entry: './src/index.js',
    format: 'umd',
    moduleName: 'lib_share',
    plugins: [...base.plugins, uglify()],
    dest: './browser/lib-share.js'
};
