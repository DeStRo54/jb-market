"use client";

import { ListFilterIcon, SearchIcon, XIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { I18nText } from "@/components/common/I18nText";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { IconButton } from "@/components/ui/IconButton";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup";
import { Switch } from "@/components/ui/Switch";
import { Typography } from "@/components/ui/Typography";
import { GameFilter, GameGenre } from "@/generated/api";

import { useFilters } from "./hooks/useFilters";

interface CatalogFiltersMobileFormValues {
  genre: GameGenre[];
  showedDiscount: boolean;
  showedDlc: boolean;
}

export const MobileFilters = () => {
  const { state, functions } = useFilters();

  const searchPlaceholder = state.intl.formatMessage({
    id: "page.catalog.filters.genrePlaceholder",
  });

  const form = useForm<CatalogFiltersMobileFormValues>({
    defaultValues: {
      genre: state.searchParams.genre,
      showedDlc: state.searchParams.filter.includes("dlc"),
      showedDiscount: state.searchParams.filter.includes("discount"),
    },
  });

  const onGenreChange = (genre: GameGenre, checked: boolean) => {
    const currentGenres = form.getValues("genre");
    const newGenres = checked
      ? [...currentGenres, genre]
      : currentGenres.filter((g) => g !== genre);

    form.setValue("genre", newGenres);
  };

  const onResetFilters = () => {
    form.reset({
      genre: [],
      showedDiscount: false,
      showedDlc: false,
    });
    functions.onResetFilters();
  };

  const onApplyFilters = form.handleSubmit((values) => {
    const filter: GameFilter[] = [
      ...(values.showedDlc ? ["dlc" as const] : []),
      ...(values.showedDiscount ? ["discount" as const] : []),
    ];

    functions.onSetSearchParams({
      filter,
      genre: values.genre,
    });
  });

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <IconButton rounded className="lg:hidden" variant="secondary">
          <ListFilterIcon />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent className="p-4 max-h-161!" showHandle={false}>
        <DrawerHeader className="flex flex-row justify-between px-2 py-3">
          <DrawerTitle asChild>
            <Typography as="span" variant="title-md">
              <I18nText path="page.catalog.filters.title" />
            </Typography>
          </DrawerTitle>
          <DrawerClose asChild>
            <IconButton className="size-6" type="button" variant="ghost">
              <XIcon className="size-6" />
            </IconButton>
          </DrawerClose>
        </DrawerHeader>
        <form onSubmit={onApplyFilters}>
          <div className="flex flex-col gap-6 px-2">
            <label className="flex items-center justify-between gap-4">
              <Typography as="span" variant="body-md">
                <I18nText path="page.catalog.filters.discount" />
              </Typography>
              <Controller
                control={form.control}
                name="showedDiscount"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </label>

            <label className="flex items-center justify-between gap-4">
              <Typography as="span" variant="body-md">
                <I18nText path="page.catalog.filters.dlc" />
              </Typography>
              <Controller
                control={form.control}
                name="showedDlc"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </label>

            <div className="mb-6 flex flex-col gap-4">
              <Typography as="span" variant="body-md">
                <I18nText path="page.catalog.filters.genre" />
              </Typography>

              <InputGroup className="h-10">
                <InputGroupAddon align="start">
                  <SearchIcon className="text-input" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder={searchPlaceholder}
                  value={state.genreSearchValue}
                  onChange={(event) =>
                    functions.onGenreSearch(event.target.value)
                  }
                />
              </InputGroup>

              <div className="h-42 overflow-y-auto">
                <Controller
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <ul className="flex flex-col gap-3">
                      {state.visibleGenres.map((genre) => (
                        <li key={genre}>
                          <label className="flex items-center gap-3">
                            <Checkbox
                              checked={field.value.includes(genre)}
                              className="size-5 rounded-6 border-2 border-ring bg-background"
                              onCheckedChange={(checked) =>
                                onGenreChange(genre, !!checked)
                              }
                            />

                            <Typography variant="caption" as="span">
                              <I18nText path={`genre.${genre}`} />
                            </Typography>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                />
              </div>

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
          </div>
          <DrawerFooter className="gap-2 px-0 py-2">
            <DrawerClose asChild>
              <Button
                size="lg"
                type="button"
                variant="secondary"
                onClick={onResetFilters}
              >
                <I18nText path="page.catalog.filters.reset" />
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button size="lg" type="submit">
                <I18nText path="page.catalog.filters.apply" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
