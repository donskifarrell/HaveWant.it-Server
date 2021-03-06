// user.js

module.exports = function(mongoose) {
	var crypto = require('crypto');
	var usersCollection = 'users';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	User = new Schema({
		'email': {
			type: String,
			validate: [validatePresenceOf, 'an email is required'],
			index: { unique: true }
		},
		'hashed_password': String,
		'salt': String
	});

	User.virtual('id')
		.get(function() {
			return this._id.toHexString();
		});

	User.virtual('password')
		.set(function(password) {
			this._password = password;
			this.salt = this.makeSalt();
			this.hashed_password = this.encryptPassword(password);
		})
		.get(function() { return this._password; });

	User.method('authenticate', function(plainText) {
		console.log('Authenticating user: ' + plainText);
		return this.encryptPassword(plainText) === this.hashed_password;
	});

	User.method('makeSalt', function() {
		return Math.round((new Date().valueOf() * Math.random())) + '';
	});

	User.method('encryptPassword', function(password) {
		return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	});

	function validatePresenceOf(value) {
		return value && value.length;
	}

	User.pre('save', function(next) {
		console.log('preSave');
		if (!validatePresenceOf(this.password)) {
			console.log('Invalid pass');
			next(new Error('Invalid password'));
		} else {
			next();
		}
	});

	this.model = mongoose.model(usersCollection, User);
	return this;
};