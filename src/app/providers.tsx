"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ComponentProps, ReactNode } from "react";
import { IntlProvider } from "react-intl";

import { QueryProvider } from "@/app/_contexts/query";
import { ThemeProvider } from "@/app/_contexts/theme";

import { UserState } from "./_contexts/user/UserContext";
import { UserProvider } from "./_contexts/user/UserProvider";

interface ProvidersProps {
  intl: ComponentProps<typeof IntlProvider>;
  user: UserState;
  children: ReactNode;
}

export const Providers = ({ intl, user, children }: ProvidersProps) => (
  <NuqsAdapter>
    <IntlProvider {...intl}>
      <QueryProvider>
        <UserProvider user={user}>
          <ThemeProvider>{children}</ThemeProvider>
        </UserProvider>
      </QueryProvider>
    </IntlProvider>
  </NuqsAdapter>
);
