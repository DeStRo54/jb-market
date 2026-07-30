import { api } from "@/api/instance";
import {
  GamePriceVariantsResponse,
  GamesControllerGetPriceVariantsParams,
} from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetGamePriceVariantsRequestConfig =
  FetchesRequestConfig<GamesControllerGetPriceVariantsParams>;

export const getGamePriceVariants = ({
  params,
  config,
}: GetGamePriceVariantsRequestConfig) =>
  api.get<GamePriceVariantsResponse>("/games/price-variants", {
    ...config,
    query: { ...config?.query, ...params },
  });
