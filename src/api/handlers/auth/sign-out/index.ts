import { api } from "@/api/instance";
import { BaseResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type PostSignOutRequestConfig = FetchesRequestConfig;

export const postSignOut = ({ params, config }: PostSignOutRequestConfig) =>
  api.post<BaseResponse>("/auth/sign-out", params, config);
