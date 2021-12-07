/*
 * @Author: yuyongxing
 * @Date: 2021-11-23 21:54:35
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-07 18:13:30
 * @Description: 
 */
let callback1 = () => {
    setTimeout(() => {
        console.log("callback1")
        callback2()
    }, 1000);
}
let callback2 = () => {
    setTimeout(() => {
        console.log("callback2")
    }, 500);
}
callback1()

let promise = (name) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(name)
        resolve()
    }, 1000);
})

// promise("1").then(()=>{
//     return promise("2")
// }).then(()=>{
//     return promise("3")
// })

let generator = function* () {
    yield promise(1)
    yield promise(2)
}
console.log(generator())
generator().next()
// generator().next()
let co = generator => {
    if (it = generator.next().value) {
        it.then(res => {
            co(generator)
        })
    } else {
        return
    }
}

let asyncAwait = async () => {
    await promise("asyncAwait 1")
    await promise("asyncAwait 2")
    await promise("asyncAwait 3")
}
asyncAwait()

let event = (name) => {
    event => {
        setTimeout(() => {
            console.log(name)
            event.emit('end')
        }, 1000);
        return event
    }
}