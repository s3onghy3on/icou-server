const axios = require("axios");
const cheerio = require("cheerio");

const shopName = "Coupang";
const baseUrl = "https://www.coupang.com/np/search";
const rcode = "AXG6417";

module.exports.getList = async (keyword) => {
  // console.time(`${shopName} takes`);
  const config = {
    baseURL: baseUrl,
    params: {
      q: keyword,
      listSize: 24,
    },
    validateStatus: function (status) {
      return status < 500;
    },
  };
  const html = await getHtml(config);
  const data = parseHtml(html);
  // console.timeEnd(`${shopName} takes`);
  return data;
};

const parseHtml = async (html) => {
  let data = [];
  try {
    const $ = await cheerio.load(html);
    $("a.search-product-link").each((i, elem) => {
      let img = $(elem).find("img.search-product-wrap-img");
      let imgSrc = img.attr("data-img-src");
      imgSrc = imgSrc ? imgSrc : img.attr("src");
      data.push({
        image: "https:" + imgSrc,
        title: img.attr("alt"),
        link: "https://www.coupang.com" + $(elem).attr("href"),
        price: $(elem)
          .find(".price-value")
          .first()
          .text()
          .replace(/[^0-9]/g, ""),
        rating: $(elem).find(".rating").text(),
        ratingCount: $(elem)
          .find(".rating-total-count")
          .text()
          .replace(/[^0-9]/g, ""),
      });
    });
  } catch (error) {
    console.error(error);
  }
  // console.log(`${shopName} items: ` + data.length);
  return data;
};

const getHtml = async (config) => {
  try {
    // console.log(config);
    let res = await axios(config);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
