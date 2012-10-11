module.exports = function(server, controllers){
	console.log('Setting up routes');
	Items = controllers.items;
	Users = controllers.users;

	function loadUser(req, res, next) {
		if (req.session.user_id) {
			Users.Db.findById(req.session.user_id, function(user) {
				if (user) {
					req.currentUser = user;
					next();
				} else {
					res.redirect('/sessions/new');
				}
			});
		} else {
			res.redirect('/sessions/new');
		}
	}

	// Sessions
	server.get('/sessions/new', function(req, res) {
		res.render('sessions/new.jade', { user: Users.new() });
	});

	server.post('/sessions', function(req, res) {
		Users.Db.find({ email: req.body.user.email }).first(function(user) {
			if (user && user.authenticate(req.body.user.password)) {
				req.session.user_id = user.id;
				res.redirect('/admin');
			} else {
				// TODO: Show error
				res.redirect('/sessions/new');
			}
		});
	});

	server.del('/sessions', loadUser, function(req, res) {
		// Remove the session
		if (req.session) {
			req.session.destroy(function() {});
		}
		res.redirect('/sessions/new');
	});

	// Home
	server.get('/', function(req, res){
		// TODO: Set proper session user_id for use with socket.io.
		if (!req.session.user_id) {
			req.session.user_id = (0 | Math.random()*1000000);

			console.log('UIDS: ' + req.session.user_id);
		} else {

			console.log('Already set: ' + req.session.user_id);
		}
		res.locals({
			'key': 'value'
		});
		res.render('index', { title: 'HaveWant.it' });
	});

	server.get('/admin', loadUser, Items.getMessages);

	server.get('/:user/', Items.getMessages);
	server.get('/:user/:item', Items.getMessages);
	server.post('/:user/:item', Items.postMessage);
};