import { api } from "@/api/instance";
import { GetTransactionResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type GetTransactionByIdParams = {
  id: string;
};

export type GetTransactionByIdRequestConfig =
  FetchesRequestConfig<GetTransactionByIdParams>;

export const getTransactionById = ({
  params,
  config,
}: GetTransactionByIdRequestConfig) =>
  api.get<GetTransactionResponse>(`/transaction/${params.id}`, config);
