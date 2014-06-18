var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var entityTag = {
    name: String,
    slug: String
};

var entityCategory = {
    name: String,
    slug: String,
    parent: { type: Schema.Types.ObjectId, ref: "Category" }
};

var entityComment = {
    author: String,
    text: String,
    creationTime: {type: Date, "default": Date.now},
    post: { type: Schema.Types.ObjectId, ref: "Post"}
};

var entityPost = {
    title: String,
    slug: String,
    author: String,
    creationTime: {type: Date, "default": Date.now},
    lastUpdateTime: {type: Date, "default": Date.now},
    text: String,
    category: { type: Schema.Types.ObjectId,
                ref: "Category"},
    tags: [{ type: Schema.Types.ObjectId,
             ref: "Tag" }]
};

var entityPostRevision = {
    updateTime: { type: Date, "default": Date.now },
    author: String,
    text: String,
    hits: Number,
    post: { type: Schema.Types.ObjectId, ref: "Post"}
};

var schemaTag = new Schema(entityTag),
    schemaCategory = new Schema(entityCategory),
    schemaComment = new Schema(entityComment),
    schemaPost = new Schema(entityPost),
    schemaPostRevision = new Schema(entityPostRevision);

var Tag = mongoose.model('Tag', schemaTag);
    Category = mongoose.model('Category', schemaCategory),
    Comment = mongoose.model('Comment', schemaComment),
    Post = mongoose.model('Post', schemaPost),
    PostRevision = mongoose.model('PostRevision', schemaPostRevision);

function connect(connectionString) {
   mongoose.connect(connectionString);

   var db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error'));
   db.once('open', function callback() {
       console.log('Mongoose connected at: ', connectionString);
       
       var tag = new Tag({name: 'test', slug: 'test'});
       tag.save(function(err) {
          if (err) return console.log('error: ', err.message);

          console.log('it saved!:', tag.name);
          getTag();
       });

       function getTag() {
          Tag.find({name: 'test'}, function(err, records) {
              if (err) return console.log('Error retrieving tag: ', err.message);
              
              console.log('We got the', records[0].name, '!');
          });
       }
   });
}

module.exports = connect;

connect('mongodb://localhost:27017/nosql_test');
