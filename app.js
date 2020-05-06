const express = require("express");
const logger = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");
// const cors = require("cors");

const app = express();
const searchRouter = require("./routes/search.js");
// app.use(cors());

const errorLogStream = rfs.createStream("error.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

app.use(
  logger("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: errorLogStream,
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/search", searchRouter);

if (require.main === module) {
  app.listen(80);
}

module.exports = app;
