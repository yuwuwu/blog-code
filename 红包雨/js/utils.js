/*
 * @Author: yuyongxing
 * @Date: 2022-01-17 18:05:32
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-17 18:13:43
 * @Description: 
 */

/**
 * count:要生成的数组长度
 * sum:生成的整数之和
 */
function getPointsByCount(count, sum) {
  return sortArr(randnum(count, sum))
}
// 打乱数组
function sortArr(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    const curRandom = parseInt(Math.random() * (len - 1));
    const cur = arr[i];
    arr[i] = arr[curRandom];
    arr[curRandom] = cur;
  }
  return arr;
}
// 生成n项和为max的数组
function randnum(n, max) {
  function random(Min, Max) {
    if (Max > 5)Max = 5
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  }
  var arr = [];
  if (max > 0) {
    for (var i = 0; i < n; i++) {
      var num = 0;
      if (i === (n - 1)) {
        num = max;
      } else {
        if (max <= 0) {
          num = max = 0;
        } else {
          num = random(0, max);
          max -= num;
        }
      }
      arr.push(num);
    }
  }
  return arr;
}
