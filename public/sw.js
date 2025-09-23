function logToPage(msg) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => client.postMessage({ type: "SW_LOG", msg }));
  });
}

self.addEventListener("install", () => {
  logToPage("[SW] Installed ✅");
});

self.addEventListener("activate", () => {
  logToPage("[SW] Activated ✅");
});




self.addEventListener("push", (event) => {
  console.log("[SW] Push event received:", event);

  if (!event.data) {
    console.warn("[SW] No payload data in push event");
  }

  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (err) {
    console.error("[SW] Failed to parse push data", err);
  }

  console.log("[SW] Parsed data:", data);

  event.waitUntil(
    (async () => {
      console.log("[SW] Showing notification…");
      await self.registration.showNotification(data.title || "New Notification", {
        body: data.body || "You have a new message!",
        icon: "/icon-192x192.png", 
        badge: "/icon-192x192.png", 
        data: data.url || "/",
      });
      // await self.registration.showNotification("Hello!", {
      //   body: "This is a minimal test notification",
      // });
      console.log("[SW] Notification displayed yoyoy ✅");
    })()
  );
});
self.addEventListener("notificationclick", (event) => {
  logToPage("[SW] Notification clicked");
  console.log("[SW] Notification clicked:", event.notification);

  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data || "/"));
});

