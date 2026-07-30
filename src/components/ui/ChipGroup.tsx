"use client";

import {
  ToggleGroup as ChipGroupPrimitive,
  ToggleGroupItem as ChipGroupPrimitiveItem,
} from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/tailwind";

import { chipVariants } from "./Chip";

const ChipGroup = ({
  className,
  ...props
}: ComponentProps<typeof ChipGroupPrimitive>) => (
  <ChipGroupPrimitive
    className={cn(
      "flex w-fit flex-row items-center gap-2 data-vertical:flex-col data-vertical:items-stretch",
      className,
    )}
    data-slot="chip-group"
    {...props}
  />
);

export type ChipGroupItemProps = ComponentProps<typeof ChipGroupPrimitiveItem> &
  VariantProps<typeof chipVariants> & {
    icon?: false | ReactNode;
  };

const ChipGroupItem = ({
  className,
  variant,
  children,
  icon = <XIcon />,
  ...props
}: ChipGroupItemProps) => (
  <ChipGroupPrimitiveItem
    className={cn(
      chipVariants({ variant, className }),
      "group/chip-group-item",
      icon && "data-[state=on]:px-4.5",
    )}
    data-slot="chip-group-item"
    {...props}
  >
    {children}
    {icon && (
      <span className="hidden group-data-[state=on]/chip-group-item:block">
        {icon}
      </span>
    )}
  </ChipGroupPrimitiveItem>
);

export { ChipGroup, ChipGroupItem };
