// src/components/RegisterSW.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterSW() {
  const router = useRouter();

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
        const data = event.data;
        if (!data) return;

        if (data.type === "SW_LOG") {
          console.log("[SW]", data.msg);
        }

        if (data.type === "OPEN_URL" && data.url) {
          console.log("[Page] Navigate to:", data.url);

          // Prefer Next.js client-side navigation
          router.push(data.url);
        }
      });
    }
  }, [router]);

  return null;
}
