const fs = require("fs");
const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(serveStatic("public", { index: false }));

// Globals
const hostname = "127.0.0.1";
const port = 3000;

const server = app.listen(port, () => {
  console.log(`http server is running on port ${port}`);
});
