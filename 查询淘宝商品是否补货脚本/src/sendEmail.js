/*
 * @Author: yuwuwu
 * @Date: 2024-06-18 20:42:07
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-18 21:50:07
 * @FilePath: \查询淘宝商品是否补货脚本\src\sendEmail.js
 * @Description: 发送邮件
 */
const nodeMailer = require("nodemailer");
const config = {
  user: "yyxpublic@163.com",
  pass: "OGUNCKJWTQUFEETJ",
  to: "yuyongxing@pxene.com",
};

const transporter = nodeMailer.createTransport({
  service: "163",
  auth: {
    user: config.user,
    pass: config.pass,
  },
});
const sendEmail = async (text = "") => {
  await transporter.sendMail({
    from: config.user,
    to: config.to,
    subject: "补货啦",
    text,
  });
};
module.exports = sendEmail;
