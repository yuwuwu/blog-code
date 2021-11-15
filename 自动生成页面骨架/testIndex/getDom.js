/*
 * @Author: yuyongxing
 * @Date: 2021-11-13 15:01:31
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-15 23:00:51
 * @Description: 
 */
let skeletonHtml = " <style>.skeleton {position: fixed;background: #aaa;background-image: linear-gradient(100deg, #eee 40%, #fff 45%, #eee 50%);animation: opacity 2s ease infinite;background-size: 300% 100%;} @keyframes opacity {0%{opacity: 1;}50%{opacity: 0.4;}100%{opacity: 1;}} </style>"
let removeClass = []
let removeId = []
function getDom(options = { removeElements: [] }) {
    const { removeElements } = options
    for (var i = 0; i < removeElements.length; i++) {
        let el = removeElements[i]
        let reg = /^./
        if (el.match(reg) == ".") {
            removeClass.push(el.substr(1))
        }
        if (el.match(reg) == "#") {
            removeId.push(el.substr(1))
        }
    }
    const dom = document.body
    const nodes = dom.childNodes
    dom.style.overflow = "hidden"
    deepNode(nodes)
    return skeletonHtml
}
// childNodes包含了哪些节点？
// 由childNodes属性返回的数组中包含着所有类型的节点，所有的属性节点和文本节点也包含在其中。（这一点存在疑问,下面有解释）

// 事实上，文档里几乎每一样东西都是一个节点，甚至连空格和换行符都会被解释成节点。而且都包含在childNodes属性所返回的数组中

// getComputedStyle是获取元素最终呈现的样式，style只能拿到行内style属性设置的属性，对于类似于的空标签，style拿不到属性，将返回空字符串
/**
 * @Author: yuyongxing
 * @param {*} nodes
 * @return {*}
 * @Date: 2021-11-13 15:52:17
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 遍历节点
 */
function deepNode(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        console.log(node.className, node.id)
        if (isHide(node) || isRemove(node)) continue
        let flag = false
        for (let j = 0; j < node.childNodes.length; j++) {
            let childNode = node.childNodes[j]
            if (childNode.nodeType == 1) {
                flag = true
            }
        }
        if ((node.nodeType == 1 && !flag) || (node.nodeType == 1 && node.childNodes.length == 0)) {
            createDiv(node)
        }

        if (node.childNodes.length) {
            deepNode(node.childNodes)
        }
    }
}


/**
 * @Author: yuyongxing
 * @param {*} node
 * @return {*}
 * @Date: 2021-11-13 15:51:53
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 过滤节点，只保留元素节点
 */
function filterNode(node) {
    return node.nodeType == 1 && node.nodeName != "SCRIPT"
}
/**
 * @Author: yuyongxing
 * @param {*} node
 * @return {*} true/false
 * @Date: 2021-11-13 15:51:53
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 过滤节点，只保留元素节点
 */
function isHide(node) {
    if (node.nodeType != 1) return false
    let style = getComputedStyle(node, null)
    //  console.log("file: getDom.js ~ line 71 ~ isHide ~ node", style)
    return style.display == 'none' || style.opacity == 0 || style.visibility == 'hidden'
}
/**
 * @Author: yuyongxing
 * @param {*} node
 * @return {*} true/false
 * @Date: 2021-11-13 15:51:53
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 判断该节点是否需要隐藏
 */
function isRemove(node) {
    let { className, id } = node
    if (className || id) {
        for (let i = 0; i < removeClass.length; i++) {
            if (className.indexOf(removeClass[i]) > -1) {
                return true
            }
        }
        if (removeId.includes(id)) {
            return true
        }
    }
    return false

}
/**
 * @Author: yuyongxing
 * @param {*} node
 * @return {*}
 * @Date: 2021-11-13 17:24:48
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 插入带样式的div
 */
function createDiv(node) {
    let { width, height, top, left } = node.getBoundingClientRect()
    const { borderRadius, zIndex } = getComputedStyle(node, null)
    const { innerWidth, innerHeight } = window//可视区域宽高
    //    必须符合要求的元素才渲染：有大小，并且在视图内
    if (width > 5 && height > 5 && top < innerHeight && left < innerWidth) {
        width = ((width / innerWidth) * 100).toFixed(2) + '%'
        height = ((height / innerHeight) * 100).toFixed(2) + '%'
        left = ((left / innerWidth) * 100).toFixed(2) + '%'
        top = ((top / innerHeight) * 100).toFixed(2) + '%'
        skeletonHtml += `<div class="skeleton" style="width:${width};height:${height};left:${left};top:${top};border-radius:${borderRadius};z-index:${zIndex}"></div>`
    }
}
// document.getElementsByTagName("body").innerHTML(getDom())
document.body.innerHTML = getDom({ removeElements: [".remove","#pid2"] })
