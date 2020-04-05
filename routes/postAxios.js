var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET /post */
router.get("/", function(req, res, next) {
  // Post a request for a user with a given ID
  axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      title: "Fred",
      body: "Flintstone",
      userId: 1
    })
    .then(function(response) {
      console.log(response);
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).send({ error: "something went wrong" });
    });
});

module.exports = router;
