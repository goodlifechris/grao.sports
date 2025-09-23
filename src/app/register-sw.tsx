// src/components/RegisterSW.tsx
"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[Page] Service Worker registered:", reg);

          // Track updates
          reg.addEventListener("updatefound", () => {
            console.log("[Page] New SW found:", reg.installing);
            reg.installing?.addEventListener("statechange", () => {
              console.log("[Page] SW state changed:", reg.installing?.state);
            });
          });
        })
        .catch((err) =>
          console.error("[Page] Service Worker registration failed", err)
        );

      // 🔌 Listen for messages from SW
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.type === "SW_LOG") {
          console.log(event.data.msg);
        }
      });
    }
  }, []);

  return null;
}
