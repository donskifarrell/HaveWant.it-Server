require.config
  paths:
    jQuery: "lib/jquery/jquery"
    underscore: "lib/underscore/underscore"
    backbone: "libs/backbone/backbone"
    templates: "../views"    

  shim:
    jQuery:
      exports: "$"

    underscore:
      exports: "_"

    backbone:
      deps: ["jQuery", "underscore"]
      exports: "Backbone"

require ["jQuery"], ($) ->
	window.HaveWant =
		Models: {}
		Collections: {}
		Views: {}
		Routers: {}

		init: -> 
			# Models
			map = new HaveWant.Models.Map
			gig = new HaveWant.Models.Gig

			# Collections
			gigs = new HaveWant.Collections.Gigs()

			# Views
			new HaveWant.Views.MapView({ model: map })
			new HaveWant.Views.GigsView({ model: map, collection: gigs })
			new HaveWant.Views.NavBarView({ el: $("#search_gigs"), collection: gigs })

	$(document).ready ->
		HaveWant.init()
