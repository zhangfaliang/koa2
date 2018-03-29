const Koa = require('koa');
const app = new Koa();

// x-response-time
app.use(async (ctx,next)=>{
  const start = Date.now();
  console.log(1)
  await next();
  const ms = Date.now();
  console.log(2)
})
app.use(async (ctx,next)=>{
  const start = Date.now();
  console.log(3)
  await next();
  const ms =Date.now()-start;
  console.log(4)
})

app.use(async ctx=>{
  ctx.body = 'middleware'
})

app.listen(5000)