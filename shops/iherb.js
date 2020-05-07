const axios = require("axios");
const cheerio = require("cheerio");

const shopName = "iHerb";
const baseUrl = "https://kr.iherb.com/search";
const rcode = "AXG6417";

module.exports.getList = async (keyword) => {
  // console.time(`${shopName} takes`);
  const config = {
    baseURL: baseUrl,
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
        link: $(elem).find(".product-link").attr("href") + `?rcode=${rcode}`,
        price: cartInfo.discountPrice.replace(/[^0-9]/g, ""),
        rating: ratingInfo.eq(0).attr("content"),
        ratingCount: ratingInfo.eq(1).attr("content"),
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
