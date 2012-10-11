// StaticPages
module.exports = function(server){
  server.get('static/Projects', function(req, res){
    res.render('projects', {
      title: 'Home'
    });
  });

  server.get('static/About', function(req, res){
    res.render('about', {
      title: 'About'
    });
  });
};