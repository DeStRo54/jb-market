"use client";

import { Loader2Icon, SearchIcon, SearchXIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { useIntl } from "react-intl";

import { useGetGamesSearchQuery } from "@/api/hooks/useGetGamesSearchQuery";
import { I18nText } from "@/components/common/I18nText";
import { Badge } from "@/components/ui/Badge";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
} from "@/components/ui/Combobox";
import {
  InputGroupAddon,
  InputGroupIconButton,
} from "@/components/ui/InputGroup";
import { Typography } from "@/components/ui/Typography";
import { GameFiltered } from "@/generated/api";
import { cn } from "@/lib/tailwind";
import { DYNAMIC_ROUTES } from "@/utils/constants/routes";
import { formatMoney } from "@/utils/helpers/formatMoney";
import { getDiscount } from "@/utils/helpers/getDiscount";
import { useDebounceValue } from "@/utils/hooks/useDebounceValue";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchInputId = useId();
  const comboboxAnchorRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  const debounceSearchValue = useDebounceValue(searchValue, 300);

  const gamesSearchQuery = useGetGamesSearchQuery(
    {
      search: debounceSearchValue,
    },
    {
      options: {
        enabled: !!debounceSearchValue.trim(),
      },
    },
  );

  const placeholder = intl.formatMessage({
    id: "page.catalog.search.placeholder",
  });

  const searchGames = gamesSearchQuery.data?.data.games ?? [];

  const onClear = () => setSearchValue("");

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[14px]/[22px]" htmlFor={searchInputId}>
        <I18nText path="page.catalog.search.label" />
      </label>

      <Combobox
        filter={null}
        openOnInputClick={false}
        items={searchGames}
        onInputValueChange={setSearchValue}
      >
        <ComboboxInput
          id={searchInputId}
          placeholder={placeholder}
          value={searchValue}
          showTrigger={false}
          inputGroupRef={comboboxAnchorRef}
        >
          <InputGroupAddon align="start">
            <SearchIcon />
          </InputGroupAddon>
          {!!searchValue && (
            <InputGroupAddon align="end">
              <InputGroupIconButton onClick={onClear}>
                <XIcon />
              </InputGroupIconButton>
            </InputGroupAddon>
          )}
        </ComboboxInput>
        <ComboboxContent anchor={comboboxAnchorRef}>
          <ComboboxEmpty
            className={cn(
              gamesSearchQuery.isPending && "hidden",
              !searchGames.length && "h-42.5",
            )}
          >
            <div className="flex flex-col gap-4 items-center my-auto text-surface">
              <SearchXIcon width={40} height={40} />
              <div className="flex flex-col gap-2">
                <Typography variant="body-lg" as="span">
                  <I18nText path="page.catalog.search.nothingFound" />
                </Typography>
                <Typography variant="body-sm" as="span">
                  <I18nText path="page.catalog.search.nothingFoundDescription" />
                </Typography>
              </div>
            </div>
          </ComboboxEmpty>
          <ComboboxStatus
            className={cn(
              (!searchValue || !gamesSearchQuery.isPending) && "hidden",
              "h-42.5",
            )}
          >
            <div className="flex flex-col gap-4 items-center my-auto text-surface">
              <Loader2Icon width={40} height={40} className="animate-spin" />
              <Typography variant="body-lg" as="span">
                <I18nText path="page.catalog.search.loading" />
              </Typography>
            </div>
          </ComboboxStatus>
          <ComboboxList className="max-h-76.75">
            {(game: GameFiltered) => (
              <ComboboxItem key={game.slug} value={game.slug}>
                <Link
                  href={DYNAMIC_ROUTES.GAME(game.slug)}
                  className="flex flex-row gap-2 w-full"
                >
                  <div className="flex flex-row gap-2 w-112.5 items-center">
                    <Image
                      src={`/api${game.image}`}
                      alt={game.name}
                      loading="lazy"
                      width={88}
                      height={40}
                      className="rounded-8"
                    />
                    <Typography variant="body-sm" as="span">
                      {game.name}
                    </Typography>
                  </div>
                  <div className="flex flex-row gap-2.5 max-w-112.5 flex-1">
                    <Badge>
                      <I18nText
                        path={`deliveryType.${game.priceVariant.deliveryType}`}
                      />
                    </Badge>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    {!!game.priceVariant.oldPrice && (
                      <Badge variant="accent" className="px-2 py-1">
                        {getDiscount(
                          game.priceVariant.price,
                          game.priceVariant.oldPrice,
                        )}
                      </Badge>
                    )}
                    <div className="flex flex-col items-end">
                      {game.priceVariant.oldPrice && (
                        <Typography
                          as="span"
                          className="text-muted-fg line-through"
                          variant="caption"
                        >
                          {formatMoney(game.priceVariant.oldPrice)}
                        </Typography>
                      )}
                      <Typography variant="body-sm">
                        {`от ${formatMoney(game.priceVariant.price)}`}
                      </Typography>
                    </div>
                  </div>
                </Link>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};
