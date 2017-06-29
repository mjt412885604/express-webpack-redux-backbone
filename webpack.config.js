var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件

const debug = process.env.NODE_ENV === 'production' ? false : true; // 全局debug

const chunkUtils = debug ? [] : ['utils', '@/components']; // 提取公共组件

module.exports = {
	entry: {
		main: __dirname + '/src/main.js',
		vendor: ['jquery', 'Backbone', 'weui.js', ...chunkUtils]
	},
	output: {
		path: __dirname + '/build',
		filename: debug ? 'js/[name].js' : 'js/[name].[hash:8].js',
		chunkFilename: debug ? 'js/[name].js' : 'js/[name].[chunkHash:8].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			include: /src/
		}, {
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
		}, {
			test: /\.(png|jpg|svg|gif)$/,
			use: 'url-loader?limit=8192&name=images/[name].[ext]'
		}, {
			test: /\.html$/,
			use: [{
				loader: 'html-loader',
				options: {
					minimize: true
				}
			}],
			include: /src/
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}]
	},
	resolve: {
		extensions: ['.scss', '.js'],
		alias: {
			utils: path.resolve(__dirname, 'src/utils'),
			'@': path.resolve(__dirname, 'src/'),
		}
	},
	devServer: {
		port: 8080,
		host: '192.168.8.170',
		proxy: {
			'/g1': {
				target: 'http://oa.cnlod.cn:8888',
				changeOrigin: true
			}
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({}),
		new ExtractTextPlugin({
			filename: debug ? 'css/[name].css' : 'css/[name].[chunkHash:8].css',
			allChunks: !debug, // 模块中提取css
		}), // 分离css
		// html入口
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/template/index.html',
			hash: !debug,
			chunks: ['main', 'vendor'],
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true, //删除空白符与换行符
				conservativeCollapse: true,
				minifyJS: true //js也在一行
			}
		}),

		// 全局
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			Backbone: 'backbone',
			weui: 'weui.js'
		}),

		// 提取js公共插件
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor'],
		}),

	],
	devtool: '#eval-source-map'
}

// 打包生产版本
if (!debug) {
	module.exports.devtool = '#source-map';

	module.exports.plugins = (module.exports.plugins || []).concat([

		// 清空打包文件
		new CleanWebpackPlugin(['build'], {
			root: path.resolve(__dirname),
			verbose: true,
			dry: false,
		}),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),

		// 压缩js
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
			}
		}),

		// 按顺序执行
		new webpack.optimize.OccurrenceOrderPlugin()

	])
}