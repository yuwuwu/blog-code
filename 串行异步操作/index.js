/*
 * @Author: yuyongxing
 * @Date: 2021-12-07 21:54:35
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-13 20:17:47
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
// callback1()

let promise1 = (name) => new Promise((resolve) => {
    setTimeout(() => {
        console.log("promise1")
        resolve()
    }, 2000);
})
let promise2 = (name) => new Promise((resolve) => {
    setTimeout(() => {
        console.log("promise2")
        resolve()
    }, 1500);
})

promise1().then(()=>{
    return promise2()
}).then(()=>{
    
})


let promise = (name) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(name)
        resolve()
    }, 1000);
})
let generator = function* () {
    yield promise("generator1")
    yield promise("generator2")
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
    await promise("asyncAwait1")
    await promise("asyncAwait2")
    await promise("asyncAwait3")
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