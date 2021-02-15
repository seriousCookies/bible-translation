const server = require("./server/app.js").app;

port = process.env.PORT || 3001;

server.listen(port, () =>
  console.log(`💖 Server ready at http://localhost:3001/`)
);
