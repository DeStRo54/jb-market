import { api } from "@/api/instance";
import { GetProfileResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetUserProfileRequestConfig = FetchesRequestConfig;

export const getUserProfile = (requestConfig: GetUserProfileRequestConfig) =>
  api.get<GetProfileResponse>("/users/profile", requestConfig?.config);
