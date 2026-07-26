"use client";

import { type ReactNode, useLayoutEffect, useState } from "react";

import { COOKIES } from "@/utils/constants/cookies";
import { getCookie } from "@/utils/helpers/getCookie";
import { setCookie } from "@/utils/helpers/setCookie";
import { usePreferredColorScheme } from "@/utils/hooks/usePreferredColorScheme";

import { Theme, ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

const getSystemTheme = (): Exclude<Theme, "system"> => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getTheme = (theme: Theme) => {
  if (theme === "system") return getSystemTheme();
  return theme;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = usePreferredColorScheme();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (getCookie(COOKIES.THEME) as Theme | undefined) ?? "system";
  });

  const animate = async (x: number, y: number, theme: Theme) => {
    const radius = Math.hypot(window.innerWidth, window.innerHeight);

    await document.startViewTransition(() => {
      setTheme(theme);
    }).ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  useLayoutEffect(() => {
    const root = document.documentElement;
    const activeTheme = getTheme(theme);

    setCookie(COOKIES.THEME, theme, {
      path: "/",
    });

    root.classList.remove("light", "dark");
    root.classList.add(activeTheme);
  }, [theme, colorScheme]);

  return (
    <ThemeContext value={{ value: getTheme(theme), set: setTheme, animate }}>
      {children}
    </ThemeContext>
  );
};
