//src/app/main/notifications/notifications.tsx
"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { NotificationsPage } from "@/lib/types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import Notification from "./Community";

export default function Communities() {
  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery({
  //   queryKey: ["notifications"],
  //   queryFn: ({ pageParam }) =>
  //     kyInstance
  //       .get(
  //         "/api/notifications",
  //         pageParam ? { searchParams: { cursor: pageParam } } : {},
  //       )
  //       .json<NotificationsPage>(),
  //   initialPageParam: null as string | null,
  //   getNextPageParam: (lastPage) => lastPage.nextCursor,
  // });

  // const queryClient = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: () => kyInstance.patch("/api/notifications/mark-as-read"),
  //   onSuccess: () => {
  //     queryClient.setQueryData(["unread-notification-count"], {
  //       unreadCount: 0,
  //     });
  //   },
  //   onError(error) {
  //     console.error("Failed to mark notifications as read", error);
  //   },
  // });

  // useEffect(() => {
  //   mutate();
  // }, [mutate]);

  // const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  // if (status === "pending") {
  //   return <PostsLoadingSkeleton />;
  // }

  // if (status === "success" && !notifications.length && !hasNextPage) {
  //   return (

  //     <>

  //     <p className="text-center text-muted-foreground">
  //       You don&apos;t have any notifications yet.
  //     </p>
  //     </>
  //   );
  // }

  // if (status === "error") {
  //   return (
  //     <p className="text-center text-destructive">
  //       An error occurred while loading notifications.
  //     </p>
  //   );
  // }

  return (
    // <InfiniteScrollContainer
    //   className="space-y-5"
    //   onBottomReached={() => ()}
    // >

    <TournamentCards />

    // </InfiniteScrollContainer>
  );
}

import React from "react";
import "@/app/styles/tournament.css";
import Image from "next/image";

const TournamentCards = () => {
  const tournaments = [
    {
      id: 1,
      name: "Kothbiro Tournament",
      date: "July 15-20, 2023",
      teams: 16,
      prize: "$25,000",
      status: "Upcoming",
      logo: "/images/kothbirologo.jpg",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      name: "Wadau League",
      date: "December 5-10, 2023",
      teams: 24,
      prize: "$50,000",
      status: "Registration Open",
      logo: "/images/wadau.jpeg",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ];

  return (
    <div>
      <div className="tournament-cards">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="tournament-card"
            style={{ background: tournament.gradient }}
          >
            <div className="card-content cursor-pointer">         

            <div className=" flex items-center gap-4">
                <div className="flex-shrink-0 tournament-logo">
                  <Image
                    alt="kothbiro"
                    src={tournament.logo}
                    width={64}
                    height={64}
                    className="rounded-full object-cover  "
                  />
                </div>
                <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between">
                  <h3 className="tournament-name">{tournament.name}</h3>
                  <div
                    className={`status-badge ${tournament.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {tournament.status}
                  </div>
                </div>
            </div>

              {/*      
              <div className="tournament-details">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{tournament.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Teams:</span>
                  <span className="detail-value">{tournament.teams}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Prize Pool:</span>
                  <span className="detail-value">{tournament.prize}</span>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default TournamentCards;
