import { Gamepad2Icon, HistoryIcon, UserIcon } from "lucide-react";

import { ROUTES } from "@/utils/constants/routes";

export const navItems = [
  {
    icon: Gamepad2Icon,
    label: "Каталог",
    to: ROUTES.GAMES,
  },
  {
    icon: HistoryIcon,
    label: "История",
    to: ROUTES.HISTORY,
  },
  {
    icon: UserIcon,
    label: "Профиль",
    to: ROUTES.PROFILE,
  },
] as const;
