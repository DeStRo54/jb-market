"use client";

import { SearchIcon } from "lucide-react";

import { I18nText } from "@/components/common/I18nText";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupIconButton,
  InputGroupInput,
} from "@/components/ui/InputGroup";
import { Switch } from "@/components/ui/Switch";
import { Typography } from "@/components/ui/Typography";
import { GameFilter, GameGenre } from "@/generated/api";

import { useFilters } from "./hooks/useFilters";

export const DesktopFilters = () => {
  const { state, functions } = useFilters();

  const searchPlaceholder = state.intl.formatMessage({
    id: "page.catalog.filters.genrePlaceholder",
  });

  const onToggleDiscount = (checked: boolean) => {
    const newFilters: GameFilter[] = checked
      ? [...state.searchParams.filter, "discount"]
      : state.searchParams.filter.filter((f) => f !== "discount");

    functions.onSetSearchParams({
      filter: newFilters,
    });
  };

  const onToggleDlc = (checked: boolean) => {
    const newFilters: GameFilter[] = checked
      ? [...state.searchParams.filter, "dlc"]
      : state.searchParams.filter.filter((f) => f !== "dlc");

    functions.onSetSearchParams({
      filter: newFilters,
    });
  };

  const onGenreChange = (genre: GameGenre, checked: boolean) => {
    const newGenres = checked
      ? [...state.searchParams.genre, genre]
      : state.searchParams.genre.filter((g) => g !== genre);

    functions.onSetSearchParams({
      genre: newGenres,
    });
  };

  return (
    <div className="flex flex-col gap-6 w-66">
      <label className="flex flex-row justify-between">
        <Typography variant="body-md">
          <I18nText path="page.catalog.filters.discount" />
        </Typography>
        <Switch
          checked={state.searchParams.filter.includes("discount")}
          onCheckedChange={onToggleDiscount}
        />
      </label>
      <label className="flex flex-row justify-between">
        <Typography variant="body-md">
          <I18nText path="page.catalog.filters.dlc" />
        </Typography>
        <Switch
          checked={state.searchParams.filter.includes("dlc")}
          onCheckedChange={onToggleDlc}
        />
      </label>
      <div className="flex flex-col gap-4">
        <Typography variant="body-md">
          <I18nText path="page.catalog.filters.genre" />
        </Typography>
        <InputGroup>
          <InputGroupAddon align="start">
            <InputGroupIconButton>
              <SearchIcon />
            </InputGroupIconButton>
          </InputGroupAddon>
          <InputGroupInput
            placeholder={searchPlaceholder}
            value={state.genreSearchValue}
            onChange={(event) => functions.onGenreSearch(event.target.value)}
          />
        </InputGroup>
        <ul className="flex flex-col gap-3">
          {state.visibleGenres.map((genre) => (
            <li key={genre}>
              <label className="flex min-h-5 items-center gap-2 cursor-pointer">
                <Checkbox
                  className="rounded-4 border border-ring bg-background"
                  checked={state.searchParams.genre.includes(genre)}
                  onCheckedChange={(checked) => onGenreChange(genre, !!checked)}
                />
                <Typography variant="caption" as="span">
                  <I18nText path={`genre.${genre}`} />
                </Typography>
              </label>
            </li>
          ))}
        </ul>

        {state.filteredGenres.length === 0 && (
          <Typography
            as="p"
            className="text-foreground/50 text-center"
            variant="body-sm"
          >
            <I18nText path="page.catalog.filters.genreNotFound" />
          </Typography>
        )}

        {state.filteredGenres.length >= 5 && !state.allGenresOpened && (
          <Button
            variant="ghost"
            size="sm"
            onClick={functions.onShowMoreGenres}
          >
            <I18nText path="button.showMore" />
          </Button>
        )}

        {state.filteredGenres.length >= 5 && state.allGenresOpened && (
          <Button
            variant="ghost"
            size="sm"
            onClick={functions.onHideMoreGenres}
          >
            <I18nText path="page.catalog.filters.hide" />
          </Button>
        )}
      </div>
      <Button variant="secondary" size="lg" onClick={functions.onResetFilters}>
        <I18nText path="page.catalog.filters.reset" />
      </Button>
    </div>
  );
};
