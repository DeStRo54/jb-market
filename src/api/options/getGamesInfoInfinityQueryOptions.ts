import { infiniteQueryOptions } from "@tanstack/react-query";

import { GamesControllerGetGamesParams } from "@/generated/api";

import { getGamesInfo } from "../handlers/games/info";
import { getQueryKeysByParams } from "../helpers/getQueryKeysByParams";
import { InfinityQuerySettings } from "../types";

export const getGamesInfoInfinityQueryOptions = (
  params: GamesControllerGetGamesParams,
  settings?: InfinityQuerySettings<typeof getGamesInfo>,
) =>
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  infiniteQueryOptions({
    queryKey: ["getGamesInfo", ...getQueryKeysByParams(params)],
    queryFn: ({ pageParam }) =>
      getGamesInfo({
        params: {
          limit: 12,
          page: pageParam,
          ...params,
        },
        config: settings?.config,
      }),
    initialPageParam: 1,
    getNextPageParam: ({ data }) =>
      data.meta.page < data.meta.totalPages ? data.meta.page + 1 : null,
    ...settings?.options,
  });
