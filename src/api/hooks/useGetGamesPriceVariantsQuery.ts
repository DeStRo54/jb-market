import { useQuery } from "@tanstack/react-query";

import { GamesControllerGetPriceVariantsParams } from "@/generated/api";

import { getGamePriceVariants } from "../handlers/games/prece-variants";
import { QuerySettings } from "../types";

export const useGetGamesPriceVariantsQuery = (
  params: GamesControllerGetPriceVariantsParams,
  settings?: QuerySettings<typeof getGamePriceVariants>,
) =>
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  useQuery({
    queryKey: ["getGamesPriceVariants", params],
    queryFn: () => getGamePriceVariants({ params, config: settings?.config }),
    ...settings?.options,
  });
