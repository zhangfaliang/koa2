const {
    get
} = require("lodash");
const {
    processDatas
} = require("./data.js");


const fs = require("fs");


fs.writeFile(
    "app.json",
    JSON.stringify(processDatas)
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


// var processRes = (data) => {
//     return JSON.stringify(_.get(data, "data.cards", []).map(item => {
//         const mblog = _.get(item, "mblog", {});
//         const {
//             thumbnail_pic,
//             bmiddle_pic,
//             original_pic,
//             text,
//             pics
//         } = mblog;
//         let texts = [],
//             reg = /[^A-z|0-9|=|>|<|\-|\；|\:|\"|\\|/|.|;|\? |+, +|,|\?|\.|\&|\%]+/g;
//         let res = true;
//         while (res) {
//             res = _.get(reg.exec(text), "0");
//             res && texts.push(res);
//         }
//         return {
//             text: text,
//             thumbnail_pic,
//             bmiddle_pic,
//             original_pic,
//             title: texts.join(","),
//             pics
//         };
//     }))
// }