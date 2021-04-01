// Importing required module(s)
const mongoose = require("mongoose");
// Assigning the schema
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
// Creating the upvotes module with the required field
module.exports = mongoose.model("upVotes", {
  id: ObjectId,
  postid: { type: String },
  nameOfUser: { type: String }
});
