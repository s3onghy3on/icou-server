const axios = require("axios");
const cheerio = require("cheerio");
const shopName = "iHerb";

module.exports.getList = async (keyword) => {
  // console.time(`${shopName} takes`);
  const config = {
    baseURL: process.env.BASE_SEARCH_URL_IHERB,
    params: {
      kw: keyword,
      noi: 24,
    },
    validateStatus: function (status) {
      return status < 500;
    },
  };
  const html = await getHtml(config);
  const data = parseHtml(html);
  if (html === false || data === false) {
    return false;
  }
  // console.timeEnd(`${shopName} takes`);
  return data;
};

const parseHtml = async (html) => {
  let data = [];
  try {
    const $ = await cheerio.load(html);
    $(".product-inner").each((i, elem) => {
      let cartInfo = $(elem)
        .find("button[name=AddToCart]")
        .attr("data-cart-info");
      if (!cartInfo) return true;
      cartInfo = JSON.parse(cartInfo);
      cartInfo = cartInfo.lineItems[0];

      let ratingInfo = $(elem).find("div[itemprop=aggregateRating]").children();

      data.push({
        image: cartInfo.iURLMedium,
        title: cartInfo.productName,
        link:
          $(elem).find(".product-link").attr("href") +
          `?rcode=${process.env.RCODE_IHERB}`,
        price: cartInfo.discountPrice.replace(/[^0-9]/g, ""),
        rating: ratingInfo.eq(0).attr("content"),
        ratingCount: ratingInfo.eq(1).attr("content"),
      });
    });
  } catch (error) {
    console.error(error);
    return false;
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
    return false;
  }
};
