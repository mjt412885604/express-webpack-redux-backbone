import {router_object, routes} from '@/router';

import 'weui'
import '@/css/main'

// 状态管理工具
import Store from '@/store';
window.Store = Store;

// 实例化路由
var Routes = Backbone.Router.extend({
	routes: router_object,
	...routes,
	initialize() {}
})

window.appRouter = new Routes();

appRouter.on('route', function(route, params) {
	document.body.scrollTop = 0; // 每次切换页面容器置顶
});

Backbone.history.start();
