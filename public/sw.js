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
  const data = event.data?.json() || {};
  logToPage("[SW] Push event received: " + JSON.stringify(data));

  event.waitUntil(
    self.registration.showNotification(data.title || "New Notification", {
      body: data.body || "You have a new message!",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/badge.png",
      data: data.url || "/",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  logToPage("[SW] Notification clicked");
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data || "/"));
});
