// Importing required module(s)
const mongoose = require("mongoose");
// Creating the user module with the required field
module.exports = mongoose.model("User", {
  email: String,
  name: String,
  password: String
});
