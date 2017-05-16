import html from '../pages/set.html'
import hostList from '../store/config'
import {
	doFetch,
	local
} from '../utils/utils';

// const {
// 	mine
// } = hostList;

var Set = Backbone.View.extend({
	el: '#app',

	events: {
		'click .page-set button': 'clickSpan'
	},

	initialize: function() {
		this.render();
		this.getMine();
	},

	render: function() {
		this.$el.html(html)
	},

	getMine() {
		// doFetch({
		// 	url: mine,
		// 	data: {
		// 		userId: 1
		// 	}
		// }).then((data) => {
		// 	console.log(data)
		// 	$('.phone').html(data.phone);
		// 	$('.photo img').attr('src', data.photo);
		// }).catch((error) => {
		// 	console.log(error)
		// });
	},

	clickSpan: function(e) {
		alert('you clicked the button');
	}
});

module.exports = new Set;