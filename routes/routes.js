module.exports = function(server, model){
    itemProvider = model.items;

    // This function is responsible for returning all entries for the Message model
    function getMessages(req, res, next) {
      // Resitify currently has a bug which doesn't allow you to set default headers
      // This headers comply with CORS and allow us to server our response to any origin
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // .find() without any arguments, will return all results
      // the `-1` in .sort() means descending order
      itemProvider.find().sort('-date').execFind(function (arr,data) {
        res.send(data);
      });
    }

    function postMessage(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // Create a new item model, fill it up and save it to Mongodb
      var item = new mongoose.model('item')(); 
      item.user = req.params.user;
      item.date = new Date() 
      item.save(function () {
        res.send(req.body);
      });
    }

    // Set up our routes and start the server
    server.get('/item', getMessages);
    server.post('/item', postMessage);
}