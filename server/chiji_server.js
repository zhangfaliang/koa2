const Koa = require("koa");
const app = new Koa();
const axios = require("axios");
const proxy = require("koa-proxies");
const { get, isEmpty, isArray } = require("lodash");
const fs = require("fs");
const reptileUrl =
  "https://m.weibo.cn/api/container/getIndex?uid=5529945701&luicode=10000011&lfid=100103type%3D64%26q%3D%E5%88%BA%E6%BF%80%E6%88%98%E5%9C%BA%26t%3D0&type=uid&value=5529945701&containerid=10760355299457";
const port = 4000;

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
  const processDatas = datas.map(data => {
    return get(data, "data.data.cards", []).filter(item => {
      const mblog = get(item, "mblog", {});
      const { page_info } = mblog;
      return !isEmpty(get(page_info, "media_info"));
    });
  });
  const processData = processDatas.map(data => {
    return data.map(item => {
      const { mblog } = item;
      const { text, page_info } = mblog;
      let texts = [],
        reg = /[^A-z|0-9|=|>|<|\-|\；|\:|\"|\\|/|.|;|\? |+, +|,|\?|\.|\&|\%]+/g;
      let res = true;
      while (res) {
        res = get(reg.exec(text), "0");
        res && texts.push(res);
      }
      const media_info = get(page_info, "media_info", {});
      const { page_pic, type } = page_info;
      const {
        stream_url,
        stream_url_hd,
        mp4_sd_url,
        mp4_hd_url,
        video_details
      } = media_info;
      return {
        // text: text,
        title: texts.join(","),
        stream_url,
        stream_url_hd,
        mp4_sd_url,
        mp4_hd_url,
        page_pic:get(page_pic,'url'),
        type
        // video_details,
      };
    });
  });
  //false}}}]}
  fs.writeFile(
    "chiji.json",
    JSON.stringify(processData)
      .replace(/\[|\]/gim, "")
      .replace(/\"pics\":/gim, '"pics":[')
      .replace(/false\}\}\}\}/gim, "false}}}]}")
      .replace(/true\}\}\}\}/gim, "true}}}]}")
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
  console.log(`[demo] request get is starting at  ${port}`);
});
