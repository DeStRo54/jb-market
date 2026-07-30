import { api } from "@/api/instance";
import { CreateGameOrderDto, CreateGameOrderResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type PostGameOrderRequestConfig =
  FetchesRequestConfig<CreateGameOrderDto>;

export const postGameOrder = ({ params, config }: PostGameOrderRequestConfig) =>
  api.post<CreateGameOrderResponse>("/games/order", params, config);
