import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { FetchesRequestConfig } from "@/lib/fetches";

export type ApiRequestConfig = FetchesRequestConfig["config"];

export interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestConfig;
  options?: import("@tanstack/react-query").UseMutationOptions<
    Awaited<ReturnType<Func>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Params,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
}

export interface QuerySettings<Func = unknown> {
  config?: ApiRequestConfig;
  options?: Omit<
    import("@tanstack/react-query").UseQueryOptions<
      Awaited<ReturnType<Func>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      Awaited<ReturnType<Func>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >,
    "queryKey"
  >;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InfinityQuerySettings<Func extends (...args: any) => unknown> {
  config?: ApiRequestConfig;
  options?: Omit<
    UseInfiniteQueryOptions<
      Awaited<ReturnType<Func>>,
      Error,
      InfiniteData<Awaited<ReturnType<Func>>>,
      QueryKey,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >,
    "getNextPageParam" | "initialPageParam" | "queryKey" | "queryFn"
  >;
}
