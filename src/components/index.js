import html from '../pages/index.html'
import {
	doFetch,
	platform
} from '../utils/utils';

var Index = Backbone.View.extend({
	el: '#app',

	events: {
		'click .page-index button': 'clickSpan'
	},

	initialize: function() {
		this.render();
		this.getDoctorList();
	},

	render: function() {
		this.$el.html(html)
	},

	getDoctorList() {

	},

	clickSpan: function(e) {
		alert('index.html');
	}
});

module.exports = new Index;