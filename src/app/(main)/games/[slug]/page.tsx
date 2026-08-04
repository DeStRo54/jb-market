import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getGamesInfo } from "@/api/handlers/games/info";
import { getGameInfoBySlug } from "@/api/handlers/games/info/[slug]";
import { I18nText } from "@/components/common/I18nText";
import { Badge } from "@/components/ui/Badge";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/tailwind";
import { ROUTES } from "@/utils/constants/routes";
import { getAsset } from "@/utils/helpers/getAsset";

import { GameCarouselSection } from "./_sections/GameCarouselSection/GameCarouselSection";

interface GameProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const { data } = await getGamesInfo({
    params: {
      limit: 21,
    },
  });

  return data.games.map((game) => ({
    slug: game.slug,
  }));
}

export default async function GameProductPage({
  params,
}: GameProductPageProps) {
  const { slug } = await params;
  const { data } = await getGameInfoBySlug({
    params: { slug },
    config: {
      next: {
        revalidate: 3600,
        tags: ["game", slug],
      },
    },
  });

  return (
    <section className="flex flex-col gap-2 sm:mt-2 sm:pb-2">
      <Link className="flex h-14 items-center gap-4" href={ROUTES.GAMES}>
        <ChevronLeftIcon className="size-6" />
        <Typography
          as="p"
          className="tracking-normal hidden md:block"
          variant="body-lg"
        >
          <I18nText path="page.gameProduct.backToCatalog" />
        </Typography>
        <Typography
          as="p"
          className="tracking-normal md:hidden"
          variant="title-md"
        >
          {data.game.name}
        </Typography>
      </Link>

      <div
        className={cn(
          "sm:grid sm:gap-6",
          '[grid-template-areas:"overview"_"screenshots"_"meta"_"requirements"_"selection"_"checkout"]',
          "lg:grid-cols-[minmax(0,1fr)_minmax(0,418px)_minmax(0,372px)]",
          "lg:gap-6",
          'lg:[grid-template-areas:"overview_selection_checkout"_"meta_selection_checkout"_"screenshots_screenshots_screenshots"_"requirements_requirements_requirements"]',
        )}
      >
        <section className="flex flex-col gap-3 [grid-area:overview] lg:gap-4">
          <div className="flex flex-col gap-2">
            <div className="aspect-460/215 w-full overflow-hidden rounded-24 bg-secondary relative">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                alt={data.game.name}
                className="block size-full object-cover object-center"
                src={getAsset(data.game.image)}
              />
            </div>
            <Typography as="h1" className="hidden lg:block" variant="title-lg">
              {data.game.name}
            </Typography>
            <div className="flex max-w-full scrollbar-none gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible">
              {data.game.genres.map((genre) => (
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
            {data.game.description}
          </Typography>
        </section>
        <GameCarouselSection game={data.game} />
      </div>
    </section>
  );
}
