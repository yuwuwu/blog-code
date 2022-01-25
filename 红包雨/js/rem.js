/*
 * @Author: yuyongxing
 * @Date: 2021-10-19 14:30:43
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-10-19 14:36:30
 * @Description:自适应监测屏幕宽度 按照750的设计图，100px=1rem
 */
(function(doc, win) {
  var docEl = doc.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function() {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= 750) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
