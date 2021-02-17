const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;

router.get("/", (req, res) => {
  mongodb.MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    async (error, client) => {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      const chineseBookName = await client
        .db("chinese-bible")
        .collection("ch-bible-chapter")
        .distinct("BookName");
      const englishBookName = await client
        .db("english-bible")
        .collection("esv-en-bible-chapter")
        .distinct("BookName");
      res.json(chineseBookName + englishBookName);
    }
  );
});
module.exports = router;
