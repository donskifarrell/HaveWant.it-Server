(($) ->
  window.AppView = Backbone.View.extend(
    el: $("#itemsSection")
    template: _.template("<div class=\"row item\"><div class=\"ten columns\"><h4 class=\"subheader\">An item yo</h4>\t\t\t<a id=\"addNew\" href=\"#\" class=\"small button src-download\">Add New Item</a><hr></div></div>")
    events:
      "click #addNew": "showPrompt"

    showPrompt: ->
      $(@el).append @template()
  )
  appview = new AppView()
) jQuery