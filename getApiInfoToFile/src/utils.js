/*
 * @Author: yuwuwu
 * @Date: 2024-06-28 14:06:13
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-28 15:48:53
 * @FilePath: /markdown-code/getApiInfoToFile/src/utils.js
 * @Description:
 */
const fs = require('fs');

/**
 * 判断文件是否存在
 * @param {*} fileName
 * @returns
 */
const accessFile = async (fileName) => {
  try {
    await fs.promises.access(fileName);
    return true;
  } catch (error) {
    return false;
  }
};
/**
 * 删除文件
 * @param {*} fileName
 */
const deleteFile = async (fileName) => {
  try {
    await fs.promises.unlink(fileName);
    console.log('文件删除成功:', fileName);
  } catch (error) {
    console.error(`文件删除失败:`, error);
  }
};
/**
 * 写入文件
 * @param {*} data
 * @param {*} fileName
 */
const writeToFile = async (data, fileName = 'data.json') => {
  try {
    const exist = await accessFile(fileName);
    if (exist) {
      await fs.promises.appendFile(
        fileName,
        `,${JSON.stringify(data, null, 2)}`
      );
      console.log('文件追加写入成功:');
    } else {
      await fs.promises.writeFile(fileName, JSON.stringify(data, null, 2));
      console.log('文件写入成功:');
    }
  } catch (error) {
    console.error(`文件写入失败:`);
  }
};
/**
 * 等待代码延时
 * @param {} n
 * @returns
 */
const waitTime = (n = 1000) => new Promise((r) => setTimeout(r, n));
module.exports = {
  writeToFile,
  deleteFile,
  waitTime,
};
