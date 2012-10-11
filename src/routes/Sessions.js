// StaticPages
module.exports = function(server, controllers){
  var Users = controllers.users;
  var Utils = require('./Util')(Users);

  server.get('/sessions/new', function(req, res) {
    res.render('sessions/new', {
      title: 'Login',
      user: Users.New()
    });
  });

  server.post('/sessions', function(req, res) {
    Users.Db.find({ email: req.body.user.email }).first(function(user) {
      if (user && user.authenticate(req.body.user.password)) {
        req.session.user_id = user.id;
        res.redirect('/users');
      } else {
        // TODO: Show error
        res.redirect('/sessions/new');
      }
    });
  });

  server.del('/sessions', Utils.ValidateUser, function(req, res) {
    // Remove the session
    if (req.session) {
      req.session.destroy(function() {});
    }
    res.redirect('/sessions/new');
  });
};