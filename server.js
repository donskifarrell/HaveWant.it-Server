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

// Initialise Server
var server = module.exports = express();
server.mongoose = require('mongoose');

// Setup SessionStore
var mongoStore = require('session-mongoose');
var sessionStore = new mongoStore({
		url: 'mongodb://localhost:27017/havewant',
		interval: 120000
	});

// Setup Site Config
var siteConfig = require('./config/siteConfig.js')(
						server,
						express,
						sessionStore,
						envConf);

// Setup view controllers along with their models for MongoDB
var controllers = {};
controllers.items = require('./src/controllers/items')(server.mongoose);
controllers.users = require('./src/controllers/users')(server.mongoose);

var util = require('./src/routes/Util')(controllers.users);

// Internal Page Handlers
var sessions = require('./src/routes/Sessions')(server, controllers);
var static_pages = require('./src/routes/StaticPages')(server);
var user_pages = require('./src/routes/UserPages')(server, controllers);
var public_pages = require('./src/routes/PublicPages')(server, controllers);

// Start listening for requests!
server.listen(envConf.port, null);
console.log('Running in ' + (process.env.NODE_ENV || 'development') + ' mode @ ' + envConf.uri);
console.log('Listening on port ' + envConf.port);