const {
    get
} = require("lodash");
const {
    processDatas
} = require("./data.js");

const fs = require("fs");
var processRes = data => {
    return JSON.stringify(
        get(data, "data.cards", []).map(item => {
            const mblog = get(item, "mblog", {});
            let {
                text,
                page_info,
                retweeted_status,

            } = mblog;
            if (retweeted_status) {
                // 图片展示
                const {
                    pics,
                    thumbnail_pic,
                    bmiddle_pic,
                    original_pic,
                } = retweeted_status;
                let texts = [],
                    reg = /[^A-z|0-9|=|>|<|\-|\；|\:|\"|\\|/|.|;|\? |+, +|,|\?|\.|\&|\%]+/g;
                let res = true;
                while (res) {
                    res = get(reg.exec(text), "0");
                    res && texts.push(res);
                }
                return {
                    isPic: true,
                    thumbnail_pic,
                    bmiddle_pic,
                    original_pic,
                    title: texts.join(","),
                    pics,

                };

            } else if (page_info) {
                // 视频展示
                let texts = [],
                    reg = /[^A-z|0-9|=|>|<|\-|\；|\:|\"|\\|/|.|;|\? |+, +|,|\?|\.|\&|\%]+/g;
                let res = true;
                while (res) {
                    res = get(reg.exec(text), "0");
                    res && texts.push(res);
                }

                const media_info = get(page_info, "media_info", {});

                const {
                    page_pic,
                    type
                } = page_info;
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
                    page_pic: get(page_pic, "url"),
                    type,
                    isMedia: true
                    // video_details,
                };
            }



        })
    );
};
const data = processRes(processDatas)
console.log(data)
fs.writeFile(
    "chiji.json",
    data
    .replace(/\[|\]/gim, "")
    .replace(/\"pics\":/gim, '"pics":[')
    .replace(/false\}\}\}\}/gim, 'false}}}]}')
    .replace(/true\}\}\}\}/gim, 'true}}}]}')
    .replace(/\},/gim, "}")
    .replace(/\}\"large\"/gim, '},"large"')
    .replace(/\}\}\}\{\"pid\"/gim, '}}},{"pid"')
    .replace(/',|#,/gim, "")
    .replace(/null,/gim, ''),
    "utf-8",
    err => {
        if (err) {
            console.log(err);
        } else {
            console.log("文件已被保存");
        }
    }
);