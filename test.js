// 实现深copy

//  实现实现该函数，start()后等1秒输出1，再等2秒输出2，再等3秒输出3.
// new Queue()
//   .task(1000, () => console.log(1))
//   .task(2000, () => console.log(2))
//   .task(3000, () => console.log(3))
//   .start();
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("resolve3");
    console.log("timer1");
  }, 0);
  resolve("resovle1");
  resolve("resolve2");
})
  .then((res) => {
    console.log(res); // resolve1
    setTimeout(() => {
      console.log(p1);
    }, 1000);
  })
  .finally((res) => {
    console.log("finally", res);
  });
