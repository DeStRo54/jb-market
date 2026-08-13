import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import { getGamesInfo } from "@/api/handlers/games/info";
import { getGameInfoBySlug } from "@/api/handlers/games/info/[slug]";
import { I18nText } from "@/components/common/I18nText";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/tailwind";
import { ROUTES } from "@/utils/constants/routes";

import { GameInteractiveSections } from "./_sections/interactive";
import { GameStaticSections } from "./_sections/static";

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
    <div className="flex flex-col gap-2 sm:mt-2 sm:pb-2">
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
        <GameStaticSections game={data.game} />
        <GameInteractiveSections game={data.game} />
      </div>
    </div>
  );
}
