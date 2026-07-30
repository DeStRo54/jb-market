import { api } from "@/api/instance";
import { SignInDto, SignInResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type PostSignInRequestConfig = FetchesRequestConfig<SignInDto>;

export const postSignIn = ({ params, config }: PostSignInRequestConfig) =>
  api.post<SignInResponse>("/auth/sign-in", params, config);
