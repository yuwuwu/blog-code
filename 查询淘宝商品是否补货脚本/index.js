/*
 * @Author: yuwuwu
 * @Date: 2024-06-17 17:27:34
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-20 17:31:22
 * @FilePath: /markdown-code/查询淘宝商品是否补货脚本/index.js
 * @Description:
 */
const getTbGoods = require("./src/getGoodsByTb.js");
const getWxGoods = require("./src/getGoodsByWx.js");
const sendEmail = require("./src/sendEmail.js");


const tb_goods_url = [
  { url: "https://detail.tmall.com/item.htm?id=677388240047", title: "R10" },
  { url: "https://detail.tmall.com/item.htm?id=702916527846", title: "R50" },
  { url: "https://detail.tmall.com/item.htm?id=623306082845", title: "R5" },
];
const wx_sku_list = ['3027','3127','3021','3132','3133','3130','3131','3162','3249']

const start = async () => {
  // const tb_goods = await getTbGoods(tb_goods_url);
  const wx_goods = await getWxGoods(wx_sku_list);
  let wx_text = ''
  wx_goods.forEach(item=>{
    if(!item.hasStock){
      wx_text +=`【${item.title}】 还有库存\n`
    }
  })
  if(wx_text.length>0){
   await sendEmail(wx_text)
  }
}

// start();