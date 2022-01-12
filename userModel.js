const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
});
//create model
module.exports = mongoose.model("User", userSchema);
