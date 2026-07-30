import { api } from "@/api/instance";
import { GameResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetGameInfoBySlugParams = {
  slug: string;
};

export type GetGameInfoBySlugRequestConfig =
  FetchesRequestConfig<GetGameInfoBySlugParams>;

export const getGameInfoBySlug = ({
  params,
  config,
}: GetGameInfoBySlugRequestConfig) =>
  api.get<GameResponse>(`/games/info/${params.slug}`, config);
