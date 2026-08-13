import { useMutation } from "@tanstack/react-query";

import {
  postGameOrder,
  PostGameOrderRequestConfig,
} from "../handlers/games/order";
import { MutationSettings } from "../types";

export const usePostGamesOrderMutation = (
  settings?: MutationSettings<PostGameOrderRequestConfig, typeof postGameOrder>,
) =>
  useMutation({
    mutationKey: ["postGamesOrder"],
    mutationFn: async ({ params, config }) =>
      postGameOrder({ params, config: { ...config, ...settings?.config } }),
    ...settings?.options,
  });
