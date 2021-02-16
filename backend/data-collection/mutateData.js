const rp = require("request-promise");
const cheerio = require("cheerio");

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_ATLAS_CONNECTION_STRING;
const client = new MongoClient.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const updateDocument = async (documentURL) => {
  try {
    const db = (await client).db("testing-bible");
    const col = db.collection("ch-en-bible-chapter");
    return await testing(documentURL).then((data) => {
      return data.map(async (verseData) => {
        await col.insertOne(verseData);
      });
    });
  } catch (e) {
    console.log(documentURL, e, "error here");
    process.exit();
  }
};

//.parentElement.href).match(/\/([\d\-\w]*)\/$/)[1]==="chuangshiji")
