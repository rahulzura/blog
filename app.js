const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(serveStatic("logo", { index: false }));
app.use(serveStatic("public", { index: false }));
app.use(serveStatic("cssjs", { index: false }));
app.use(serveStatic("content/images", { index: false }));

// Globals
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;

app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.get("/:", async (req, res) => {
  res.sendFile("public/not-found.html", { root: __dirname });
});

const server = app.listen(port, () => {
  console.log(`http server is running on port ${port}`);
});
