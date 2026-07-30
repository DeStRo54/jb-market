import { GameFiltered } from "@/generated/api";

type PriceType = GameFiltered["priceVariant"]["price"];

export const formatMoney = (price: PriceType) => `${price}₽`;
