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
        badge: "/badge.png",
        data,
        image: "/icon-152x152.png",         // banner-style image (large)
        tag: "chat-msg-123",             // collapse/replace notifications with same tag
        renotify: true,                  // vibrate again if same tag is reused
        requireInteraction: true,        // stays until user interacts (desktop only)
        silent: true,                   // disable sound/vibration if true
        timestamp: Date.now(),           // custom timestamp shown in UI
        actions: [                       // action buttons
          { action: "open", title: "Open App", icon: "/icon-192x192.png" },
          { action: "dismiss", title: "Dismiss", icon: "/icon-192x192.png" }
        ],
        vibrate: [200, 100, 200],        // custom vibration pattern (Android only)
        dir: "ltr",                      // or "rtl" for right-to-left
        lang: "en-US",                   // language hint
        // ✅ pass the entire object so we can use it later
      })

      // self.registration.showNotification(title, {
      //   body: "Message body text",
      //   icon: "/icon-192x192.png",       // big colorful icon (expanded notification)
      //   badge: "/badge.png",             // small monochrome icon (status bar, Android)
      //   image: "/big-image.jpg",         // banner-style image (large)
      //   tag: "chat-msg-123",             // collapse/replace notifications with same tag
      //   renotify: true,                  // vibrate again if same tag is reused
      //   requireInteraction: true,        // stays until user interacts (desktop only)
      //   silent: false,                   // disable sound/vibration if true
      //   timestamp: Date.now(),           // custom timestamp shown in UI
      //   data: { url: "/main/notifications", postId: "123" }, // custom payload
      //   actions: [                       // action buttons
      //     { action: "open", title: "Open App", icon: "/icons/open.png" },
      //     { action: "dismiss", title: "Dismiss", icon: "/icons/close.png" }
      //   ],
      //   vibrate: [200, 100, 200],        // custom vibration pattern (Android only)
      //   dir: "ltr",                      // or "rtl" for right-to-left
      //   lang: "en-US",                   // language hint
      // });
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


