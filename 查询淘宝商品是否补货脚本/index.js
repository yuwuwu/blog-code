/*
 * @Author: yuwuwu
 * @Date: 2024-06-17 17:27:34
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-18 18:42:46
 * @FilePath: /查询淘宝商品是否补货脚本/index.js
 * @Description:
 */
const getTbGoods = require("./getGoodsByTb");
const getWxGoods = require("./getGoodsByWx");


const tb_goods_url = [
  { url: "https://detail.tmall.com/item.htm?id=677388240047", title: "R10" },
  { url: "https://detail.tmall.com/item.htm?id=702916527846", title: "R50" },
  { url: "https://detail.tmall.com/item.htm?id=623306082845", title: "R5" },
];
const wx_sku_list = ['3027','3127','3021']

const start = async () => {
  // const tb_goods = await getTbGoods(tb_goods_url);
  const wx_goods = await getWxGoods(wx_sku_list);
}

start();