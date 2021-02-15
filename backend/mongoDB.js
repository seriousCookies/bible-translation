require("dotenv").config();
const mongodb = require("mongodb");
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;

const connectDb = async () => {
  let results;
  await mongodb.MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (error, client) => {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      const database = client.db("chinese-bible");
      const collection = database.collection("ch-bible-chapter");
      const query = {
        BookName: "chuangshiji",
        BookChapter: "10",
        verseNumber: "1",
      };
      const projection = { ChineseVerse: 1 };
      return (
        collection &&
        collection
          .find(query, projection)
          .sort({ name: 1 })
          .toArray()
          .then((items) => {
            console.log(`Successfully found ${items.length} documents.`);
            results = items.forEach((item) => item.ChineseVerse);
          })
          .catch((err) => console.error(`Failed to find documents: ${err}`))
      );
    }
  );
  console.log(results, "nothing? now");
  return results;
};

module.exports = connectDb;
