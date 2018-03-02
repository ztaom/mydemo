const base = require('./rollup.config.base.js');

module.exports = {
    entry: './src/index.js',
    format: 'umd',
    moduleName: 'lib_wsflexible',
    plugins: base.plugins,
    dest: './browser/lib-wsflexible.js'
};
