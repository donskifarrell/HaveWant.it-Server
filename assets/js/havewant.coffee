(($) ->
  window.AppView = Backbone.View.extend(
    el: $("#itemsSection")
    template: this.JST['item']
    events:
      "click #addNew": "showPrompt"

    showPrompt: ->
      $(@el).append @template()
  )
  appview = new AppView()
) jQuery