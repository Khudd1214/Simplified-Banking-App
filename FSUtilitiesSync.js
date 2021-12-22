const fs = require("fs");

module.exports = {
  // findDB(pathToDB) will return a boolean value indicating whether the DB path given is valid (i.e. whether the file exists).
  findDB: (pathToDB) => {
    return fs.existsSync(pathToDB);
  },
  //searchDB(username, password, pathToDB) will search the DB file for user info.
  //  If user info exists, return user info as an array. Else, return false.
  searchDB: (usernameInput, passwordInput, pathToDB) => {
    const DB = String(fs.readFileSync(pathToDB));
    const DBArray = DB.split("\n");
    let result = false;
    for (let i = 0; i < DBArray.length; i++) {
      [username, password, ...transactions] = DBArray[i].split(",");
      let m = username;
      let j = password;
      if (username == usernameInput && password == passwordInput) {
        result = DBArray[i];
      }
    }
    return result;
  },
};
