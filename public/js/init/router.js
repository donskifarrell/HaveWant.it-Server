define([
  'backbone'
],

function(
  Backbone
){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'showHomePage'
    },

    showHomePage: function(actions){
      homePage.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
