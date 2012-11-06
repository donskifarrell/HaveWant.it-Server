require.config
  paths:
    jQuery: "lib/jquery/jquery"
    underscore: "lib/backbone/underscore"
    backbone: "lib/backbone/backbone"
    templates: "../views"    

  shim:
    jQuery:
      exports: "$"

    underscore:
      exports: "_"

    backbone:
      deps: ["jQuery", "underscore"]
      exports: "Backbone"

require ["jQuery", "backbone"], ($, Backbone) ->
	window.HaveWant =
		Models: {}
		Collections: {}
		Views: {}
		Routers: {}

		init: -> 
			this.Models = {
				User: new HaveWant.Models.User
				Item: new HaveWant.Models.Item
			}

			this.Collections = {
				Items: new HaveWant.Collections.Items
			}

			this.Views = {
				LoginView: new HaveWant.Views.Login({ el: $(".content"), model: this.Models.User }),
				RegisterView: new HaveWant.Views.Register({ el: $(".content"), model: this.Models.User }),	
				ItemsPage: new HaveWant.Views.ItemsPage({ el: $(".content"), collection: this.Collections.Items })
			}

			this.Routers = { 
				appRouter: new HaveWant.AppRouter 
			}

	window.HaveWant.AppRouter = Backbone.Router.extend(
		routes:
			'/': 'home'
			'login': 'login'
			'register': 'register'
			'items': 'items'

		home: ->
			require(['home'], this.viewRender)

		register: (actions) ->
			require(['login'], this.viewRender)

		viewRender: (view) ->
			new view().render()
	)

	$(document).ready ->
		HaveWant.init()
		Backbone.history.start()
