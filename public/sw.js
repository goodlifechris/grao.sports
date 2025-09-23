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
      self.registration.showNotification(data.title || "New Notification", {
        body: data.body || "You have a new message!",
        icon: "/icon-192x192.png",
        badge: "/icon-96x96.png",
        data, // ✅ pass the entire object so we can use it later
      })
      // await self.registration.showNotification("Hello!", {
      //   body: "This is a minimal test notification",
      // });
      console.log("[SW] Notification displayed yoyoy ✅");
    })()
  );
});
self.addEventListener("notificationclick", async (event) => {
  console.log("[SW] Notification click:", event.notification.data);
  event.notification.close();

  const data = event.notification.data || {};
  const targetUrl = new URL(data.url || "/", self.location.origin).href;
  console.log("[SW] Notification click:",targetUrl);


  event.waitUntil(
    (async () => {
      // Get all current client tabs for your origin
      const allClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      // Try to find one that’s already open on your domain
      const existingClient = allClients.find((client) =>
        client.url.startsWith(self.location.origin)
      );

      if (existingClient) {
        // ✅ Focus the already open app window
        console.log("[SW] Found existing client, focusing:", existingClient.url);
        await existingClient.focus();

        // Optionally tell the client to navigate (deeplink)
        existingClient.postMessage({
          type: "OPEN_URL",
          url: targetUrl,
        });
      } else {
        // No open client → open a new window
        console.log("[SW] Opening new window:", targetUrl);
        await clients.openWindow(targetUrl);
      }
    })()
  );
});


