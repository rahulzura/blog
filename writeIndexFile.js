const fs = require("fs");

const db = require("./db");

// it adds title in the head and returns it
const getHtmlWithPostList = (tpl, list) => {
  const titleEt = [list, "the above is the list"].join("");
  const html = fs.readFileSync("public/index.html", "utf-8");
  const tplIndex = html.indexOf(tpl);

  return [
    html.slice(0, tplIndex),
    titleEt,
    html.slice(tplIndex + tpl.length)
  ].join("");
};

fs.writeFileSync(
  "public/index.html",
  getHtmlWithPostList("<?LatestArticles/>", db.read())
);
