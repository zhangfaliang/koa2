const Koa = require("koa");
const app = new Koa();
var cors = require("koa2-cors");
const superagent = require("superagent");
const cheerio = require("cheerio");
const axios = require("axios");
const proxy = require("koa-proxies");
const { get } = require("lodash");
const reptileUrl =
  "https://m.weibo.cn/api/container/getIndex?containerid=102803_ctg1_4388_-_ctg1_4388&openA";

const prot = 5000;

const apiPromise = () => {
  return new Promise((res, rej) => {
    axios
      .get(reptileUrl)
      .then(function(response) {
        res(response);
      })
      .catch(function(error) {
        rej(error);
      })
      .then(function() {
        // always executed
      });
  });
};

app.use(async ctx => {
  let url = ctx.url;
  // 从上下文的request对象中获取
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;
  // 从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;
  const data = await apiPromise();
  const processData = get(data, "data.data.cards", []).map(item => {
    const mblog = get(item, "mblog", {});
    const { thumbnail_pic, bmiddle_pic, original_pic, text } = mblog;
    let texts = [],
      reg = /[^A-z|0-9|=|>|<|\-|\；|\:|\"|\\|/|.|;|\?|%|&]+/g;
    let res = true;
    while (res) {
      res = get(reg.exec(text), "0");
      res && texts.push(res);
    }
    return {
      text: text,
      thumbnail_pic,
      bmiddle_pic,
      original_pic,
      texts
    };
  });
  ctx.body = {
    url: processData
  };
});
app.listen(prot, () => {
  console.log(`[demo] request get is starting at  ${prot}`);
});
