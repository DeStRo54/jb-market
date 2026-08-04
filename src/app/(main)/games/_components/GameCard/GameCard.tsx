"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Typography } from "@/components/ui/Typography";
import { GameFiltered } from "@/generated/api";
import { formatMoney } from "@/utils/helpers/formatMoney";
import { getAsset } from "@/utils/helpers/getAsset";
import { getDiscount } from "@/utils/helpers/getDiscount";

interface GameCardProps {
  game: GameFiltered;
}

export const GameCard = ({ game }: GameCardProps) => (
  <article className="min-w-0">
    <Link
      className="group block min-w-0 rounded-24 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      href={`/games/${game.slug}`}
    >
      <div className="h-39.5 w-full overflow-hidden rounded-24 bg-secondary">
        <div className="w-full h-39.5 relative">
          <Image
            src={getAsset(game.image)}
            alt={game.name}
            fill
            loading="lazy"
            className="block size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="mt-2 flex min-w-0 flex-col">
        <div className="flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1">
          <Typography
            as="span"
            className="text-[16px]/6 font-medium tracking-wide"
            variant="body-lg"
          >
            {formatMoney(game.priceVariant.price)}
          </Typography>
          {game.priceVariant.oldPrice && (
            <Badge
              className="px-2 py-1 text-[12px]/4 font-bold tracking-wide"
              variant="accent"
            >
              {getDiscount(game.priceVariant.price, game.priceVariant.oldPrice)}
            </Badge>
          )}
          {game.priceVariant.oldPrice && (
            <Typography
              as="span"
              className="text-[14px]/[22px] font-medium tracking-wide text-foreground/40 line-through"
              variant="body-md"
            >
              {formatMoney(game.priceVariant.oldPrice)}
            </Typography>
          )}
        </div>

        <Typography
          as="h2"
          className="min-w-0 text-[16px]/6 font-medium tracking-wide text-foreground"
          variant="body-lg"
        >
          {game.name}
        </Typography>
      </div>
    </Link>
  </article>
);
