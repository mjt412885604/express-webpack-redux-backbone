import html from '../pages/about.html'
import toast from './common/toast'

var About = Backbone.View.extend({
	el: '#app',

	events: {
		'click .page-about button': 'clickSpan'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(html)
	},

	clickSpan: function(e) {
		toast('you clicked the button');
	}
});

module.exports = new About;