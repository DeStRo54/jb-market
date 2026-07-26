"use client";

import type { MouseEvent } from "react";

import { useTheme } from "@/app/_contexts/theme/useTheme";

export const TestButton = () => {
  const theme = useTheme();

  const onThemeClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX;
    const y = event.clientY;
    theme.animate(x, y, theme.value === "dark" ? "light" : "dark");
  };

  return <button onClick={onThemeClick}>Test click</button>;
};
