const express = require("express");
const router = express.Router();

const redis = require("redis");
const client = redis.createClient();

const util = require("../util/common.js");
const iherb = require("../shops/iherb.js");
const coupang = require("../shops/coupang.js");

router.get("/", (req, res, next) => {
  // console.time("total time");

  let keyword = util.keywordNormalizer(req.query.kw);
  console.log(keyword);

  client.get(keyword, async (err, obj) => {
    if (obj) {
      // console.log("Already have stored data.");
      let parsedObj = JSON.parse(obj);

      // console.timeEnd("total time");
      res.json(parsedObj);
    } else {
      // console.log("Stored data does not exist.");
      let [iherbList, coupangList] = await Promise.all([
        iherb.getList(keyword),
        coupang.getList(keyword),
      ]);
      let result = { keyword, iherbList, coupangList };
      client.set(keyword, JSON.stringify(result));
      client.expireat(keyword, parseInt(+new Date() / 1000) + 7200);

      // console.timeEnd("total time");
      res.json(result);
    }
  });
});

module.exports = router;
