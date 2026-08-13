"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { defaultOptions } from "@/lib/react-query";

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions,
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(error.message, {
          cancel: { label: <XIcon />, onClick: () => {} },
        });
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        toast.error(error.message, {
          cancel: { label: <XIcon />, onClick: () => {} },
        });
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
