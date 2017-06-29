import View from './view'

var controller = function(params) {

	var view = new View(params);

	controller.onRouteChange = function() {
		view.undelegateEvents();
	};
};

module.exports = controller;