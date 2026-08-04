import { useQueryStates } from "nuqs";
import { useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { useDisclosure } from "@/utils/hooks/useDisclosure";

import { CATALOG_GENRES } from "../../../-constants/filters";
import { filtersParser, genresParser } from "../schemas/params";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useQueryStates(
    {
      filter: filtersParser,
      genre: genresParser,
    },
    { shallow: false },
  );
  const [genreSearchValue, setGenreSearchValue] = useState("");
  const intl = useIntl();

  const filteredGenres = useMemo(() => {
    const normalizedSearchValue = genreSearchValue.trim().toLowerCase();
    return CATALOG_GENRES.filter((genre) =>
      intl
        .formatMessage({ id: `genre.${genre}` })
        .toLocaleLowerCase()
        .includes(normalizedSearchValue),
    );
  }, [genreSearchValue, intl]);

  const {
    opened: allGenresOpened,
    open: onShowMoreGenres,
    close: onHideMoreGenres,
  } = useDisclosure();

  const visibleGenres = allGenresOpened
    ? filteredGenres
    : filteredGenres.slice(0, 5);

  const onGenreSearch = (searchValue: string) =>
    setGenreSearchValue(searchValue);

  const onSetSearchParams = (newParams: Partial<typeof searchParams>) =>
    setSearchParams(newParams);

  const onResetFilters = () => {
    setSearchParams({
      filter: [],
      genre: [],
    });
  };

  return {
    state: {
      intl,
      searchParams,
      filteredGenres,
      allGenresOpened,
      genreSearchValue,
      visibleGenres,
    },
    functions: {
      onGenreSearch,
      onSetSearchParams,
      onShowMoreGenres,
      onHideMoreGenres,
      onResetFilters,
    },
  } as const;
};
