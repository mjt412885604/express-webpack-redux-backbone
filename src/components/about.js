import html from '../pages/about.html'
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
		alert('you clicked the button');
	}
});

module.exports = new About;