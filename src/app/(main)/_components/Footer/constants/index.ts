import { ROUTES } from "@/utils/constants/routes";

export const FOOTER_PRODUCTS = [
  {
    search: {
      filter: [],
      genre: [],
      view: undefined,
    },
    to: ROUTES.GAMES,
    label: "Весь каталог",
  },
  {
    search: {
      filter: [],
      genre: [],
      view: "new",
    },
    to: ROUTES.GAMES,
    label: "Новинки",
  },
  {
    search: {
      filter: [],
      genre: [],
      view: "popular",
    },
    to: ROUTES.GAMES,
    label: "Популярные",
  },
] as const;

export const FOOTER_CONTACTS = [
  {
    href: ROUTES.PROFILE,
    label: "Поддержка клиентов",
  },
  {
    href: ROUTES.PROFILE,
    label: "Написать нам на почту",
  },
  {
    href: ROUTES.PROFILE,
    label: "По вопросам рекламы",
  },
  {
    href: "ROUTES.PROFILE",
    label: "Контакты",
  },
] as const;

export const FOOTER_REPOSITORY_URL = "https://github.com/DeStRo54";
