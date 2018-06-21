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
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join('static', 'img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs-loader'
                }
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join('static', 'media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join('static', 'fonts/[name].[hash:7].[ext]')
                }
            }
        ]
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