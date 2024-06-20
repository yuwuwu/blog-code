/*
 * @Author: yuwuwu
 * @Date: 2024-06-18 18:19:12
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-20 19:43:58
 * @FilePath: /markdown-code/查询淘宝商品是否补货脚本/src/getGoodsByWx.js
 * @Description:查询小程序商城是否有货，有货自动下单
 */

const request = require("./request.js");
const { wxConfig } = require("../project.config.js");

const getTimestamp = () => Date.now();
const goodsBaseUrl = "";

// 预下单
const buyGoods = async (sku) => {
  const url = `https://shop.canon.com.cn/jiekec/index.php?route=mini/checkout/buy/product`;
  const { data } = await request({
    method: "post",
    url,
    data: {
      s_channel: "",
      b_channel: "",
      timestamp: getTimestamp(),
      gate_token: wxConfig.gate_token,
      installment_count: 0,
      productinfo: `${sku}-1`,
      careinfo: `${sku}-0`,
      uid: wxConfig.uid,
      token: wxConfig.token,
      gate_id: "MINIGATE",
    },
  });
  console.log("buyGoods", data);
  return data;
};
// 确认下单
const confirmBuyGoods = async (sku) => {
  const url = `https://shop.canon.com.cn/jiekec/index.php?route=mini/checkout/buy/confirm`;
  const { data } = await request({
    method: "post",
    url,
    data: {
      s_channel: "",
      b_channel: "",
      timestamp: getTimestamp(),
      gate_token: wxConfig.gate_token,
      installment_count: 0,
      productinfo: `${sku}-1`,
      careinfo: `${sku}-0`,
      payment_method: "weixin",
      address_id: "199326",
      invoice_id: undefined,
      coupon_id: 0,
      uid: wxConfig.uid,
      token: wxConfig.token,
      gate_id: "MINIGATE",
    },
  });
  console.log("confirmBuyGoods", data);
  return data;
};
// 获取商品有无库存
const getWxGoods = async (skuList) => {
  const result = [];
  try {
    for (let sku of skuList) {
      const url = `https://shop.canon.com.cn/jiekec/index.php?route=mini/catalog/product/productinfo&s_channel=&b_channel=&timestamp=${getTimestamp}&gate_token=${wxConfig.gate_token}&product_id=${sku}`;
      const { data } = await request({
        method: "get",
        url,
      });
      result.push({
        isSuccess: data.code === 1000,
        hasStock: data.data.quantity != "0",
        title: data.code === 1000 ? data.data.title : JSON.stringify(data),
      });
      if (data.code === 1000 && data.data.quantity !== "0") {
        const buyRes = await buyGoods(sku);
        if (buyRes.code === 1000) {
          const confirmRes = await confirmBuyGoods(sku);
          if (confirmRes.code === 1000) {
            await sendEmail("下单成功", "");
          }
        }
      }
    }
  } catch (error) {
    result.push({
      isSuccess: false,
      hasStock: false,
      title: JSON.stringify(error),
    });
  }

  return result;
};

module.exports = getWxGoods;
