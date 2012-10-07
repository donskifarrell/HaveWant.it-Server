// items.js

module.exports = function(mongoose) {
	var itemModel = require('../models/item')(mongoose).model;

	return {
		// This function is responsible for returning all entries for the Message model
		getMessages: function(req, res, next) {
			// This headers comply with CORS and allow us to server our response to any origin
			res.header("Access-Control-Allow-Origin", "*"); 
			res.header("Access-Control-Allow-Headers", "X-Requested-With");
			// .find() without any arguments, will return all results
			itemModel.find().execFind(function (arr,data) {
				res.send(data);
			});
		},

		postMessage: function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With");
			// Create a new item model, fill it up and save it to Mongodb
			var item = new itemModel(); 
			item.user = req.params.user;
			item.date = new Date();
			item.save(function () {
				res.send(req.body);
			});
		}
	};
};