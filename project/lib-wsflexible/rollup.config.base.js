const babel = require('rollup-plugin-babel');
const node = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const vue = require('rollup-plugin-vue');
const eslint = require('rollup-plugin-eslint');

const eslintPlugin = eslint({
    include: [
        './src/*.js'
    ]
});
const nodePlugin = node({ moule: true});
const commonjsPlugin = commonjs();
const vuePlugin = vue();
const babelPlugin = babel({
    'babelrc': false,
    'presets': [
        [
            'env',
            {
                'modules': false
            }
        ]
    ],
    'plugins': [
        'external-helpers'
    ],
    'exclude': 'node_modules/**' // only transpile our source code
});


module.exports = {
    plugins: [ eslintPlugin, nodePlugin, commonjsPlugin, vuePlugin, babelPlugin ],
    map: {
        eslint: eslintPlugin,
        node: nodePlugin,
        commonjs: commonjsPlugin,
        vue: vuePlugin,
        babel: babelPlugin
    }
};
