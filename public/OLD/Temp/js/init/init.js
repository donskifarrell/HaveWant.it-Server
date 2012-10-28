require.config({
  paths: {
    'jQuery': '../lib/jquery/jquery-min',
    'underscore': '../lib/underscore/underscore-min',
    'backbone': '../lib/backbone/backbone-min',
    'bootstrap': '../lib/bootstrap/bootstrap.min'
  },
  shim: {
          'jQuery': {
            exports: "$"
          },
          'underscore': {
            exports: "_"
          },
          'backbone': {
              deps: ['jQuery','underscore'],
              exports: 'Backbone'
          },
          'bootstrap': {
              exports: 'bootstrap'
          }
        }
});

require([
  'jQuery',
  'app'
], function($, bootstrap, App){
  $(document).ready(function() {
    //App.initialize();
  });
});
