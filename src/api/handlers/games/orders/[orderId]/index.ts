import { api } from "@/api/instance";
import { GameOrderResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetGameOrderByIdParams = {
  orderId: string;
};

export type GetGameOrderByIdRequestConfig =
  FetchesRequestConfig<GetGameOrderByIdParams>;

export const getGameOrderById = ({
  params,
  config,
}: GetGameOrderByIdRequestConfig) =>
  api.get<GameOrderResponse>(`/games/orders/${params.orderId}`, config);
