const { getGoodsBySku } = require('./getGoodsInfoBySku');
const { writeToFile, waitTime } = require('../utils');

const start = async () => {
  for (let i = 3000; i <= 5000; i++) {
    try {
      if (i % 50 == 0) {
        await waitTime(5000);
      } else {
        await waitTime(2000);
      }
      const result = await getGoodsBySku(i);
      console.log(result?.data?.title, i, result?.data?.quantity);
      if (result.code == 1000 && result?.data?.title?.includes('AD-E1')) {
        writeToFile(result);
      }
    } catch (error) {
      console.log(i, '错误');
      await waitTime(10000);
    }
  }
};
start();
