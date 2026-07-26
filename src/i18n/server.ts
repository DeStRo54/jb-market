import "server-only";

import { createIntl, createIntlCache } from "react-intl/server";

import ruMessage from "@/public/locales/ru.json";

const LOCALE = "ru";

const cache = createIntlCache();

export const intl = createIntl(
  {
    locale: LOCALE,
    messages: ruMessage,
  },
  cache,
);
