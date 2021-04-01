// Importing required module(s)
const mongoose = require("mongoose");
// Assigning the schema
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
// Creating the comments module with the required field
module.exports = mongoose.model("comments", {
  id: ObjectId,
  postid: { type: String },
  name: { type: String },
  comment: { type: String },
  date: { type: Date, default: Date.now }
});
