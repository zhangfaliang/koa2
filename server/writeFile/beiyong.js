const {
    get
} = require("lodash");
const {
    processDatas
} = require("./data.js");
const fs = require("fs");
fs.writeFile(
    "chiji.json",
    JSON.stringify(processDatas)
    .replace(/\[|\]/gim, "")
    .replace(/\"pics\":/gim, '"pics":[')
    .replace(/false\}\}\}\}/gim, 'false}}}]}')
    .replace(/true\}\}\}\}/gim, 'true}}}]}')
    .replace(/\},/gim, "}")
    .replace(/\}\"large\"/gim, '},"large"')
    .replace(/\}\}\}\{\"pid\"/gim, '}}},{"pid"')
    .replace(/null,/gim, '')
    .replace(/',|#,/gim, ""),
    "utf-8",
    err => {
        if (err) {
            console.log(err);
        } else {
            console.log("文件已被保存");
        }
    }
);