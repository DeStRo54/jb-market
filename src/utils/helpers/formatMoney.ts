import { GameFiltered } from "@/generated/api";

interface FormatMoneyParams {
  locales?: Intl.LocalesArgument;
  options?: Intl.NumberFormatOptions;
}

const DEFAULT_NUMBER_FORMAT_OPTIONS = {
  currency: "RUB",
  maximumFractionDigits: 0,
  style: "currency",
} satisfies Intl.NumberFormatOptions;

type PriceType = GameFiltered["priceVariant"]["price"];

export const formatMoney = (
  price: PriceType,
  {
    locales = "ru-RU",
    options = DEFAULT_NUMBER_FORMAT_OPTIONS,
  }: FormatMoneyParams = {},
) => new Intl.NumberFormat(locales, options).format(price);
