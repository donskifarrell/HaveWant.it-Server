module.exports = function(server, controllers){
  console.log('Setting up routes');
  itemProvider = controllers.items;

  server.get('/item', itemProvider.getMessages);
  server.post('/item', itemProvider.postMessage);
};