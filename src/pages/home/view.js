import html from './template.ejs'

import {
	Toast,
	Loading
} from '@/components'

var Home = Backbone.View.extend({
	el: '#app',

	events: {
		'click button': 'clickTips'
	},

	initialize() {
		this.render();
	},

	render() {
		this.$el.html(html())
	},

	clickTips(){
		Toast('上拉加载更多1');
	}



});

module.exports = Home;