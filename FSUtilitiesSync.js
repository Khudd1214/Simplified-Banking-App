<<<<<<< HEAD
const fs = require("fs");

module.exports = {
  // findDB(pathToDB) will return a boolean value indicating whether the DB path given is valid (i.e. whether the file exists).
  findDB: (pathToDB) => {
    return fs.existsSync(pathToDB);
  },
  //searchDB(username, password, pathToDB) will search the DB file for user info.
  //  If user info exists, return user info as an array. Else, return false.
  verifyUser: (usernameInput, passwordInput, pathToDB) => {
    const DB = String(fs.readFileSync(pathToDB));
    const DBArray = DB.split("\n");
    let result = false;
    for (let i = 0; i < DBArray.length; i++) {
      [username, password, firstName, lastName, email, phoneNumber] =
        DBArray[i].split(",");
      if (username == usernameInput && password == passwordInput) {
        result = DBArray[i];
      }
    }
    return result;
  },
  findUser: (usernameInput, pathToDB) => {
    const DB = String(fs.readFileSync(pathToDB));
    const DBArray = DB.split("\n");
    let result = false;
    for (let i = 0; i < DBArray.length; i++) {
      [username, password, firstName, lastName, email, phoneNumber] =
        DBArray[i].split(",");
      if (username == usernameInput) {
        result = true;
      }
    }
    return result;
  },
  addUser: (
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
};
=======
const fs = require("fs");

module.exports = {
  // findDB(pathToDB) will return a boolean value indicating whether the DB path given is valid (i.e. whether the file exists).
  findDB: (pathToDB) => {
    return fs.existsSync(pathToDB);
  },
  //searchDB(username, password, pathToDB) will search the DB file for user info.
  //  If user info exists, return user info as an array. Else, return false.
  verifyUser: (usernameInput, passwordInput, pathToDB) => {
    const DB = String(fs.readFileSync(pathToDB));
    const DBArray = DB.split("\n");
    let result = false;
    for (let i = 0; i < DBArray.length; i++) {
      [username, password, firstName, lastName, email, phoneNumber] =
        DBArray[i].split(",");
      if (username == usernameInput && password == passwordInput) {
        result = DBArray[i];
      }
    }
    return result;
  },
  findUser: (usernameInput, pathToDB) => {
    const DB = String(fs.readFileSync(pathToDB));
    const DBArray = DB.split("\n");
    let result = false;
    for (let i = 0; i < DBArray.length; i++) {
      [username, password, firstName, lastName, email, phoneNumber] =
        DBArray[i].split(",");
      if (username == usernameInput) {
        result = true;
      }
    }
    return result;
  },
  addUser: (
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
};
>>>>>>> 8f0ef746ff7337f10c331ef6917dd61e6b4e267f
