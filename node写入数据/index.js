/*
 * @Author: yuyongxing
 * @Date: 2021-11-08 17:07:50
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-08 17:12:47
 * @Description: 
 */
const fs = require('fs')
const path = require('path')
let arr = []
for(let i in 200){
    if(i>100){
        arr.push({x:100,y:i})
    }
}
let str = JSON.stringify(arr,"","\t")

fs.writeFile('data.json', str, function (err) {
    if(err) { res.status(500).send('Server is error...') }
})