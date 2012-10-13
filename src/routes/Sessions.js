// StaticPages
module.exports = function(server, controllers){
  var Users = controllers.users;
  var Utils = require('./Util')(Users);

  // LOGIN USERS
  server.get('/Login', function(req, res) {
    res.render('login/login', {
      title: 'Login',
      user: Users.addNew()
    });
  });

  server.post('/Login', function(req, res) {
    Users.Db.findOne({ email: req.body.user.email }, function(err, user) {
      if(err) next(err);

      if (user && user.authenticate(req.body.user.password)) {
        console.log('Session User: ' + user.id);
        req.session.user_id = user.id;
        res.redirect('/Users');
      } else {
        console.log('User not found');

        // TODO: Show error
        res.redirect('/Login');
      }
    });
  });

  server.del('/Login', Utils.ValidateUser, function(req, res) {
    if (req.session) {
      req.session.destroy(function() {});
    }
    res.redirect('/Login');
  });

  // REGISTERING USERS
  server.get('/Register', function(req, res) {
    res.render('login/register', {
      title: 'Register',
      user: Users.addNew()
    });
  });

  server.post('/Register', function(req, res) {
    var user = Users.addNew(req.body.user);
    user.save(function(err) {
      if (err) return next(err);

      switch (req.params.format) {
        case 'json':
          res.send(user.toObject());
          break;

        default:
          res.redirect('/Login');
      }
    });
  });

};