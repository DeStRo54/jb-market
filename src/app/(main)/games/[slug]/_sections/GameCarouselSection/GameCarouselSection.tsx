"use client";

import Image from "next/image";
import { useIntl } from "react-intl";

import { I18nText } from "@/components/common/I18nText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { Typography } from "@/components/ui/Typography";
import { GameDetailed } from "@/generated/api";
import { getAsset } from "@/utils/helpers/getAsset";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";

interface GameCarouselProps {
  game: GameDetailed;
}

export const GameCarouselSection = ({ game }: GameCarouselProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const intl = useIntl();

  return (
    <section className="mb-6 flex min-w-0 flex-col gap-3 [grid-area:screenshots] sm:mb-0">
      <Typography variant={isDesktop ? "title-md" : "body-md"}>
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
  );
};
