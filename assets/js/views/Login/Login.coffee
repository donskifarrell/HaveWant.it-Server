define(['backbone', 'views/Header/HeaderTemplate', 'views/Login/LoginTemplate'], (Backbone) ->
	class Login extends Backbone.View
		render: ->
			$(this.el).empty()
			$(this.el).append(JadeTemplates.HeaderTemplate(this.model))
			$(this.el).append(JadeTemplates.LoginTemplate(this.model))
)
