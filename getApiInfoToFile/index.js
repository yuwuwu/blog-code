/*
 * @Author: yuwuwu
 * @Date: 2024-06-28 13:36:37
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-28 16:50:57
 * @FilePath: /markdown-code/getApiInfoToFile/index.js
 * @Description:
 */
const { getGoodsBySku } = require('./src/api');
const { writeToFile, waitTime } = require('./src/utils');

const start = async () => {
  for (let i = 1201; i <= 1300; i++) {
    try {
      const result = await getGoodsBySku(i);
      await waitTime(3000);
      console.log(result?.data?.title, i, result?.data?.quantity);
      if (
        result.code == 1000 &&
        (result?.data?.title?.includes('R50') ||
          result?.data?.title?.includes('R10'))
      ) {
        writeToFile(result);
      }
    } catch (error) {
      console.log(i, '错误');
    }
  }
};
start();
