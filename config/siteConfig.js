
module.exports = function(server, express, sessionStore, envConf){
  var config = this;
  
  // Setup Asset Management
  var assetManager = require('connect-assetmanager');
  var assetHandler = require('connect-assetmanager-handlers');

  // Setup Socket.io server
  var httpServer = require('http').createServer(server);
  var socketIo = new require('../lib/socket-io-server.js')(httpServer, sessionStore);

  // Setup EveryAuth
  var authentication = new require('../lib/authentication.js')(envConf);

  // Generic config
  server.configure(function(){
    server.set('views', __dirname + './../src/views');
    server.set('view engine', 'jade');
    server.use(express.methodOverride());
  });

  // Asset Management Config
  //var assetConfig = require('./assetConfig')(assetHandler, envConf);
  // TODO: Add auto reload for CSS/JS/templates when in development
  /*
    server.configure('development', function(){
      assetConfig.js.files.push('jquery.frontend-development.js');
      assetConfig.css.files.push('frontend-development.css');
      [['js', 'updatedContent'], ['css', 'updatedCss']].forEach(function(group) {
        assetConfig[group[0]].postManipulate['^'].push(function triggerUpdate(file, path, index, isLast, callback) {
          callback(file);
          // Need to look through dummy helpers code to see what this does!
          dummyHelpers[group[1]]();
        });
      });
    });
  */
  //var assetsMiddleware = assetManager(assetConfig);

  // Middleware Config
  server.configure(function() {
    server.use(express.bodyParser());
    server.use(express.cookieParser({
      'secret': envConf.sessionSecret
    }));
    // server.use(assetsMiddleware);
    server.use(express.session({
      'store': sessionStore
    }));
    server.use(authentication.middleware.auth());
    server.use(authentication.middleware.normalizeUserData());
    server.use(express['static'](__dirname + './../public', { maxAge: 86400000 }));
    server.use(server.router);
    server.use(express.logger({
      format: ':response-time ms - :date - :req[x-real-ip] - :method :url :user-agent / :referrer'
    }));

    // Maybe should go in routes as it redirects.
    server.use(function(err, req, res, next){
      console.log(err);
      if (err instanceof Error) {
        res.render('errors/404.jade');
      } else {
        res.render('errors/500.jade');
      }
    });
  });

  // TODO: Template helpers
/*  server.dynamicHelpers({
    'assetsCacheHashes': function(req, res) {
      return assetsMiddleware.cacheHashes;
    },
    'session': function(req, res) {
      return req.session;
    }
  });*/

  // Error Logging Config
  server.configure('development', function(){
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    server.all('/robots.txt', function(req,res) {
      res.send('User-agent: *\nDisallow: /', {'Content-Type': 'text/plain'});
    });
    // Should be coming from config
    server.mongoose.connect('mongodb://localhost:27017/havewant');
  });

  server.configure('production', function(){
    server.use(express.errorHandler());
    server.all('/robots.txt', function(req,res) {
      res.send('User-agent: *', {'Content-Type': 'text/plain'});
    });
    server.mongoose.connect('mongodb://junk/');
  });

  return config;
};
