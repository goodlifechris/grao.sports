import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:christopherndugodata@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscriptions: webpush.PushSubscription[] = [];

export async function POST(req: NextRequest) {
  const sub = await req.json();
  subscriptions.push(sub);
  return NextResponse.json({ ok: true });
}

// For testing: send a push to all subs
export async function GET() {
    const results = await Promise.allSettled(
        subscriptions.map((sub) =>
          webpush.sendNotification(
            sub,
            JSON.stringify({
              title: "Test Notification 🎉",
              body: "This is a test push from your Next.js app",
              url: "/main/notifications",
            })
          )
        )
      );
  console.log("Push results:", results);

  return NextResponse.json({ results });
}
