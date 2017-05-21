import routes from './router'
import weui from 'weui.js'
import 'weui'

import './css/main.scss'

window.weui = weui;

var Routes = Backbone.Router.extend({
	routes: {
		'index': 'index',
		'login': 'login',
		'about': 'about',
		'order': 'order',
		'mine': 'mine',
		'set': 'set',
		'forget': 'forget',
		'*actions': 'index'
	},
	...routes,
	initialize: function() {}
})

window.appRouter = new Routes();
appRouter.on('route', function(route, params) {});

Backbone.history.start();