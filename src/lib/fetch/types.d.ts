export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export type RequestBody = BodyInit | Record<string, unknown>;

export type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  params?: QueryParams;
  body?: RequestBody | null;
};

export type ApiClientOptions = {
  baseUrl: string;
};

export type ApiErrorDetails = {
  status: number;
  statusText: string;
  data?: unknown;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};
