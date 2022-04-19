/*
 * @Author: yuyongxing
 * @Date: 2022-04-19 10:07:06
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-19 11:06:58
 * @Description: 
 */
function handleCopy(){
  var input = document.getElementById("copy")
  input.select()
  document.execCommand("copy")
  alert("复制成功")
}