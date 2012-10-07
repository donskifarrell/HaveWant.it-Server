
module.exports = function(server, express){
  var config = this;

  //generic config
  server.configure(function(){
    server.use(express.logger());
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(server.router);
    server.use(express.static(__dirname + '/public'));
  });

  //env specific config
  server.configure('development', function(){
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    server.mongoose.connect('mongodb://localhost:27017/havewant');
  });

  server.configure('production', function(){
    server.use(express.errorHandler());    
    server.mongoose.connect('mongodb://junk/');
  });

  return config;
};
