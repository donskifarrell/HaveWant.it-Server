// users.js

module.exports = function(mongoose) {
	var userModel = require('../models/user')(mongoose).model;

	return {
		new: function() {
			return new userModel();
		},

		Db: userModel
	};
};