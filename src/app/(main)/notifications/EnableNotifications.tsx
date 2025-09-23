"use client";

import { useState } from "react";

// helper: convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function EnableNotifications() {
  const [enabled, setEnabled] = useState(false);

  async function subscribe() {
    try {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        alert("Push notifications not supported");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Notifications blocked");
        return;
      }

      const reg = await navigator.serviceWorker.ready;

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
        ),
      });

      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      setEnabled(true);
      console.log("✅ Subscribed to push:", subscription);
    } catch (err) {
      console.error("❌ Failed to subscribe", err);
    }
  }

  async function sendTestNotification() {
    try {
      const res = await fetch("/api/subscribe", { method: "GET" });
      if (res.ok) {
        console.log("✅ Test notification sent");
      } else {
        console.error("❌ Failed to send test notification");
      }
    } catch (err) {
      console.error("❌ Error sending test notification", err);
    }
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={subscribe}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        disabled={enabled}
      >
        {enabled ? "Notifications Enabled ✅" : "Enable Notifications"}
      </button>

      {enabled && (
        <button
          onClick={sendTestNotification}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Send Test
        </button>
      )}
    </div>
  );
}
