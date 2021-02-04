const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.COSMODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to CosmosDB successful"))
  .catch((err) => console.error(err));
const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
