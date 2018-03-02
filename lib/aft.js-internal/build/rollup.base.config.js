import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const babelConfig = require('./babel.json');
babelConfig.babelrc = false;
babelConfig.exclude = 'node_modules/**';
babelConfig.runtimeHelpers = true;

export default {
    format: 'cjs',
    plugins: [
        commonjs({
            include: 'node_modules/**'
        }),
        babel(babelConfig)
    ]
};