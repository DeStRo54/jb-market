import { api } from "@/api/instance";
import { PayTransactionResponse } from "@/generated/api";
import { FetchesRequestConfig } from "@/lib/fetches";

export type PostTransactionByIdPayQrParams = {
  id: string;
};

export type PostTransactionByIdPayQrRequestConfig =
  FetchesRequestConfig<PostTransactionByIdPayQrParams>;

export const postTransactionByIdPayQr = async ({
  params,
  config,
}: PostTransactionByIdPayQrRequestConfig) => {
  const { id, ...otherParams } = params;

  return await api.post<PayTransactionResponse>(
    `/transaction/${id}/pay/qr`,
    otherParams,
    config,
  );
};
