import { api } from "@/api/instance";
import { PayTransactionDto, PayTransactionResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type PostTransactionPayRequestConfig =
  FetchesRequestConfig<PayTransactionDto>;

export const postTransactionPay = ({
  params,
  config,
}: PostTransactionPayRequestConfig) =>
  api.post<PayTransactionResponse>("/transaction/pay", params, config);
