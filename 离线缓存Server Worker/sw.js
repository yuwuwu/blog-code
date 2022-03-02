/*
 * @Author: yuyongxing
 * @Date: 2021-08-30 17:36:41
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-08-31 20:09:01
 * @Description: 
 */
// https://zhuanlan.zhihu.com/p/29869709
// https://www.cnblogs.com/violinux/p/10249515.html  更新
// http://help.z01.com/Item/1298  更新
var verson = "v1"
self.addEventListener('install', event => {
  console.log("install")
  this.skipWaiting()
})
self.addEventListener('activate', event => {
  console.log("activate")
  caches.open(verson).then(cache => {
      return cache.addAll(['demo.html', 'js/jqurey.js', 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/154cd131b76e431897c2c04af97880df~tplv-k3u1fbpfcp-watermark.image'])
    })
  var delFn = caches.keys().then(function (cacheList) {
    return Promise.all(
      cacheList.map(function (cacheName) {
        if (cacheName !== verson) {
          return caches.delete(cacheName);
        }
      })
    );
  })
  event.waitUntil(Promise.all([delFn])
    .then(() => {
      return self.clients.claim()
    })
  )
});
self.addEventListener('fetch', function (event) {
  console.log("fetch",event.request.url)
  event.respondWith(
      caches.match(event.request).then(function (response) {
          if (response) {
              return response
          }
          return fetch(event.request)
      })
  )
})
// self.addEventListener('fetch', function (event) {
//   console.log("fetch", event.request.url)
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       if (response) {
//         return response;
//       }
//       var request = event.request.clone(); 
//       // if (request.mode !== 'navigate' && request.url.indexOf(request.referrer) === -1) {
//       //   request = new Request(request, { mode: 'no-cors' })
//       // }

//       return fetch(request).then(function (httpRes) {
//         //请求失败了则直接返回、对于post请求也直接返回，sw不能缓存post请求
//         if (!httpRes || (httpRes.status !== 200 && httpRes.status !== 304 && httpRes.type !== 'opaque') || request.method === 'POST') {
//           return httpRes;
//         }

//         // 请求成功的话，将请求缓存起来。
//         var responseClone = httpRes.clone();
//         caches.open(verson).then(function (cache) {
//           cache.put(event.request, responseClone);
//         });
//         return httpRes;
//       });
//     })
//   );
// });
