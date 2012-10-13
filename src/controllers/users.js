// users.js

module.exports = function(mongoose) {
	var userModel = require('../models/user')(mongoose).model;

	return {
		addNew: function(params) {
			return new userModel(params);
		},

		Db: userModel
	};
};