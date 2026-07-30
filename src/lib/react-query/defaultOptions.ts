// lib/react-query.ts

import { DefaultOptions } from "@tanstack/react-query";

export const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  },
};
