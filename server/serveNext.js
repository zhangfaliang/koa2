const Koa = require("koa");
const fs = require("fs");
var path = require("path");
const https = require("https");
const http = require("http");
const enforceHttps = require("koa-sslify");

// var options = {
//   key: fs.readFileSync(path.resolve("server/ssl/server.key"), "utf8"),
//   cert: fs.readFileSync(path.resolve("server/ssl/server.cert"), "utf8"),
// };
const app = new Koa();
var cors = require("koa2-cors");
const Router = require("koa-router");
const proxy = require("koa-proxies");
let router = new Router();
app.use(
  require("koa-static")("dist", {
    //maxage:0,// Browser cache max-age in milliseconds. defaults to 0
    //hidden:false,// Allow transfer of hidden files. defaults to false
    index: "index.html", // Default file name, defaults to 'index.html'
    //defer:true If true, serves after return next(), allowing any downstream middleware to respond first.
    // gzip:true,// Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
    // br:true,// Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). defaults to true.
    //setHeaders Function to set custom headers on response.
    //extensions Try to match extensions from passed to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
  })
);
app.use(cors()); //
app.use(
  proxy("/", {
    target: "https://m.test.doublefs.com",
    changeOrigin: true,
    // agent: new httpsProxyAgent('http://1.2.3.4:88'),
    //rewrite: path => path.replace(/\/api/, ''),
    pathRewrite: {
      // '^/api': '',
    },
    logs: true,
  })
);
app.use(async (ctx) => {
  console.log(ctx.req.headers.cookie);
  // console.log(ctx.req);

  ctx.body = "Hello World";
});

// app.listen(9088);
app.use(router.routes()).use(router.allowedMethods());
app.listen(9088);

// https.createServer(options, app.callback()).listen(9088, () => {
//   console.log(`应用实例，访问地址为 https://localhost:9088`);
// });
