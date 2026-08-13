import { GiftIcon, KeyRoundIcon } from "lucide-react";
import type { ComponentType } from "react";

import { PlayStationIcon } from "@/components/icons/PlayStationIcon";
import { XboxLogoIcon } from "@/components/icons/XboxIcon";
import type { GameDeliveryType } from "@/generated/api";

interface DeliveryTypeOption {
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  platform: string;
  subtitlePath: LocaleMessageId;
  titlePath: LocaleMessageId;
}

export const DELIVERY_TYPE_VIEW: Record<GameDeliveryType, DeliveryTypeOption> =
  {
    steam_key: {
      titlePath: "page.gameProduct.delivery.steam_key.title",
      subtitlePath: "page.gameProduct.delivery.keySubtitle",
      Icon: KeyRoundIcon,
      platform: "Steam",
    },
    steam_gift: {
      titlePath: "page.gameProduct.delivery.steam_gift.title",
      subtitlePath: "page.gameProduct.delivery.codeSubtitle",
      Icon: GiftIcon,
      platform: "Steam",
    },
    xbox_key: {
      titlePath: "page.gameProduct.delivery.xbox_key.title",
      subtitlePath: "page.gameProduct.delivery.keySubtitle",
      Icon: XboxLogoIcon,
      platform: "Xbox",
    },
    playstation_key: {
      titlePath: "page.gameProduct.delivery.playstation_key.title",
      subtitlePath: "page.gameProduct.delivery.keySubtitle",
      Icon: PlayStationIcon,
      platform: "PlayStation",
    },
    epic_key: {
      titlePath: "page.gameProduct.delivery.epic_key.title",
      subtitlePath: "page.gameProduct.delivery.keySubtitle",
      Icon: KeyRoundIcon,
      platform: "Epic Games",
    },
    nintendo_key: {
      titlePath: "page.gameProduct.delivery.nintendo_key.title",
      subtitlePath: "page.gameProduct.delivery.keySubtitle",
      Icon: KeyRoundIcon,
      platform: "Nintendo",
    },
  };
