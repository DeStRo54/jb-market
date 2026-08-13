import z from "zod";

import { phoneFieldScheme } from "./phone";

export const otpFieldScheme = z
  .string()
  .min(1, "error.validation.required")
  .length(6, "error.validation.length");

export const otpFormScheme = z.object({
  otp: otpFieldScheme,
  phone: phoneFieldScheme,
});

export type OtpFormSchemeType = z.infer<typeof otpFormScheme>;
