/*
 * @Author: yuwuwu
 * @Date: 2024-06-25 15:28:06
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-25 16:59:35
 * @FilePath: /查询淘宝商品是否补货脚本/index_tb.js
 * @Description: 
 */

const getTbGoods = require("./src/getGoodsByTb.js");
const sendEmail = require("./src/sendEmail.js");

const tb_goods_url = [
  { url: "https://detail.tmall.com/item.htm?id=677388240047", title: "R10" },
  { url: "https://detail.tmall.com/item.htm?id=702916527846", title: "R50" },
  // { url: "https://detail.tmall.com/item.htm?id=623306082845", title: "R5" },
];


const start = async () => {
  const tb_goods = await getTbGoods(tb_goods_url);
  console.log(tb_goods);
  let tb_text = "";
  let isError = false;
  tb_goods.forEach((item) => {
    if (item.error) isError = true;
    if (!item.disabled) {
      tb_text += `【${item.title}】 按钮状态：${item.text}\n`;
    }
  });
  if (isError) {
    await sendEmail("淘宝商品查询出错了", tb_text);
  } else if (!isError && tb_text.length > 0) {
    await sendEmail("淘宝商品可能补货", tb_text);
  }
};

start();
