const fs = require("fs");
const util = require("util");

// Globals
const publicDir = "public/";
const partialDir = "partial/";
const contentDir = "content/";
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

// get par file contents
const getParAsync = file => {
  const path = [partialDir, file, ".par"].join("");
  return readFile(path, "utf-8");
};

// load partial in partials obj
// const loadParAsync = async file => {
//   const path = [partialDir, file, ".par"].join("");
//   try {
//     partials[file] = await readFile(path, "utf-8");
//   } catch (err) {
//     console.error("readFile Failed:\n", err);
//   }
// };

const loadAllParAsync = async () => {
  try {
    partials.head = getHeadWithTitle(
      await getParAsync("head"),
      "Title from DB"
    );
    partials.nav = await getParAsync("nav");
    partials.footer = await getParAsync("footer");
    partialsLoaded = true;
  } catch (err) {
    console.error("loadAllParAsync Failed:\n", err);
  }
};

const sliceExt = file => file.slice(0, file.lastIndexOf("."));

const readContentAsync = htmlFile => {
  // return promise
  return readFile([contentDir + sliceExt(htmlFile) + ".par"].join(""), "utf-8");
};

const buildPageAsync = async file => {
  if (!partialsLoaded) {
    await loadAllParAsync();
  }

  try {
    const html = [
      "<!DOCTYPE html><html>",
      partials.head,
      "<body>",
      partials.nav,
      '<main class="content">',
      await readContentAsync(file),
      "</main>",
      partials.footer,
      "</body></html>"
    ].join("");

    // return promise
    return writeFile(publicDir + file, html, err => {
      throw err;
    });
  } catch (err) {
    console.error("buildPage Failed:\n", err);
  }
};

module.exports = buildPageAsync;
