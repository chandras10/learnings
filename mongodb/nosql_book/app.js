var db = require('mongoose'),
    Schema = db.Schema;

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
    hits: int,
    post: { type: Schema.Types.ObjectId, ref: "Post"}
};

var schemaTag = new Schema(entityTag),
    schemaCategory = new Schema(entityCategory),
    schemaComment = new Schema(entityComment),
    schemaPost = new Schema(entityPost),
    schemaPostRevision = new Schema(entityPostRevision);

var Tag = db.model(schemaTag),
    Category = db.model(schemaCategory),
    Comment = db.model(schemaComment),
    Post = db.model(schemaPost),
    PostRevision = db.model(schemaPostRevision);
