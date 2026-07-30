"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import type { MouseEvent } from "react";

import { useTheme } from "@/app/_contexts/theme/useTheme";
import { IconButton } from "@/components/ui/IconButton";

export const ThemeButton = () => {
  const theme = useTheme();

  const onThemeClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX;
    const y = event.clientY;
    theme.animate(x, y, theme.value === "dark" ? "light" : "dark");
  };

  return (
    <IconButton variant="secondary" size="sm" rounded onClick={onThemeClick}>
      {theme.value === "dark" ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};
