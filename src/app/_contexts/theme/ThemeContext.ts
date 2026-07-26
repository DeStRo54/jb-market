"use client";

import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextValue {
  value: Exclude<Theme, "system">;
  set: (theme: Theme) => void;
  animate: (x: number, y: number, theme: Theme) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextValue>({
  value: "light",
  set: () => {},
  animate: async () => {},
});
