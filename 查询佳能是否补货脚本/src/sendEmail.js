/*
 * @Author: yuwuwu
 * @Date: 2024-06-18 20:42:07
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-07-17 11:26:38
 * @FilePath: /markdown-code/查询淘宝商品是否补货脚本/src/sendEmail.js
 * @Description: 发送邮件
 */
const nodeMailer = require('nodemailer');
const { emailConfig } = require('../project.config.js');

const transporter = nodeMailer.createTransport({
  service: '163',
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});
const sendEmail = async (title = '补货啦', text = '') => {
  await transporter.sendMail({
    from: emailConfig.user,
    to: emailConfig.to,
    subject: title,
    text,
  });
  return true;
};
module.exports = sendEmail;
