/*
 * @Author: yuyongxing
 * @Date: 2022-02-25 13:55:12
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-08-15 17:37:25
 * @Description:
 */

const nodeMailer = require('nodemailer');
const axios = require('axios');
const { userConfig, tos } = require('./project.config.js');

const transporter = nodeMailer.createTransport({
  service: userConfig.service,
  auth: {
    user: userConfig.user,
    pass: userConfig.pass,
  },
});

// 签到
const handleCheckIn = async (to) => {
  //   console.log(to);
  let { data } = await axios({
    url: `https://api.juejin.cn/growth_api/v1/check_in?aid=${to.aid}&uuid=6896773487046772237&spider=0&msToken=NORaB16qRadvMM6mPbOFlJ5jQFLNA4W6-IaU3I3LvXsW83WvwFPvrJqqH3kFuwCnImt0DjhKkjif91CG9tC5FIohyUtF8u32xZpzzpmOoRPNoNf_IIQC_XttU6SHnOQ%3D&a_bogus=D7-DkcZ0Msm1ah3B6XDz9GjEiQE0YWRqgZEPq9xt60qs`,
    method: 'post',
    data: '{}',
    headers: {
      cookie: to.cookie,
      origin: 'https://juejin.cn',
      referer: 'https://juejin.cn/',
      'sec-ch-ua':
        '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
      'x-secsdk-csrf-token':
        '00010000000187c2f68fe0e28d9e05b01be8ccd29f21d1366734f094c53c64918dccef8358a517ebda42161b0419',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'content-type': 'application/json',
    },
  }).catch((error) => {
    console.log(error);
  });
  console.log(data);
  return data;
};
// 免费抽奖
const handleDraw = async (to) => {
  let { data } = await axios({
    url: 'https://api.juejin.cn/growth_api/v1/lottery/draw?aid=2608&uuid=6896773487046772237&spider=0&msToken=u9y8aUE5NL9Dm72ELGOwvjkIuivjSaGiNAi2jhJx9V27Gyq2jgPYa7SQG-bc1x0M1iDQ3No2-ScPCDcrdzey6NF0zvu6eYLT7MYNfetMuGdW5knYRIRYs4VO8oUxMoFJ&a_bogus=Q74QXOZ0Msm1th3B07Dz97WEiZ80YWRMgZEPqjGolzLW',
    method: 'post',
    data: '{}',
    headers: {
      cookie: to.cookie,
      origin: 'https://juejin.cn',
      referer: 'https://juejin.cn/',
      'sec-ch-ua':
        '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
      'x-secsdk-csrf-token':
        '00010000000187c2f68fe0e28d9e05b01be8ccd29f21d1366734f094c53c64918dccef8358a517ebda42161b0419',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'content-type': 'application/json',
    },
  });
  console.log(data);
  return data;
};

const sendEmail = (to, subject, text) => {
  transporter.sendMail({ from: userConfig.user, to, subject, text }, (err) => {
    if (err) {
      console.log(`发送邮件失败：${err}`);
    }
  });
};
const init = async () => {
  let title = '';
  let text = '';
  for (let i = 0, len = tos.length; i < len; i++) {
    let to = tos[i];
    let checkIn_res = await handleCheckIn(to);
    let draw_res = await handleDraw(to);
    if (checkIn_res.err_no == 0 && draw_res.err_no == 0) {
      title = '签到、免费抽奖成功';
      text = `签到成功，本次获得 ${checkIn_res.data.incr_point} 矿石；免费抽奖获得 ${draw_res.data.lottery_name}；`;
      sendEmail(to.email, title, text);
    } else {
      title = '签到、免费抽奖失败';
      text = '';
      let map = [
        { name: '签到', data: checkIn_res },
        { name: '抽奖', data: draw_res },
      ];
      for (let j = 0; j < map.length; j++) {
        if (map[j].data.err_no != 0) {
          text += `${map[j].name}失败，错误原因为：${map[j].data.err_msg};`;
        }
      }
      console.log(text, to.email);
      sendEmail(to.email, title, text);
    }
  }
};
init();
exports.todo = async () => {
  init();
};
