require('./check-versions')();

const config = require('../build_config');
config.build_type = 'dev';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const chalk = require('chalk');
const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const fs = require('fs');
const webpackConfig = require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options };
    }
    app.use(proxyMiddleware(options.filter || context, options));
});
app.use('/fake/', (req, res) => {
    let data = req.query.data;
    try {
        data = JSON.parse(req.query.data);
    } catch (e) {
        //
    }

    const fileName = path.resolve(__dirname, `../fake/${data.bizType}`);

    let rs = `{"error":"${fileName} is not exist"}`;

    if (fs.existsSync(fileName)) {
        rs = fs.readFileSync(fileName);
    }

    console.log('fake server working.', `bizType is ${data.bizType}`);
    if (req.query.callback) {
        res.send(`${req.query.callback}(${rs})`);
    } else {
        res.send(rs);
    }
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./src/static'));

const uri = `http://localhost:${port}`;

let _resolve;
const readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
    console.log(`> Listening at ${uri}\n`);

    console.log(chalk.yellow(' 开发前请仔细阅读 README.md 和 文档，可以帮助你省去省去很多麻烦和提高工作效率！！！\n 否则可能死的很惨呦！！！'));

    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }
    _resolve();
});

const server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    }
};
