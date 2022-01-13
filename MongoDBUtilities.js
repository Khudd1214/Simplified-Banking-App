const mongoose = require("mongoose");
const UserModel = require("./userModel.js");

async function isVerified(usernameToQuery, passwordToQuery) {
  mongoose.connect("mongodb://localhost:27017/bankDB");
  try {
    let isValid = UserModel.findOne({
      username: usernameToQuery,
      password: passwordToQuery,
    }).then((data) => {
      if (data == null) {
        return false;
      } else {
        return true;
      }
    });
    return await isValid;
  } catch (err) {
    return err;
  }
}

async function addUser(
  usernameInput,
  passwordInput,
  firstNameInput,
  lastNameInput,
  emailInput,
  phoneNumberInput
) {
  //connect to mongoose database
  mongoose.connect("mongodb://localhost:27017/bankDB");
  //create entry
  try {
    let userEntry = new UserModel({
      username: usernameInput,
      password: passwordInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      phoneNumber: phoneNumberInput,
    });
    //save entry to DB
    const promise = await userEntry.save().then((data) => {
      return true;
    });
    return await promise;
  } catch (err) {
    return err;
  }
}

async function isValidUsername(usernameToQuery) {
  //connect to mongoose database
  mongoose.connect("mongodb://localhost:27017/bankDB");
  try {
    let isValid = UserModel.findOne({ username: usernameToQuery }).then(
      (data) => {
        if (data == null) {
          return true;
        } else {
          return false;
        }
      }
    );
    return await isValid;
  } catch (err) {
    return err;
  }
}

async function getProfileData(usernameToQuery) {
  mongoose.connect("mongodb://localhost:27017/bankDB");
  let profileData = UserModel.findOne({ username: usernameToQuery })
    .clone()
    .then((data) => {
      return [
        data._doc.firstName,
        data._doc.lastName,
        data._doc.email,
        data._doc.phoneNumber,
      ];
    });
  return await profileData;
}

// async function printResults() {
//   console.log(await isVerified("alanUser5000", "alanPassword"));
// }
// printResults();
module.exports = {
  addUser: addUser,
  isValidUsername: isValidUsername,
  getProfileData: getProfileData,
  isVerified: isVerified,
};
