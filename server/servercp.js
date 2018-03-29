const Koa = require('koa')
const app = new Koa()
var cors = require('koa2-cors');
app.use(cors())

app.use( async ( ctx ) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = {
    url:'http://192.168.0.205:4000/?product=01&channel=001',
  }
})

app.listen(5000, () => {
  console.log('[demo] request get is starting at port 3000')
})