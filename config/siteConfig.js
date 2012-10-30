
module.exports = function(server, express, sessionStore, envConf){
  var config = this;
  
  // Setup Asset Management
  var connectAssets = require('connect-assets')();
  var assetManager = require('connect-assetmanager');
  var assetHandler = require('connect-assetmanager-handlers');

  // Middleware Config
  server.configure(function() {
    server.set('views', __dirname + './../src/views');
    server.set('view engine', 'jade');
    server.use(express.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({
      'store': sessionStore,
      'cookie': { maxAge: 120000 },
      'secret': envConf.sessionSecret
    }));
    server.use(connectAssets);
    server.use(express.static(__dirname + './../public', { maxAge: 86400000 }));
    server.use(server.router);
    server.use(express.logger({
      format: ':response-time ms - :date - :req[x-real-ip] - :method :url :user-agent / :referrer'
    }));
    server.use(function(req, res, next){
      //res.locals.assetsCacheHashes = assetsMiddleware.cacheHashes;
      next();
    });
    server.use(function(req, res, next){
      res.locals.session = req.session;
      next();
    });

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
