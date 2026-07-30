import { useQuery } from "@tanstack/react-query";

import { GamesControllerSearchGamesParams } from "@/generated/api";

import { getGamesSearch } from "../handlers/games/search";
import { getQueryKeysByParams } from "../helpers/getQueryKeysByParams";
import { QuerySettings } from "../types";

export const useGetGamesSearchQuery = (
  params: GamesControllerSearchGamesParams,
  settings?: QuerySettings<typeof getGamesSearch>,
) =>
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  useQuery({
    queryKey: ["getGamesSearch", ...getQueryKeysByParams(params)],
    queryFn: () => getGamesSearch({ params, config: settings?.config }),
    ...settings?.options,
  });
