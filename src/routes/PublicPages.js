// StaticPages
module.exports = function(server, controllers){

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

};