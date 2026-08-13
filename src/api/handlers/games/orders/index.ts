import { api } from "@/api/instance";
import { GameOrdersResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetGamesOrdersRequestConfig = FetchesRequestConfig;

export const getGamesOrders = (requestConfig?: GetGamesOrdersRequestConfig) =>
  api.get<GameOrdersResponse>("/games/orders", requestConfig?.config);
