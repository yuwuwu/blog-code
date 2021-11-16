/*
 * @Author: yuyongxing
 * @Date: 2021-11-13 15:01:31
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-16 22:57:01
 * @Description: 
 */
let skeletonHtml = "<style>.skeleton {position: fixed;background: #bbb;animation: opacity 2s ease infinite;} @keyframes opacity {0%{opacity: 1;}50%{opacity: 0.4;}100%{opacity: 1;}} </style>"
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
 * @return {*} true/false
 * @Date: 2021-11-13 15:51:53
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 过滤节点，只保留元素节点
 */
function isHide(node) {
    if (node.nodeType != 1) return false
    let style = getComputedStyle(node, null)
    return node.nodeName == "SCRIPT"|| style.display == 'none' || style.opacity == 0 || style.visibility == 'hidden'
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
    let nodeClassName = node.className ? `node-class=${node.className}`:""
    let nodeId = node.id ? `node-id=${node.id}`:""
    //    必须符合要求的元素才渲染：有大小，并且在视图内
    if (width > 5 && height > 5 && top < innerHeight && left < innerWidth) {
        width = ((width / innerWidth) * 100).toFixed(2) + '%'
        height = ((height / innerHeight) * 100).toFixed(2) + '%'
        left = ((left / innerWidth) * 100).toFixed(2) + '%'
        top = ((top / innerHeight) * 100).toFixed(2) + '%'
        skeletonHtml += `<div class="skeleton" ${nodeClassName} ${nodeId} style="width:${width};height:${height};left:${left};top:${top};border-radius:${borderRadius};z-index:${zIndex}"></div>`
    }
}
// document.body.innerHTML = getDom({ removeElements: [".midea-icon",".operation_down_icon",".operation_time_inner",".swiper-pagination-bullet",".suit_popup","#headContent",".txt_box","#footNav"] })
document.body.innerHTML = getDom({ 
    removeElements: [".slider-bg","#commonNav",".j_more_sec_link",".jd-header-new-title","#imk2FixedSideText",".container-bg",".j_slide_nav",".seckill-more-icon"] })
