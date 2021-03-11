require("dotenv").config();
const module = require("path");
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const bodyParser = require("body-parser");
const searchAPI = require("./searchRoute");
const bookAPI = require("./bookListRoute");
const cors = require("cors");

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/search", searchAPI);
app.use("/api/booklist", bookAPI);

module.exports.app = app;
if (!module.parent) {
  app.listen(port);
}
