const express = require("express");
const bodyParser = require("body-parser");
const FSUtilitiesSync = require("./FSUtilitiesSync");

const app = express();
const listeningPort = 4369;

app.use(bodyParser.urlencoded({ extended: true }));

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
  currentDBPath = __dirname + "\\userData.txt";
  if (FSUtilitiesSync.findDB(currentDBPath) === false) {
    res.send(currentDBPath);
  } else {
    let result = FSUtilitiesSync.verifyUser(
      userInput[0],
      userInput[1],
      currentDBPath
    );
    res.send(result);
  }
});

app.get("/registration", function (req, res) {
  res.sendFile(__dirname + "/registration.html");
});

app.post("/registration", function (req, res) {
  const body = req.body;
  currentDBPath = __dirname + "\\userData.txt";
  let result = null;
  const userInput = [
    req.body.username,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.phoneNumber,
  ];
  if (FSUtilitiesSync.findUser(userInput[0], currentDBPath) !== false) {
    res.send("Sorry, this user already exists.");
  } else {
    FSUtilitiesSync.addUser(
      userInput[0],
      userInput[1],
      userInput[2],
      userInput[3],
      userInput[4],
      userInput[5],
      currentDBPath
    );
    result = FSUtilitiesSync.verifyUser(
      userInput[0],
      userInput[1],
      currentDBPath
    );
  }
  res.send(result);
});
