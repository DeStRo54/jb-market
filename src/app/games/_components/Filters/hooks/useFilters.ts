import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { GENRES } from "@/app/games/-constants/filters";
import { useDisclosure } from "@/utils/hooks/useDisclosure";

export const useFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [genreSearchValue, setGenreSearchValue] = useState("");
  const intl = useIntl();

  const filteredGenres = useMemo(() => {
    const normalizedSearchValue = genreSearchValue.trim().toLowerCase();
    return GENRES.filter((genre) =>
      intl
        .formatMessage({ id: `genre.${genre}` })
        .toLocaleLowerCase()
        .includes(normalizedSearchValue),
    );
  }, [genreSearchValue, intl]);

  const { opened: allGenresOpened, toggle: onToggleGenres } = useDisclosure();

  const visibleGenres = allGenresOpened
    ? filteredGenres
    : filteredGenres.slice(0, 5);

  const onGenreSearch = (searchValue: string) =>
    setGenreSearchValue(searchValue);

  const onResetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter");

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    state: {
      searchParams,
      pathname,
      filteredGenres,
      allGenresOpened,
      genreSearchValue,
      visibleGenres,
    },
    functions: {
      router,
      onGenreSearch,
      onToggleGenres,
      onResetFilters,
    },
  } as const;
};
