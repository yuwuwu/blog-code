/*
 * @Author: yuyongxing
 * @Date: 2021-11-08 17:07:50
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-08 18:45:57
 * @Description: 
 */
const fs = require('fs')
const path = require('path')
let arr = []
for (let i = 100; i < 600; i=i+10) {
    arr.push({ x: 100, y: i })
}
for (let i = 100; i < 600; i=i+10) {
        arr.push({ x: i, y: 600 })
}
// for (let i = 100; i < 600; i++) {
//         arr.push({ x: 600, y: i })
// }
// for (let i = 600; i > 100; i--) {
//         arr.push({ x: i, y: 600})
// }
// for (let i = 600; i > 100; i--) {
//         arr.push({ x: 100, y: i })
// }

let str = JSON.stringify(arr, "", "\t")

fs.writeFile('data.json', str, function (err) {
    if (err) { res.status(500).send('Server is error...') }
})