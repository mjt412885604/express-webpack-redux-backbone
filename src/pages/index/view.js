import html from './template.ejs'

import {
	render
} from 'utils'
import {
	Toast,
	Loading
} from '@/components'

var Index = Backbone.View.extend({
	el: '#app',

	events: {
		'click button': 'clickTips'
	},

	initialize() {
		this.render();
	},

	render() {
		this.$el.html(html({
			name: 'hello ejs'
		}))
	},

	clickTips(){
		Toast({
			message: '上拉加载更多',
			callback(){
				appRouter.navigate('home', true);
			}
		});
	}



});

module.exports = Index;