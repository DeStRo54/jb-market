"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";

import { getGamesInfoInfinityQueryOptions } from "@/api/options/getGamesInfoInfinityQueryOptions";
import { GamesControllerGetGamesParams } from "@/generated/api";
import { useIntersectionObserver } from "@/utils/hooks/useIntersectionObserver";

import { GameCard } from "../GameCard";

interface CatalogProps {
  params: Omit<GamesControllerGetGamesParams, "limit" | "page">;
}

export const Catalog = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(getGamesInfoInfinityQueryOptions({}));

  // const intersection = useIntersectionObserver(rootRef, {
  //   root: rootRef,
  //   rootMargin: '-40% 0px -40% 0px',
  //   threshold: 0,
  //   onChange: ([entry]) => {
  //     if (
  //       entry.isIntersecting &&
  //       hasNextPage &&
  //       !isFetchingNextPage
  //     ) {
  //       fetchNextPage();
  //     }
  //   }
  // });

  const games = data?.pages.flatMap((page) => page.data.games) ?? [];

  // const onSectionMount = (element: HTMLElement) => {
  //   if (element && intersection.observer) intersection.observer.observe(element);
  // };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </div>
  );
};
