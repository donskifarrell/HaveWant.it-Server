// Helper Functions
module.exports = function(Users){

  return {
    ValidateUser: function(req, res, next) {
      console.log('Validating User');
      if (req.session.user_id) {
        Users.Db.findById(req.session.user_id, function(user) {
          if (user) {
            console.log('Found User: ' + user);
            req.currentUser = user;
            next();
          } else {
            console.log('Couldnt find user');
            res.redirect('/sessions/new');
          }
        });
      } else {
        console.log('No Session Id set');
        res.redirect('/sessions/new');
      }
    }
  };
};