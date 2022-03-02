/*
 * @Author: yuyongxing
 * @Date: 2022-02-25 13:55:12
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-02 16:42:22
 * @Description: 
 */

const nodeMailer = require('nodemailer');
const axios = require('axios');
const { userConfig, tos } = require('./mail.config.js')


const transporter = nodeMailer.createTransport({
    service: userConfig.service,
    auth: {
        user: userConfig.user,
        pass: userConfig.pass
    }
});

// 签到
const handleCheckIn = async (cookie) => {
    let { data } = await axios({
        url: "https://api.juejin.cn/growth_api/v1/check_in",
        method: 'post',
        headers: { Cookie: cookie }
    })
    return data
}
// 免费抽奖
const handleDraw = async (cookie) => {
    let { data } = await axios({
        url: "https://api.juejin.cn/growth_api/v1/lottery/draw",
        method: 'post',
        headers: { Cookie: cookie }
    })
    return data
}
// 沾喜气
const handleDipLucky = async (cookie, param) => {
    let { data } = await axios({
        url: "https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky",
        method: 'post',
        data: param,
        headers: { Cookie: cookie }
    })
    return data
}

const sendEmail = (to, subject, text) => {
    transporter.sendMail({ from: userConfig.user, to, subject, text }, (err) => {
        if (err) {
            console.log(`发送邮件失败：${err}`);
        }
    })
}
exports.todo = async () => {
    let title = ""
    let text = ""
    for (let i = 0, len = tos.length; i < len; i++) {
        let to = tos[i]
        let checkIn_res = await handleCheckIn(to.cookie)
        let draw_res = await handleDraw(to.cookie)
        let dipLucky_res = await handleDipLucky(to.cookie, { lottery_history_id: "7067730184450867235" })
        console.log(checkIn_res)
        console.log(draw_res)
        console.log(dipLucky_res)
        if (checkIn_res.err_no == 0 && draw_res.err_no == 0 && dipLucky_res.err_no == 0) {
            title = "签到、免费抽奖、沾喜气成功"
            text = `签到成功，本次获得 ${checkIn_res.data.incr_point} 矿石；免费抽奖获得 ${draw_res.data.lottery_name}；沾喜气获得 ${dipLucky_res.data.dip_value} 幸运值`
            sendEmail(to.email, title, text)
        } else {
            title = "签到、免费抽奖、沾喜气失败"
            text = ''
            let map = [
                { name: "签到", data: checkIn_res },
                { name: "抽奖", data: draw_res },
                { name: "沾喜气", data: dipLucky_res }]
            for (let j = 0; j < 3; j++) {
                if (map[j].data.err_no != 0) {
                    text += `${map[j].name}失败，错误原因为：${map[j].data.err_msg};`
                }
            }
            console.log(text, to.email)
            sendEmail(to.email, title, text)
        }
    }
}

