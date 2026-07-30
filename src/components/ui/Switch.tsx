"use client";

import {
  Switch as SwitchPrimitive,
  SwitchThumb as SwitchPrimitiveThumb,
} from "@radix-ui/react-switch";
import type { ComponentProps } from "react";

import { cn } from "@/lib/tailwind";

const Switch = ({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive>) => (
  <SwitchPrimitive
    className={cn(
      "peer group/switch inline-flex h-6.5 w-12 shrink-0 items-center rounded-full transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-30",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface",
      className,
    )}
    data-slot="switch"
    {...props}
  >
    <SwitchPrimitiveThumb
      className={cn(
        "pointer-events-none block size-6 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-1px)] data-[state=unchecked]:translate-x-px",
        "data-[state=checked]:bg-primary-fg data-[state=unchecked]:bg-surface-fg",
      )}
      data-slot="switch-thumb"
    />
  </SwitchPrimitive>
);

export { Switch };
