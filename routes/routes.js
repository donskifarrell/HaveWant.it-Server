module.exports = function(server, controllers){
  console.log('Setting up routes');
  itemProvider = controllers.items;

  server.get('/', function(req, res){
    res.render('index.jade', { title: 'HaveWant.it' });
  });

  server.get('/:user/:item', itemProvider.getMessages);
  server.post('/:user/:item', itemProvider.postMessage);
};