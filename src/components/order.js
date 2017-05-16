import html from '../pages/order.html'
var Order = Backbone.View.extend({
	el: '#app',

	events: {
		'click .page-order button': 'clickSpan'
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

module.exports = new Order;