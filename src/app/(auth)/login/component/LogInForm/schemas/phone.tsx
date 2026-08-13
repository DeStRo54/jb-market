import z from "zod";

export const phoneFieldScheme = z
  .string()
  .min(1, "error.validation.required")
  .length(11, "error.validation.length");

export const phoneFormScheme = z.object({
  phone: phoneFieldScheme,
});

export type PhoneFormSchemeType = z.infer<typeof phoneFormScheme>;
