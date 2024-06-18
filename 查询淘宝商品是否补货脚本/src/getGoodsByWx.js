/*
 * @Author: yuwuwu
 * @Date: 2024-06-18 18:19:12
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-18 20:39:18
 * @FilePath: \查询淘宝商品是否补货脚本\getGoodsByWx.js
 * @Description:
 */

const axios = require("axios");

const config = {
  baseUrl:
    "https://shop.canon.com.cn/jiekec/index.php?route=mini/catalog/product/productinfo",
  timestamp: 1718704842764,
  gate_token: "fb35417cd0089f2f0c5dbc744bde7461",
};


const getWxGoods = async (skuList) => {
  const result = []
  for (let sku of skuList) {
    const url = `${config.baseUrl}&s_channel=&b_channel=&timestamp=${config.timestamp}&gate_token=${config.gate_token}&product_id=${sku}`;
    const {data} = await axios({
      method: "get",
      url,
      headers: {
        Host: "shop.canon.com.cn",
        token: "",
        "content-type": "application/x-www-form-urlencoded",
        source: "wx_mini",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003135) NetType/WIFI Language/zh_CN",
        Referer:
          "https://servicewechat.com/wxd3d8769854ba9cd1/70/page-frame.html",
      },
    });
    if(data?.code ===1000){
      result.push({
        hasStock:data.data.quantity != '0',
        title:data.data.title,
      })
    }
  }
  return result;
};
module.exports = getWxGoods;
