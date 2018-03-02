const Metalsmith = require('metalsmith');
const path = require('path');
const async = require('async');
const rollup = require('rollup');
const vue = require('rollup-plugin-vue');

const base = require('./rollup.config.base.js');
const metalsmith = Metalsmith(path.join('./src'));

metalsmith.clean(true)
    .source('.')
    .destination(path.resolve('./dist'))
    .use((files, metadata, done) => {
        const keys = Object.keys(files);
        async.each(keys, (file, next) => {
            // 仅处理.js文件和.vue文件
            if (!/\.(js|vue)/i.test(file)){
                return next();
            }

            // 仅仅一级文件夹在dist中生成 多余？
            if (/\/|\\/.test(file)) {
                delete files[file];
                return next();
            }

            // 用rollup生成commonjs模块
            rollup.rollup({
                entry: `./src/${file}`,
                format: 'cjs',
                plugins: [
                    base.map.eslint,
                    vue({
                        // 提取出来的css统一放在css目录下
                        css: `./dist/css/${file}.css`
                    }),
                    base.map.babel,
                ]
            }).then( (obj) => {
                obj.generate({
                    format: 'cjs'
                }).then((arg) => {
                    // .vue文件
                    if (/vue$/i.test(file)) {
                        // 为.vue组件注入css
                        files[file].contents = new Buffer(`require('./css/${file}.css'); \n${arg.code}`);
                        // 修改名字为xxx.v.js
                        files[file.replace(/vue$/i, 'v.js')] = files[file];
                        // 删除.vue文件
                        delete files[file];
                    } else {
                        // .js 文件
                        files[file].contents = new Buffer(arg.code);
                    }
                    next();
                });
            });

        }, done);
    })
    .build((err) => {
        err && console.log(err);
    });
