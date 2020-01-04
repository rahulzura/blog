const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const cors = require("cors");

const buildPage = require("./buildPage.js");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(serveStatic("public", { index: false }));
app.use(serveStatic("cssandjs", { index: false }));

// Globals
const hostname = "127.0.0.1";
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;

app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.get("/blog/:post", (req, res) => {
  const post = req.params.post;
  buildPage(post);
  res.sendFile("public/" + post, { root: __dirname });
  console.log("sent a post");
});

app.get("/content/:post", (req, res) => {
  const post = req.params.post;
  console.log("got a content req");

  fs.readdir("content", (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("something broke");
      return -1;
    }

    if (files.find(item => item === post)) {
      fs.readFile(["content/", post].join(""), "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send("something broke");
          return -1;
        }
        res.send(JSON.stringify(data));
      });
    }
  });
});

const server = app.listen(port, () => {
  console.log(`http server is running on port ${port}`);
});
