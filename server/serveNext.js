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
app.use(cors({
  origin: function(ctx) {
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
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


router.get("/me/api/pay-result", (ctx, next) => {
  console.log(ctx);
  console.log(ctx.query);
  const orderNo = ctx?.query?.orderNo;
  const data = {
    code: 0,
    data: {
        orderDetail: {
            billingAddress: {
                addressLineOne: '16840 E Maplewood Ave',
                addressLineTwo: '',
                city: 'Centennial',
                country: 'United States',
                firstName: 'Hannah',
                id: 736587,
                iso: 'US',
                lastName: 'Sims',
                phoneNumber: '+17202401781',
                postCode: '80016',
                province: 'Colorado',
            },
            buttons: [
                {
                    alertMsg: '',
                    enable: true,
                    key: 'Cancel',
                    text: 'Cancel',
                },
                { enable: true, key: 'Edit Address', text: 'Edit Address' },
            ],
            order: {
                costPrice: '49.40',
                currency: 'USD',
                discountedPrice: '0.00',
                displayCurrency: 'USD',
                displayCurrencySign: '$',
                displayDiscountedPrice: '0.00',
                displayGoodsPrice: '49.40',
                displayLinePrice: '61.40',
                displayPayPrice: '49.40',
                displayShippingPrice: '0.00',
                displayTotalPrice: '49.40',
                email: 'Hannah.rsims8@gmail.com',
                ifFreeShipping: false,
                orderName: '210802025807297988',
                orderNo: orderNo,
                orderTime: 'Aug 02, 2021',
                releasePrice: '49.40',
                shippingFee: '0.00',
                sign: '$',
                status: 'Confirmed',
                totalLinePrice: '61.40',
                virtualOrderNo: '210802025542739',
                activityLabelList: {
                    '8': '团购',
                },
                activityOrderNo: 'wr34534543',
                open: 1, // 1 开团 0 加团
            },
            products: [
                {
                    color: 'Black',
                    costPrice: '1.45',
                    currency: 'USD',
                    discounted: false,
                    discountedPrice: '0.00',
                    displayCurrency: 'USD',
                    displayCurrencySign: '$',
                    displayDiscountedPrice: '0.00',
                    displayDividePrice: '1.45',
                    displayGoodsPrice: '1.45',
                    displayLinePrice: '1.45',
                    displayPayPrice: '1.45',
                    dividePrice: '1.45',
                    giveaway: false,
                    ifChange: false,
                    ifFreeGoods: false,
                    img:
                        'https://mpi.halaracdn.com/c7f00f8e-d935-4f5e-83c8-1adae1153ee8_10_158607_1669805.png',
                    linePrice: '1.45',
                    payPrice: '1.45',
                    preSaleTimeLong: 0,
                    preSaleTips: '',
                    quantity: 1,
                    releasePrice: '1.45',
                    resourceId: 1105217,
                    returnAndExchange: false,
                    searchKey: 'default-158607',
                    selected: true,
                    shopifySkuId: '37501568680102',
                    shopifySpuId: '6060413616294',
                    showLinePrice: false,
                    sign: '$',
                    size: 'One Size',
                    skcId: 1669805,
                    skuCode: 'WsHairAcc-NP4JF-SX010704-46-OS',
                    spuId: 158607,
                    title: 'Solid-Color Scrunchie',
                },
                {
                    activityName: '20% OFF',
                    color: 'Midnight Adventure - Black',
                    costPrice: '47.95',
                    currency: 'USD',
                    discounted: false,
                    discountedPrice: '0.00',
                    displayCurrency: 'USD',
                    displayCurrencySign: '$',
                    displayDiscountedPrice: '0.00',
                    displayDividePrice: '47.95',
                    displayGoodsPrice: '47.95',
                    displayLinePrice: '59.95',
                    displayPayPrice: '47.95',
                    dividePrice: '47.95',
                    giveaway: false,
                    ifChange: false,
                    ifFreeGoods: false,
                    img:
                        'https://mpi.halaracdn.com/7fb529e6-a138-45da-bba3-c2fffa26cd39_10_160857_1675044.png',
                    linePrice: '59.95',
                    payPrice: '47.95',
                    preSaleTimeLong: 0,
                    preSaleTips: 'Hurry! Selling Out Fast!',
                    quantity: 1,
                    releasePrice: '47.95',
                    resourceId: 1126250,
                    returnAndExchange: true,
                    searchKey: 'default-160857',
                    selected: true,
                    shopifySkuId: '39957607448742',
                    shopifySpuId: '6737358094502',
                    showLinePrice: true,
                    sign: '$',
                    size: '2X',
                    skcId: 1675044,
                    skuCode: 'WpOnePic-GCTH5-TC2000045-46-2X',
                    spuId: 160857,
                    title: 'In My Feels Everyday Dress-Wannabe',
                },
            ],
            shippingAddress: {
                addressLineOne: '16840 E Maplewood Ave',
                addressLineTwo: '',
                city: 'Centennial',
                country: 'United States',
                firstName: 'Hannah',
                id: 736586,
                iso: 'US',
                lastName: 'Sims',
                phoneNumber: '+17202401781',
                postCode: '80016',
                province: 'Colorado',
            },
            showFlagInfo: { showFlagType: 2 },
            splitPackage: false,
        },
        payInfo: {
            msg: '',
            orderNo: '210802025807wer43534297988',
            payFinishTime: 1627873089000,
            payStatus: 'PROCESS',
            // PROCESS PAY_FAILED PAID
            payTime: '2021-08-02 02:58:09',
            tradeNo: '21080202580100000225',
            payMethodCode: 'klarna',
        },
    },
    msg: 'success',
    success: true,
  }
  ctx.body = JSON.stringify(data);
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
