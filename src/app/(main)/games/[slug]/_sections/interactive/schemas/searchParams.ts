import { parseAsString, parseAsStringEnum } from "nuqs";

import { DELIVERY_TYPES } from "@/utils/constants/delivery";
import { REGIONS } from "@/utils/constants/region";

export const deliveryParser = parseAsStringEnum(
  Object.values(DELIVERY_TYPES),
).withDefault("steam_key");
export const regionParser = parseAsStringEnum(
  Object.values(REGIONS),
).withDefault("ru");
export const editionParser = parseAsString;
