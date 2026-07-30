import { api } from "@/api/instance";
import {
  GameOrderResponse,
  GamesControllerGetGamePaidOrderParams,
} from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetGameOrderPaidRequestConfig =
  FetchesRequestConfig<GamesControllerGetGamePaidOrderParams>;

export const getGameOrderPaid = ({
  params,
  config,
}: GetGameOrderPaidRequestConfig) =>
  api.get<GameOrderResponse>("/games/orders/paid", {
    ...config,
    query: { ...config?.query, ...params },
  });
