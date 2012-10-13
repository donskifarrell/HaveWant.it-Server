// Helper Functions
module.exports = function(Users){

  return {
    ValidateUser: function(req, res, next) {
      if (req.session.user_id) {
        Users.Db.findOne({ _id: "'" + req.session.user_id + "'"}, function(user) {
          if (user) {
            req.currentUser = user;
            next();
          } else {
            res.redirect('/Login');
          }
        });
      } else {
        console.log('No Session Id set');
        res.redirect('/Login');
      }
    }
  };
};