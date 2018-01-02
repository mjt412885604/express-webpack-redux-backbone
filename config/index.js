const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/g1': {
                target: 'http://cnlod.asuscomm.com:8888',
                changeOrigin: true
            },
            '/p1': {
                target: 'http://cnlod.asuscomm.com:8888',
                changeOrigin: true
            },
            '/d1': {
                target: 'http://cnlod.asuscomm.com:8888',
                changeOrigin: true
            }
        },
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 4396, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,

        // https://webpack.js.org/configuration/devtool/#development
        devtool: '#cheap-module-eval-source-map',
        cssSourceMap: false,
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',
    }
}