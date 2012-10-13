// StaticPages
module.exports = function(server, controllers){
  var Users = controllers.users;
  var Utils = require('./Util')(Users);

  server.get('/Login', function(req, res) {
    res.render('login/login', {
      title: 'Login',
      user: Users.addNew()
    });
  });

  server.post('/Login', function(req, res) {
    console.log('Logging in user');

    function userSaveFailed() {
      console.log('User not registered - ' + err);
      res.render('users/new.jade', { user: user });
    }

    Users.Db.findOne({ email: req.body.user.email }, function(err, user) {
      console.log('Logging in user: ' + user);

      if(err) userSaveFailed();

      if (user && user.authenticate(req.body.user.password)) {
        console.log('Found User');
        req.session.user_id = user.id;
        res.redirect('/users', {
          title: 'Users'
        });
      } else {
        console.log('User not found');
        // TODO: Show error
        res.redirect('/login/login', {
          title: 'Login',
          user: Users.addNew()
        });
      }
    });
  });

  server.del('/Login', Utils.ValidateUser, function(req, res) {
    // Remove the session
    if (req.session) {
      req.session.destroy(function() {});
    }
    res.redirect('/login/login', {
      title: 'Login',
      user: Users.addNew()
    });
  });

  server.get('/Register', function(req, res) {
    res.render('login/register', {
      title: 'Register',
      user: Users.addNew()
    });
  });

  server.post('/Register', function(req, res) {
    console.log('Registering User');
    var user = Users.addNew(req.body.user);

    function userSaveFailed() {
      console.log('User not registered - ');
      res.render('/Register', { user: user });
    }

    user.save(function(err) {
      console.log('Saved User?');
      if (err) return userSaveFailed(err);

      switch (req.params.format) {
        case 'json':
          res.send(user.toObject());
          break;

        default:
          console.log('Redirect');
          req.session.user_id = user.id;
          res.redirect('/Login');
      }
    });
  });

};