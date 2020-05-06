const https = require("https");
const http = require("http");

const app = require("./app.js");
const lex = require("greenlock-express").create({
  version: "v02",
  configDir: "/etc/letsencrypt",
  server: "https://acme-v02.api.letsencrypt.org/directory",
  email: "s3onghy3on@gmail.com",
  approveDomains: ["atagl.com", "www.atagl.com"],
  agreeTos: true,
  renewWithin: 81 * 24 * 60 * 60 * 1000,
  renewBy: 80 * 24 * 60 * 60 * 1000,
});

https
  .createServer(lex.httpsOptions, lex.middleware(app))
  .listen(process.env.SSL_PORT || 443);
http
  .createServer(lex.middleware(require("redirect-https")()))
  .listen(process.env.PORT || 80);
