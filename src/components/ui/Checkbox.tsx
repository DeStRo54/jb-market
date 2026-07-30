import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator as CheckboxPrimitiveIndicator,
} from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/tailwind";

const Checkbox = ({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive>) => (
  <CheckboxPrimitive
    className={cn(
      "peer relative flex size-5 shrink-0 items-center justify-center border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-fg dark:data-checked:bg-primary",
      className,
    )}
    data-slot="checkbox"
    {...props}
  >
    <CheckboxPrimitiveIndicator
      className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      data-slot="checkbox-indicator"
    >
      <CheckIcon />
    </CheckboxPrimitiveIndicator>
  </CheckboxPrimitive>
);

export { Checkbox };
