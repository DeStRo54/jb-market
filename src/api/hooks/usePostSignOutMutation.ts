import { useMutation } from "@tanstack/react-query";

import {
  postSignOut,
  PostSignOutRequestConfig,
} from "../handlers/auth/sign-out";
import { MutationSettings } from "../types";

export const usePostSignOutMutation = (
  settings?: MutationSettings<PostSignOutRequestConfig, typeof postSignOut>,
) =>
  useMutation({
    mutationKey: ["postSignOut"],
    mutationFn: async ({ config }) =>
      postSignOut({ config: { ...config, ...settings?.config } }),
    ...settings?.options,
  });
