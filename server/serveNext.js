const Koa = require("koa");
var path = require("path");
const app = new Koa();
var cors = require("koa2-cors");
const Router = require("koa-router");
const proxy = require("koa-proxies");
let router = new Router();
const fetch = require("fetch");

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
const dataSource4 = {
  code: 0,
  msg: "success",
  data: { testFE: { groupKey: "B", groupParam: "" } },
  success: true,
};
app.use(
  cors({
    origin: function (ctx) {
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(
  require("koa-static")("dist", {
    index: "index.html", // Default file name, defaults to 'index.html'
  })
);

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
router.post("/api/v1/queryProductColorInfo", (ctx, next) => {
  console.log(ctx);
  ctx.body = JSON.stringify({
    data: {
      colorInfoList: [
        {
          skcColorName: "wer",
          skcColorImgUrl: "old",
          skcColorBlockRealI: "new",
        },
      ],
    },
  });
  return next();
});

router.get("/api/v1/queryProductColorInfo", (ctx, next) => {
  console.log(ctx);
  ctx.body = JSON.stringify({
    data: {
      colorInfoList: [
        {
          skcColorName: "1",
          skcColorImgUrl: "old",
          skcColorBlockRealI: "new",
        },
        {
          skcColorName: "2",
          skcColorImgUrl: "old",
          skcColorBlockRealI: "new",
        },
        {
          skcColorName: "3",
          skcColorImgUrl: "old",
          skcColorBlockRealI: "new",
        },
        {
          skcColorName: "5",
          skcColorImgUrl: "old",
          skcColorBlockRealI: "new",
        },
      ],
    },
  });
  return next();
});
router.get("/api/v1/queryProductColorInfo", (ctx, next) => {
  console.log(ctx);
  ctx.body = JSON.stringify(dataSource4);
  return next();
});

router.get("/api/v1/mallCmsConfig/index", (ctx, next) => {
  console.log(ctx);
  console.log(ctx.query);
  const orderNo = ctx?.query?.orderNo;
  const data = {
    code: 0,
    msg: "success",
    data: [
      {
        type: "slideshow",
        floorMark: "1111",
        style: "",
        layoutType: "",
        flashSale: 2,
        position: 1,
        data: {
          title: "banner标题",
          urlType: null,
          url: "",
          data: [
            {
              img: "https://mpi.halaracdn.com/update/test/25/14/03/12/21/_5969971475.jpg?width=1200&height=960",
              urlType: 1,
              url: "/collections/skc-sortby-lm",
              title: null,
              desc: null,
              btn: null,
              largeImg:
                "https://mpi.halaracdn.com/update/test/30/11/03/12/21/_3769975517.jpg?width=2700&height=900",
              text: null,
              type: "",
              pc: null,
              mobile: null,
              flashSaleBeginDate: null,
              flashSaleEndDate: null,
              floorMark: "banner1",
            },
            {
              img: "https://mpi.halaracdn.com/update/test/25/14/03/12/21/_6784496228.jpg?width=1200&height=960",
              urlType: 1,
              url: "/collections/sports-bra",
              title: null,
              desc: null,
              btn: null,
              largeImg:
                "https://mpi.halaracdn.com/update/test/26/14/03/12/21/_7167574521.jpg?width=1350&height=900",
              text: null,
              type: "",
              pc: null,
              mobile: null,
              flashSaleBeginDate: null,
              flashSaleEndDate: null,
              floorMark: "banner2",
            },
          ],
        },
      },
      {
        type: "category",
        floorMark: "shopshow",
        style: "",
        layoutType: "",
        flashSale: 1,
        position: 2,
        data: {
          title: null,
          urlType: null,
          url: "",
          data: [
            {
              img: null,
              urlType: null,
              url: "",
              title: null,
              desc: null,
              btn: null,
              largeImg: null,
              text: null,
              type: "",
              pc: null,
              mobile: {
                rank: "2",
                pageRow: 1,
                data: [
                  {
                    img: "https://mpi.halaracdn.com/update/test/28/14/03/12/21/_4153872751.jpg?width=1350&height=900",
                    urlType: 1,
                    url: "/collections/20211120-test",
                    floorMark: "catgreay1",
                  },
                  {
                    img: "https://mpi.halaracdn.com/update/test/29/14/03/12/21/_6960525422.jpg?width=1350&height=900",
                    urlType: 1,
                    url: "/collections/Shorts",
                    floorMark: "catgreay2",
                  },
                ],
              },
              flashSaleBeginDate: null,
              flashSaleEndDate: null,
              floorMark: "",
            },
          ],
        },
      },
      {
        type: "category",
        floorMark: "category11111",
        style: "",
        layoutType: "",
        flashSale: 1,
        position: 3,
        data: {
          title: "category",
          urlType: null,
          url: "",
          data: [
            {
              img: null,
              urlType: null,
              url: "",
              title: null,
              desc: null,
              btn: null,
              largeImg: null,
              text: null,
              type: "",
              pc: null,
              mobile: {
                rank: "2",
                pageRow: 1,
                data: [
                  {
                    img: "https://mpi.halaracdn.com/update/test/42/15/02/12/21/_1921716936.jpg?width=750&height=870",
                    urlType: 1,
                    url: "/collections/skc-sortby-lm",
                    floorMark: "category222",
                  },
                  {
                    img: "https://mpi.halaracdn.com/update/test/42/15/02/12/21/_3800059988.jpg?width=750&height=870",
                    urlType: 1,
                    url: "/collections/NewUserGifts",
                    floorMark: "category333333",
                  },
                ],
              },
              flashSaleBeginDate: null,
              flashSaleEndDate: null,
              floorMark: "",
            },
          ],
        },
      },
      {
        type: "MainDisplayBox",
        floorMark: "",
        style: "",
        layoutType: "",
        flashSale: 2,
        position: 4,
        data: {
          title: "故事模块",
          urlType: null,
          url: "",
          data: [
            {
              img: "https://mpi.halaracdn.com/update/test/44/15/02/12/21/_0226913126.jpg?width=342&height=342",
              urlType: 1,
              url: "/collections/eredfs",
              title: "故事模块",
              desc: null,
              btn: null,
              largeImg: null,
              text: null,
              type: "",
              pc: null,
              mobile: null,
              flashSaleBeginDate: null,
              flashSaleEndDate: null,
              floorMark: "history",
            },
          ],
        },
      },
      {
        type: "hList",
        floorMark: "",
        style: "",
        layoutType: "horizontal",
        flashSale: 2,
        position: 5,
        data: {
          title: "hlist标题",
          urlType: null,
          url: "",
          data: [
            {
              img: null,
              urlType: 1,
              url: "activity-collection-2030",
              title: "hlist",
              desc: null,
              btn: null,
              largeImg: null,
              text: null,
              type: "",
              pc: null,
              mobile: null,
              flashSaleBeginDate: null,
              flashSaleEndDate: null,
              floorMark: "hlist",
            },
          ],
        },
      },
      {
        type: "MainType",
        floorMark: "minType",
        style: "",
        layoutType: "",
        flashSale: 2,
        position: 6,
        data: {
          title: null,
          urlType: null,
          url: "",
          data: [
            {
              img: "https://mpi.halaracdn.com/update/test/24/14/03/12/21/_0335572249.jpg?width=1200&height=960",
              urlType: 1,
              url: "/collections/test-buy-more",
              title: "这是标题",
              desc: null,
              btn: "More",
              largeImg: null,
              text: null,
              type: "",
              pc: null,
              mobile: null,
              flashSaleBeginDate: null,
              flashSaleEndDate: null,
              floorMark: "mintype",
            },
          ],
        },
      },
      {
        type: "seo",
        floorMark: null,
        style: "",
        layoutType: null,
        flashSale: null,
        position: 10000,
        data: {
          title: "",
          urlType: null,
          url: "",
          data: [
            {
              keyWord: "22222",
              seoTitle: "index-halara",
              seoDesc: "index-halara",
            },
          ],
        },
      },
      {
        data: {
          testFE: {
            groupKey: "B",
            groupParam: "",
          },
        },
        type: "abTest",
      },
      {
        data: [
          "token = werwerwer; path=/;   Expires=Wed, 07-Dec-2023 11:52:20 GMT; domain=dev.doublefs.com; httponly",
          "device-id = werwerwer; path=/;   Expires=Wed, 07-Dec-2023 11:52:20 GMT; domain=dev.doublefs.com; httponly",
          "device-idw = werwerwer; path=/;   Expires=Wed, 07-Dec-2023 11:52:20 GMT; domain=dev.doublefs.com; httponly; samesite=none; secure",
          "token1 = werwerwer; path=/;   Expires=Wed, 07-Dec-2023 11:52:20 GMT; domain=dev.doublefs.com; httponly",
        ],
        type: "cookies",
      },
    ],
    success: true,
  };
  ctx.cookies.set("testAB--TEST", "hello world", {
    domain: ".doublefs.com", // 写cookie所在的域名
    path: "/", // 写cookie所在的路径
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date("2087-02-15"), // cookie失效时间
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: false, // 是否允许重写
    // secure: false,
    // sameSite: "none",
  });
  ctx.body = data; //JSON.stringify(data);
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
