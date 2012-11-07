require.config
  paths:
    jQuery: "lib/jquery/jquery"
    underscore: "lib/backbone/underscore"
    backbone: "lib/backbone/backbone"
    text: 'lib/require/text'
    templates: "../views"    

  shim:
    jQuery:
      exports: "$"

    underscore:
      exports: "_"

    backbone:
      deps: ["jQuery", "underscore"]
      exports: "Backbone"

require ["jQuery", "backbone", 
		"models/User", "models/Item", "collections/Items",
		"views/Login/Login", "views/Login/Register", "views/Items/ItemsPage"], 
($, Backbone, User, Item, Items, Login, Register, ItemsPage) ->
	window.HaveWant =
		Models: {}
		Collections: {}
		Views: {}
		Routers: {}

		init: -> 
			this.Models = {
				User: new User
				#Item: new Item
			}

			this.Collections = {
				#Items: new Items
			}

			this.Views = {
				LoginView: new Login({ el: $(".content"), model: this.Models.User }),
				#RegisterView: new Register({ el: $(".content"), model: this.Models.User }),	
				#ItemsPage: new ItemsPage({ el: $(".content"), collection: this.Collections.Items })
			}

			this.Routers = { 
				appRouter: new HaveWant.Routers.AppRouter 
			}

	class HaveWant.Routers.AppRouter extends Backbone.Router
		routes:
			'/': 'home'
			'logintest': 'logintest'
			'register': 'register'
			'items': 'items'
			'*actions': 'logintest'

		home: ->
			require(['home'], this.viewRender)

		logintest: (actions) ->
			HaveWant.Views.LoginView.render()

		register: (actions) ->
			require(['login'], this.viewRender)

		viewRender: (view) ->
			new view().render()

	$(document).ready ->
		HaveWant.init()
		Backbone.history.start()
