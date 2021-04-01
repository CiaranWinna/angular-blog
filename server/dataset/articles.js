// Importing required module(s)
var mongoose = require("mongoose");
// Assigning the schema
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
// Creating the articles module with the required field
module.exports = mongoose.model("articles", {
  id: ObjectId,
  title: { type: String },
  title_sub: { type: String },
  content: { type: String },
  articleby: { type: String },
  articleid: { type: String },
  date: { type: Date, default: Date.now }
});
