const express = require("express");
const bodyParser = require("body-parser");
const FSUtilities = require("./FSUtilities");

const app = express();
const listeningPort = 4369;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(listeningPort, function (err) {
  if (err) {
    throw err;
  }
  console.log("Server started on " + listeningPort);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/homepage.html");
});

app.post("/", function (req, res) {
  const body = req.body;
  const userInput = [req.body.username, req.body.password];
  const profileDBPath = __dirname + "\\userData.txt";
  const transactionDBPath = __dirname + "\\userTransactions.txt";
  if (
    FSUtilities.isVerified(userInput[0], userInput[1], profileDBPath) !== false
  ) {
    let profileData = FSUtilities.getProfileData(userInput[0], profileDBPath);
    let transactionData = FSUtilities.getTransactionData(
      userInput[0],
      transactionDBPath
    );
    res.render("accountDisplay", {
      results: profileData,
      trans: transactionData,
    });
  }
});

app.get("/registration", function (req, res) {
  res.sendFile(__dirname + "/registration.html");
});

app.post("/registration", function (req, res) {
  const profileDBPath = __dirname + "\\userData.txt";
  const transactionDBPath = __dirname + "\\userTransactions.txt";
  const userInput = [
    req.body.username,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.phoneNumber,
  ];
  if (FSUtilities.isValidUsername(userInput[0], profileDBPath) !== false) {
    res.send("Sorry, this user already exists.");
  } else {
    FSUtilities.addUser(
      userInput[0],
      userInput[1],
      userInput[2],
      userInput[3],
      userInput[4],
      userInput[5],
      profileDBPath
    );
    let profileData = FSUtilities.getProfileData(userInput[0], profileDBPath);
    let transactionData = FSUtilities.getTransactionData(
      userInput[0],
      transactionDBPath
    );
    res.render("accountDisplay", {
      results: profileData,
      trans: transactionData,
    });
  }
});
