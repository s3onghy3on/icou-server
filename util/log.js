const mysql = require("mysql");
const config = require("../db_info");

const PRODUCT_CLICK_LOG_QUERY =
  "INSERT INTO PRODUCT_LINK_LOG (mall, url, title, keyword, ip) VALUES (?, ?, ?, ?, ?)";

const SEARCH_LOG_QUERY_BASE =
  "INSERT INTO SEARCH_LOG (keyword, ip) VALUES (?, ?)";

function logging(log) {
  // console.log(log);
}

module.exports.productClick = (values) => {
  const connection = mysql.createConnection(config);
  connection.connect();
  connection.query(PRODUCT_CLICK_LOG_QUERY, values, function (error, results) {
    if (error) console.error(error);
    logging(results);
  });
  connection.end();
};

module.exports.search = (values) => {
  const connection = mysql.createConnection(config);
  connection.connect();
  connection.query(SEARCH_LOG_QUERY_BASE, values, function (error, results) {
    if (error) console.error(error);
    logging(results);
  });
  connection.end();
};
