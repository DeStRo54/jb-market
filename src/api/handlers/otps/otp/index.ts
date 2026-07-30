import { api } from "@/api/instance";
import { CreateOtpDto, CreateOtpResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type PostOtpRequestConfig = FetchesRequestConfig<CreateOtpDto>;

export const postOtp = ({ params, config }: PostOtpRequestConfig) =>
  api.post<CreateOtpResponse>("/otps/otp", params, config);
