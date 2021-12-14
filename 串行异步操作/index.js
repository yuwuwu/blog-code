/*
 * @Author: yuyongxing
 * @Date: 2021-12-07 21:54:35
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-14 17:30:28
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


let generator1 = function(){
    setTimeout(() => {
        console.log("generator1")
        it.next("generator1")
    }, 2000);
}
let generator2 = function(){
    setTimeout(() => {
        console.log("generator2")
        it.next()
    }, 1500);
}
let generator = function* () {
    yield generator1()
    yield generator2()
}
let it = generator()
it.next()



let generator3 = ()=>new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("promise1")
            resolve()
        }, 2000);
    })
let generator4 = function(){
    setTimeout(() => {
        console.log("generator2")
        it.next()
    }, 1500);
}



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