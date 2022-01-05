const fs = require("fs");

function findDB(pathToDB) {
  return fs.existsSync(pathToDB);
}

module.exports = {
  // findDB(pathToDB) will return a boolean value indicating whether the DB path given is valid (i.e. whether the file exists).
  findDB: findDB,
  // isValidUsername() will return a boolean value indicating whether a username is 'taken'.
  isValidUsername: (usernameToQuery, pathToDB) => {
    const userEntries = String(fs.readFileSync(pathToDB)).split("\n");
    let result = false;
    for (let i = 0; i < userEntries.length; i++) {
      [username, password, firstName, lastName, email, phoneNumber] =
        userEntries[i].split(",");
      if (username == usernameToQuery) {
        result = true;
        break;
      }
    }
    return result;
  },
  //isVerified() will return a boolean value indicating if a username and password combo exist in the provided DB.
  isVerified: (usernameInput, passwordInput, pathToDB) => {
    if (findDB(pathToDB) === false) {
      throw "Server error. Database not found.";
    }
    const customerEntries = String(fs.readFileSync(pathToDB)).split("\n");
    let isValid = false;
    for (let i = 0; i < customerEntries.length; i++) {
      [username, password, firstName, lastName, email, phoneNumber] =
        customerEntries[i].split(",");
      if (usernameInput == username && passwordInput == password) {
        isValid = true;
        break;
      }
    }
    return isValid;
  },
  addUser: (
    //create entry in userData.txt
    usernameInput,
    passwordInput,
    firstName,
    lastName,
    email,
    phoneNumber,
    pathToDB
  ) => {
    const data =
      usernameInput +
      "," +
      passwordInput +
      "," +
      firstName +
      "," +
      lastName +
      "," +
      email +
      "," +
      phoneNumber +
      "\n";
    fs.appendFileSync(pathToDB, data);
  },
  //return an array with chosen customer's profile data (username, password, firstName, lastName, email, phone number)
  getProfileData: (username, pathToDB) => {
    const profileEntries = String(fs.readFileSync(pathToDB)).split("\n");
    let result = false;
    for (let i = 0; i < profileEntries.length; i++) {
      let currentEntry = profileEntries[i].split(",");
      if (currentEntry[0] == username) {
        result = currentEntry;
        break;
      }
    }
    return result;
  },
  //return an array with chosen customer's transaction data
  getTransactionData: (username, pathToDB) => {
    const userEntries = String(fs.readFileSync(pathToDB)).split("\n");
    let result = false;
    for (let i = 0; i < userEntries.length; i++) {
      let currentEntry = userEntries[i].split(":");
      if (username == currentEntry[0]) {
        result = currentEntry[1].split(",");
        break;
      }
    }
    return result;
  },
};
