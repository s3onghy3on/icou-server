var express = require("express");
var router = express.Router();
const axios = require("axios");

async function getUser() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?userId=1"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/* GET /async */
router.get("/", function(req, res, next) {
  // Make a request for a user with a given ID
  getUser().then(response => {
    res.json(response);
  });
});

module.exports = router;
