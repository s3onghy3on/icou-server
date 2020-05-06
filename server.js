// const https = require("https");
// const http = require("http");

const app = require("./app.js");
// const lex = greenlock.create({
//   version: "v02",
//   configDir: "/etc/letsencrypt",
//   server: "https://acme-v02.api.letsencrypt.org/directory",
//   email: "s3onghy3on@gmail.com",
//   approveDomains: ["atagl.com", "www.atagl.com"],
//   agreeTos: true,
//   renewWithin: 81 * 24 * 60 * 60 * 1000,
//   renewBy: 80 * 24 * 60 * 60 * 1000,
// });
require("greenlock-express").init({
  packageRoot: __dirname,
  configDir: "./greenlock.d",
  maintainerEmail: "s3onghy3on@gmail.com",
  cluster: false,
});

const searchRouter = require("./routes/search.js");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/search", searchRouter);

// https
//   .createServer(lex.httpsOptions, lex.middleware(app))
//   .listen(process.env.SSL_PORT || 443);
// http
//   .createServer(lex.middleware(require("redirect-https")()))
//   .listen(process.env.PORT || 80);
