import { useMutation } from "@tanstack/react-query";

import { postSignIn, PostSignInRequestConfig } from "../handlers/auth/sign-in";
import { MutationSettings } from "../types";

export const usePostSignInMutation = (
  settings?: MutationSettings<PostSignInRequestConfig, typeof postSignIn>,
) =>
  useMutation({
    mutationKey: ["postSignIn"],
    mutationFn: async ({ params, config }) =>
      postSignIn({ params, config: { ...config, ...settings?.config } }),
    ...settings?.options,
  });
