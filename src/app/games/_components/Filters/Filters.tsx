"use client";

import { SearchIcon } from "lucide-react";
import { useIntl } from "react-intl";

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

import { useFilters } from "./hooks/useFilters";

export const Filters = () => {
  const { state, functions } = useFilters();
  const intl = useIntl();

  const placeholder = intl.formatMessage({
    id: "page.catalog.filters.genrePlaceholder",
  });

  const filters: string[] = JSON.parse(
    state.searchParams.get("filter") || "[]",
  );

  const onToggleDiscount = (checked: boolean) => {
    const params = new URLSearchParams(state.searchParams);

    const newFilters = checked
      ? [...filters, "discount"]
      : filters.filter((f) => f !== "discount");

    if (newFilters.length === 0) {
      params.delete("filter");
    } else {
      params.set("filter", JSON.stringify(newFilters));
    }
    functions.router.push(`${state.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6 w-66">
      <div className="flex flex-row justify-between">
        <Typography variant="body-md">
          <I18nText path="page.catalog.filters.discount" />
        </Typography>
        <Switch
          checked={filters.includes("discount")}
          onCheckedChange={onToggleDiscount}
        />
      </div>
      <div className="flex flex-row justify-between">
        <Typography variant="body-md">
          <I18nText path="page.catalog.filters.dlc" />
        </Typography>
        <Switch />
      </div>
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
            placeholder={placeholder}
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
                  defaultChecked={false}
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

        {state.filteredGenres.length >= 5 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => functions.onToggleGenres()}
          >
            <I18nText
              path={
                state.allGenresOpened
                  ? "page.catalog.filters.hide"
                  : "button.showMore"
              }
            />
          </Button>
        )}
      </div>
      <Button variant="secondary" size="lg">
        <I18nText path="page.catalog.filters.reset" />
      </Button>
    </div>
  );
};
