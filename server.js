const express = require("express");
const bodyParser = require("body-parser");
const FSUtilities = require("./FSUtilities");
const mongo = require("./MongoDBUtilities.js");
const { response } = require("express");
const MongoDBUtilities = require("./MongoDBUtilities.js");

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

app.post("/registration", async function (req, res) {
  let result = mongo.isValidUsername(req.body.username).then((data) => {
    return data;
  });
  if ((await result) == false) {
    res.send("Sorry, that username is unavailable");
  } else {
    mongo
      .addUser(
        req.body.username,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phoneNumber
      )
      .then((data) => {
        let profileData = mongo.getProfileData(req.body.username);
        profileData
          .then((data) => {
            res.render("accountDisplay", {
              results: data,
              trans: [9.99],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
});
