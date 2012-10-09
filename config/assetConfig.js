// Setup groups for CSS / JS assets so assetmanager can handle them correctly

module.exports = function(assetHandler, envConf){
	var assetSettings = {
		'js': {
			'route': /\/static\/js\/[a-z0-9]+\/.*\.js/,
			'path': './public/js/',
			'dataType': 'javascript',
			'files': [
				'http://code.jquery.com/jquery-latest.js',
				// special case since the socket.io module serves its own js:
				envConf.uri + '/socket.io/socket.io.js',
				'jquery.client.js'
			],
			'debug': true,
			'postManipulate': {
				'^': [
					assetHandler.uglifyJsOptimize,
					function insertSocketIoPort(file, path, index, isLast, callback) {
						callback(file.replace(/.#socketIoPort#./, envConf.port));
					}
				]
			}
		},
		'css': {
			'route': /\/static\/css\/[a-z0-9]+\/.*\.css/,
			'path': './public/style/',
			'dataType': 'css',
			'files': [
				'reset.css',
				'client.css'
			],
			'debug': true,
			'postManipulate': {
				'^': [
					assetHandler.fixVendorPrefixes,
					assetHandler.fixGradients,
					assetHandler.replaceImageRefToBase64(__dirname + '/public'),
					assetHandler.yuiCssOptimize
				]
			}
		}
	};
	return assetSettings;
};