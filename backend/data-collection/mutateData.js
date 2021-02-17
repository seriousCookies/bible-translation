const rp = require("request-promise");
const $ = require("cheerio");
const fs = require("fs");
const readline = require("readline");
const baseURL = "https://www.christunite.com/";

const rl = readline.createInterface({
  input: fs.createReadStream("./ot.txt"),
  output: process.stdout,
});
const NTrl = readline.createInterface({
  input: fs.createReadStream("./nt.txt"),
  output: process.stdout,
});

const bookOrder = [];
rl.on("line", (line) => {
  const lineRegex = /^(?<overallOrder>[\d.]*)\s(?<english>[\w ]*)/gim;
  let bookoverallOrder = lineRegex.exec(line);
  bookOrder.push(JSON.parse(JSON.stringify(bookoverallOrder.groups)));
});
NTrl.on("line", (line) => {
  const lineRegex = /^(?<testamentOrder>[\d.]*)\s(?<english>[\w ]*)/gim;
  let bookoverallOrder = lineRegex.exec(line);
  let bookInfo = JSON.parse(JSON.stringify(bookoverallOrder.groups));
  bookInfo.overallOrder =
    parseInt(bookInfo.testamentOrder.replace(".", "")) + 39;
  bookOrder.push(bookInfo);
});

const url =
  "https://www.christunite.com/index.php/chinese-bible/chinesepinyinbible";

const getHref = (parseHtml, html, array) => {
  return Array.from($(parseHtml, html)).map((book) =>
    array.push(book.attribs.title)
  );
};
const eachBook = [
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > table > tbody > tr > td > a",
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > a",
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > p > a",
];

const getData = (url, parseHtml, getHref) =>
  rp(url)
    .then((html) => {
      const rawURLs = [];
      parseHtml.map((string) => getHref(string, html, rawURLs));
      return Array.from(new Set(rawURLs));
    })
    .catch((err) => {
      console.log("error:", url, "this is printing here", err);
    });

getData(url, eachBook, getHref).then((data) => {
  const books = [];
  const regex = /[\n]?(?<code>\w*\*?)\s(?<ch>[\u4E00-\u9FCC]*)\s\((?<py>[\w]*)\)\s(?<en>[\w ]*)/gim;
  data = data
    .join("\n")
    .replace(regex, "$<code>, $<ch>, $<py>, $<en>§§")
    .split("§§")
    .map((bookString) => {
      if (bookString === "") {
        return;
      } else {
        const splitBookString = bookString.split(",");
        const bookDetails = {
          code: splitBookString[0].replace(/\*/gi, ""),
          chinese: splitBookString[1],
          pinyin: splitBookString[2] && splitBookString[2].replace(/\d/gi, ""),
          english: splitBookString[3].trim(),
        };
        return books.push(bookDetails);
      }
    });
  let a = books.map((book) => {
    let bibleBooks = {
      ...book,
      ...bookOrder.filter((line) => line.english === book.english)[0],
    };
    bibleBooks.overallOrder <= 39
      ? ((bibleBooks.testament = "OldTestament"),
        (bibleBooks.testamentOrder = bibleBooks.overallOrder))
      : (bibleBooks.testament = "NewTestament");
    return bibleBooks;
  });

  console.log(a, "here now");
});

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
