/*
 * @Author: yuyongxing
 * @Date: 2021-12-07 21:54:35
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-13 22:59:55
 * @Description: 
 */


// let callback1 = (callback) => {
//     setTimeout(() => {
//         console.log("callback1")
//         callback()
//     }, 1000);
// }
// let callback2 = () => {
//     setTimeout(() => {
//         console.log("callback2")
//     }, 500);
// }
// callback1(callback2)

// let promise1 = () => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("promise1")
//         resolve()
//     }, 2000);
// })
// let promise2 = () => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("promise2")
//         resolve()
//     }, 1500);
// })

// promise1()
//     .then(() => {
//         return promise2()
//     })
//     .then(() => {

//     })


let promise = (name) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(name)
        resolve()
    }, 1000);
})
let g1 = function(){
    setTimeout(() => {
        console.log(12)
    }, 2000);
}
let generator = function* () {
    yield g1()
    yield promise("generator2")
}
let it = generator()
it.next()
it.next()



// let asyncAwait = async () => {
//     await promise("asyncAwait1")
//     await promise("asyncAwait2")
//     await promise("asyncAwait3")
// }
// asyncAwait()

// let event = (name) => {
//     event => {
//         setTimeout(() => {
//             console.log(name)
//             event.emit('end')
//         }, 1000);
//         return event
//     }
// }