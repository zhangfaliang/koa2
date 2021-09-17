// 反转字符串中的单词

// 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

// 示例： 输入："Let's take LeetCode contest" 输出："s'teL ekat edoCteeL tsetnoc"

// 提示：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。

// class Solution { public String reverseWords(String s) {

const foo = (str) => {
  const arr = str.split(/ /g);
  let processStr = "";
  for (let str1 of arr) {
    processStr += str1.split("").reverse().join("") + " ";
  }
  return processStr;
};

// const res = foo("Let's take LeetCode contest");

// console.log(res);

const bar = (str) => {
  const arr = [];
  str.replace(/\d|\D/g, (out) => {
    arr.push(out);
  });
  return arr.reverse().join("");
};
const res = bar("Let's take LeetCode contest");

console.log(res);
