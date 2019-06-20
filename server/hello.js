const  Koa = require('koa');
const app = new Koa();
app.use(ctx=>{
  ctx.body = {
    data:{
     他们是小伙伴:['张发亮','樊艳红','李海涛','沈守帅','马丽']
    }
  }
})
app.listen(3000)