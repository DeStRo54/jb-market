export const ROUTES = {
  GAMES: "/games",
  LOGIN: "/login",
  PROFILE: "/profile",
  HISTORY: "/history",
} as const;

export const DYNAMIC_ROUTES = {
  GAME: (id: string) => `${ROUTES.GAMES}/${id}`,
} as const;
