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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/homepage.html");
});

app.post("/", function (req, res) {
  const body = req.body;
  const userInput = [req.body.username, req.body.password];
  currentDBPath = __dirname + "\\userData.txt";
  if (FSUtilitiesSync.findDB(currentDBPath) === false) {
    res.send(currentDBPath);
  } else {
    let result = FSUtilitiesSync.searchDB(
      userInput[0],
      userInput[1],
      currentDBPath
    );
    res.send(result);
  }
});
