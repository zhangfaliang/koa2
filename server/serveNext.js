const Koa = require("koa");
var path = require("path");
const app = new Koa();
var cors = require("koa2-cors");
const Router = require("koa-router");
const proxy = require("koa-proxies");
let router = new Router();

const dataSource = {
  columns: [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
    },
  ],
  list: [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "4",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ],
};
const dataSource1 = {
  columns: [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
    },
  ],
  list: [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
  ],
};

const dataSource2 = {
  columns: [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
    },
  ],
  list: [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ],
};
const dataSource3 = {
  columns: [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
    },
  ],
  list: [
    {
      key: "0",
      name: "John Brown0",
      age: 32,
      address: "New York No. 1 Lake Park0",
      tags: ["nice", "developer"],
    },
    {
      key: "9",
      name: "John Brown 9",
      age: 32,
      address: "New York No. 1 Lake Park9",
      tags: ["nice", "developer"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "4",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ],
};
app.use(
  require("koa-static")("dist", {
    index: "index.html", // Default file name, defaults to 'index.html'
  })
);
app.use(cors());
router.get("/", (ctx, next) => {
  console.log(ctx.query);
  const select = ctx?.query?.Select;
  switch (select) {
    case "demo":
      ctx.body = JSON.stringify(dataSource);
      break;
    case "demo1":
      ctx.body = JSON.stringify(dataSource2);
      break;
    case "demo2":
      ctx.body = JSON.stringify(dataSource1);
      break;
    default:
      ctx.body = JSON.stringify(dataSource3);
  }
  return next();
});
router.get("/select", (ctx, next) => {
  console.log(ctx);
  ctx.body = JSON.stringify([
    {
      value: "demo",
      text: "Demo",
    },
    {
      value: "demo1",
      text: "Demo1",
    },
    {
      value: "demo2",
      text: "Demo3",
    },
  ]);
  return next();
});
// app.use(async (ctx) => {
//   ctx.body = JSON.stringify(dataSource);
// });

// app.listen(9088);
app.use(router.routes()).use(router.allowedMethods());
app.listen(8989);

// https.createServer(options, app.callback()).listen(9088, () => {
//   console.log(`应用实例，访问地址为 https://localhost:9088`);
// });
