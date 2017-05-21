var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var HtmlRoutes = require('./config');

module.exports = {
	entry: __dirname + '/src/main.js',
	output: {
		path: __dirname + '/build',
		filename: 'js/[name].build.js',
		chunkFilename: "js/[name].chunk.js"
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader'],
			include: /src/
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ['css-loader', 'postcss-loader']
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ['css-loader', 'postcss-loader', 'sass-loader']
			})
		}, {
			test: /\.(png|jpg|svg|gif)$/,
			use: 'url-loader?limit=8192&name=images/[name].[ext]'
		}, {
			test: /\.html$/,
			use: 'raw-loader'
		}]
	},
	devServer: {
		contentBase: './', //本地服务器所加载的页面所在的目录
		port: 8081,
		historyApiFallback: true, //不跳转
		inline: true, //实时刷新
		host: '192.168.1.103',
		proxy: {
			'/g1': {
                target: 'http://bak.cnlod.cn:8888',
                changeOrigin: true
            },
            '/p1': {
                target: 'http://bak.cnlod.cn:8888',
                changeOrigin: true
            }
		}
	},
	plugins: [
		new ExtractTextPlugin('main.css'),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: function() {
					return [
						// require('postcss-cssnext')({
						// 	browsers: ['iOS >= 7', 'Android >= 4.1']
						// }),
						// require('postcss-pxtorem')({
						// 	rootValue: 100,
						// 	propWhiteList: []
						// }),
						require('autoprefixer')({
							browsers: ['iOS >= 7', 'Android >= 4.1']
						})
					]
				}
			}
		}),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/template/index.html',
			hash: true,
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true, //删除空白符与换行符
				conservativeCollapse: true,
				minifyJS: true //js也在一行
			}
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			Backbone: 'backbone',
		}),
	],
	devtool: '#eval-source-map'
}


if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
		// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin()
	])

	// 多页面打包地址
	Object.keys(HtmlRoutes).forEach((val) => {
		module.exports.plugins.push(new HtmlWebpackPlugin({
			filename: 'pages/' + HtmlRoutes[val] + '.html',
			template: 'src/pages/' + HtmlRoutes[val] + '.html',
			inject: false,
			cache: true,
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true, //删除空白符与换行符
				conservativeCollapse: true,
				minifyJS: true //js也在一行
			}
		}))
	})
}