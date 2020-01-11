const showdown = require("showdown");
const yaml = require("js-yaml");

const conv = new showdown.Converter({ metadata: true });

const mdParser = md => ({
  html: conv.makeHtml(md),
  meta: yaml.safeLoad(conv.getMetadata("raw"))
});

module.exports = mdParser;
