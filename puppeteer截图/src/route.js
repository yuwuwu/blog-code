/*
 * @Author: yuyongxing
 * @Date: 2022-01-14 14:29:07
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-14 14:38:49
 * @Description: 
 */
const getImg = require('./puppeteer.js')

module.exports = app => {
    app.post('/api/getShareImg', (req, res) => {
        let params = req.body
        let errorMap = {
            width: "海报宽度",
            height: "海报高度",
            url: "生成海报页面地址",
            ele: "截取的元素",
        }
        for (let i in errorMap) {
            if (!params[i]) {
                res.json({
                    code: 0,
                    msg: `${errorMap[i]}必传`
                })
                return
            }
        }
        getImg(req.body).then(file => {
            res.json({
                code: 1,
                data: file,
                msg: ""
            })
        }).catch(err => {
            res.json({
                code: 0,
                data: null,
                msg: "海报生成失败",
                err: String(err)
            })
        })
    });
}