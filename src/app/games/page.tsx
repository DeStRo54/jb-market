import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import z from "zod";

import { getGamesInfoInfinityQueryOptions } from "@/api/options/getGamesInfoInfinityQueryOptions";
import { I18nText } from "@/components/common/I18nText";
import { Typography } from "@/components/ui/Typography";
import { GamesControllerGetGamesParams } from "@/generated/api";
import { getQueryClient } from "@/lib/react-query/server";

import { Catalog } from "./_components/Catalog";
import { Filters } from "./_components/Filters";
import { Search } from "./_components/Search";
import { ViewChips } from "./_components/ViewChips";

// const searchParamsSchema = z.object({
//   view: z.enum(["new", "popular"]).optional(),
// });

// interface GamesPageProps {
//   searchParams: Promise<Omit<GamesControllerGetGamesParams, 'page' | 'limit'>>;
// }

export default async function GamesPage() {
  // const params = searchParamsSchema.parse(await searchParams);

  const queryClient = getQueryClient();
  const options = getGamesInfoInfinityQueryOptions({});

  await queryClient.prefetchInfiniteQuery(options);

  return (
    <div className="flex flex-col gap-6 sm:pt-10 pb-28">
      <Typography variant="title-md" className="sm:hidden">
        <I18nText path="page.catalog.title" />
      </Typography>
      <Search />
      <ViewChips />
      <div className="grid gap-10 lg:gap-6 lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className="hidden flex-col gap-6 lg:flex">
          <Filters />
        </aside>
        <main>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Catalog />
          </HydrationBoundary>
        </main>
      </div>
    </div>
  );
}
