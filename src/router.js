var file,
	content = {};

// 生产环境打包
if (process.env.NODE_ENV === 'production') {
	file = './'
} else {
	file = './src/'
}

// 渲染页面
// function render(url, cb) {
// 	if (content[url]) {
// 		$el.html(content[url])
// 		cb(content[url])
// 	} else {
// 		$.ajax({
// 			url: file + 'pages/' + url + '.html',
// 			dataType: 'html'
// 		}).then((data) => {
// 			content[url] = data;
// 			$el.html(data)
// 			cb(data)
// 		})
// 	}
// }

window.App = {
	views: {},
	$el: $('#app')
}

var hasViews = (url, callback) => {
	if (App.views[url] !== undefined) {
		App.views[url].initialize();
	} else {
		callback()
	}
}

const routes = {
	index() {
		hasViews('index', () => {
			require.ensure([], function(require) {
				var AppView = require('./components/index');
				App.views['index'] = AppView;
			}, 'index')
		})
	},
	login() {
		hasViews('login', () => {
			require.ensure([], function(require) {
				var AppView = require('./components/login');
				App.views['login'] = AppView;
			}, 'login')
		})
	},
	about() {
		hasViews('about', () => {
			require.ensure([], function(require) {
				var AppView = require('./components/about');
				App.views['about'] = AppView;
			}, 'about')
		})
	},
	order() {
		hasViews('order', () => {
			require.ensure([], function(require) {
				var AppView = require('./components/order');
				App.views['order'] = AppView;
			}, 'order')
		})
	},
	mine() {
		hasViews('mine', () => {
			require.ensure([], function(require) {
				var AppView = require('./components/mine');
				App.views['mine'] = AppView;
			}, 'mine')
		})
	},
	set() {
		hasViews('set', () => {
			require.ensure([], function(require) {
				var AppView = require('./components/set');
				App.views['set'] = AppView;
			}, 'set')
		})
	},
	forget() {
		hasViews('forget', () => {
			require.ensure([], function(require) {
				var AppView = require('./components/forget');
				App.views['forget'] = AppView;
			}, 'forget')
		})
	},
}

export default routes;