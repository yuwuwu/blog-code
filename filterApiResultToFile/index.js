/*
 * @Author: yuwuwu
 * @Date: 2024-06-28 13:36:37
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-07-31 18:39:06
 * @FilePath: /markdown-code/getApiInfoToFile/index.js
 * @Description:
 */
const { getGoodsBySku } = require('./src/api');
const { writeToFile, waitTime } = require('./src/utils');

const start = async () => {
  for (let i = 3000; i <= 4000; i++) {
    try {
      if (i % 50 == 0) {
        await waitTime(30000);
      } else {
        await waitTime(2000);
      }
      const result = await getGoodsBySku(i);
      console.log(result?.data?.title, i, result?.data?.quantity);
      if (result.code == 1000 && result?.data?.title?.includes('R10')) {
        writeToFile(result);
      }
    } catch (error) {
      console.log(i, '错误');
      await waitTime(10000);
    }
  }
};
start();
