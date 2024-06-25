/*
 * @Author: yuwuwu
 * @Date: 2024-06-17 17:27:34
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-25 18:30:35
 * @FilePath: /查询淘宝商品是否补货脚本/index_wx.js
 * @Description:
 */
const getWxGoods = require("./src/getGoodsByWx.js");
const sendEmail = require("./src/sendEmail.js");


// const wx_sku_list = ['3027','3127','3021','3132','3133','3130','3131','3162','3249']
const wx_sku_list = ["1727"];

const start = async () => {
  // const tb_goods = await getTbGoods(tb_goods_url);
  const wx_goods = await getWxGoods(wx_sku_list);
  console.log(wx_goods);
  let wx_text = "";
  let isError = false;
  wx_goods.forEach((item) => {
    if (!item.isSuccess) isError = true;
    if (item.hasStock) {
      wx_text += `【${item.title}】\n`;
    }
  });
  if (isError) {
    await sendEmail("出错了", wx_text);
  } else if (!isError && wx_text.length > 0) {
    await sendEmail("商品补货提醒", wx_text);
  }
};

start();
