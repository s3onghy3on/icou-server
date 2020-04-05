const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const searchRouter = require("./routes/search.js");

const app = express();

app.use(logger("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "main.html"));
});

app.use("/search", searchRouter);

const listener = app.listen(8080, () => {
  console.log("Listening on port " + listener.address().port);
});
