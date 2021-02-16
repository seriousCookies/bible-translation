require("dotenv").config();
const bodyParser = require("body-parser");
const searchAPI = require("./searchRoute");
const bookAPI = require("./bookListRoute");
require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/api/search", searchAPI);
app.use("/api/booklist", bookAPI);
app.get("/", async (req, res) => {});

module.exports.app = app;
if (!module.parent) {
  app.listen(port);
}
