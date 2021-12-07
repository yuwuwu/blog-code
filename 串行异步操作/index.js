/*
 * @Author: yuyongxing
 * @Date: 2021-11-23 21:54:35
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-07 14:02:18
 * @Description: 
 */
let callback = (name) => {
    setTimeout(() => {
        console.log(name)
    }, 1000);
}
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