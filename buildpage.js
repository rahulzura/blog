const fs = require("fs");

// Globals
const partials = {};
let partialsLoaded;

const loadPar = async file => {
  fs.readFile(["partial/", file, ".par"].join(""), "utf-8", (err, data) => {
    partials[file] = data;
    // console.log(partials[file]);
  }).then(console.log(partials.head));
  // await console.log(partials.head);
};

const loadAllPar = async () => {
  await loadPar("head");
  // console.log(partials.head);
  loadPar("nav");
  loadPar("footer");
};

loadAllPar();

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

// (await loadPar("content/" + contentPar)) +

// getHeadWithTitle(await loadPar("head"), title)
// buildPage("public/mysql-in-ubuntu-linux.html", "title form database").catch(
//   err => {
//     console.error("buildPage Failed:\n", err);
//   }
// );

// console.log(par("head"));
