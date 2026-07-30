import { GameFiltered } from "@/generated/api";

type PriceType = GameFiltered["priceVariant"]["price"];

export const getDiscount = (price: PriceType, oldPrice: PriceType) =>
  `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%`;
