"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";

import { getGamesInfoInfinityQueryOptions } from "@/api/options/getGamesInfoInfinityQueryOptions";
import {
  GamesControllerGetGamesParams,
  GamesPaginatedResponse,
} from "@/generated/api";
import { FetchesResponse } from "@/lib/fetches";
import { useIntersectionObserver } from "@/utils/hooks/useIntersectionObserver";

import { GameCard } from "../GameCard";
import { CatalogSkeleton } from "./Catalog.skeleton";

interface CatalogProps {
  params: Omit<GamesControllerGetGamesParams, "limit" | "page">;
  initialData: FetchesResponse<GamesPaginatedResponse>;
}

export const Catalog = ({ params, initialData }: CatalogProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      getGamesInfoInfinityQueryOptions(params, {
        options: {
          initialData: {
            pages: [initialData],
            pageParams: [1],
          },
        },
      }),
    );

  useIntersectionObserver(sentinelRef, {
    rootMargin: "300px",
    threshold: 0,
    onChange: ([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const games = data?.pages.flatMap((page) => page.data.games) ?? [];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
      {isFetchingNextPage && hasNextPage && (
        <CatalogSkeleton skeletonsCount={6} />
      )}
      <div ref={sentinelRef} />
    </div>
  );
};
