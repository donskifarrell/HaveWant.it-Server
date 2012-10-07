var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ItemProvider = function(host, port) {
  this.db= new Db('havewant-items', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


ItemProvider.prototype.getCollection= function(callback) {
  this.db.collection('items', function(error, item_collection) {
    if( error ) callback(error);
    else callback(null, item_collection);
  });
};

ItemProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, item_collection) {
      if( error ) callback(error)
      else {
        item_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};


ItemProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, item_collection) {
      if( error ) callback(error)
      else {
        item_collection.findOne({_id: item_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

ItemProvider.prototype.save = function(items, callback) {
    this.getCollection(function(error, item_collection) {
      if( error ) callback(error)
      else {
        if( typeof(items.length)=="undefined")
          items = [items];

        for( var i =0;i< items.length;i++ ) {
          article = items[i];
          article.created_at = new Date();
          if( article.comments === undefined ) article.comments = [];
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }

        item_collection.insert(items, function() {
          callback(null, items);
        });
      }
    });
};

exports.ItemProvider = ItemProvider;