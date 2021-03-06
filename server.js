const express = require("express");
const bodyParser = require("body-parser");
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

app.post("/", async function (req, res) {
  try {
    let result = mongo
      .isVerified(req.body.username, req.body.password)
      .then((data) => {
        return data;
      });
    if ((await result) == false) {
      res.send(
        "Sorry, that information does not match what we have on file..."
      );
    } else {
      let profileData = mongo.getProfileData(req.body.username);
      profileData
        .then((data) => {
          res.render("accountDisplay", {
            results: data,
            trans: [9.99, -5.99, 3.25, 7.99, -4.99],
          });
        })
        .catch((err) => {
          return err;
        });
    }
  } catch (err) {
    return err;
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
              trans: [9.99, -5.99, 3.25, 7.99, -4.99],
            });
          })
          .catch((err) => {
            return err;
          });
      });
  }
});
