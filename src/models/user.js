// user.js

module.exports = function(mongoose) {
  var usersCollection = 'items';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var usersSchema = new Schema({
    user: String,
    date: Date
  });

  this.model = mongoose.model(usersCollection, usersSchema);
  return this;
};