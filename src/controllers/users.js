// users.js

module.exports = function(mongoose) {
	var userModel = require('../models/user')(mongoose).model;

	return {
		New: function() {
			//return new userModel();
		},

		//Db: userModel
	};
};