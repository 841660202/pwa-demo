console.log('Hello from service-worker.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

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