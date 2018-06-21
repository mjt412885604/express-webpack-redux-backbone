var path = require('path')
var webpack = require('webpack')
const config = require('../config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.dev.assetsPublicPath
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: [resolve('src')]
        }, {
            test: /\.(png|jpg|svg|gif)$/,
            use: 'url-loader?limit=8192&name=static/img/[name].[ext]'
        }, {
            test: /\.ejs$/,
            use: {
                loader: 'ejs-loader'
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    resolve: {
        extensions: ['.ejs', '.scss', '.js', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    plugins: [
        // 全局
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Backbone: 'backbone',
            weui: 'weui.js'
        })
    ]
}