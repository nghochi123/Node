const cacheName = "v2";

//Call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
});

//Call activate event

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call Fetch Event

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res=>{
            //Making copy of response
            const resClone = res.clone();
            //Opening cache
            caches
            .open(cacheName)
            .then(cache=>{
                cache.put(e.request, resClone);
            });
            return res;
        })
        .catch(()=> caches.match(e.request).then(res=>res))
    )
})