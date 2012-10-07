// item.js

module.exports = function(mongoose) {
  var itemsCollection = 'items';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var itemsSchema = new Schema({
    user: String,
    date: Date
  });

  this.model = mongoose.model(itemsCollection, itemsSchema);
  return this;
};