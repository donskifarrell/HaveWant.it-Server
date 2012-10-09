// Server entry point

process.addListener('uncaughtException', function (err, stack) {
	console.log('Caught exception: ' + err + '\n' + err.stack);

	// TODO: ErrBit instead?
	// if (airbrake) { airbrake.notify(err); }
});

// Get Environment Config Loader
var envConf = require('./config/getEnvConfig');

// Setup Express and Middleware
var connect = require('connect');
var express = require('express');

// Setup Redis Session store
var RedisStore = require('connect-redis')(express);
var sessionStore = new RedisStore();

// Initialise Server
var server = module.exports = express();
server.mongoose = require('mongoose');

// Setup Site Config
var siteConfig = require('./config/siteConfig.js')(
						server,
						express,
						sessionStore,
						envConf);

// Setup view controllers along with their models for MongoDB
var controllers = {};
controllers.items = require('./src/controllers/items')(server.mongoose);

// Setup site routing
var routes = require('./src/routes/routes')(server, controllers);

// Start listening for requests!
server.listen(envConf.port, null);
console.log('Running in ' + (process.env.NODE_ENV || 'development') + ' mode @ ' + envConf.uri);
console.log('Listening on port ' + envConf.port);