import { api } from "@/api/instance";
import { UpdateProfileDto, UpdateProfileResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type PatchUserProfileRequestConfig =
  FetchesRequestConfig<UpdateProfileDto>;

export const patchUserProfile = ({
  params,
  config,
}: PatchUserProfileRequestConfig) =>
  api.patch<UpdateProfileResponse>("/users/profile", params, config);
