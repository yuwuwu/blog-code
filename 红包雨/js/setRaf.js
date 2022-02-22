/*
 * @Author: yuyongxing
 * @Date: 2022-02-22 23:07:58
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-02-22 23:17:48
 * @Description: 
 */
const getScreenFps = (() => {
    return (targetCount = 50) => {
        const beginDate = Date.now()
        let count = 0
        return new Promise(resolve => {
            (function fn() {
                window.requestAnimationFrame(() => {
                    if (++count >= targetCount) {
                        const diffDate = Date.now() - beginDate
                        const fps = (count / diffDate) * 1000
                        return resolve(fps)
                    }
                    fn()
                })
            })()
        })
    }
})();
getScreenFps().then(fps => {
    if (fps > 70) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        }
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        }
    }
})
