/*
 * @Author: yuwuwu
 * @Date: 2024-07-31 20:01:53
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-07-31 22:41:42
 * @FilePath: /markdown-code/getApiInfoToFile/code.js
 * @Description:
 */
const { checkCode } = require('./src/api');
const { generateRandomString } = require('./src/utils');

const run = async () => {
  const code = generateRandomString();
  const res = await checkCode(code);
  if (res.code != 1003) {
    console.log(res, code);
  }
  // console.log(res, code);
  return res;
};
let count = 0;
const timer = setInterval(() => {
  count++;
  try {
    run();
    if (count >= 10000) {
      console.log('done');
      clearInterval(timer);
    }
  } catch (error) {
    console.log('error', error);
    clearInterval(timer);
  }
}, 100);
