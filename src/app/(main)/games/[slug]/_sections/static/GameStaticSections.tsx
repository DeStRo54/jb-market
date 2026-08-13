import Image from "next/image";

import { I18nText } from "@/components/common/I18nText";
import { Badge } from "@/components/ui/Badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Typography } from "@/components/ui/Typography";
import { GameDetailed } from "@/generated/api";
import { intl } from "@/i18n/server";
import { getAsset } from "@/utils/helpers/getAsset";

import { productMetaItems } from "../../helpers/meta";
import {
  getRequirementRows,
  getRequirementSections,
} from "../../helpers/requirements";

interface GameStaticSection {
  game: GameDetailed;
}

export const GameStaticSections = ({ game }: GameStaticSection) => (
  <>
    <section className="flex flex-col gap-3 [grid-area:overview] lg:gap-4">
      <div className="flex flex-col gap-2">
        <div className="aspect-460/215 w-full overflow-hidden rounded-24 bg-secondary relative">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            alt={game.name}
            className="block size-full object-cover object-center"
            src={getAsset(game.image)}
          />
        </div>
        <Typography as="h1" className="hidden lg:block" variant="title-lg">
          {game.name}
        </Typography>
        <div className="flex max-w-full scrollbar-none gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible">
          {game.genres.map((genre) => (
            <Badge
              key={genre}
              className="px-4 py-2 text-[12px]/4 font-bold tracking-wide"
            >
              <I18nText path={`genre.${genre}`} />
            </Badge>
          ))}
        </div>
      </div>
      <Typography
        as="p"
        className="mb-6 tracking-normal sm:mb-0"
        variant="body-sm"
      >
        {game.description}
      </Typography>
    </section>
    <section className="mb-6 flex h-fit flex-col gap-2 border-none p-0 [grid-area:meta] sm:mb-0 sm:rounded-24 sm:bg-secondary sm:p-6">
      {productMetaItems(game).map((item) => (
        <div key={item.label} className="flex flex-col">
          <Typography as="span" className="text-muted-fg" variant="caption">
            {item.label}
          </Typography>
          <Typography as="span" variant="body-sm">
            {item.value}
          </Typography>
        </div>
      ))}
    </section>
    <section className="mb-6 flex min-w-0 flex-col gap-3 [grid-area:screenshots] sm:mb-0">
      <Typography variant="title-md" className="hidden md:block">
        <I18nText path="page.gameProduct.screenshots" />
      </Typography>
      <Typography variant="body-md" className="block md:hidden">
        <I18nText path="page.gameProduct.screenshots" />
      </Typography>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="max-w-full min-w-0 pb-10"
      >
        <CarouselContent className="-ml-2">
          {game.screenshots.map((screenshot) => (
            <CarouselItem key={screenshot} className="basis-auto pl-2">
              <div className="aspect-68/39 w-[min(82vw,24rem)] overflow-hidden rounded-24 bg-secondary sm:w-68 relative">
                <Image
                  fill
                  sizes="(max-width: 768px) 82vw, 24rem"
                  loading="lazy"
                  alt={intl.formatMessage(
                    {
                      id: "page.gameProduct.screenshotAlt",
                    },
                    {
                      name: screenshot,
                    },
                  )}
                  className="block size-full object-cover"
                  src={getAsset(screenshot)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="top-auto bottom-0 left-0 hidden size-8 translate-y-0 rounded-full sm:block"
          variant="ghost"
        />
        <CarouselNext
          className="top-auto right-0 bottom-0 hidden size-8 translate-y-0 rounded-full sm:block"
          variant="ghost"
        />
      </Carousel>
    </section>
    <section className="mb-6 flex flex-col gap-3 [grid-area:requirements] sm:mb-0">
      <Typography variant="title-md" className="hidden md:block">
        <I18nText path="page.gameProduct.systemRequirements" />
      </Typography>
      <Typography variant="body-md" className="block md:hidden">
        <I18nText path="page.gameProduct.systemRequirements" />
      </Typography>

      <div className="hidden md:grid gap-4 lg:grid-cols-2">
        {getRequirementSections(game).map((section) => (
          <div key={section.key} className="flex flex-col gap-2">
            <Typography as="h3" className="font-medium" variant="title-md">
              <I18nText path={section.titlePath} />
            </Typography>
            {getRequirementRows(section.requirements).map(
              (row) =>
                row.value && (
                  <div key={row.labelPath} className="flex flex-col">
                    <Typography
                      as="span"
                      className="text-muted-fg"
                      variant="caption"
                    >
                      <I18nText path={row.labelPath} />:
                    </Typography>
                    <Typography as="span" variant="body-sm">
                      {row.value}
                    </Typography>
                  </div>
                ),
            )}
          </div>
        ))}
      </div>

      <Tabs defaultValue="minimum" className="md:hidden">
        <TabsList className="w-full">
          {getRequirementSections(game).map((section) => (
            <TabsTrigger key={section.key} value={section.key}>
              <I18nText path={section.titlePath} />
            </TabsTrigger>
          ))}
        </TabsList>
        {getRequirementSections(game).map((section) => (
          <TabsContent key={section.key} value={section.key}>
            <div className="flex flex-col gap-2">
              {getRequirementRows(section.requirements).map(
                (row) =>
                  row.value && (
                    <div key={row.labelPath} className="flex flex-col">
                      <Typography
                        as="span"
                        className="text-muted-fg"
                        variant="caption"
                      >
                        <I18nText path={row.labelPath} />:
                      </Typography>
                      <Typography as="span" variant="body-sm">
                        {row.value}
                      </Typography>
                    </div>
                  ),
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  </>
);
