console.log('Hello from service-worker.js');
importScripts('./workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  console.log("workbox=>>>",workbox)
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
const {registerRoute} = workbox.routing;
const {CacheFirst} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    plugins: [
      new CacheableResponsePlugin({statuses: [0, 200]})
    ],
  })
);

// 安装阶段跳过等待，直接进入 active
var nowCacheName = "cachev6"

self.addEventListener('controllerchange', () => {
  window.location.reload();
})
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});
 
self.addEventListener('activate', function (event) {
  console.log('caches.keys()',caches.keys())

    event.waitUntil(
        Promise.all([
            // 更新客户端
            self.clients.claim(),
            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== nowCacheName) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
