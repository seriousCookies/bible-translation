const express = require("express");
const router = express.Router();
const MongoDB = require("../db/mongodb");

router.get("/", (req, res) => {
  MongoDB.connectDB(async (err) => {
    if (err) console.log(err);
    const db = MongoDB.getDB();
    const list = [];
    const collection = db.collection("bibleInfo");
    const query = { overallOrder: { $gt: 0 } };
    const options = {
      sort: { overallOrder: 1 },
      projection: {
        _id: 0,
        overallOrder: 1,
        pinyin: 1,
        chinese: 1,
        english: 1,
        testament: 1,
      },
    };
    const cursor = collection.find(query, options);
    if ((await cursor.count()) === 0) {
      res.json("No documents found!");
    }
    await cursor.forEach((i) => {
      // collection.updateOne(
      //   { english: i.english },
      //   { $set: { overallOrder: parseInt(i.overallOrder) } }
      // );
      list.push(i);
    });
    res.json(list);
  });
});
module.exports = router;
