// StaticPages
module.exports = function(server, controllers){
  var Items = controllers.items;
  var Users = controllers.users;
  var Utils = require('./Util')(Users);
  
  server.get('/users', Utils.ValidateUser, Items.getMessages);
  server.get('/:user/:item', Utils.ValidateUser, Items.getMessages);
  server.post('/:user/:item', Utils.ValidateUser, Items.postMessage);
};