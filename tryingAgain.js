const rp = require("request-promise");
const cheerio = require("cheerio");
const baseURL = "https://www.biblestudytools.com/";
const bibleVersion = "cuvs/";

const getHref = (parseHtml, html, array) => {
  return Array.from(cheerio(parseHtml, html)).map((book) =>
    array.push(book.attribs.href)
  );
};
const eachBook = ["#testament-O > div > a", "#testament-N > div > a"];

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

getData(baseURL + bibleVersion, eachBook, getHref).then((data) => data);
