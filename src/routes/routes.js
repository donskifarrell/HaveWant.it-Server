module.exports = function(server, controllers){
	console.log('Setting up routes');
	itemProvider = controllers.items;

	server.get('/', function(req, res){
		// TODO: Set proper session uid for use with socket.io.
/*		if (!req.session.uid) {
			req.session.uid = (0 | Math.random()*1000000);
		}*/
		res.locals({
			'key': 'value'
		});
		res.render('index.jade', { title: 'HaveWant.it' });
	});

	server.get('/:user/:item', itemProvider.getMessages);
	server.post('/:user/:item', itemProvider.postMessage);
};