const express = require("express");
const router = express.Router();
const axios = require("axios");
const { generateHmac } = require("../shops/coupang/hmacGenerator");

const REQUEST_METHOD = "POST";
const DOMAIN = "https://api-gateway.coupang.com";
const URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";

// Replace with your own ACCESS_KEY and SECRET_KEY
const ACCESS_KEY = "8852545e-3103-4617-9bea-bc601c37f169";
const SECRET_KEY = "008e5582f918a71b82944aacddfdfc868a374dde";

router.post("/deeplink", async (req, res, next) => {
  const REQUEST = { coupangUrls: [req.body.url] };
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
    res.json(response.data.data);
  } catch (err) {
    console.error(err.response.data);
    res.status(500).send({ error: "Internal Error" });
  }
});

module.exports = router;
