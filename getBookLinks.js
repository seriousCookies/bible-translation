const rp = require("request-promise");
const $ = require("cheerio");
const baseURL = "https://www.christunite.com/";
const url =
  "https://www.christunite.com/index.php/chinese-bible/chinesepinyinbible";

const getHref = (parseHtml, html, array) => {
  return Array.from($(parseHtml, html)).map((book) =>
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
      console.log("error:", url, "this is printing here", err);
    });

getData(url, eachBook, getHref).then((urls) => {
  urls.map(async (bookUri) => {
    const bookURL = baseURL + bookUri;
    return await getData(bookURL, eachChapter, getHref).then((a) => a);
  });
});
