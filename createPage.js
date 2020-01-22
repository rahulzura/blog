const fs = require("fs");

const showdown = require("showdown");
const yaml = require("js-yaml");

const conv = new showdown.Converter({
  metadata: true,
  parseImgDimension: true
});

// Globals
const contentDir = [__dirname, "/content"].join("");
const parDir = [__dirname, "/partial"].join("");
const publicDir = [__dirname, "/public"].join("");
const pars = {
  head: fs.readFileSync([parDir, "/head.par"].join(""), "utf-8"),
  nav: fs.readFileSync([parDir, "/nav.par"].join(""), "utf-8"),
  footer: fs.readFileSync([parDir, "/footer.par"].join(""), "utf-8")
};

const getTitleEle = title => ["<title>", title, "</title>"].join("");
const getDesEle = des =>
  [`<meta name="description" content="`, des, `"/>`].join("");
const getHeadingEle = heading => ["<h1>", heading, "</h1>"].join("");

const parseIncludes = (str, tpl, includeStr) => {
  const tplIndex = str.indexOf(tpl);
  return [
    str.slice(0, tplIndex),
    includeStr,
    str.slice(tplIndex + tpl.length)
  ].join("");
};

const createPage = (mdFilePath, publicDir) => {
  const md = fs.readFileSync(mdFilePath, "utf-8");
  const html = conv.makeHtml(md);
  const meta = yaml.safeLoad(conv.getMetadata("raw"));
  if (meta.template === "post") {
    const pageHtml = [
      "<!DOCTYPE html><html>",
      parseIncludes(
        parseIncludes(pars.head, "<?title --text/>", getTitleEle(meta.title)),
        "<?Description/>",
        getDesEle(meta.description ? meta.description : meta.title)
      ),
      "<body>",
      pars.nav,
      '<main class="content">',
      getHeadingEle(meta.title),
      html,
      "</main>",
      pars.footer,
      '<link rel="stylesheet" href="css/prism.css" /><script src="js/prism.js"></script></body></html>'
    ].join("");
    fs.writeFileSync([publicDir, "/", meta.slug, ".html"].join(""), pageHtml);
  } else {
    const pageHtml = [
      "<!DOCTYPE html><html>",
      parseIncludes(
        parseIncludes(pars.head, "<?title --text/>", getTitleEle(meta.title)),
        "<?Description/>",
        getDesEle(meta.description ? meta.description : meta.title)
      ),
      "<body>",
      pars.nav,
      '<main class="content">',
      html,
      "</main>",
      pars.footer,
      meta.css ? `<link rel="stylesheet" href="css/${meta.css}"/>` : "",
      meta.js ? `<script src="js/${meta.js}"></script>` : "",
      "</body></html>"
    ].join("");
    fs.writeFileSync([publicDir, "/", meta.slug, ".html"].join(""), pageHtml);
  }
};

try {
  // create pages
  fs.readdirSync([contentDir, "/pages"].join("")).forEach(mdFile => {
    createPage([contentDir, "/pages/", mdFile].join(""), publicDir);
  });

  // create posts
  fs.readdirSync([contentDir, "/posts"].join("")).forEach(mdFile => {
    createPage([contentDir, "/posts/", mdFile].join(""), publicDir);
  });
} catch (err) {
  console.error(err);
}
