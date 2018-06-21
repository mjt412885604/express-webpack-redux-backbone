var path = require('path')
var webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?reload=true'].concat(baseWebpackConfig.entry[name])
})


module.exports = merge(baseWebpackConfig, {
    devtool: config.dev.devtool,
    module: {
        rules: [{
            test: /\.css$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true //css压缩
                    }
                }, 'postcss-loader']
            }))
        }, {
            test: /\.scss$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true //css压缩
                    }
                }, 'postcss-loader', 'sass-loader']
            }))
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }), // 分离css

        // html入口
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/template/index.html',
        }),
        new FriendlyErrorsPlugin()
    ]
})