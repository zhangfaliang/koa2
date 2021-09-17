// 1 数组去重
// const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

//  2 深copy

//  3 实现实现该函数，start()后等1秒输出1，再等2秒输出2，再等3秒输出3.
new Queue()
  .task(1000, () => console.log(1))
  .task(2000, () => console.log(2))
  .task(3000, () => console.log(3))
  .start();
