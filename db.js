const fs = require("fs");

const dbFile = "db.json";
let db;
const time = new Date();

// toubh file
try {
  fs.utimesSync(dbFile, time, time);
} catch (err) {
  fs.closeSync(fs.openSync(dbFile, "w"));
}

// read dbFile
try {
  db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
} catch (err) {
  db = [];
  try {
    fs.writeFileSync(dbFile, JSON.stringify(db));
  } catch (err) {
    console.error("WRITEFILESYNC FAILED:\n", err);
  }
}

const add = file => {
  db.push(file);
  fs.writeFileSync("db.json", JSON.stringify(db));
};

const read = file => {
  try {
    return JSON.parse(fs.readFileSync(dbFile, "utf-8"));
  } catch (err) {
    console.log("READFILE FAILED:\n", err);
    return -1;
  }
};

module.exports = { add, read };
