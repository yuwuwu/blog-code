/*
 * @Author: yuwuwu
 * @Date: 2024-06-17 17:27:34
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-07-17 15:03:53
 * @FilePath: /markdown-code/查询淘宝商品是否补货脚本/index_wx.js
 * @Description:
 */
const getWxGoods = require('./src/getGoodsByWx.js');
const sendEmail = require('./src/sendEmail.js');

const wx_r10_sku_list = ['3020', '3021', '3024', '3025', '3390'];
// const wx_r10_sku_list = ['3127', '3409', '3410'];

const start = async () => {
  const wx_goods = await getWxGoods(wx_r10_sku_list);
  let wx_text = '';
  let isError = false;
  wx_goods.forEach((item) => {
    if (!item.isSuccess) isError = true;
    if (item.hasStock) {
      wx_text += `【${item.title}】\n`;
    }
  });
  if (isError) {
    await sendEmail('出错了', wx_text);
  } else if (!isError && wx_text.length > 0) {
    await sendEmail('商品补货提醒', wx_text);
  }
  console.log(wx_goods);
  console.log(wx_text);
  return JSON.stringify(wx_goods);
};

start();
