"use client";

import React, { type ComponentProps } from "react";
import { FormattedMessage } from "react-intl";

interface I18nTextProps {
  path: LocaleMessageId;
  values?: ComponentProps<typeof FormattedMessage>["values"];
}

export const I18nText = React.memo(({ path, values }: I18nTextProps) => (
  <FormattedMessage id={path} values={values} />
));

I18nText.displayName = "I18nText";
