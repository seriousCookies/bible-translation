require("dotenv").config();
const server = require("./server/app.js").app;
const db = require("./db/mongodb");
port = process.env.PORT || 8080;

db.connectDB(() => {
  server.listen(port, () =>
    console.log(`💖 Server ready at mongodb://localhost:27017/`)
  );
});
