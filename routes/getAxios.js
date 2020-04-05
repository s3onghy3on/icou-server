var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET homepage */
router.get("/", function(req, res, next) {
  // Make a request for a user with a given ID
  axios
    .get("https://jsonplaceholder.typicode.com/posts?userId=1")
    .then(function(response) {
      // handle success
      console.log(response);
      res.json(response.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      res.status(500).send({ error: "something went wrong" });
    });
});

module.exports = router;
