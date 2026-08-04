import { parseAsArrayOf, parseAsStringEnum } from "nuqs";

import { CATALOG_FILTERS, CATALOG_GENRES } from "../../../-constants/filters";

export const filtersParser = parseAsArrayOf(
  parseAsStringEnum([...CATALOG_FILTERS]),
).withDefault([]);

export const genresParser = parseAsArrayOf(
  parseAsStringEnum([...CATALOG_GENRES]),
).withDefault([]);
