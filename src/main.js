import routes from './router'
import weui from 'weui.js'
import 'weui';
import './css/main.scss';

window.weui = weui;
const {
	index,
	about,
	order,
	set
} = routes;
var Routes = Backbone.Router.extend({
	routes: {
		'index': 'index',
		'about': 'about',
		'order': 'order',
		'set': 'set',
		'*actions': 'index'
	},
	index,
	about,
	order,
	set,
	initialize: function() {}
})

var router = new Routes();
router.on('route', function(route, params) {});

Backbone.history.start();