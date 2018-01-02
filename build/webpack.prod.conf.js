var path = require('path')
var webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件
const config = require('../config')

const chunkUtils = ['@/utils', '@/utils/fetch', '@/components']; // 提取公共组件

module.exports = merge(baseWebpackConfig, {
    entry: {
        'vendor': ['jquery', 'Backbone', 'weui.js', ...chunkUtils]
    },
    output: {
        path: config.build.assetsRoot,
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[id].[chunkHash:8].js',
        publicPath: config.build.assetsPublicPath
    },
    devtool: config.build.devtool,
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true //css压缩
                    }
                }, 'postcss-loader']
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true //css压缩
                    }
                }, 'postcss-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: '"production"'
        }),
        // 清空打包文件
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false,
        }),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css',
            allChunks: true, // 模块中提取css
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/index.html',
            hash: true,
            chunksSortMode: 'dependency',
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true, //删除空白符与换行符
                conservativeCollapse: true,
                minifyJS: true //js也在一行
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        // copy custom static assets
        /*new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),*/
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
})