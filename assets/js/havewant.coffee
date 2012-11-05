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
				map: new HaveWant.Models.Map
				gig: new HaveWant.Models.Gig
			}

			this.Collections = {
				gigs: new HaveWant.Collections.Gigs()
			}

			this.Views = {
				login: new HaveWant.Views.GigsView({ model: this.Models.map, collection: this.Collections.gigs }),
				register: new HaveWant.Views.NavBarView({ el: $("#search_gigs"), collection: this.Collections.gigs })
			}

			this.Routers = { appRouter: new HaveWant.AppRouter }

	window.HaveWant.AppRouter = Backbone.Router.extend(
		routes:
			additem: "addNewItem"
			useCamera: "useCamera"
			useGallery: "useGallery"
			"*actions": "showHomePage"

		addNewItem: ->
			addNewItem.render()

		useCamera: ->
			cameraImages.render()

		useGallery: ->
			galleryImages.render()

		showHomePage: (actions) ->
			homePage.render()
	)

	$(document).ready ->
		HaveWant.init()
		Backbone.history.start()
