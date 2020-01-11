const fs = require("fs");
const util = require("util");

const mdParser = require("./md-parser");

// Globals
const publicDir = "public/";
const partialDir = "partial/";
const postsDir = "content/posts/";
const partials = {};
let partialsLoaded;

// Promisify readFile and writefile
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// it adds title in the head and returns it
const getHeadWithTitle = (headStr, title) => {
  const tpl = "<?title --text/>";
  const titleEt = ["<title>", title, "</title>"].join("");
  const tplIndex = headStr.indexOf(tpl);
  return [
    headStr.slice(0, tplIndex),
    titleEt,
    headStr.slice(tplIndex + tpl.length)
  ].join("");
};

// get par file contents
const getParAsync = file => {
  const path = [partialDir, file, ".par"].join("");
  return readFile(path, "utf-8");
};

// load all par files in partials obj and set partialsLoaded to true
const loadAllParAsync = async () => {
  try {
    partials.head = await getParAsync("head");
    partials.nav = await getParAsync("nav");
    partials.footer = await getParAsync("footer");
    partialsLoaded = true;
  } catch (err) {
    console.error("loadAllParAsync Failed:\n", err);
  }
};

// remove extension
const sliceExt = file => {
  const ext = file.slice(file.lastIndexOf("."));
  if (ext === ".html" || ext === ".htm") {
    return file.slice(0, file.lastIndexOf("."));
  } else return file;
};

// takes file name and writes the file in public folder by adding par and md
const buildPageAsync = async file => {
  if (!partialsLoaded) {
    await loadAllParAsync();
  }

  const md = await readFile([postsDir, sliceExt(file), ".md"].join("")).catch(
    err => {
      console.error("READFILE FAILED:\n", err);
      return -1;
    }
  );
  if (md === -1) return -1;
  const { html, meta } = mdParser(md);
  console.log(html, meta);

  try {
    const post = [
      "<!DOCTYPE html><html>",
      getHeadWithTitle(partials.head, meta.title),
      "<body>",
      partials.nav,
      '<main class="content">',
      html,
      "</main>",
      partials.footer,
      "</body></html>"
    ].join("");

    // return promise
    return writeFile([publicDir, file, ".html"].join(""), html, err => {
      throw err;
    });
  } catch (err) {
    console.error("buildPage Failed:\n", err);
  }
};

// takes mdHtml and meta and returns complete html post
const getHtml = async (mdHtml, meta) => {
  if (!partialsLoaded) {
    await loadAllParAsync();
  }

  const post = [
    "<!DOCTYPE html><html>",
    getHeadWithTitle(partials.head, meta.title),
    "<body>",
    partials.nav,
    '<main class="content">',
    mdHtml,
    "</main>",
    partials.footer,
    "</body></html>"
  ].join("");

  // return promise
  return post;
};

module.exports = { buildPageAsync: buildPageAsync, getHtml };
