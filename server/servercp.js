const Koa = require('koa')
const app = new Koa()
var cors = require('koa2-cors');
app.use(cors())

const prot = 5000;
app.use( async ( ctx ) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring
  //"keep=1&zy-action=%7B%22showTitle%22%3A1%2C%22titleName%22%3A%22%E6%B0%B4%E4%BA%A7%E5%A4%A7%E4%BA%A8%22%7D&url=https%3A%2F%2Fres.winninglotto.cn%2Fzhangyu%2FFishTycoon_test%2Findex.html%3FoperatorKey%3DZYu%26gameId%3DFishTycoon%26language%3Dzh&portal="
  //"keep=1&categor=1&zy-action=%7B%22showTitle%22:1,%22titleName%22:%22%E7%8B%97%E7%8B%97%E5%90%91%E5%89%8D%E5%86%B2%22%7D&url=http%3A%2F%2Fgogogo.joyboat6.cn%2Fzycp%2Ftest%2Findex.html&portal="
 //keep=1&url=http%3A%2F%2Fqa.m.8win.com%2Ff%2Fsanguo%3Fportal%3D2005&portal=&zy-action=%7B%22titleName%22%3A%22%E4%B8%89%E5%9B%BD%22%2C%22showTitle%22%3A1%7D
  ctx.body = {
    url:'http://192.168.0.153:3000/redirect?keep=1&url=http%3A%2F%2Fqa.m.8win.com%2Ff%2Fsanguo%3Fportal%3D2005&portal=&zy-action=%7B%22titleName%22%3A%22%E4%B8%89%E5%9B%BD%22%2C%22showTitle%22%3A1%7D'
  }
})

app.listen(prot, () => {
  console.log(`[demo] request get is starting at  ${prot}`)
})