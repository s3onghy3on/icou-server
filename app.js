const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const rfs = require("rotating-file-stream");

const searchRouter = require("./routes/search.js");

const app = express();

const errorLogStream = rfs.createStream("error.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

app.use(
  logger("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: errorLogStream,
  })
);

app.use(cors());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "html", "main.html"));
// });

app.use("/search", searchRouter);

const listener = app.listen(8080, () => {
  console.log("Listening on port " + listener.address().port);
});
