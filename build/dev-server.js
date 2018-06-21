process.env.NODE_ENV = 'development'


const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const chalk = require('chalk')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')
const config = require('../config')

const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    noInfo: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000,
})

app.use(devMiddleware)

app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-history-api-fallback')())

/**
 * 静态资源
 */
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log(chalk.blue('> Starting dev server...'))
devMiddleware.waitUntilValid(() => {
    portfinder.getPort((err, port) => {
        if (err) {
            _reject(err)
        }
        var uri = 'http://localhost:' + port
        if (autoOpenBrowser) {
            opn(uri) // 自动打开浏览器
        }

        console.log(chalk.blue('> Listening at ' + uri + '\n'))
        server = app.listen(port)
        _resolve()
    })
})

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}