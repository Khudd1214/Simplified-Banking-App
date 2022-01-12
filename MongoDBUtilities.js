const mongoose = require("mongoose");
const UserModel = require("./userModel.js");

async function addUser(
  usernameInput,
  passwordInput,
  firstNameInput,
  lastNameInput,
  emailInput,
  phoneNumberInput
) {
  //connect to mongoose database
  mongoose.connect("mongodb://localhost:27017/bankDB", {
    useNewUrlParser: true,
  });
  //create entry
  let userEntry = new UserModel({
    username: usernameInput,
    password: passwordInput,
    firstName: firstNameInput,
    lastName: lastNameInput,
    email: emailInput,
    phoneNumber: phoneNumberInput,
  });
  //save entry to DB
  userEntry.save();
  // TODO: I have to find a way to asynchronously save the entry then close the connection
}

async function isValidUsername(usernameToQuery) {
  //connect to mongoose database
  mongoose.connect("mongodb://localhost:27017/bankDB", {
    useNewUrlParser: true,
  });
  try {
    let x = UserModel.findOne({ username: usernameToQuery }).then((data) => {
      if (data == null) {
        return true;
      } else {
        return false;
      }
    });
    return await x;
  } catch (err) {
    return err;
  }
}

module.exports = {
  addUser: addUser,
  isValidUsername: isValidUsername,
};
