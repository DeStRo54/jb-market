import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsStringLiteral,
  SearchParams,
} from "nuqs/server";

import { getGamesInfo } from "@/api/handlers/games/info";
import { I18nText } from "@/components/common/I18nText";
import { Typography } from "@/components/ui/Typography";
import { GamesControllerGetGamesParams } from "@/generated/api";

import { Catalog } from "./_components/Catalog";
import { DesktopFilters } from "./_components/Filters";
import { MobileFilters } from "./_components/Filters/MobileFilters";
import { SaleBanner } from "./_components/SaleBanner";
import { Search } from "./_components/Search";
import { ViewChips } from "./_components/ViewChips";
import { CATALOG_FILTERS, CATALOG_GENRES } from "./-constants/filters";
import { CATALOG_VIEWS } from "./-constants/view";

const searchParamsSchema = createSearchParamsCache({
  view: parseAsStringLiteral(CATALOG_VIEWS),
  filter: parseAsArrayOf(parseAsStringLiteral(CATALOG_FILTERS)).withDefault([]),
  genre: parseAsArrayOf(parseAsStringLiteral(CATALOG_GENRES)).withDefault([]),
});

interface GamesPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const params = await searchParams;
  const parsedParams = searchParamsSchema.parse(params);

  const validatedParams: GamesControllerGetGamesParams = {
    view: parsedParams.view ? parsedParams.view : undefined,
    filter: parsedParams.filter?.length > 0 ? parsedParams.filter : undefined,
    genre: parsedParams.genre?.length > 0 ? parsedParams.genre : undefined,
    limit: 12,
  };

  const initialData = await getGamesInfo({
    params: validatedParams,
    config: {
      next: {
        revalidate: 600,
        tags: ["catalog", "games"],
      },
    },
  });

  return (
    <div className="flex flex-col gap-6 sm:pt-10 sm:pb-28">
      <Typography variant="title-md" className="sm:hidden">
        <I18nText path="page.catalog.title" />
      </Typography>
      <div className="flex items-end gap-2">
        <Search />
        <MobileFilters />
      </div>
      <ViewChips />
      <div className="grid gap-10 lg:gap-6 lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className="hidden flex-col gap-6 lg:flex">
          <DesktopFilters />
          <SaleBanner />
        </aside>
        <main className="flex flex-col gap-6">
          <Catalog params={validatedParams} initialData={initialData} />
          <SaleBanner className="block sm:hidden" />
        </main>
      </div>
    </div>
  );
}
