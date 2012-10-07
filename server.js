// Server entry point

var express = require('express');
var server = module.exports = express();
server.mongoose = require('mongoose');

var config = require('./config/config.js')(server, express);

var controllers = {};
controllers.items = require('./src/controllers/items')(server.mongoose);

var routes = require('./routes/routes')(server, controllers);

server.listen(3000);
console.log('Listening on port 3000');