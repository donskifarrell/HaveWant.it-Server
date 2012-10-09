// Server entry point

process.addListener('uncaughtException', function (err, stack) {
	console.log('Caught exception: ' + err + '\n' + err.stack);

	// TODO: ErrBit instead?
	// if (airbrake) { airbrake.notify(err); }
});

// Get Environment Config Loader
var envConf = require('./config/getEnvConfig');

// Setup Express and Middleware
var http = require('http');
var connect = require('connect');
var express = require('express');
var assetManager = require('connect-assetmanager');
var assetHandler = require('connect-assetmanager-handlers');

// Setup Redis Session store
var RedisStore = require('connect-redis')(express);
var sessionStore = new RedisStore();

// Initialise Server
var server = module.exports = express();
server.mongoose = require('mongoose');

// Setup Socket.io server
var httpServer = http.createServer(server);
var socketIo = new require('./lib/socket-io-server.js')(httpServer, sessionStore);
//var authentication = new require('./lib/authentication.js')(server, envConf);



var config = require('./config/config.js')(server, express);

var controllers = {};
controllers.items = require('./src/controllers/items')(server.mongoose);

var routes = require('./src/routes/routes')(server, controllers);



// Start listening for requests!
server.listen(envConf.port, null);
console.log('Listening on port 3000');