import html from './template.ejs'

import {
	render
} from '@/utils'
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

		let obj = {name: 'lilei', age: 26}

		obj = Object.assign({}, {
			age: 18,
			time: 2018
		}, obj)

		this.getdatas().then(res => {
			console.log(res)
		})
		console.log(Store.getState(), obj)
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
	},

	getdatas(){
		return new Promise((resolve, reject) => {
			resolve('hello promise')
		})
	}



});

module.exports = Index;