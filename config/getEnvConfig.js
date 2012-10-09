// TODO: May remove this, as not sure i'm going to use no.de!
// or not, can maybe look for either Prod or Dev configs..
var envConfig;
try {
	// Usually we check for envConfig.js in current directory.
	envConfig = require('./envConfig');
} catch(e) {
	try {
		// Looks for envConfig in home dir, used for no.de
		envConfig = require(process.env.HOME + '/envConfig');
	} catch(exp) {
		throw new Error('Could not load site config.');
	}
}

module.exports = envConfig;