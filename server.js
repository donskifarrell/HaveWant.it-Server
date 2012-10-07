// Main server file

var express = require('express');
var server = module.exports = express();

server.mongoose = require('mongoose');
var models = {};
models.items = require('./src/models/item')(server.mongoose).model;
var routes = require('./routes/routes')(server, models);

// Pull config to separate file
server.configure(function(){
  server.use(express.logger());
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(server.router);
  server.use(express.static(__dirname + '/public'));
});

server.configure('development', function(){
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  server.mongoose.connect('mongodb://localhost:27017/havewant');
});

server.configure('production', function(){
  server.use(express.errorHandler());    
  server.mongoose.connect('mongodb://junk/');
});


server.listen(3000);
console.log('Listening on port 3000');