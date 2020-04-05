const express = require("express");
const router = express.Router();
const util = require("../util/common.js");
const iherb = require("../shops/iherb.js");
const coupang = require("../shops/coupang.js");

router.get("/", async (req, res, next) => {
  console.time("total time");
  const keyword = util.keywordNormalizer(req.query.kw);
  const userAgent = req.get("User-Agent");

  let [iherbList, coupangList] = await Promise.all([
    iherb.getList(keyword, userAgent),
    coupang.getList(keyword, userAgent)
  ]);
  console.timeEnd("total time");
  res.json({ iherbList, coupangList });
});

module.exports = router;
