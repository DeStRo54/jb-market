type LocaleMessageId = keyof typeof import("@/public/locales/ru.json");
type Locale = "ru";

declare global {
  namespace FormatjsItnl {
    interface IntlConfig {
      locale: Locale;
    }

    interface Messages {
      ids: LocaleMessageId;
    }
  }
}
