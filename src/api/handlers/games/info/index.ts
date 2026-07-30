import { api } from "@/api/instance";
import {
  GamesControllerGetGamesParams,
  GamesPaginatedResponse,
} from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetGamesInfoRequestConfig =
  FetchesRequestConfig<GamesControllerGetGamesParams>;

export const getGamesInfo = ({ params, config }: GetGamesInfoRequestConfig) =>
  api.get<GamesPaginatedResponse>("/games/info", {
    ...config,
    query: { ...config?.query, ...params },
  });
