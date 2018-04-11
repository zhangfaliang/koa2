const Koa = require('koa');
const app = new Koa();
var cors = require('koa2-cors');
//const Router = require('koa-router')
const proxy = require('koa-proxies')
// let router = new Router();
app.use(require('koa-static')('root',{
  maxage:0,// Browser cache max-age in milliseconds. defaults to 0
  hidden:false,// Allow transfer of hidden files. defaults to false
  index:'index.html',// Default file name, defaults to 'index.html'
  //defer:true If true, serves after return next(), allowing any downstream middleware to respond first.
  gzip:true,// Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
  br:true,// Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). defaults to true.
  //setHeaders Function to set custom headers on response.
  //extensions Try to match extensions from passed to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
}))
// app.use(cors());//
app.use(proxy('/api', {
  target: 'https://m.8win.com',    
  changeOrigin: true,
  // agent: new httpsProxyAgent('http://1.2.3.4:88'),
  rewrite: path => path.replace(/\/api/, ''),
  logs: true
}))
// app.use(router.routes())
// .use(router.allowedMethods());
app.listen(3000);

console.log('listening on port 3000');