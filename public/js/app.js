(function ($) {
	window.AppView = Backbone.View.extend({
		el: $("#ItemsPage"),
		template: _.template('<li>HAHSDASDAS</li>'),

		events: {
			"click #addNew":  "showPrompt"
		},

		showPrompt: function () {
			var friend_name = prompt("Who is your friend?");
		}
	});

	var appview = new AppView();
})(jQuery);