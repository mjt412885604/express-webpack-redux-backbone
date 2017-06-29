import * as route from '@/router';

import 'weui'
import '@/css/main.scss'

/** @type {[debug]} [开发调试状态] */
window.debug = process.env.NODE_ENV !== 'production';

// 实例化路由
var Routes = Backbone.Router.extend({
	routes: route.router_object,
	...route.routes,
	initialize() {}
})

window.appRouter = new Routes();

appRouter.on('route', function(route, params) {
	document.body.scrollTop = 0; // 每次切换页面容器置顶
});

Backbone.history.start();