import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import { toast } from "sonner";

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: () => {
        toast.error("ERROR", {
          //TEMP: wait i18n
          cancel: { label: "Close", onClick: () => {} },
        });
      },
    }),
    mutationCache: new MutationCache({
      onError: () => {
        toast.error("ERROR", {
          //TEMP: wait i18n
          cancel: { label: "Close", onClick: () => {} },
        });
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
