const express = require("express");
const router = express.Router();
const MongoDB = require("../db/mongodb");

router.get("/", (req, res, next) => {
  const { book, chapter } = req.query;

  MongoDB.connectDB(async (err) => {
    if (err) console.log(err);
    const db = MongoDB.getDB();
    const list = [];
    const collection = {};
    try {
      collection.bibleInfo = db.collection("bibleInfo");
      const bookInfo = {};
      if (book) {
        collection.bibleBook = db.collection("esv-en-bible-chapter");
        const query = { BookName: book };
        bookInfo[book] = (
          await collection.bibleBook.distinct("BookChapter", query)
        ).length;
        chapter && (query.BookChapter = chapter);
        chapter &&
          (bookInfo[chapter] = (
            await collection.bibleBook.distinct("verseNumber", query)
          ).length);

        return res.status(200).json(bookInfo);
      }
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
      const cursor = collection.bibleInfo.find(query, options);
      if ((await cursor.count()) === 0) {
        MongoDB.disconnectDB();
        return res.json("No documents found!");
      }
      await cursor.forEach((i) => {
        list.push(i);
      });

      MongoDB.disconnectDB();
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
    }
  });
});
module.exports = router;
