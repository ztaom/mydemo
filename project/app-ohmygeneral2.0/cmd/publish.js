const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const path = require('path');
const minimist = require('minimist');
const git = require('simple-git')(path.resolve(__dirname, '..'));
const chalk = require('chalk');
const ora = require('ora');
const config = require('../build_config');

const args = minimist(process.argv);
let dir = path.resolve(__dirname);

const type = args['type'] || process.argv[2];
const version = args['v'] || process.argv[3];
const deployBranch = `${type}/${version}`;

console.log(chalk.yellow('当前功能暂未启用，请联系@紫瀚'));
process.exit(0);

function build(publicPath) {
    let spinner = ora(`building for ${deployBranch}...`);
    spinner.start();

    // build
    exec(`node ${dir}/build.js --assetsPublicPath=${publicPath}`, function(err, stdout, stderr){
        spinner.stop();
        console.log(stdout);

        if(err){
            console.log();
            console.log(err);
            process.exit(1);
        }
        if ('daily' === type) {
            console.log(chalk.yellow(` Warning: 当前build所有资源引用均为日常域名，请勿发到正式线 \n 引用地址${publicPath}\n\n`));

            // deploy daily
            let spinner = ora(`deploying for ${deployBranch}  ... `);
            spinner.start();
            git.add('build/*')
                .commit(`${type} ${version}`)
                .push(['origin', `${deployBranch}`], function(err, msg){
                    console.log();
                    spinner.stop();
                    if (err) {
                        console.log(chalk.red('发布失败'));
                        console.log(err);
                        process.exit(1);
                    }
                    console.log(msg);
                    console.log(chalk.green(`发布成功 ${deployBranch}`));
                });
        }

        if('publish' === type){
            console.log(chalk.green(` 当前build所有资源引用均为正式线域名，\n 引用地址${publicPath}`));

            // deploy production
            let spinner = ora(`deploying for ${deployBranch}  ... `);
            spinner.start();

            git.add('build/*')
                .commit(`${type} ${version}`)
                // .push(['-u', 'origin', `${deployBranch}`], function(err, msg){
                //     if (err) {
                //         console.log(chalk.red('发布失败'));
                //         console.log(err);
                //         process.exit(1);
                //     }
                //     console.log(msg);
                // })
                .addAnnotatedTag(`${deployBranch}`, `${deployBranch}`, function(err, arg){
                    if(err){
                        console.log(chalk.red('发布失败'));
                        console.log(err);
                        process.exit(1);
                    }
                }).pushTags('origin', function(err, arg){
                    console.log();
                    spinner.stop();
                    if(err){
                        console.log(chalk.red('发布失败'));
                        console.log(err);
                        process.exit(1);
                    }
                    console.log(chalk.green(`\n 发布成功 ${deployBranch}`));
                });
        }
    });
}

git.branch(function(err, summary){
        if(err){
            console.log(err);
            process.exit(1);
        }

        if(`daily/${version}` !== summary.current){
            console.log(chalk.yellow(`请先切换到${deployBranch}再执行发布。`), chalk.gray('\n以后有时间会做的更方便使用一些'));
            process.exit(1);
        }
    })
    .status(function(err, summary){
        if(summary.modified.length){
            console.log(chalk.yellow('当前文件有增删改，请保证本地代码与code repo代码一致'));
            // exit if publish build and deploy
            if('publish' === type){
                process.exit(1);
            }
        }
    })
    .pull()
    .getRemotes(true, function(err, array){
        if(err || 0 === array.length){
            console.log(err);
            console.log(chalk.red('Please add to gitlab.alibaba-inc.com first'));
            process.exit(1);
        }

        const origin = array[0];
        const pushUrl = origin.refs.push;
        const group = pushUrl.replace(/^.*\.alibaba-inc\.com\/([^/]*).*$/i, '$1');
        const project = pushUrl.replace(/^.*?([^/]*)\.git$/i, '$1');
        const cdnUrl = config[`${type}_cdn`];
        const publicPath = `${cdnUrl}${group}/${project}/${version}/`;

        build(publicPath);
    });
