const Koa = require("koa");
const app = new Koa();
var cors = require("koa2-cors");
const superagent = require("superagent");
const cheerio = require("cheerio");
const axios = require("axios");
const proxy = require("koa-proxies");
const { get } = require("lodash");
const fs = require("fs");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
// const reptileUrl ="https://m.weibo.cn/api/container/getIndex?containerid=102803_ctg1_1988_-_ctg1_1988&openApp=0"
const reptileUrl =
  "https://m.weibo.cn/api/container/getIndex?containerid=102803_ctg1_4388_-_ctg1_4388&openApp=0";

const apiPromise = since_id => {
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
  const datas = [];
  datas.push(await apiPromise(1));

  const processData = datas.map(data => {
    return get(data, "data.data.cards", []).map(item => {
      const mblog = get(item, "mblog", {});
      const { thumbnail_pic, bmiddle_pic, original_pic, text, pics } = mblog;
      let texts = [],
        reg = /[^A-z|0-9|=|>|<|\-|\；|\:|\"|\\|/|.|;|\? |+, +|,|\?|\.|\&|\%]+/g;
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
        title: texts.join(","),
        pics
      };
    });
  });
  //false}}}]} 
  fs.writeFile(
    "app.json",
    JSON.stringify(processData)
      .replace(/\[|\]/gim, "")
      .replace(/\"pics\":/gim, '"pics":[')
      .replace(/false\}\}\}\}/gim, 'false}}}]}')
      .replace(/true\}\}\}\}/gim, 'true}}}]}')
      .replace(/\},/gim, "}")
      .replace(/\}\"large\"/gim, '},"large"')
      .replace(/\}\}\}\{\"pid\"/gim, '}}},{"pid"'),
    "utf-8",
    err => {
      if (err) {
        console.log(err);
      } else {
        console.log("文件已被保存");
      }
    }
  );
  ctx.body = {
    url: processData
  };
});

app.listen(port, () => {
  console.log(`[demo] request get is starting at  ${prot}`);
});
