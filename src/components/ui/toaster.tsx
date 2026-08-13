"use client";

import { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

import { useTheme } from "@/app/_contexts/theme";

type ToasterProps = ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => {
  const { value: theme } = useTheme();

  return <Sonner theme={theme} {...props} />;
};
