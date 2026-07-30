import "server-only";

import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

import { defaultOptions } from "../defaultOptions";

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions,
    }),
);
