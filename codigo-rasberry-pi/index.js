const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Started on PORT 3000");
});

const serviceAccount = require("./smart-cow.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smart-band-fdf82.firebaseio.com"
});

app.post("/add", function(req, res) {
  const id = req.body.id;
  const value = req.body.value - 30;
  const ref = admin.database().ref("/datos/id");
  console.log("id = " + id + ", value is " + value);
  var obj = {
    value: value,
    date: Date.now()
  };
  ref.push(obj);
  res.end("yes");
});
