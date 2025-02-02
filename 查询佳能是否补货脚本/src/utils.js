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
const writeToFile = async (data, fileName = '处理后的数据.json') => {
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
/*
 * 生成随机字符串
 * @param {number} length
 * @returns {string}
 */
const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};
/**
 * 获取当前时间戳
 * @returns {number}
 */
const getTimestamp = () => Date.now();
module.exports = {
  writeToFile,
  deleteFile,
  waitTime,
  generateRandomString,
  getTimestamp,
};
