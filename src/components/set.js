import html from '../pages/set.html'
import toast from './common/toast'
import { store } from '../store'

var Set = Backbone.View.extend({
	el: '#app',

	events: {
		'click .page-set .sign-out_btn': 'signOut'
	},

	initialize() {
		this.render();
	},

	render() {
		this.$el.html(html)
	},

	signOut() {
		store({
            type: 'SET_LOGINOUT'
        });
		toast({
			message: '退出登录',
			callback(){
				appRouter.navigate('login', true);
			}
		});
	}
});

module.exports = new Set;