/*
 * @Author: yuyongxing
 * @Date: 2021-12-07 21:54:35
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-19 15:49:58
 * @Description: 
 */



// callback方式

// let callback1 = () => {
//     setTimeout(() => {
//         console.log("callback1")
//         callback2("callback1")
//     }, 1000);
// }
// let callback2 = (data) => {
//     setTimeout(() => {
//         console.log("callback2","传入的数据"+data)
//     }, 500);
// }
// callback1()


// promise方式

// let promise1 = () => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("promise1")
//         resolve("promise1")
//     }, 2000);
// })
// let promise2 = (data) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("promise2", "传入的数据" + data)
//         resolve()
//     }, 1500);
// })
// promise1()
//     .then((res) => {
//         return promise2(res)
//     })
//     .then(() => {
//     })


// generator方式

// let generator1 = function () {
//     setTimeout(() => {
//         console.log("generator1")
//         it.next("generator1")
//     }, 2000);
// }
// let generator2 = function (data) {
//     setTimeout(() => {
//         console.log("generator2", "传入的数据" + data)
//         it.next()
//     }, 1500);
// }
// let generator = function* () {
//     let result = yield generator1()
//     yield generator2(result)
// }
// let it = generator()
// it.next()


// let co = require('co')
// let generator3 = () => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("generator3")
//         resolve("generator3")
//     }, 2000);
// })
// let generator4 = (data) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("generator4", "传入的数据" + data)
//         resolve("generator4")
//     }, 2000);
// })
// let generatorByCo = function* () {
//     let result = yield generator3()
//     let result2 = yield generator4(result)
//     return result2
// }
// co(generatorByCo).then(res => {
//     console.log(res)
// })
// 等同于
// let itByCo = generatorByCo()
// itByCo.next().value.then(res=>{
//     itByCo.next(res).value.then(res=>{
//        let data =  itByCo.next(res).value
//     })
// })


// async/await方式

// let asyncAwait1 = () => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("asyncAwait1")
//         resolve("asyncAwait1")
//     }, 1000);
// })
// let asyncAwait2 = (data) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("asyncAwait2", "传入的数据" + data)
//         resolve()
//     }, 1000);
// })
// async function async() {
//     let result = await asyncAwait1()
//     await asyncAwait2(result)
// }
// async()


// 事件监听方式
let events = require("events")
let emitter = new events.EventEmitter()
let event1 = () => {
    setTimeout(() => {
        console.log("event1")
        emitter.emit("end","event1")
    }, 1000);
}
let event2 = (data) => {
    setTimeout(() => {
        console.log("event2", "传入的数据" + data)
    }, 1000);
}
emitter.on("end",event2)
event1()
