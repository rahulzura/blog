const fs = require("fs");
const util = require("util");

// Globals
const publicDir = "public/";
const partialDir = "partial/";
const contentDir = "partial/content/";
const partials = {};
let partialsLoaded;

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
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

// load partial in partials obj
const loadParAsync = async file => {
  const path = [partialDir, file, ".par"].join("");
  try {
    partials[file] = await readFile(path, "utf-8");
  } catch (err) {
    console.error("readFile Failed:\n", err);
  }
};

const loadAllParAsync = async () => {
  getHeadWithTitle(await loadPar("head"), "Title from DB");
  await loadPar("nav");
  await loadPar("footer");
  partialsLoaded = true;
};

const sliceExt = file => file.slice(0, file.lastIndexOf("."));

const readContentAsync = htmlFile => {
  // return promise
  return readFile([contentDir + sliceExt(htmlFile) + ".par"].join(""), "utf-8");
};

const buildPageAsync = async file => {
  try {
    const html =
      partials.head +
      partials.nav +
      (await readContentAsync(file)) +
      partials.footer;

    // return promise
    return writeFile(publicDir + file, html, err => {
      throw err;
    });
  } catch (err) {
    console.error("buildPage Failed:\n", err);
  }
};
