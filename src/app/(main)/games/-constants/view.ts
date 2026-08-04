import type { GameView } from "@/generated/api";

export const CATALOG_VIEWS: GameView[] = ["new", "popular"];

export const ALL_VIEW = "all";

export const ALL_CATALOG_VIEWS = [ALL_VIEW, ...CATALOG_VIEWS] as const;
