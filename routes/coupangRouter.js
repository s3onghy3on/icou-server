const express = require("express");
const router = express.Router();
const axios = require("axios");
const { generateHmac } = require("../shops/coupang/hmacGenerator");

const REQUEST_METHOD = "POST";
const DOMAIN = "https://api-gateway.coupang.com";
const URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";

// Replace with your own ACCESS_KEY and SECRET_KEY
const ACCESS_KEY = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const SECRET_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

router.post("/deeplink", async (req, res, next) => {
  const REQUEST = { coupangUrls: [req.query.url] };
  const authorization = generateHmac(
    REQUEST_METHOD,
    URL,
    SECRET_KEY,
    ACCESS_KEY
  );
  axios.defaults.baseURL = DOMAIN;

  try {
    const response = await axios.request({
      method: REQUEST_METHOD,
      url: URL,
      headers: { Authorization: authorization },
      data: REQUEST,
    });
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    console.error(err.response.data);
  }
});

module.exports = router;
