var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'main': './src/main/index',
        'render': './src/render/index'
    },
    output: {
        path: path.join(__dirname, 'app'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss']
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.(ts|tsx)$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'tslint-loader',
            //         options: {
            //             configFile: './tslint.json',
            //             typeCheck: true,
            //             emitErrors: false,
            //             formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
            //             formatter: 'grouped'
            //         }
            //     },
            // },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader?sourceMap&outputStyle=expanded'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
    ],
    node: {
        __dirname: false,
        __filename: false
    },
    devtool: 'source-map',
    target: "electron"
}