require("dotenv").config();
const bodyParser = require("body-parser");
const connectDb = require("../mongoDB");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  let a = await connectDb();
  a.then((b) => console.log(b, "here now"));
  res.send("Hello World!");
});

module.exports.app = app;
if (!module.parent) {
  app.listen(port);
}
