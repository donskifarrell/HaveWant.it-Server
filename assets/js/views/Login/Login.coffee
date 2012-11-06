define(['backbone', 'text!views/Login/LoginT.js'], (Backbone, login) ->
	class Login extends Backbone.View
		template: _.template(login)

		render: ->
			return this.template(this.model)
)
