"use client";

import type { ComponentProps, ReactNode } from "react";
import { IntlProvider } from "react-intl";

import { QueryProvider } from "@/app/_contexts/query";
import { ThemeProvider } from "@/app/_contexts/theme";

interface ProvidersProps {
  children: ReactNode;
  intl: ComponentProps<typeof IntlProvider>;
}

export const Providers = ({ children, intl }: ProvidersProps) => (
  <IntlProvider {...intl}>
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  </IntlProvider>
);
