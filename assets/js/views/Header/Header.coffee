define(['backbone', 'views/Login/LoginTemplate'], (Backbone) ->
	class Login extends Backbone.View
		template: JST.LoginTemplate

		render: ->
			$(this.el).html(this.template(this.model))
)
