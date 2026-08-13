import { useQuery } from "@tanstack/react-query";

import { GamesControllerGetGameRegionsParams } from "@/generated/api";

import { getGamesRegions } from "../handlers/games/regions";
import { QuerySettings } from "../types";

export const useGetGamesRegionsQuery = (
  params: GamesControllerGetGameRegionsParams,
  settings?: QuerySettings<typeof getGamesRegions>,
) =>
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  useQuery({
    queryKey: ["getGamesRegions", params],
    queryFn: () => getGamesRegions({ params, config: settings?.config }),
    ...settings?.options,
  });
