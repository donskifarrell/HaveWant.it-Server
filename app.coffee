# Server entry point

process.addListener(
	'uncaughtException', 
	(err, stack) ->	
		console.log('Caught exception: ' + err + '\n' + err.stack);
		# TODO: ErrBit instead?
		# if (airbrake) { airbrake.notify(err); }
	)

# For all coffee files
require("coffee-script");

# Get Environment Config Loader
envConf = require('./config/envConfig');

# Setup Express and Middleware
connect = require('connect');
express = require('express');

# Initialise Server
server = module.exports = express();
server.mongoose = require('mongoose');

# Setup SessionStore
mongoStore = require('session-mongoose');
sessionStore = new mongoStore({
		url: 'mongodb://localhost:27017/havewant',
		interval: 120000
	});

# Setup Site Config
siteConfig = require('./config/siteConfig')(server, express, sessionStore, envConf);

# Setup view controllers along with their models for MongoDB
controllers = {};
controllers.items = require('./src/controllers/items')(server.mongoose);
controllers.users = require('./src/controllers/users')(server.mongoose);

util = require('./src/routes/Util')(controllers.users);

# Internal Page Handlers
sessions = require('./src/routes/Sessions')(server, controllers);
static_pages = require('./src/routes/StaticPages')(server);
user_pages = require('./src/routes/UserPages')(server, controllers);
public_pages = require('./src/routes/PublicPages')(server, controllers);

# Start listening for requests!
server.listen(envConf.port, null);
console.log('Running in ' + (process.env.NODE_ENV || 'development') + ' mode @ ' + envConf.uri);
console.log('Listening on port ' + envConf.port);
