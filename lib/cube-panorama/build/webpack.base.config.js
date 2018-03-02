var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var root = path.join(__dirname, '..');

module.exports = {
    entry: {
        index: [
            path.join(root, 'src', 'index.js')
        ]
    },
    output : {
        path: path.join(root, 'app', 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                path.resolve(root, 'src')
            ],
            use: [{
                loader: 'babel-loader'
            }]
        },{
            test: /\.css$/,
            include: [
                path.resolve(root, 'src')
            ],
            use: [{
                loader: 'style-loader'
            },{
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            },{
                loader: 'postcss-loader',
                options: {
                    sourceMap: 'inline'
                }
            }]
        },{
            test:  /\.json$/,
            use: [{
                loader: 'json-loader'
            }]
        }, {
            test: /\.(?:jpg|jpeg|gif|png)$/, 
            loader: '@ali/img4dpr-loader?highq=q90&lowq=q75&sharpen=s150'
        }]
    },
    plugins: [
        new WebpackNotifierPlugin({ alwaysNotify: true })
    ]
};