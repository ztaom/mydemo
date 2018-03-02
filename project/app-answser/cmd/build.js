require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../build_config');
const minimist = require('minimist');
const glob = require('glob');
const fs = require('fs');
const args = minimist(process.argv);

if ('testing' === args.type){
    config.build_type = 'testing';
} else {
    config.build_type = 'build';
}
// 参数提供assetsPublicPath的情况
if (args.assetsPublicPath) {
    config[config.build_type].assetsPublicPath = args.assetsPublicPath;
}

// 使用构建的情况
if ( args.cloud_build_type ) {
    const version = process.env.BUILD_GIT_BRANCH.replace(/^\D*/, '');
    const versionPath = false == true ? `${version}/` : '';

    if ('daily' === args.cloud_build_type) {// 日常
        config[config.build_type].assetsPublicPath = `//assets-daily.test.youku.com/ku/app-answser/${versionPath}`;
    } else {// 线上
        config[config.build_type].assetsPublicPath = `//g.alicdn.com/ku/app-answser/${versionPath}`;
    }
    // 云构建类型
    config[config.build_type].env.CLOUD_BUILD_TYPE = `"${args.cloud_build_type}"`;
}

const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config[config.build_type].assetsRoot, config[config.build_type].assetsSubDirectory), err => {
    if (err) {
        throw err;
    }

    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) {
            throw err;
        }
        process.stdout.write(`${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        })}\n\n`);

        const files = glob.sync('*.html', {cwd: path.resolve(__dirname, '../build')});
        files.forEach((item) => {
            item = path.resolve(__dirname, `../build/${item}`);
            let string = fs.readFileSync(item).toString();
            string = string.replace(/&#10;/g, '&\\#10;');
            fs.writeFileSync(item, string);
        });

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(
        '  注意: 当前build是针对于production的build，请发正式线时务必谨慎操作。\n'
        ));
    });
});
