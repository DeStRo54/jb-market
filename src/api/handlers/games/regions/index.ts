import { api } from "@/api/instance";
import {
  GameRegionsResponse,
  GamesControllerGetGameRegionsParams,
} from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetGamesRegionsRequestConfig =
  FetchesRequestConfig<GamesControllerGetGameRegionsParams>;

export const getGamesRegions = ({
  params,
  config,
}: GetGamesRegionsRequestConfig) =>
  api.get<GameRegionsResponse>("/games/regions", {
    ...config,
    query: { ...config?.query, ...params },
  });
