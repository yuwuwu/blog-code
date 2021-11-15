/*
 * @Author: yuyongxing
 * @Date: 2021-11-15 22:18:50
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-16 00:16:45
 * @Description: 
 */
let skeletonHtml = `<style>.skeleton {position: fixed;background: #aaa;background-image: linear-gradient(100deg, #eee 40%, #fff 45%, #eee 50%);animation: opacity 2s ease infinite;background-size: 300% 100%;} @keyframes opacity {0%{opacity: 1;}50%{opacity: 0.4;}100%{opacity: 1;}} </style>`
function getDom() {
    const dom = document.body
    const nodes = dom.childNodes
    deepNode(nodes)
    console.log(skeletonHtml)
    return skeletonHtml
}
function deepNode(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        if(isHide(node))continue
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
function isHide(node) {
    if (node.nodeType != 1) return false
    let style = getComputedStyle(node, null)
    return style.display == 'none' || style.opacity == 0 || style.visibility == 'hidden'
}
function createDiv(node) {
    let { width, height, top, left } = node.getBoundingClientRect()
    const { borderRadius, zIndex } = getComputedStyle(node, null)
    const { innerWidth, innerHeight } = window
    //    必须符合要求的元素才渲染：有大小，并且在视图内
    if (width > 5 && height > 5 && top < innerHeight && left < innerWidth) {
        width = ((width / innerWidth) * 100).toFixed(2) + '%'
        height = ((height / innerHeight) * 100).toFixed(2) + '%'
        left = ((left / innerWidth) * 100).toFixed(2) + '%'
        top = ((top / innerHeight) * 100).toFixed(2) + '%'
        skeletonHtml += `<div class="skeleton" style="width:${width};height:${height};left:${left};top:${top};border-radius:${borderRadius};z-index:${zIndex}"></div>`
    }
}
// document.body.innerHTML = getDom()
