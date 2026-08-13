import { useMutation } from "@tanstack/react-query";

import { postOtp, PostOtpRequestConfig } from "../handlers/otps/otp";
import { MutationSettings } from "../types";

export const usePostOtpMutation = (
  settings?: MutationSettings<PostOtpRequestConfig, typeof postOtp>,
) =>
  useMutation({
    mutationKey: ["postOtp"],
    mutationFn: async ({ params, config }) =>
      postOtp({ params, config: { ...config, ...settings?.config } }),
    ...settings?.options,
  });
