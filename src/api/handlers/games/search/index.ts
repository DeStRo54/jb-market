import { api } from "@/api/instance";
import {
  GamesControllerSearchGamesParams,
  GameSearchResponse,
} from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetGamesSearchRequestConfig =
  FetchesRequestConfig<GamesControllerSearchGamesParams>;

export const getGamesSearch = ({
  params,
  config,
}: GetGamesSearchRequestConfig) =>
  api.get<GameSearchResponse>("/games/search", {
    ...config,
    query: { ...config?.query, ...params },
  });
