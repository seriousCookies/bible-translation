const rp = require("request-promise");
const cheerio = require("cheerio");
const baseURL = "https://www.christunite.com/";
const biblepath = "pinyin_bible/";
const url =
  "https://www.christunite.com/index.php/chinese-bible/chinesepinyinbible";

const getHref = (parseHtml, html, array) => {
  return Array.from(cheerio(parseHtml, html)).map((book) =>
    array.push(book.attribs.href)
  );
};
const eachBook = [
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > table > tbody > tr > td > a",
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > a",
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > p > a",
];
const eachChapter = ["a"];

const getData = (url, parseHtml, getHref) =>
  rp(url)
    .then((html) => {
      const rawURLs = [];
      parseHtml.map((string) => getHref(string, html, rawURLs));
      return Array.from(new Set(rawURLs));
    })
    .catch((err) => {
      console.log("error:", err);
    });
let data = [];
// getData(url, eachBook, getHref).then((urls) => {
//   return urls.map(async (bookUri) => {
//     const bookURL = baseURL + bookUri;
//     return await getData(bookURL, eachChapter, getHref)
//       .then((chapterUris) => {
//         return chapterUris.map((chapterURI) => {
//           const chapterURL = baseURL + biblepath + chapterURI;
//           return data.push(chapterURL);
//         });
//       })
//       .then(() => data); //all the chapters in the Bible length: 1190
//   });
// });

const chapterURL = "https://www.christunite.com/pinyin_bible/Psm_117.htm";
const main = async () => {
  const result = await rp.get(chapterURL);
  const $ = cheerio.load(result);

  $("body > table > tbody > tr > td").each((index, element) => {
    console.log($(element).text().length, "first");
  });
  const tonation = [];
  $("body > table > tbody > tr > td > img").each((index, element) => {
    Array.from($(element)).map((image) =>
      tonation.push(image.attribs.src.match(/\d/)[0])
    );
  });
  console.log(tonation.length, "second");
};
main();
